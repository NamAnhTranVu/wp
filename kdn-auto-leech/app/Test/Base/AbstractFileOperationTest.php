<?php

namespace KDNAutoLeech\Test\Base;


use KDNAutoLeech\Objects\File\FileService;
use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\Objects\OptionsBox\Boxes\File\FileOptionsBoxApplier;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

abstract class AbstractFileOperationTest extends AbstractFileTest {

    /** @var string */
    private $message;

    /**
     * @param MediaFile $mediaFile
     * @param string $path
     * @return mixed Result of operation that will be sent as a result of the test.
     * @since 1.8.0
     */
    abstract protected function doOperation($mediaFile, $path);

    /**
     * @param string $path Target path
     * @return string Test result message
     * @since 1.8.0
     */
    abstract protected function createMessage($path);

    /**
     * @param TestData    $data Information required for the test
     * @param MediaFile[] $mediaFiles
     * @return array|string|mixed
     * @since 1.8.0
     */
    protected function createFileTestResults($data, $mediaFiles) {
        $path = Utils::array_get($data->getFormItemValues(), "path");
        if (!$path) return [];

        // Get new directory path by making sure it does not go above the uploads directory.
        $path = FileService::getInstance()->getPathUnderUploadsDir($path);
        if (!$path) return [];

        $results = [];

        // If the data comes from the options box, we cannot apply all options box settings. So, let's apply some
        // of them.
        if ($data->isFromOptionsBox()) {
            $data->applyOptionsBoxSettingsToTestData(function($applier) {
                /** @var FileOptionsBoxApplier $applier */

                // Tell the applier we are running from within an options box so that it returns MediaFile instances.
                $applier->setFromOptionsBox(true);

                // Do not apply file operations options, since they are applied after template operations. The user
                // wants to see the template results.
                $applier->setApplyFileOperationsOptions(false);
            });
        }

        foreach($data->getTestData() as $mediaFile) {
            if (!is_a($mediaFile, MediaFile::class)) continue;
            /** @var MediaFile $mediaFile */

            // Do the operation
            $results[] = $this->doOperation($mediaFile, $path);
        }

        $this->message = $this->createMessage($path) . ':';

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