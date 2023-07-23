<?php

namespace KDNAutoLeech\PostDetail\Base;


use KDNAutoLeech\Exceptions\DuplicatePostException;
use KDNAutoLeech\PostDetail\PostSaverData;
use KDNAutoLeech\Utils;

abstract class BasePostDetailSaver {

    /** @var PostSaverData */
    private $saverData;

    /** @var BasePostDetailData */
    private $detailData;

    /**
     * @param PostSaverData      $saverData
     * @param BasePostDetailData $detailData
     */
    public function __construct(PostSaverData $saverData, BasePostDetailData $detailData) {
        $this->saverData = $saverData;
        $this->detailData = $detailData;
    }

    /**
     * Save the post details to the database.
     */
    abstract protected function onSave();

    /**
     * Saves the details using the configured settings
     *
     * @param BasePostDetailDuplicateChecker $duplicateChecker
     * @param array                          $duplicateCheckOptions
     * @throws DuplicatePostException
     */
    public function save($duplicateChecker, $duplicateCheckOptions) {
        // Check for duplicate before saving.
        $this->maybeCheckForDuplicate($duplicateChecker, $duplicateCheckOptions);

        // Save the post
        $this->onSave();
    }

    /**
     * @return PostSaverData
     */
    public function getSaverData() {
        return $this->saverData;
    }

    /**
     * @return BasePostDetailData
     */
    public function getDetailData() {
        return $this->detailData;
    }

    /**
     * @param BasePostDetailDuplicateChecker $duplicateChecker
     * @param array                          $duplicateCheckOptions
     * @since 1.8.0
     * @throws DuplicatePostException If the post is duplicate.
     */
    private function maybeCheckForDuplicate($duplicateChecker, $duplicateCheckOptions) {
        if(!$duplicateChecker || !$duplicateCheckOptions) return;

        // Do not make the check if this is not the first page.
        // Do not make the check when recrawling.
        if ($this->getSaverData() 
            && (!$this->getSaverData()->getPostSaver()->isFirstPage() || $this->getSaverData()->isRecrawl()) 
            && !$this->getSaverData()->getPostData()->getChildPost()) 
            return;

        // Get the options
        $options = $duplicateChecker->getOptions();
        if (!$options) return;

        // Get the values to be used for duplicate checking from the duplicate checker of this factory
        $values = Utils::array_get($options, "values");
        if (!$values) return;

        // Check if the values selected by the user contains a duplicate-check option defined by this factory.
        $keys = array_keys($values);
        $check = false;
        foreach($keys as $k) {
            if(isset($duplicateCheckOptions[$k])) {
                $check = true;
                break;
            }
        }

        // If this does not concern the current factory, stop.
        if (!$check) return;

        // Make the check
        $id = $duplicateChecker->checkForDuplicate($this->getSaverData(), $duplicateCheckOptions);

        // Stop if there is a duplicate post.
        if ($id) {

            // When duplicate post is found from a child post
            if ($this->getSaverData()->getPostData()->getChildPost()) {
                $this->getSaverData()->getPostSaver()->setChildPostDuplicate($id);
            }

            throw new DuplicatePostException(
                sprintf(
                    _kdn('The post has been found to be a duplicate by %1$s.'),
                    get_class()
                ),
                $id
            );
        }
    }

}