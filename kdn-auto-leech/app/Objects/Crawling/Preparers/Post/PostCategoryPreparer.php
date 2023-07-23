<?php

namespace KDNAutoLeech\Objects\Crawling\Preparers\Post;


use KDNAutoLeech\Objects\Crawling\Preparers\Post\Base\AbstractPostBotPreparer;
use KDNAutoLeech\Utils;

class PostCategoryPreparer extends AbstractPostBotPreparer {

    /** @var bool */
    private $childPost;

    /**
     * Prepare the post bot
     *
     * @return void
     */
    public function prepare() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        $this->childPost = $this->bot->getPostData()->getChildPost();

        $postCategories = $this->getPreparedCategories();
        if (!$postCategories) return;

        $this->getBot()->getPostData()->setCategoryNames($postCategories);
    }

    /**
     * Finds the categories using the defined options and returns a prepared category array.
     *
     * @return array Each inner item that is an array stores a hierarchy. Non-array items is a main category with no children.
     */
    private function getPreparedCategories() {

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            // Get the categories.
            $categories = $this->getValuesForSelectorSetting('_child_post_category_name_selectors', 'text', false, false, true);
        } else {
            // Get the categories.
            $categories = $this->getValuesForSelectorSetting('_post_category_name_selectors', 'text', false, false, true);
        }
        if (!$categories) return null;

        /**
        * =======================================================
        */

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            // If the user wants the first match, leave only the first match's results.
            $addAll = $this->bot->getSettingForCheckbox('_child_post_category_add_all_found_category_names');
        } else {
            // If the user wants the first match, leave only the first match's results.
            $addAll = $this->bot->getSettingForCheckbox('_post_category_add_all_found_category_names');
        }
        if (!$addAll && sizeof($categories) > 1) $categories = [$categories[0]];

        /**
        * =======================================================
        */

        /**
        * If we are crawling a child post.
        *
        * @since 2.1.8
        */
        if ($this->childPost) {
            // Get the options
            $addAsSubcats   = $this->bot->getSettingForCheckbox('_child_post_category_add_hierarchical');
            $separators     = $this->bot->getSetting('_child_post_category_name_separators', []);
        } else {
            // Get the options
            $addAsSubcats   = $this->bot->getSettingForCheckbox('_post_category_add_hierarchical');
            $separators     = $this->bot->getSetting('_post_category_name_separators', []);
        }

        $postCategories = [];
        foreach($categories as $catArr) {
            // If the category is empty, continue with the next one.
            if (!$catArr) continue;

            // Separate the values using the separators
            $catArr = Utils::getSeparated($catArr, $separators);

            // Add the categories to the post categories
            if ($addAsSubcats) {
                // If they should be added as hierarchical, add them as a single item.
                $postCategories[] = $catArr;
            } else {
                // Otherwise, add them as different items.
                $postCategories = array_merge($postCategories, array_flatten($catArr));
            }
        }

        return $postCategories;
    }
}