<?php

namespace KDNAutoLeech\Test\Tests;


use KDNAutoLeech\Objects\Crawling\Bot\DummyBot;
use KDNAutoLeech\Objects\Traits\FindAndReplaceTrait;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class SourceCodeTest extends AbstractTest {

    use FindAndReplaceTrait;

    protected $responseResultsKey = 'html';

    /**
     * Conduct the test and return an array of results.
     *
     * @param TestData $data Information required for the test
     * @return array|string|mixed
     */
    protected function createResults($data) {
        $url                        = $data->get("url");
        $applyManipulationOptions   = $data->get("applyManipulationOptions");
        $removeScripts              = $data->get("removeScripts");
        $removeStyles               = $data->get("removeStyles");

        if(!$url) return null;

        $bot = new DummyBot($data->getPostSettings(), null, $data->getUseUtf8(), $data->getConvertEncodingToUtf8());

        // Custom method
        $method         = 'GET';
        $parseArray     = '';

        if ($data->get("inAjax") || $data->get("inDevTool")) {
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

        /*
         *
         */

        // Prepare the $subPrefix
        $subPrefix      = $data->get("inAjax") ? 'ajax_' : null;
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

                        if (isset($eachMethod["negate"]) && $eachMethod["negate"] && !preg_match($matches, $urlOriginal)) {
                            $parseArrayOriginal = $eachMethod["parse"] ?: $parseArrayOriginal;
                            $methodOriginal     = $eachMethod["method"] ?: $methodOriginal;
                            break 2;
                        } elseif (preg_match($matches, $urlOriginal)) {
                            $parseArrayOriginal = $eachMethod["parse"] ?: $parseArrayOriginal;
                            $methodOriginal     = $eachMethod["method"] ?: $methodOriginal;
                            break 2;
                        }
                    }
                }

                // Create a dummy crawler.
                $dumCrawler = $bot->request($urlOriginal, $methodOriginal, $data->getRawHtmlFindReplaces(true), $allHeaders, $parseArrayOriginal);
                $this->applyHtmlManipulationOptions($dumCrawler, null, $urlOriginal, true);
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

        // Get the data
        $crawler = $bot->request($url, $method, $applyManipulationOptions ? $data->getRawHtmlFindReplaces() : null, $allHeaders, $parseArray);

        if(!$crawler) return null;

        if($removeScripts) {
            $bot->removeElementsFromCrawler($crawler, "script");
            $bot->removeElementAttributes($crawler, "[onclick]", "onclick");
        }
        if($removeStyles) $bot->removeElementsFromCrawler($crawler, ["style", "[rel=stylesheet]"]);

        // Apply manipulation options
        if ($applyManipulationOptions) {
            $this->applyHtmlManipulationOptions($crawler, null, $url, false, $subPrefix);
        }

        // Get the HTML to be manipulated
        $html = Utils::getNodeHTML($crawler);

        // Remove empty attributes. This is important for CSS selector finder script. It fails when there is an attribute
        // whose attribute consists of only spaces.
        $html = $this->findAndReplaceSingle(
            '<.*?[a-zA-Z-]+=["\']\s+["\'].*?>',
            '',
            $html,
            true
        );

        $parts = parse_url($url);
        $base = (isset($parts['scheme']) && $parts['scheme'] ? $parts['scheme'] : 'http') . '://' . $parts['host'];

        // Set the base URL like this. By this way, relative URLs will be handled correctly.
//        <head><base href='http://base-url.net/' /></head>
        $html = $this->findAndReplaceSingle(
            '(<head>|<head\s[^>]+>)',
            '$1 <base href="' . $base . '">',
            $html,
            true
        );

        $returnMethod   = '<!--Method:' .$method. '-->';
        $returnParse    = '<!--Parse:' .$parseArray. '-->';

        return $returnMethod . $returnParse . $html;
    }

    /**
     * Create the view of the response
     *
     * @return \Illuminate\Contracts\View\View|null
     */
    protected function createView() {
        return null;
    }
}