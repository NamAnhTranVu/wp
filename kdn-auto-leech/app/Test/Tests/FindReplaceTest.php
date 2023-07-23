<?php

namespace KDNAutoLeech\Test\Tests;


use KDNAutoLeech\Objects\Traits\FindAndReplaceTrait;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class FindReplaceTest extends AbstractTest {

    use FindAndReplaceTrait;

    private $message;

    /**
     * Apply find-replace to a subject.
     *
     * @param string $find    What to find
     * @param string $replace With what to replace
     * @param string $subject In what to find-replace
     * @param bool   $regex   True if $find is a regular expression.
     * @return string Modified result
     * @since 1.8.0
     */
    protected function applyFindReplace($find, $replace, $subject, $regex, $url, $callback, $spin) {
        return $this->findAndReplaceSingle($find, $replace, $subject, $regex, true, $url, $callback, $spin);
    }

    /**
     * Conduct the test and return an array of results.
     *
     * @param TestData $data Information required for the test
     * @return array
     */
    protected function createResults($data) {
        // Here, form item values must be an array.
        $formItemValues = $data->getFormItemValues();
        if(!$formItemValues || !is_array($formItemValues)) return null;

        $url        = $data->get("url");
        $subject    = $data->get("subject");
        $find       = Utils::array_get($formItemValues, "find");
        $replace    = Utils::array_get($formItemValues, "replace");
        $regex      = isset($formItemValues["regex"]);
        $callback   = isset($formItemValues["callback"]);
        $spin       = isset($formItemValues["spin"]);

        $results = [];

        // Make the replacement for the subject.
        if ($subject !== null) {
            $results[] = $this->applyFindReplace($find, $replace, $subject, $regex, $url, $callback, $spin);
        }

        // If there are other test data, make the replacements for them as well.
        if ($data->getTestData()) {
            foreach($data->getTestData() as $val) {
                $results[] = $this->applyFindReplace($find, $replace, $val, $regex, $url, $callback, $spin);
            }
        }

        $message = sprintf(
            _kdn('Test result for find %1$s and replace with %2$s'),
            "<span class='highlight find'>" . htmlspecialchars($find) . "</span>",
            "<span class='highlight replace'>" . htmlspecialchars($replace) . "</span>"
        );

        if($regex)      $message .= " " . _kdn("(Regex)");
        if($callback)   $message .= " " . _kdn("(Callback)");
        if($spin)       $message .= " " . _kdn("(Spinner)");

        $message .= ':';

        $this->message = $message;

        return $results;
    }

    /**
     * Create the view of the response
     *
     * @return \Illuminate\Contracts\View\View|null
     * @throws \Exception
     */
    protected function createView() {
        return Utils::view('partials/test-result')
            ->with("results", $this->getResults())
            ->with("message", $this->message);
    }
}