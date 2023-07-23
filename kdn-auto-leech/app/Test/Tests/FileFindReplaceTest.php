<?php

namespace KDNAutoLeech\Test\Tests;


use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\Objects\Traits\FindAndReplaceTrait;
use KDNAutoLeech\Test\Base\AbstractFileTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class FileFindReplaceTest extends AbstractFileTest {

    use FindAndReplaceTrait;

    /** @var string */
    private $message;

    /**
     * @param TestData    $data Information required for the test
     * @param MediaFile[] $mediaFiles
     * @return array|string|mixed
     * @since 1.8.0
     */
    protected function createFileTestResults($data, $mediaFiles) {
        // Get find-replace options
        $formItemValues = $data->getFormItemValues();
        $find       = Utils::array_get($formItemValues, "find");
        $replace    = Utils::array_get($formItemValues, "replace");
        $regex      = isset($formItemValues["regex"]);
        $callback   = isset($formItemValues["callback"]);
        $spin       = isset($formItemValues["spin"]);

        $results = [];

        // Rename each file using find-replace options
        foreach($mediaFiles as $mediaFile) {
            $name = $mediaFile->getName();
            $newName = $this->findAndReplaceSingle($find, $replace, $name, $regex, true, $data->getData()['url'], $callback, $spin);

            $mediaFile->rename($newName);

            // Add the local temporary file's URL as the result
            $results[] = $mediaFile->getLocalUrl();
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