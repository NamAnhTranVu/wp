<?php

namespace KDNAutoLeech\Test\General;


use KDNAutoLeech\Objects\Crawling\Bot\CategoryBot;
use KDNAutoLeech\Objects\Crawling\Data\CategoryData;
use KDNAutoLeech\Test\Base\AbstractGeneralTest;
use KDNAutoLeech\Test\Data\GeneralTestData;
use KDNAutoLeech\Utils;

class GeneralCategoryTest extends AbstractGeneralTest {

    /** @var CategoryData */
    private $categoryData;
    private $template;

    /**
     * Conduct the test and return an array of results.
     *
     * @param GeneralTestData $data
     */
    protected function createResults($data) {
        $categoryData = new CategoryData();
        $template = false;

        if(!empty($data->getTestUrl())) {
            $bot = new CategoryBot($data->getSettings(), $data->getSiteId());

            if($categoryData = $bot->collectUrls(Utils::prepareUrl($bot->getSiteUrl(), $data->getTestUrl()))) {
                $template = Utils::view('site-tester/category-test')->with([
                    'nextPageUrl'   =>  $categoryData->getNextPageUrl(),
                    'urls'          =>  $categoryData->getPostUrls()
                ])->render();
            }
        }

        $this->categoryData = $categoryData;
        $this->template = $template;

        $this->addNextPageUrlInfo($this->categoryData);
    }

    /**
     * Create a view from the results found in {@link createResults} method.
     *
     * @return \Illuminate\Contracts\View\View|null
     */
    protected function createView() {
        return Utils::view('site-tester/test-results')->with([
            'info'      =>  $this->getInfo(),
            'data'      =>  (array) $this->categoryData,
            'template'  =>  $this->template
        ]);
    }

}