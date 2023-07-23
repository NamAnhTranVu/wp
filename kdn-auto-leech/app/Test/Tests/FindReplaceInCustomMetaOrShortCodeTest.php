<?php

namespace KDNAutoLeech\Test\Tests;


use KDNAutoLeech\Objects\Crawling\Bot\PostBot;
use KDNAutoLeech\Objects\OptionsBox\OptionsBoxService;
use KDNAutoLeech\Objects\Traits\FindAndReplaceTrait;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class FindReplaceInCustomMetaOrShortCodeTest extends AbstractTest {

    use FindAndReplaceTrait;

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
        if(!$data->getFormItemValues() || !is_array($data->getFormItemValues())) return null;

        $formItemValues = $this->getData()->getFormItemValues();
        $key                = Utils::array_get($formItemValues, 'meta_key', Utils::array_get($formItemValues, 'short_code'));
        $content            = $this->getData()->get("subject");
        $selector           = $this->getData()->get("valueSelector");
        $attr               = $this->getData()->get("valueSelectorAttr", $this->getData()->get("attr"));
        $find               = Utils::array_get($formItemValues, "find");
        $replace            = Utils::array_get($formItemValues, "replace");
        $regex              = isset($formItemValues["regex"]);
        $callback           = isset($formItemValues["callback"]);
        $spin               = isset($formItemValues["spin"]);
        $optionsBoxApplier  = OptionsBoxService::getInstance()->createApplierFromRawData($this->getData()->get("valueOptionsBoxData"));

        // Get ajax number
        $ajax               = $this->getData()->get("valueAjax") ?: null;

        /**
         * CUSTOM METHOD
         */

        $url            = null;
        $method         = 'GET';
        $parseArray     = '';

        if ($ajax) {
            $url        = $data->get("ajaxActive") ? $data->get("urlAjax") : $url;
            $method     = $data->get("customMethod") ?: $method;
            $parseArray = $data->get("parseArray") ?: $parseArray;
        } else {
            $url            = $data->get("url") ?: $url;
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

                    if(preg_match($matches, $url)){
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

        $results = [];

        // If there are a URL and a selector, get the content from that URL.
        if($url && $selector) {
            $this->url = $url;
            $bot = new PostBot($data->getPostSettings(), null, $data->getUseUtf8(), $data->getConvertEncodingToUtf8());
            $bot->setResponseCacheEnabled($data->isCacheTestUrlResponses());

            /*
             *
             */

            // Prepare the $subPrefix
            $subPrefix  = $ajax ? 'ajax_' : null;

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

            if($crawler = $bot->request($url, $method, $data->getRawHtmlFindReplaces(), $allHeaders, $parseArray)) {
                $this->isFromCache = $bot->isLatestResponseFromCache();

                // If the form item name contains 'unnecessary', it means the user is testing if the unnecessary element
                // selectors are working. So, in this case, do not remove unnecessary elements from the crawler so that the
                // user can see whether the selectors work or not.
                $lastStep = str_contains($data->getFormItemName(), 'unnecessary') ? AbstractTest::MANIPULATION_STEP_FIND_REPLACE_ELEMENT_HTML : null;
                $this->applyHtmlManipulationOptions($crawler, $lastStep, $url, false, $subPrefix);

                if($contents = $bot->extractData($crawler, [$selector], $attr ? $attr : 'text', null, false, true)) {
                    // Apply options box settings if there are any
                    if ($optionsBoxApplier) $contents = $optionsBoxApplier->applyToArray($contents, null, $url);

                    foreach($contents as $c) {
                        $results[] = $this->findAndReplaceSingle($find, $replace, $c, $regex, true, $url, $callback, $spin);
                    }
                }

            }
        }

        // If there is a content, use it as well.
        if($content) {
            // Apply options box settings if there are any
            if ($optionsBoxApplier) $content = $optionsBoxApplier->apply($content, $url);

            $results[] = $this->findAndReplaceSingle($find, $replace, $content, $regex, true, $url, $callback, $spin);
        }

        $this->message = sprintf(_kdn('Test results for %1$s %2$s %3$s %4$s %5$s %6$s %7$s'),
            sprintf('%1$s %2$s %3$s',
                $url && $selector   ? "<span class='highlight url'>" . $url . "</span>" : '',
                $url && $selector && $content ? _kdn("and") : '',
                $content ? _kdn("test code") : ''
            ),
            $key                ? "<span class='highlight key'>" . $key . "</span>"                             : '',
            $selector           ? "<span class='highlight selector'>" . $selector . "</span>"                   : '',
            $attr               ? "<span class='highlight attribute'>" . $attr . "</span>"                      : '',
            $find               ? "<span class='highlight find'>" . htmlspecialchars($find) . "</span>"         : '',
            $replace            ? "<span class='highlight replace'>" . htmlspecialchars($replace) . "</span>"   : '',
            $regex              ? _kdn("(Regex)") : ''
        );

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