<?php

namespace KDNAutoLeech\Test\Tests;


use KDNAutoLeech\Objects\File\FileService;
use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\Test\Base\AbstractFileOperationTest;

class FileCopyTest extends AbstractFileOperationTest {

    /**
     * @param MediaFile $mediaFile
     * @param string    $path
     * @return mixed Result of operation that will be sent as a result of the test.
     * @since 1.8.0
     */
    protected function doOperation($mediaFile, $path) {
        // Copy the file to the target path
        $copyPath = $mediaFile->copyToDirectory($path);

        // If copy operation was not successful, return an empty string.
        if($copyPath === false) return '';

        // Get the URL of the copy file
        $url = FileService::getInstance()->getUrlForPathUnderUploadsDir($copyPath);
        return $url ? $url : '';
    }

    /**
     * @param string $path Target path
     * @return string Test result message
     * @since 1.8.0
     */
    protected function createMessage($path) {
        return sprintf(
            _kdn('Test result for copying files to %1$s directory'),
            "<span class='highlight directory'>" . htmlspecialchars($path) . "</span>"
        );
    }
}