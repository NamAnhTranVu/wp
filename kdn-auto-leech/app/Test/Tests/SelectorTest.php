<?php

namespace KDNAutoLeech\Test\Tests;


use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Bot\PostBot;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Test\Test;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class SelectorTest extends AbstractTest {

    private $maxTestItem = 1000000;

    private $message;

    private $isFromCache = false;
    private $url = null;

    /**
     * Conduct the test and return an array of results.
     *
     * @param TestData $data Information required for the test
     * @return array|string|mixed
     */
    protected function createResults($data) {
        // Here, form item values must exist.
        if(!$data->getFormItemValues()) return [];

        $formItemValues = $data->getFormItemValues();

        // If form item values is not an array, it means it is a string and that string is actually the selector.
        // So, prepare it that way.
        if(!is_array($data->getFormItemValues())) {
            $formItemValues = ["selector" => $data->getFormItemValues()];
        }

        $attr = Utils::array_get($formItemValues, "attr");
        if(!$attr) $attr = $data->get("attr");

        // Get JSON Prase
        $isJSON = Utils::array_get($formItemValues, "json");
        if(!$isJSON) $isJSON = $data->get("json");

        /*
         *
         */

        $selector   = Utils::array_get($formItemValues, "selector");
        $testType   = $data->getTestType();
        $content    = $data->get("content");

        /**
         * CUSTOM METHOD
         */
        $subPrefix      = null;
        $url            = null;
        $method         = 'GET';
        $parseArray     = '';

        if (Utils::array_get($formItemValues, "ajax") || $data->get("inAjax")) {
            $subPrefix  = 'ajax_';
            if ($data->get("ajaxActive")) $url = $data->get("urlAjax") ?: $data->get("url");
            $method     = $data->get("customMethod") ?: $method;
            $parseArray = $data->get("parseArray") ?: $parseArray;
        } else {
            $url            = $data->get("url");
            $customMethod   = rawurldecode($data->get("customMethod"));
            $customMethod   = str_replace('+', '%%plus%%', $customMethod);
            parse_str($customMethod, $customMethod);
            $customMethod   = json_encode($customMethod);
            $customMethod   = str_replace('%%plus%%', '+', $customMethod);
            $customMethod   = json_decode($customMethod, true);

            foreach ($customMethod as $methods) {
                foreach ($methods as $eachMethod) {
                    // Prepare the $matches
                    if (isset($eachMethod["regex"]) && $eachMethod["regex"]) {
                        $eachMethod["matches"] = preg_replace('/%%target_url%%/i', preg_quote($url, '/'), $eachMethod["matches"]);
                        $matches = !starts_with($eachMethod["matches"], '/') ? '/' . $eachMethod["matches"] . '/' : $eachMethod["matches"];
                    } else {
                        $eachMethod["matches"] = preg_replace('/%%target_url%%/i', $url, $eachMethod["matches"]);
                        $matches = '/' . preg_quote($eachMethod["matches"], '/') . '/';
                    }

                    if (isset($eachMethod["negate"]) && $eachMethod["negate"] && !preg_match($matches, $url)) {
                        $parseArray = $eachMethod["parse"] ?: $parseArray;
                        $method     = $eachMethod["method"] ?: $method;
                        break 2;
                    } elseif (preg_match($matches, $url)) {
                        $parseArray = $eachMethod["parse"] ?: $parseArray;
                        $method     = $eachMethod["method"] ?: $method;
                        break 2;
                    }
                }
            }
        }

        /*
         *
         */

        // Create a dummy bot to get the client.
        $bot = new PostBot($data->getPostSettings(), null, $data->getUseUtf8(), $data->getConvertEncodingToUtf8());
        $bot->setResponseCacheEnabled($data->isCacheTestUrlResponses());

        /*
         *
         */

        // Get custom headers
        $allHeaders     = [];
        $customHeaders  = rawurldecode($data->get("customHeaders"));
        $customHeaders  = str_replace('+', '%%plus%%', $customHeaders);
        parse_str($customHeaders, $customHeaders);
        $customHeaders  = json_encode($customHeaders);
        $customHeaders  = str_replace('%%plus%%', '+', $customHeaders);
        $customHeaders  = json_decode($customHeaders, true);

        if (!empty($customHeaders) && is_array($customHeaders)) {
            foreach ($customHeaders as $customHeader) {
                foreach ($customHeader as $header) {
                    $header['value'] = preg_replace('/%%target_url%%/i', $data->get("url"), $header['value']);
                    if (isset($header['key']) && $header['key']) $allHeaders[$header['key']] = $header['value'];
                }
            }
        }

        // Get custom ajax headers
        $customAjaxHeaders   = rawurldecode($data->get("customAjaxHeaders"));
        $customAjaxHeaders   = str_replace('+', '%%plus%%', $customAjaxHeaders);
        parse_str($customAjaxHeaders, $customAjaxHeaders);
        $customAjaxHeaders   = json_encode($customAjaxHeaders);
        $customAjaxHeaders   = str_replace('%%plus%%', '+', $customAjaxHeaders);
        $customAjaxHeaders   = json_decode($customAjaxHeaders, true);

        if (!empty($customAjaxHeaders) && is_array($customAjaxHeaders)) {

            // Get original method
            $customMethodOriginal   = rawurldecode($data->get("customMethodOriginal"));
            $customMethodOriginal   = str_replace('+', '%%plus%%', $customMethodOriginal);
            parse_str($customMethodOriginal, $customMethodOriginal);
            $customMethodOriginal   = json_encode($customMethodOriginal);
            $customMethodOriginal   = str_replace('%%plus%%', '+', $customMethodOriginal);
            $customMethodOriginal   = json_decode($customMethodOriginal, true);
            
            $parseArrayOriginal     = '';
            $methodOriginal         = 'GET';

            foreach ($customMethodOriginal as $methodsOriginal) {
                foreach ($methodsOriginal as $eachMethod) {
                    // Prepare the $matches
                    if (isset($eachMethod["regex"]) && $eachMethod["regex"]) {
                        $eachMethod["matches"] = preg_replace('/%%target_url%%/i', preg_quote($data->get("url"), '/'), $eachMethod["matches"]);
                        $matches = !starts_with($eachMethod["matches"], '/') ? '/' . $eachMethod["matches"] . '/' : $eachMethod["matches"];
                    } else {
                        $eachMethod["matches"] = preg_replace('/%%target_url%%/i', $data->get("url"), $eachMethod["matches"]);
                        $matches = '/' . preg_quote($eachMethod["matches"], '/') . '/';
                    }

                    if (isset($eachMethod["negate"]) && $eachMethod["negate"] && !preg_match($matches, $data->get("url"))) {
                        $parseArrayOriginal = $eachMethod["parse"] ?: $parseArrayOriginal;
                        $methodOriginal     = $eachMethod["method"] ?: $methodOriginal;
                        break 2;
                    } elseif (preg_match($matches, $data->get("url"))) {
                        $parseArrayOriginal = $eachMethod["parse"] ?: $parseArrayOriginal;
                        $methodOriginal     = $eachMethod["method"] ?: $methodOriginal;
                        break 2;
                    }
                }
            }

            // Create a dummy crawler.
            $dumCrawler = $bot->request($data->get("url"), $methodOriginal, $data->getRawHtmlFindReplaces(true), $allHeaders, $parseArrayOriginal);

            // If the form item name contains 'unnecessary', it means the user is testing if the unnecessary element
            // selectors are working. So, in this case, do not remove unnecessary elements from the crawler so that the
            // user can see whether the selectors work or not.
            $dumLastStep = str_contains($data->getFormItemName(), 'unnecessary') ? AbstractTest::MANIPULATION_STEP_FIND_REPLACE_ELEMENT_HTML : null;
            $this->applyHtmlManipulationOptions($dumCrawler, $dumLastStep, $data->get("url"), true);

            // Reset all headers
            $allHeaders = [];
            
            // Extract data and get all ajax headers
            foreach ($customAjaxHeaders as $customAjaxHeader) {
                foreach ($customAjaxHeader as $selectorData) {
                    // If custom headers
                    if (isset($selectorData['key']) && $selectorData['key']) {
                        $selectorData['value'] = preg_replace('/%%target_url%%/i', $url, $selectorData['value']);
                        $allHeaders[$selectorData['key']] = $selectorData['value'];
                    // If custom headers selectors
                    } else {
                        if (empty($selectorData['header'])) continue;
                        $headerValue = $bot->extractValuesWithSelectorData($dumCrawler, $selectorData, "text", false, true, true);
                        $allHeaders[$selectorData['header']] = $headerValue;
                    }
                }
            }
        }

        /*
         *
         */

        // If test from URL
        if(!$content) {
            if (!$url) return;
            $crawler = $bot->request($url, $method, $data->getRawHtmlFindReplaces(), $allHeaders, $parseArray);
            $this->isFromCache = $bot->isLatestResponseFromCache();

            // If the form item name contains 'unnecessary', it means the user is testing if the unnecessary element
            // selectors are working. So, in this case, do not remove unnecessary elements from the crawler so that the
            // user can see whether the selectors work or not.
            $lastStep = str_contains($data->getFormItemName(), 'unnecessary') ? AbstractTest::MANIPULATION_STEP_FIND_REPLACE_ELEMENT_HTML : null;
            $this->applyHtmlManipulationOptions($crawler, $lastStep, $url, false, $subPrefix);
        } else {
            $crawler = new Crawler($content);
        }

        if(!$testType) $testType = Test::$TEST_TYPE_HTML;

        $results = [];

        if ($crawler && $selector) {
            $abort = false;
            try {
                $crawler->filter($selector)->each(function ($node, $i) use ($testType, $attr, &$results, $crawler, &$abort) {
                    if ($abort) return;

                    /** @var Crawler $node */
                    if ($i >= $this->maxTestItem) return;

                    $result = false;
                    try {
                        switch ($testType) {
                            case Test::$TEST_TYPE_HREF:
                                $result = $node->attr("href");
                                break;

                            case Test::$TEST_TYPE_HTML:
                                $result = Utils::getNodeHTML($node);
                                break;

                            case Test::$TEST_TYPE_TEXT:
                                $result = $node->text();
                                break;

                            case Test::$TEST_TYPE_SRC:
                                $result = $node->attr("src");
                                break;

                            case Test::$TEST_TYPE_FIRST_POSITION:
                                $nodeHtml = Utils::getNodeHTML($node);
                                $result = $nodeHtml ? mb_strpos($crawler->html(), $nodeHtml) : false;
                                break;

                            case Test::$TEST_TYPE_SELECTOR_ATTRIBUTE:
                                if ($attr) {
                                    switch ($attr) {
                                        case "text":
                                            $result = $node->text();
                                            break;
                                        case "html":
                                            $result = Utils::getNodeHTML($node);
                                            break;
                                        default:
                                            $result = $node->attr($attr);
                                            break;
                                    }
                                }
                                break;
                        }

                    } catch (\InvalidArgumentException $e) {
                        Informer::addError($e->getMessage())->setException($e)->addAsLog();
                    }

                    if ($result) {
                        if ($testType == Test::$TEST_TYPE_FIRST_POSITION) {
                            $results[] = Utils::getNodeHTML($node); // Add html of the node for a meaningful result
                            $results[] = $result;
                            $abort = true;
                        } else if ($result = trim($result)) {
                            $results[] = $result;
                        }
                    }

                });

            } catch (\Exception $e) {
                Informer::addError($selector . " - " . $e->getMessage())->setException($e)->addAsLog();
            }
        }

        // Whether to allow json prase in result view or not
        if ($isJSON) $results['json'] = true;

        $this->message = sprintf(
            _kdn('Test results for %1$s%2$s on %3$s:'),
            "<span class='highlight selector'>" . $selector . "</span>",
            $attr   ? " <span class='highlight attribute'>" . $attr . "</span> "    : '',
            $url    ? "<span class='highlight url'>" . $url . "</span>"             : ''
        );

        $this->url = $url;

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
            ->with("message", $this->message)
            ->with("isResponseFromCache", $this->isFromCache)
            ->with("testUrl", $this->url);
    }
}