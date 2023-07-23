<?php

namespace KDNAutoLeech\Test\Base;


use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Factory;
use KDNAutoLeech\Objects\Crawling\Bot\AbstractBot;
use KDNAutoLeech\Objects\Crawling\Bot\DummyBot;
use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxApplier;
use KDNAutoLeech\Objects\OptionsBox\OptionsBoxService;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

abstract class AbstractTest {

    /** @var string The key under which the view is added to the response */
    protected $responseViewKey = 'view';

    /** @var string The key under which the results are added to the response */
    protected $responseResultsKey = 'data';

    /**
     * @var string The name of the variable which stores the modified results, which are the results obtained after
     * applying the options configured in the options box, in the view.
     */
    protected $viewModifiedResultsKey = 'modifiedResults';

    /** @var float Start time of the test. */
    private $startTime = 0;

    /** @var float Memory usage just before conducting the test. */
    private $memoryInitial = 0;

    private $data = null;

    private $results = null;

    private $isRun = false;

    const MANIPULATION_STEP_INITIAL_REPLACEMENTS            = 0;
    const MANIPULATION_STEP_FIND_REPLACE_ELEMENT_ATTRIBUTES = 1;
    const MANIPULATION_STEP_EXCHANGE_ELEMENT_ATTRIBUTES     = 2;
    const MANIPULATION_STEP_REMOVE_ELEMENT_ATTRIBUTES       = 3;
    const MANIPULATION_STEP_FIND_REPLACE_ELEMENT_HTML       = 4;
    const MANIPULATION_STEP_REMOVE_ELEMENTS_FROM_CRAWLER    = 5;

    /**
     * @param TestData $data The data to be used to conduct the test
     */
    public function __construct($data) {
        $this->data = $data;
    }

    /*
     * ABSTRACT METHODS
     */

    /**
     * Conduct the test and return an array of results.
     *
     * @param TestData $data Information required for the test
     * @return array|string|mixed
     */
    protected abstract function createResults($data);

    /**
     * Create the view of the response
     *
     * @return \Illuminate\Contracts\View\View|null
     */
    protected abstract function createView();

    /*
     * PUBLIC METHODS
     */

    /**
     * Run the test
     *
     * @return $this
     */
    public function run() {
        // Mark the start time and initial memory usage so that we can calculate elapsed time and memory usage later.
        $this->startTime = microtime(true);
        $this->memoryInitial = memory_get_usage();

        $this->results = $this->createResults($this->data);
        $this->isRun = true;

        return $this;
    }

    /**
     * Get the test results
     *
     * @return array Test results as an array
     * @throws \Exception If the test has not been run
     */
    public function getResults() {
        $this->checkIfRunOnce();
        return $this->results;
    }

    /**
     * Get JSON that shows the results. The results include an HTML view as well.
     *
     * @return string
     * @throws \Exception If the test has not been run
     */
    public function getResponse() {
        $this->checkIfRunOnce();

        // Create the response
        $response = [
            $this->responseResultsKey => $this->getResults() ?: []
        ];

        // If view exists, add it to the response.
        $view = $this->createView();
        if ($view) {

            // If the test data does not come from the options box, apply available options box settings to the results.
            if (!$this->getData()->isFromOptionsBox()) {
                $this->addOptionsBoxResultsToView($view);
            }

            // Add memory usage and elapsed time
            $view->with([
                'memoryUsage' => $this->calculateMemoryUsage(),
                'elapsedTime' => $this->calculateElapsedTime()
            ]);

            // Render the view and add it to the response
            $response[$this->responseViewKey] = $view->render();

        } else {
            // If there is no view, add information messages.
            $response['infoView']       = Utils::view('partials/info-list')->render();
            $response['infoStyleUrl']   = Factory::assetManager()->getInformationStyleUrl();
            $response['memoryUsage']    = $this->calculateMemoryUsage();
            $response['elapsedTime']    = $this->calculateElapsedTime();
        }

        // Return the response by parsing it to JSON
        $json = json_encode($response);

        // If there is an error when parsing the response to JSON, log it.
        if ($json === false) {
            Informer::add((new Information(
                sprintf(_kdn('JSON encoding error (%1$s)'), json_last_error()),
                json_last_error_msg(),
                InformationType::ERROR
            ))->addAsLog());

            // If the error was caused by malformed UTF-8 chars, try to convert the encoding and try again
            if (json_last_error() === JSON_ERROR_UTF8) {
                // If there is a view, render it so that the information can be shown in the view.
                if ($view) $response[$this->responseViewKey] = $view->render();

                // Now, try to fix the encoding and try to parse it to JSON again.
                $response = Utils::deepFixMixedUTF8Encoding($response);
                $json = json_encode($response);

                // If there still is a problem
                if ($json === false) {
                    // Remove the results and set the view as info view so that the user can see what went wrong.
                    $response[$this->responseResultsKey] = [];
                    $response[$this->responseViewKey] = Utils::view('partials/info-list')->render();
                    $json = json_encode($response);
                }
            }
        }

        return $json;
    }

    /*
     * PROTECTED METHODS
     */

    /**
     * @param Crawler     $crawler
     * @param null|int    $lastStep        One of the constants of this class whose name starts with MANIPULATION_STEP,
     *                                     e.g.
     *                                     {@link MANIPULATION_STEP_REMOVE_ELEMENT_ATTRIBUTES}. If this is null, all
     *                                     manipulation steps will be applied.
     * @param null|string $fallbackBaseUrl See {@link AbstractBot::resolveRelativeUrls()}
     */
    protected function applyHtmlManipulationOptions(&$crawler, $lastStep = null, $fallbackBaseUrl = null, $original = false, $subPrefix = null) {
        // Make sure there are manipulation options
        $manipulationOptions = $this->data->getManipulationOptions($original);
        if (!$manipulationOptions) return;

        // Make sure there are array keys
        $optionKeys = array_keys($manipulationOptions);
        if (!$optionKeys) return;

        // Find out if this is for post or category
        $prefix = starts_with($optionKeys[0], '_post')          ? "_post_"          . $subPrefix    : "_category_";
        $prefix = starts_with($optionKeys[0], '_child_post')    ? "_child_post_"    . $subPrefix    : $prefix;
        $isPost = ($prefix === '_post_' || $prefix === '_child_post_');

        // Create a bot by adding the manipulation options
        $dummyBot = new DummyBot($this->data->getManipulationOptions($original), null, $this->data->getUseUtf8(), $this->data->getConvertEncodingToUtf8());

        // Apply manipulation steps and stop at the last manipulation step
        $this->applyHtmlManipulationSteps($dummyBot, $crawler, $manipulationOptions, $prefix, $isPost, $fallbackBaseUrl, $lastStep);
    }

    /**
     * Configure the options box applier. This is called before the applier applies the options. So, you can configure
     * the applier here. By default, all options will be applied.
     *
     * @param BaseOptionsBoxApplier $optionsBoxApplier
     */
    protected function configureOptionsBoxApplier($optionsBoxApplier) {

    }

    /*
     * GETTERS
     */

    /**
     * @return TestData
     */
    public function getData() {
        return $this->data;
    }

    /**
     * @return bool
     */
    public function isRun() {
        return $this->isRun;
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * @throws \Exception If the test has not been run
     */
    private function checkIfRunOnce() {
        if (!$this->isRun) {
            throw new \Exception("The test has not been run. You have to run the test first.");
        }
    }

    /**
     * Applies options box options and adds the results to the given view under {@link $viewModifiedResultsKey} key.
     *
     * @param \Illuminate\Contracts\View\View $view
     * @throws \Exception
     * @since 1.8.0
     */
    private function addOptionsBoxResultsToView($view) {

        // Get options box data
        $optionsBoxData = $this->data->getOptionsBoxData() ? $this->data->getOptionsBoxData()->getData() : null;
        if (!$optionsBoxData) return;

        // Create an options box applier
        $optionsBoxApplier = OptionsBoxService::getInstance()->createApplierFromRawData($optionsBoxData);
        if (!$optionsBoxApplier) return;

        $optionsBoxApplier
            ->setForTest(true)
            ->setFromOptionsBox(false);

        // Let the child configure the options box applier.
        $this->configureOptionsBoxApplier($optionsBoxApplier);

        $modifiedResults = array_map(function ($v) use (&$optionsBoxApplier) {
            $res = $optionsBoxApplier->apply($v, $this->data->getData()['url']);
            if (is_object($res) || is_array($res)) return '';

            return $res;
        }, $this->getResults());

        // Remove null values from the modified results.
        $modifiedResults = array_filter($modifiedResults, function($v) {
            return $v !== null;
        });

        // Add the modified results to the view
        $view->with($this->viewModifiedResultsKey, $modifiedResults ?: []);
    }

    /**
     * Applies manipulation steps and stops at the given last step
     *
     * @param AbstractBot $bot                 A bot using which the manipulations will be made
     * @param Crawler     $crawler             The crawler to be manipulated
     * @param array       $manipulationOptions Manipulation options from which the options will be retrieved
     * @param string      $prefix              Prefix for base option names of manipulation options. E.g. "_category_"
     *                                         or
     *                                         "_post_"
     * @param bool        $isPost              True if the manipulation is for a post. Otherwise, false, meaning that
     *                                         it is for category.
     * @param null|string $fallbackBaseUrl     See {@link AbstractBot::resolveRelativeUrls()}
     * @param null|int    $lastStep            One of the constants of this class whose name starts with
     *                                         MANIPULATION_STEP, e.g.
     *                                         {@link MANIPULATION_STEP_REMOVE_ELEMENT_ATTRIBUTES}. If this is null,
     *                                         all manipulation steps will be applied.
     */
    private function applyHtmlManipulationSteps($bot, &$crawler, $manipulationOptions, $prefix, $isPost, $fallbackBaseUrl = null, $lastStep = null) {
        // Make initial replacements
        $crawler = $bot->makeInitialReplacements($crawler, Utils::array_get($manipulationOptions, $prefix . 'find_replace_first_load'), $isPost, $fallbackBaseUrl);
        if ($lastStep === static::MANIPULATION_STEP_INITIAL_REPLACEMENTS) return;

        // Apply HTML manipulations
        $bot->applyFindAndReplaceInElementAttributes($crawler, $prefix . 'find_replace_element_attributes', $fallbackBaseUrl);
        if ($lastStep === static::MANIPULATION_STEP_FIND_REPLACE_ELEMENT_ATTRIBUTES) return;

        $bot->applyExchangeElementAttributeValues($crawler, $prefix . 'exchange_element_attributes');
        if ($lastStep === static::MANIPULATION_STEP_EXCHANGE_ELEMENT_ATTRIBUTES) return;

        $bot->applyRemoveElementAttributes($crawler, $prefix . 'remove_element_attributes');
        if ($lastStep === static::MANIPULATION_STEP_REMOVE_ELEMENT_ATTRIBUTES) return;

        $bot->applyFindAndReplaceInElementHTML($crawler, $prefix . 'find_replace_element_html', $fallbackBaseUrl);
        if ($lastStep === static::MANIPULATION_STEP_FIND_REPLACE_ELEMENT_HTML) return;

        // Clear the crawler from unnecessary elements
        $bot->removeElementsFromCrawler($crawler, Utils::array_get($manipulationOptions, $prefix . 'unnecessary_element_selectors'));
        if ($lastStep === static::MANIPULATION_STEP_REMOVE_ELEMENTS_FROM_CRAWLER) return;

        // Resolve relative URLs
        $bot->resolveRelativeUrls($crawler, $fallbackBaseUrl);
    }

    /**
     * Calculates memory usage using {@link $memoryInitial}
     * @return string
     */
    private function calculateMemoryUsage() {
        return number_format((memory_get_usage() - $this->memoryInitial) / 1000000, 2);
    }

    /**
     * Calculates elapsed time using {@link $startTime}
     * @return string
     */
    private function calculateElapsedTime() {
        return number_format((microtime(true) - $this->startTime) * 1000, 2);
    }

}