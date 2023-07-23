<?php

namespace KDNAutoLeech\Test\Tests;


use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Bot\PostBot;
use KDNAutoLeech\Objects\Traits\FindAndReplaceTrait;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class FindReplaceInRawHtmlTest extends AbstractTest {

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
        // Here, form item values must be an array.
        $formItemValues = $data->getFormItemValues();
        if(!$formItemValues || !is_array($formItemValues)) return null;

        $url        = $data->get("url");
        $content    = $data->get("subject");
        $find       = Utils::array_get($formItemValues, "find");
        $replace    = Utils::array_get($formItemValues, "replace");
        $regex      = isset($formItemValues["regex"]);
        $callback   = isset($formItemValues["callback"]);
        $spin       = isset($formItemValues["spin"]);

        // Custom method
        $method         = 'GET';
        $parseArray     = '';

        if ($data->get("inAjax")) {
            $method     = $data->get("customMethod") ?: $method;
            $parseArray = $data->get("parseArray") ?: $parseArray;
        } else {
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

        // Create the message
        $message = sprintf(_kdn('Test result for find %1$s and replace with %2$s'),
            "<span class='highlight find'>" . htmlspecialchars($find) . "</span>",
            "<span class='highlight replace'>" . htmlspecialchars($replace) . "</span>");
        if($regex)      $message .= " " . _kdn("(Regex)");
        if($callback)   $message .= " " . _kdn("(Callback)");
        if($spin)       $message .= " " . _kdn("(Spinner)");
        $message .= ':';
        if($url) $message .= "<span class='highlight url'>{$url}</span>" . ($content ? ' & ' : '');
        if($content) $message .= '"' . (mb_strlen($content) > 50 ? mb_substr($content, 0, 49) . '...' : $content) . '"';

        /*
         *
         */

        $bot = new PostBot($data->getPostSettings(), null, $data->getUseUtf8(), $data->getConvertEncodingToUtf8());
        $bot->setResponseCacheEnabled($data->isCacheTestUrlResponses());

        /*
         *
         */

        // Prepare the $subPrefix
        $subPrefix      = Utils::array_get($formItemValues, "ajax") ? 'ajax_' : null;
        $urlOriginal    = $data->get("urlOriginal") ?: '';

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
                    $header['value'] = preg_replace('/%%target_url%%/i', $urlOriginal, $header['value']);
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

            if (isset($urlOriginal) && $urlOriginal) {

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
                            $eachMethod["matches"] = preg_replace('/%%target_url%%/i', preg_quote($urlOriginal, '/'), $eachMethod["matches"]);
                            $matches = !starts_with($eachMethod["matches"], '/') ? '/' . $eachMethod["matches"] . '/' : $eachMethod["matches"];
                        } else {
                            $eachMethod["matches"] = preg_replace('/%%target_url%%/i', $urlOriginal, $eachMethod["matches"]);
                            $matches = '/' . preg_quote($eachMethod["matches"], '/') . '/';
                        }

                        if(isset($eachMethod["negate"]) && $eachMethod["negate"] && !preg_match($matches, $urlOriginal)){
                            $parseArrayOriginal = $eachMethod["parse"] ?: $parseArrayOriginal;
                            $methodOriginal     = $eachMethod["method"] ?: $methodOriginal;
                            break 2;
                        } elseif (preg_match($matches, $urlOriginal)){
                            $parseArrayOriginal = $eachMethod["parse"] ?: $parseArrayOriginal;
                            $methodOriginal     = $eachMethod["method"] ?: $methodOriginal;
                            break 2;
                        }
                    }
                }

                // Create a dummy crawler.
                $dumCrawler = $bot->request($urlOriginal, $methodOriginal, $data->getRawHtmlFindReplaces(true), $allHeaders, $parseArrayOriginal);

                // If the form item name contains 'unnecessary', it means the user is testing if the unnecessary element
                // selectors are working. So, in this case, do not remove unnecessary elements from the crawler so that the
                // user can see whether the selectors work or not.
                $dumLastStep = str_contains($data->getFormItemName(), 'unnecessary') ? AbstractTest::MANIPULATION_STEP_FIND_REPLACE_ELEMENT_HTML : null;
                $this->applyHtmlManipulationOptions($dumCrawler, $dumLastStep, $urlOriginal, true);
            }

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
                        if (empty($selectorData['header']) || !$urlOriginal) continue;
                        $headerValue = $bot->extractValuesWithSelectorData($dumCrawler, $selectorData, "text", false, true, true);
                        $allHeaders[$selectorData['header']] = $headerValue;
                    }
                }
            }
        }

        /*
         *
         */

        $results = [];
        $addResults = function($title, $content, $crawlerBefore, $crawlerAfter, $crawlerWithAllChangesApplied) use (&$results) {
            $results[$title] = [
                _kdn('Crawler HTML with <span>current</span> find-replace applied') => Utils::getNodeHTML($crawlerAfter),
                _kdn('<span>Raw</span> content') => $content,
                _kdn('Crawler HTML with <span>no</span> find-replace applied') => Utils::getNodeHTML($crawlerBefore),
                _kdn('Crawler HTML with <span>all</span> raw HTML find-replaces applied') => Utils::getNodeHTML($crawlerWithAllChangesApplied),
            ];
        };

        /*
         *
         */

        // Handle the URL response
        if ($url) {
            $this->url = $url;

            // Try to get the crawler before making any changes to the raw response
            $crawlerBefore = $bot->request($url, $method, null, $allHeaders, $parseArray);
            $this->isFromCache = $bot->isLatestResponseFromCache();

            // Get the response content
            $responseContent = $bot->getLatestResponseContent();

            // Find and replace in the response content
            $modifiedResponseContent = $this->findAndReplaceSingle($find, $replace, $responseContent, $regex, true, $url, $callback, $spin);

            // Try to create the crawler with the modified response content
            try {
                $crawlerAfter = new Crawler($modifiedResponseContent);
            } catch(\Exception $e) {
                $crawlerAfter = null;
            }

            // Try to create a crawler by applying all find-replace options for raw HTML
            $responseContentWithAllChangesApplied = $this->findAndReplace($data->getRawHtmlFindReplaces(), $responseContent, true, $url);
            try {
                $crawlerWithAllChangesApplied = new Crawler($responseContentWithAllChangesApplied);
            } catch(\Exception $e) {
                $crawlerWithAllChangesApplied = null;
            }

            call_user_func($addResults, _kdn('For the URL'), $responseContent, $crawlerBefore, $crawlerAfter, $crawlerWithAllChangesApplied);
        }

        // Handle the content
        if ($content) {
            // Get if the content contains HTML tag
            $containsHtmlTag = strpos($content, '<html') !== false;

            try {
                // If the content has HTML tag in it, try to create a crawler directly
                // Otherwise, create a crawler by adding necessary HTML tags
                $crawlerBefore = $containsHtmlTag ? new Crawler($content) : $bot->createDummyCrawler($content);
            } catch(\Exception $e) {
                $crawlerBefore = null;
            }

            // Apply current find-replace options
            $modifiedContent = $this->findAndReplaceSingle($find, $replace, $content, $regex, true, $url, $callback, $spin);

            // Try to create the crawler with the modified content
            try {
                $crawlerAfter = $containsHtmlTag ? new Crawler($modifiedContent) : $bot->createDummyCrawler($modifiedContent);
            } catch(\Exception $e) {
                $crawlerAfter = null;
            }

            // Try to create a crawler by applying all find-replace options for raw HTML
            $contentWithAllChangesApplied = $this->findAndReplace($data->getRawHtmlFindReplaces(), $content, true, $url);
            try {
                $crawlerWithAllChangesApplied = $containsHtmlTag ? new Crawler($contentWithAllChangesApplied) : $bot->createDummyCrawler($contentWithAllChangesApplied);
            } catch(\Exception $e) {
                $crawlerWithAllChangesApplied = null;
            }

            call_user_func($addResults, _kdn('For the test code'), $content, $crawlerBefore, $crawlerAfter, $crawlerWithAllChangesApplied);
        }

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
        return Utils::view('partials.test-result-find-replace-raw-html')
            ->with('results', $this->getResults())
            ->with('message', $this->message)
            ->with("isResponseFromCache", $this->isFromCache)
            ->with("testUrl", $this->url);
    }
}