<?php

namespace KDNAutoLeech\Test\Tests;


use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Bot\PostBot;
use KDNAutoLeech\Test\Base\AbstractHtmlManipulationTest;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class FindReplaceInElementHtmlTest extends AbstractHtmlManipulationTest {

    private $url;
    private $content;
    private $selector;
    private $find;
    private $replace;
    private $regex;
    private $callback;
    private $spin;

    private $headers;
    private $subPrefix;

    /**
     * Get the last HTML manipulation step. See {@link applyHtmlManipulationOptions}
     *
     * @return null|int
     */
    protected function getLastHtmlManipulationStep() {
        return AbstractTest::MANIPULATION_STEP_REMOVE_ELEMENT_ATTRIBUTES;
    }

    /**
     * Define instance variables.
     * @return void
     */
    protected function defineVariables() {
        $formItemValues = $this->getData()->getFormItemValues();

        $this->url      = $this->getData()->get("url");
        $this->content  = $this->getData()->get("subject");
        $this->selector = Utils::array_get($formItemValues, "selector");
        $this->find     = Utils::array_get($formItemValues, "find");
        $this->replace  = Utils::array_get($formItemValues, "replace");
        $this->regex    = isset($formItemValues["regex"]);
        $this->callback = isset($formItemValues["callback"]);
        $this->spin     = isset($formItemValues["spin"]);
        $this->headers  = $this->prepareHeaders();
    }

    /**
     * @return string
     */
    protected function getMessageLastPart() {
        return sprintf('%1$s %2$s %3$s %4$s %5$s %6$s',
            $this->selector     ? "<span class='highlight selector'>" . $this->selector . "</span>"                   : '',
            $this->find         ? "<span class='highlight find'>" . htmlspecialchars($this->find) . "</span>"         : '',
            $this->replace      ? "<span class='highlight replace'>" . htmlspecialchars($this->replace) . "</span>"   : '',
            $this->regex        ? _kdn("(Regex)") : '',
            $this->callback     ? _kdn("(Callback)") : '',
            $this->spin         ? _kdn("(Spinner)") : ''
        );
    }

    /**
     * Returns a manipulated {@link Crawler}. {@link PostBot} is the bot that is used to get the data from the target
     * URL and it can be used to manipulate the content.
     *
     * @param Crawler $crawler
     * @param PostBot $bot
     * @return Crawler
     */
    protected function manipulate($crawler, $bot) {
        if (!$this->find) return $crawler;
        $bot->findAndReplaceInElementHTML($crawler, [$this->selector], $this->find, $this->replace, $this->regex, $this->url, $this->callback, $this->spin);
        return $crawler;
    }

    /**
     * Conduct the test and return an array of results.
     *
     * @param TestData $data Information required for the test
     * @return array|string|mixed
     */
    protected function createResults($data) {
        if (parent::createResults($data) === null) return null;

        return $this->createHtmlManipulationResults($this->url, $this->content, $this->selector, $this->getMessageLastPart(), null, $this->headers, $this->subPrefix);
    }

    /**
     * Get all ajax headers
     *
     * @return  array   $headers    All ajax headers
     *
     * @since 2.1.8
     */
    private function prepareHeaders(){
        $formItemValues = $this->getData()->getFormItemValues();

        /*
         *
         */

        $bot = new PostBot($this->getData()->getPostSettings(), null, $this->getData()->getUseUtf8(), $this->getData()->getConvertEncodingToUtf8());
        $bot->setResponseCacheEnabled($this->getData()->isCacheTestUrlResponses());

        /*
         *
         */

        // Prepare the $subPrefix
        $urlOriginal        = $this->getData()->get("urlOriginal") ?: '';
        $this->subPrefix    = $urlOriginal ? 'ajax_' : null;

        // Get custom headers
        $allHeaders     = [];
        $customHeaders  = rawurldecode($this->getData()->get("customHeaders"));
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
        $customAjaxHeaders   = rawurldecode($this->getData()->get("customAjaxHeaders"));
        $customAjaxHeaders   = str_replace('+', '%%plus%%', $customAjaxHeaders);
        parse_str($customAjaxHeaders, $customAjaxHeaders);
        $customAjaxHeaders   = json_encode($customAjaxHeaders);
        $customAjaxHeaders   = str_replace('%%plus%%', '+', $customAjaxHeaders);
        $customAjaxHeaders   = json_decode($customAjaxHeaders, true);

        if (!empty($customAjaxHeaders) && is_array($customAjaxHeaders)) {

            if (isset($urlOriginal) && $urlOriginal) {
                // Get original method
                $customMethodOriginal   = rawurldecode($this->getData()->get("customMethodOriginal"));
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
                $dumCrawler = $bot->request($urlOriginal, $methodOriginal, $this->getData()->getRawHtmlFindReplaces(true), $allHeaders, $parseArrayOriginal);

                // If the form item name contains 'unnecessary', it means the user is testing if the unnecessary element
                // selectors are working. So, in this case, do not remove unnecessary elements from the crawler so that the
                // user can see whether the selectors work or not.
                $dumLastStep = str_contains($this->getData()->getFormItemName(), 'unnecessary') ? AbstractTest::MANIPULATION_STEP_FIND_REPLACE_ELEMENT_HTML : null;
                $this->applyHtmlManipulationOptions($dumCrawler, $dumLastStep, $urlOriginal, true);
            }

            // Reset all headers
            $allHeaders = [];
            
            // Extract data and get all ajax headers
            foreach ($customAjaxHeaders as $customAjaxHeader) {
                foreach ($customAjaxHeader as $selectorData) {
                    // If custom headers
                    if (isset($selectorData['key']) && $selectorData['key']) {
                        $selectorData['value'] = preg_replace('/%%target_url%%/i', $this->url, $selectorData['value']);
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

        return $allHeaders;
    }
}