<?php

namespace KDNAutoLeech\Test\Base;


use KDNAutoLeech\Objects\Crawling\Data\CategoryData;
use KDNAutoLeech\Objects\Crawling\Data\PostData;
use KDNAutoLeech\Objects\File\MediaService;
use KDNAutoLeech\Test\Data\GeneralTestData;
use KDNAutoLeech\Test\General\GeneralTestHistoryManager;
use KDNAutoLeech\Utils;
use KDNAutoLeech\KDNAutoLeech;

abstract class AbstractGeneralTest {

    /** @var GeneralTestData Data to be used to conduct the test */
    private $data = null;

    private $isRun = false;

    /** @var float Time elapsed when conducting the test, in ms. */
    private $elapsedTime = 0;

    /** @var float Memory usage for the test, in MB. */
    private $memoryUsage = 0;

    /** @var array An array that stores information about the test results. Keys are strings that describe their values.
     * E.g ["Post tags" => ["tag 1", "tag 2"], "Elapsed time" => "1000 ms"]
     */
    private $info = [];

    /** @var GeneralTestHistoryManager */
    private $historyHandler;

    /**
     * @param GeneralTestData $data
     */
    public function __construct($data) {
        $this->data = $data;
        $this->historyHandler = new GeneralTestHistoryManager();
    }

    /*
     * ABSTRACT METHODS
     */

    /**
     * Conduct the test and return an array of results.
     *
     * @param GeneralTestData $data
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
        KDNAutoLeech::setDoingTest(true);

        // Delete the files that were saved when conducting the previous test
        MediaService::getInstance()->deletePreviouslySavedTestFiles();

        $startTime = microtime(true);
        $memoryInitial = memory_get_usage();

        // Create the results
        $this->createResults($this->getData());

        // Update the history
        $this->historyHandler->addItemToHistoryWithGeneralTestData($this->getData());

        // Mark it as run
        $this->isRun = true;

        // Set performance variables
        $this->memoryUsage = number_format((memory_get_usage() - $memoryInitial) / 1000000, 2);
        $this->elapsedTime = number_format((microtime(true) - $startTime) * 1000, 2);

        // Prepare the info. First, get the current info. It is about the details.
        $info = $this->info;

        // Create a new info
        $this->info = [];

        // If there are details, add them to 'Details' section.
        if ($info) $this->info[_kdn('Details')] = $info;

        // Add the performance info under 'Performance' section.
        $this->info[_kdn('Performance')] = $this->getPerformanceInfo();

        // Save test file paths.
        MediaService::getInstance()->saveTestFilePaths();

        return $this;
    }

    /**
     * Get the HTML view that shows the results.
     *
     * @return string HTML
     * @throws \Exception If the test has not been run
     */
    public function getResponse() {
        $this->checkIfRunOnce();

        // Get the result view
        $view = $this->createView();

        // Create test history view
        $testHistoryView = Utils::view('site-tester.test-history')
            ->with('testHistory', $this->historyHandler->getTestHistory());

        return json_encode([
            'view' => $view->render(),
            'viewTestHistory' => $testHistoryView->render()
        ]);
    }

    /*
     * PROTECTED METHODS
     */

    /**
     * @param string $description       Description of the information
     * @param mixed $value              Actual information
     * @param bool $doNotAddIfNotValid  If this is true, the value will be checked against its validity. If it is valid,
     *                                  i.e. not null, 0, etc., it will be added. Otherwise, it won't be added to the
     *                                  info array.
     */
    protected function addInfo($description, $value, $doNotAddIfNotValid = false) {
        if ($doNotAddIfNotValid) {
            if ($value) $this->info[$description] = $value;

        } else {
            $this->info[$description] = $value;
        }
    }

    /**
     * @param CategoryData|PostData $data The data from which the next page URL information will be retrieved.
     */
    protected function addNextPageUrlInfo($data) {
        if (!$data) return;

        if ($data instanceof PostData) {
            // Get the $childPostActive.
            $childPostActive = $data->getChildPostActive();
        }

        // Get the next page URL.
        $nextPageUrl = $data->getNextPageUrl();

        // If there is no next page, stop.
        if(!$nextPageUrl) return;

        // Add next page info.
        $this->addInfo(
            _kdn("Next Page URL"),
            Utils::view('site-tester/url-with-test')->with([
                'url' => $nextPageUrl,
                'testType' => $data instanceof PostData ? ($childPostActive ? 'test_child_post' : 'test_post') : 'test_category',
            ])->render()
        );
    }

    /*
     * GETTERS
     */

    /**
     * @return GeneralTestData See {@link data}
     */
    public function getData() {
        return $this->data;
    }

    /**
     * @return float See {@link elapsedTime}
     */
    public function getElapsedTime() {
        return $this->elapsedTime;
    }

    /**
     * @return float See {@link memoryUsage}
     */
    public function getMemoryUsage() {
        return $this->memoryUsage;
    }

    /**
     * @return array See {@link info}
     */
    public function getInfo() {
        return $this->info;
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
     * @return array An array containing elapsed time and used memory info. Keys are the names of the added info,
     *               values are their values.
     * @since 1.8.0
     */
    private function getPerformanceInfo() {
        return [
            _kdn("Time")        => $this->getElapsedTime() . ' ms',
            _kdn("Memory Used") => $this->getMemoryUsage() . ' MB',
        ];
    }

}