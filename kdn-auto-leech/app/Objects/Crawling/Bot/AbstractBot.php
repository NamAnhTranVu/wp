<?php

namespace KDNAutoLeech\Objects\Crawling\Bot;


use DOMElement;
use Goutte\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Uri;
use Symfony\Component\BrowserKit\Cookie;
use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Constants;
use KDNAutoLeech\Factory;
use KDNAutoLeech\Objects\Cache\ResponseCache;
use KDNAutoLeech\Objects\Enums\InformationMessage;
use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\File\MediaFile;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\OptionsBox\OptionsBoxService;
use KDNAutoLeech\Objects\Settings\Settings;
use KDNAutoLeech\Objects\Traits\FindAndReplaceTrait;
use KDNAutoLeech\Objects\Traits\SettingsTrait;
use KDNAutoLeech\Objects\Traits\ShortCodeReplacer;
use KDNAutoLeech\Utils;

abstract class AbstractBot {

    use FindAndReplaceTrait;
    use SettingsTrait;
    use ShortCodeReplacer;

    private $selectAllRegex = '^.*$';

    /**
     * @var Client
     */
    protected $client;

    //

    /** @var array */
    private $generalSettings;

    /** @var array */
    private $defaultGeneralSettings;

    /** @var array */
    private $botSettings;

    //

    /** @var bool */
    private $useUtf8;

    /** @var bool */
    private $convertEncodingToUtf8;

    /** @var bool */
    private $allowCookies;

    /** @var string */
    private $httpAccept;

    /** @var string */
    private $httpUserAgent;

    /** @var int */
    private $connectionTimeout;

    //

    /** @var array */
    private $proxyList;

    /** @var array */
    public $preparedProxyList = [];

    /** @var array */
    public $httpProxies = [];

    /** @var array */
    public $httpsProxies = [];

    /** @var int Maximum number of trial counts for proxies */
    private $proxyTryLimit = 0;

    //

    /** @var int */
    private $siteId;

    /** @var \WP_Post */
    private $site;

    /** @var string Stores the content of the latest response */
    private $latestResponseContent;

    /** @var bool Stores whether the last response has been retrieved from cache or not. */
    private $isLatestResponseFromCache = false;

    /** @var bool */
    private $isResponseCacheEnabled = false;

    /**
     * @param array     $settings              Settings for the site to be crawled
     * @param null|int  $siteId                ID of the site.
     * @param null|bool $useUtf8               If null, settings will be used to decide whether utf8 should be used or
     *                                         not. If bool, it will be used directly without considering settings. In
     *                                         other words, bool overrides the settings.
     * @param null|bool $convertEncodingToUtf8 True if encoding of the response should be converted to UTF8 when there
     *                                         is a different encoding. If null, settings will be used to decide. If
     *                                         bool, it will be used directly without considering settings. In other
     *                                         words, bool overrides the settings. This is applicable only if $useUtf8
     *                                         is found as true.
     */
    public function __construct($settings, $siteId = null, $useUtf8 = null, $convertEncodingToUtf8 = null) {
        if($siteId) $this->siteId = $siteId;

        $this->setSettings($settings, Factory::postService()->getSingleMetaKeys());

        // Get general settings
        $this->generalSettings = Settings::getAllGeneralSettings();

        // Get the default settings
        $this->defaultGeneralSettings = Factory::generalSettingsController()->getDefaultGeneralSettings();

        // Decide which settings we should use.
        $this->botSettings = $this->getSetting('_do_not_use_general_settings') ? $this->getSettings() : $this->generalSettings;

        /*
         *
         */

        $this->useUtf8                  = $useUtf8 !== null                 ? (bool) $useUtf8               : $this->getSettingForCheckbox("_kdn_make_sure_encoding_utf8");
        $this->convertEncodingToUtf8    = $convertEncodingToUtf8 !== null   ? (bool) $convertEncodingToUtf8 : $this->getSettingForCheckbox("_kdn_convert_charset_to_utf8");

        // Set client settings by using user's preferences.
        $this->allowCookies             = $this->getSettingForCheckbox("_kdn_http_allow_cookies");

        // Set ACCEPT and USER_AGENT. If these settings do not exist, use default values.
        $this->httpAccept               = $this->getSetting("_kdn_http_accept");
        $this->httpUserAgent            = $this->getSetting("_kdn_http_user_agent");

        $this->connectionTimeout        = $this->getSetting("_kdn_connection_timeout", 10, true);
        $this->connectionTimeout        = !is_numeric($this->connectionTimeout) ? 10 : (int) $this->connectionTimeout;

        $this->proxyTryLimit            = $this->getSetting("_kdn_proxy_try_limit", 0, true);
        $this->proxyTryLimit            = !is_numeric($this->proxyTryLimit) ? 0 : (int) $this->proxyTryLimit;

        // Prepare the proxies
        $this->prepareProxies();

        $this->createClient();
    }

    /**
     * Prepares proxies
     */
    public function prepareProxies() {
        // Get the proxy list if the user wants to use proxy.
        if(!$this->getSettingForCheckbox("_kdn_use_proxy")) return;

        $this->proxyList = array_filter(array_map(function($proxy) {
            return trim($proxy);
        }, explode("\n", $this->getSetting("_kdn_proxies", "", true))));

        // If there is no proxy, no need to proceed.
        if(!$this->proxyList) return;

        $tcp = "tcp://";
        $http = "http://";
        $https = "https://";

        // Prepare proxy lists
        foreach ($this->proxyList as $proxy) {
            // If the proxy is for http, add it into httpProxies.
            if (starts_with($proxy, $http)) {
                $this->httpProxies[] = $proxy;

                // If the proxy is for https, add it into httpsProxies.
            } else if (starts_with($proxy, $https)) {
                $this->httpsProxies[] = $proxy;

                // Otherwise, add them to both.
            } else {
                // Get the protocol string
                preg_match("/^[a-z]+:\/\//i", $proxy, $matches);

                // If no match is found, prepend tcp
                if (!$matches || empty($matches)) {
                    $proxy = $tcp . $proxy;
                }

                // Add it to the proxy lists
                $this->httpProxies[] = $proxy;
                $this->httpsProxies[] = $proxy;
            }

            $this->preparedProxyList[] = $proxy;
        }

        $this->httpProxies  = array_unique($this->httpProxies);
        $this->httpsProxies = array_unique($this->httpsProxies);

        // Shuffle prepared proxy list if the user prefers it.
        if($this->getSettingForCheckbox("_kdn_proxy_randomize")) {
            shuffle($this->preparedProxyList);

            // Make sure the indices start from 0 and goes up 1 by 1
            $this->preparedProxyList = array_values($this->preparedProxyList);
        }

        /**
         * Modify the proxy list.
         *
         * @param array $preparedProxyList  Proxy list, prepared according to the settings
         * @param AbstractBot $this         The bot itself
         *
         * @return array preparedProxyList  Modified proxy list
         * @since 1.6.3
         */
        $this->preparedProxyList = apply_filters('kdn/bot/proxy-list', $this->preparedProxyList, $this);

    }

    /**
     * Creates a client to be used to perform browser actions
     *
     * @param null|string   $proxyUrl Proxy URL
     * @param null|string   $protocol "http" or "https"
     */
    public function createClient($proxyUrl = null, $protocol = "http", $headers = []) {
        $this->client = new Client();

        $config = [
            'cookies' => $this->allowCookies,
        ];

        if($this->connectionTimeout) {
            $config['connect_timeout']  = $this->connectionTimeout;
            $config['timeout']          = $this->connectionTimeout;
        }

        // Set the proxy
        if($proxyUrl) {
            if(!$protocol) $protocol = "http";

            if(in_array($protocol, ["http", "https", "tcp"])) {
                $config['proxy'] = [
                    $protocol => $proxyUrl
                ];
            }
        }

        // Set custom headers
        $config['headers'] = $headers;

        // Do not verify SSL
        $config['verify'] = false;

        $this->client->setClient(new \GuzzleHttp\Client($config));

        if($this->httpAccept)       $this->client->setServerParameter("HTTP_ACCEPT",        $this->httpAccept);
        if($this->httpUserAgent)    $this->client->setServerParameter('HTTP_USER_AGENT',    $this->httpUserAgent);

        /**
         * Modify the client that will be used to make requests.
         *
         * @param \Goutte\Client client The client
         * @param AbstractBot $this The bot itself
         *
         * @return \Goutte\Client Modified client
         * @since 1.6.3
         */
        $this->client = apply_filters('kdn/bot/client', $this->client, $this);
    }

    /**
     * Creates a new Client and prepares it by adding Accept and User-Agent headers and enabling cookies.
     * Some other routines can also be done here.
     *
     * @return Client
     */
    public function getClient() {
        return $this->client;
    }

    public function getSiteUrl() {
        return $this->getSetting('_main_page_url');
    }

    /**
     * Set cookies of the browser client using the settings
     *
     * @param string $url Full URL for which the cookies should be set
     */
    private function setCookies($url) {
        // Try to get the cookies specified for this site
        if(($cookies = $this->getSetting('_cookies')) && $this->client) {
            // Get cookie domain
            $urlParts = parse_url($url);
            $domain = $urlParts['host'];
            $isSecure = strpos($url, "https") !== false;

            // Add each cookie to this client
            foreach($cookies as $cookieData) {
                if(!isset($cookieData['key']) || !isset($cookieData['value'])) continue;

                $this->client->getCookieJar()->set(new Cookie(
                    $cookieData['key'],
                    rawurldecode($cookieData['value']),
                    null,
                    null,
                    $domain,
                    $isSecure
                ));
            }
        }
    }

    /*
     * PROTECTED HELPERS
     */

    /**
     * @param string $url                   Target URL
     * @param string $method                Request method
     * @param array|null $findAndReplaces   Find and replaces to be applied to raw response content. For the format of this
     *                                      value, see {@see FindAndReplaceTrait::findAndReplace}. Default: null
     * @return Crawler|null
     */
    public function request($url, $method = "GET", $findAndReplaces = null, $headers = [], $parseArray = '') {
        $proxyList = $this->preparedProxyList;
        $protocol = starts_with($url, "https") ? "https" : "http";
        $proxyUrl = $proxyList && isset($proxyList[0]) ? $proxyList[0] : false;
        $tryCount = 0;

        /**
         * Request with parse url parameters as array
         *
         * @since 2.2.8
         */
        $options = [];
        if ($parseArray) {
            $urlPrepareQuery = explode($parseArray, $url, 2);

            if (isset($urlPrepareQuery[1]) && $urlPrepareQuery[1]) {
                $urlQuery = $parseArray . $urlPrepareQuery[1];
            }

            if (isset($urlQuery) && $urlQuery) {
                parse_str($urlQuery, $options);
            }
        }

        do {

            try {
                // Make the request and get the response text. If the method succeeded, the response text will be
                // available in $this->>latestResponseContent
                $responseText = $this->getResponseText($method, $url, $proxyUrl, $protocol, $headers, $options);
                if (!$responseText) return null;

                // Assign it as the latest response content
                $this->latestResponseContent = $responseText;

                // If there are find-and-replace options that should be applied to raw response text, apply them.
                if($findAndReplaces) {
                    $this->latestResponseContent = $this->findAndReplace($findAndReplaces, $this->latestResponseContent, false, $url);
                }

                /**
                 * Modify the response content.
                 *
                 * @param string $latestResponseContent Response content after the previously-set find-and-replace settings are applied
                 * @param string $url                   The URL that sent the response
                 * @param AbstractBot $this             The bot itself
                 *
                 * @return string Modified response content
                 * @since 1.7.1
                 */
                $this->latestResponseContent = apply_filters('kdn/bot/response-content', $this->latestResponseContent, $url, $this);

                // Try to get the HTML content. If this causes an error, we'll catch it and return null.
                $crawler = $this->createCrawler($this->latestResponseContent, $url);

                // Try to get the HTML from the crawler to see if it can do it. Otherwise, it will throw an
                // InvalidArgumentException, which we will catch.
                $crawler->html();

                return $crawler;

            } catch (\GuzzleHttp\Exception\ConnectException $e) {
                // If the URL cannot be fetched, try another proxy, if exists.
                $tryCount++;

                // Break the loop if there is no proxy list or it is empty.
                // Stop if we've reached the try limit.
                // If the next proxy does not exist, break the loop.
                if(!$proxyList || ($this->proxyTryLimit > 0 && $tryCount >= $this->proxyTryLimit) || !isset($proxyList[$tryCount])) {
                    $msgProxyUrl = $proxyUrl ? (sprintf(_kdn('Last tried proxy: %1$s'), $proxyUrl) . ', ') : '';

                    Informer::add(Information::fromInformationMessage(
                        InformationMessage::CONNECTION_ERROR,
                        $msgProxyUrl . sprintf(_kdn('URL: %1$s, Message: %2$s'), $url, $e->getMessage()),
                        InformationType::INFO
                    )->setException($e)->addAsLog());

                    break;
                }

                // Get the next proxy
                $proxyUrl = $proxyList[$tryCount];

            } catch (\GuzzleHttp\Exception\RequestException $e) {
                // If the URL cannot be fetched, then just return null.

                Informer::add(Information::fromInformationMessage(
                    InformationMessage::REQUEST_ERROR,
                    sprintf(_kdn('URL: %1$s, Message: %2$s'), $url, $e->getMessage()),
                    InformationType::INFO
                )->setException($e)->addAsLog());

                break;

            } catch (\InvalidArgumentException $e) {
                // If the HTML could not be retrieved, then just return null.

                Informer::add(Information::fromInformationMessage(
                    InformationMessage::HTML_COULD_NOT_BE_RETRIEVED_ERROR,
                    sprintf(_kdn('URL: %1$s, Message: %2$s'), $url, $e->getMessage()),
                    InformationType::INFO
                )->setException($e)->addAsLog());
                break;

            } catch (\Exception $e) {
                // If there is an error, return null.

                Informer::add(Information::fromInformationMessage(
                    InformationMessage::ERROR,
                    sprintf(_kdn('URL: %1$s, Message: %2$s'), $url, $e->getMessage()),
                    InformationType::INFO
                )->setException($e)->addAsLog());
                break;
            }

        } while(true);

        return null;
    }

    /**
     * Enable/disable response caching
     *
     * @param true $enabled  Enable or disable the response cache. True to enable.
     * @param bool $clearOld True if all previously-created response caches should be cleared.
     * @since 1.8.0
     */
    public function setResponseCacheEnabled($enabled, $clearOld = false) {
        $this->isResponseCacheEnabled = $enabled;

        // Delete all response cache if the cache is disabled
        if ($clearOld) ResponseCache::getInstance()->deleteAll();
    }

    /**
     * @return bool
     */
    public function isLatestResponseFromCache() {
        return $this->isLatestResponseFromCache;
    }

    /**
     * Makes a request to the given URL with the given method considering the cookies and using given proxy. Then,
     * returns the response text.
     *
     * @param string $method HTTP request method, e.g. GET, POST, HEAD, PUT, DELETE
     * @param string $url Target URL
     * @param string|null $proxyUrl See {@link createClient()}
     * @param string|null $protocol See {@link createClient()}
     * @return false|string
     * @since 1.8.0
     */
    protected function getResponseText($method, $url, $proxyUrl, $protocol, $headers = [], $options = []) {
        // If caching is enabled, try to get the response from cache.
        $this->isLatestResponseFromCache = false;
        if ($this->isResponseCacheEnabled) {
            $response = ResponseCache::getInstance()->get($method, $url);
            if ($response) {
                $this->isLatestResponseFromCache = true;
                return $response;
            }
        }

        // If there is a proxy, create a new client with the proxy settings.
        if ($proxyUrl) {
            $this->createClient($proxyUrl, $protocol, $headers);
        } else {
            $this->createClient(null, 'http', $headers);
        }

        $this->setCookies($url);

        /**
         * Fires before any request is made.
         *
         * @param AbstractBot $this
         * @param string $url
         * @since 1.6.3
         */
        do_action('kdn/before_request', $this, $url);

        $this->getClient()->request($method, $url, $options);

        // Get the response and its HTTP status code
        $response = $this->getClient()->getInternalResponse();

        /**
         * Fires just after a request is made.
         *
         * @param AbstractBot $this
         * @param string $url
         * @since 1.6.3
         */
        do_action('kdn/after_request', $this, $url, $response);

        $status = $response->getStatus();

        switch($status) {
            // Do not proceed if the target URL is not found.
            case 404:
                Informer::add(Information::fromInformationMessage(
                    InformationMessage::URL_NOT_FOUND,
                    "Target URL ({$url}) is not found ({$status}).",
                    InformationType::ERROR)->addAsLog()
                );
                return false;
        }

        // Do not proceed if there was a server error.
        if($status >= 500 && $status < 600) {
            Informer::add(Information::fromInformationMessage(
                InformationMessage::REMOTE_SERVER_ERROR,
                "Server error for URL ({$url}). Status: {$status}",
                InformationType::ERROR)->addAsLog()
            );
            return false;
        }

        $content = $response->getContent();

        // If caching enabled, cache the response.
        if ($this->isResponseCacheEnabled) ResponseCache::getInstance()->save($method, $url, $content);

        // Return the content of the response
        return $content;
    }

    /**
     * Throws a dummy {@link \GuzzleHttp\Exception\ConnectException}
     */
    private function throwDummyConnectException() {
        throw new \GuzzleHttp\Exception\ConnectException("Dummy exception.", new Request("GET", "httpabc"));
    }

    /**
     * First, makes the replacements provided, then replaces relative URLs in a crawler's HTML with direct URLs.
     *
     * @param   Crawler     $crawler                    Crawler for the page for which the replacements will be done.
     * @param   array       $findAndReplaces            An array of arrays. Inner array should have:
     *                                                  "regex":    bool    If this key exists, then search will be performed
     *                                                                      as regular expression. If not, a normal search will be done.
     *                                                  "find":     string  What to find.
     *                                                  "replace":  string  Replacement for what is found.
     * @param   bool        $applyGeneralReplacements   True if you want to apply the replacements inserted in general settings page.
     *
     * @return  Crawler                                 A new crawler with replacements done.
     */
    public function makeInitialReplacements($crawler, $findAndReplaces = null, $applyGeneralReplacements = false, $targetURL = null) {
        if (!$crawler) return $crawler;

        $html = $crawler->html();

        // First, apply general replacements
        if($applyGeneralReplacements) {
            $findAndReplacesGeneral = Utils::getOptionUnescaped('_kdn_find_replace');
            $html = $this->findAndReplace($findAndReplacesGeneral, $html, true, $targetURL);
        }

        // Find and replace what user wants.
        if($findAndReplaces) {
            $html = $this->findAndReplace($findAndReplaces, $html, true, $targetURL);
        }

        return new Crawler($html);
    }

    /**
     * Resolves relative URLs
     *
     * @param Crawler     $crawler
     * @param null|string $fallbackBaseUrl If a base URL is not found in the crawler, this URL will be used as the base.
     */
    public function resolveRelativeUrls(&$crawler, $fallbackBaseUrl = null) {
        // If there is a base URL defined in the HTML, use that to resolve the relative URLs.
        $baseHref = $this->extractData($crawler, 'base', 'href', null, true, true);

        // If the base URL does not exist, use the fallback URL.
        if (!$baseHref) $baseHref = $fallbackBaseUrl;

        // Stop if there is no base URL.
        if (!$baseHref) return;

        // Create a URI for the base URL
        $baseUri = new Uri($baseHref);

        // Define the attributes whose values will be resolved
        // https://html.spec.whatwg.org/#dynamic-changes-to-base-urls
        $attributes = ['src', 'href', 'cite', 'ping'];

        // Resolve the values of the attributes
        foreach($attributes as $attr) {
            $this->resolveRelativeUrlForAttribute($crawler, $baseUri, $attr);
        }
    }

    /*
     * HTML MANIPULATION
     */

    /**
     * Applies changes configured in "find and replace in element attributes" option.
     *
     * @param Crawler $crawler   The crawler on which the changes will be done
     * @param string  $optionKey The key that stores the options for "find and replace in element attributes" input's
     *                           values
     */
    public function applyFindAndReplaceInElementAttributes(&$crawler, $optionKey, $url = null) {
        $data = $this->getSetting($optionKey);
        if(!$data) return;

        foreach($data as $item) {
            $this->findAndReplaceInElementAttribute(
                $crawler,
                [Utils::array_get($item, "selector")],
                Utils::array_get($item, "attr"),
                Utils::array_get($item, "find"),
                Utils::array_get($item, "replace"),
                isset($item["regex"]),
                $url,
                isset($item["callback"]),
                isset($item["spin"])
            );
        }
    }

    /**
     * Applies changes configured in "exchange element attributes" option.
     *
     * @param Crawler $crawler   The crawler on which the changes will be done
     * @param string  $optionKey The key that stores the options for "exchange element attributes" input's values
     */
    public function applyExchangeElementAttributeValues(&$crawler, $optionKey) {
        $data = $this->getSetting($optionKey);
        if(!$data) return;

        foreach($data as $item) {
            $this->exchangeElementAttributeValues(
                $crawler,
                [Utils::array_get($item, "selector")],
                Utils::array_get($item, "attr1"),
                Utils::array_get($item, "attr2")
            );
        }
    }

    /**
     * Applies changes configured in "remove element attributes" option.
     *
     * @param Crawler $crawler   The crawler on which the changes will be done
     * @param string  $optionKey The key that stores the options for "remove element attributes" input's values
     */
    public function applyRemoveElementAttributes(&$crawler, $optionKey) {
        $data = $this->getSetting($optionKey);
        if(!$data) return;

        foreach($data as $item) {
            $this->removeElementAttributes(
                $crawler,
                [Utils::array_get($item, "selector")],
                Utils::array_get($item, "attr")
            );
        }
    }

    /**
     * Applies changes configured in "find and replace in element HTML" option.
     *
     * @param Crawler $crawler   The crawler on which the changes will be done
     * @param string  $optionKey The key that stores the options for "find and replace in HTML" input's values
     */
    public function applyFindAndReplaceInElementHTML(&$crawler, $optionKey, $url = null) {
        $data = $this->getSetting($optionKey);
        if(!$data) return;

        foreach($data as $item) {
            $this->findAndReplaceInElementHTML(
                $crawler,
                [Utils::array_get($item, "selector")],
                Utils::array_get($item, "find"),
                Utils::array_get($item, "replace"),
                isset($item["regex"]),
                $url,
                isset($item["callback"]),
                isset($item["spin"])
            );
        }
    }

    /*
     *
     */

    /**
     * Removes the items with a 'start' position less than the given pos value.
     *
     * @param array $itemsArray An array of items. Each item in the array should have 'start' key and its value.
     * @param int $pos The reference DOM position. The elements with a 'start' position less than this will be removed.
     */
    public function removeItemsBeforePos(&$itemsArray, $pos) {
        if(!$pos) return;

        foreach($itemsArray as $key => &$item) {
            if($item["start"] < $pos) {
                unset($itemsArray[$key]);
            }
        }
    }

    /**
     * @param Crawler $crawler The crawler from which the elements will be removed
     * @param array|string $selectors A selector or an array of selectors for the elements to be removed. This can also
     *                                be an array of arrays, where each inner array contains the selector in "selector"
     *                                key.
     */
    public function removeElementsFromCrawler(&$crawler, $selectors = []) {
        if(empty($selectors) || !$crawler) return;

        if(!is_array($selectors)) $selectors = [$selectors];

        foreach ($selectors as $selectorData) {
            if (!$selectorData) continue;

            // Get the selector
            $selector = is_array($selectorData) ? Utils::array_get($selectorData, "selector") : $selectorData;

            // If there is no selector, continue with the next one.
            if (!$selector) continue;

            // Remove each item found by the selector
            try {
                $crawler->filter($selector)->each(function ($node, $i) {
                    foreach ($node as $child) {
                        $child->parentNode->removeChild($child);
                    }
                });
            } catch(\Exception $e) {
                Informer::addError($selector . " - " . $e->getMessage())->setException($e)->addAsLog();
            }
        }
    }

    /**
     * Replace the values of two attributes of each element found via selectors. E.g.
     * "<img src='srcVal' data-src='dataSrcVal'>" becomes "<img src='dataSrcVal' data-src='srcVal'>"
     *
     * @param Crawler $crawler
     * @param array   $selectors
     * @param string  $firstAttrName  Name of the first attribute. E.g. "src"
     * @param string  $secondAttrName Name of the seconds attribute. E.g. "data-src"
     */
    public function exchangeElementAttributeValues(&$crawler, $selectors = [], $firstAttrName, $secondAttrName) {
        if(empty($selectors) || !$crawler) return;

        if(!is_array($selectors)) $selectors = [$selectors];

        foreach ($selectors as $selector) {
            if (!$selector) continue;

            try {
                $crawler->filter($selector)->each(function ($node, $i) use (&$firstAttrName, &$secondAttrName) {
                    /** @var Crawler $node */
                    /** @var DOMElement $child */
                    $child = $node->getNode(0);

                    // Get values of the attributes
                    $firstAttrVal = $child->getAttribute($firstAttrName);
                    $secondAttrVal = $child->getAttribute($secondAttrName);

                    // Exchange the values
                    if($secondAttrVal !== "") {
                        $child->setAttribute($firstAttrName, $secondAttrVal);
                        $child->setAttribute($secondAttrName, $firstAttrVal);
                    }
                });

            } catch(\Exception $e) {
                Informer::addError($selector . " - " . $e->getMessage())->setException($e)->addAsLog();
            }
        }
    }

    /**
     * Modify a node with a callback.
     *
     * @param Crawler      $crawler   The crawler in which the elements will be searched for
     * @param array|string $selectors Selectors to be used to find the elemenets.
     * @param callable     $callback  A callback that takes only one argument, which is the found node, e.g.
     *                                function(Crawler $node) {}
     */
    public function modifyElementWithCallback(&$crawler, $selectors, $callback) {
        if(empty($selectors) || !$crawler || !is_callable($callback)) return;

        if(!is_array($selectors)) $selectors = [$selectors];

        foreach ($selectors as $selector) {
            if (!$selector) continue;

            try {
                $crawler->filter($selector)->each(function ($node, $i) use (&$callback) {
                    /** @var Crawler $node */
                    call_user_func($callback, $node);
                });

            } catch(\Exception $e) {
                Informer::addError($selector . " - " . $e->getMessage())->setException($e)->addAsLog();
            }
        }
    }

    /**
     * Remove an attribute of the elements found via selectors.
     *
     * @param Crawler $crawler
     * @param array   $selectors
     * @param string  $attrName Name of the attribute. E.g. "src". You can set more than one attribute by writing the
     *                          attributes comma-separated. E.g. "src,data-src,width,height"
     */
    public function removeElementAttributes(&$crawler, $selectors = [], $attrName) {
        if(empty($selectors) || !$attrName || !$crawler) return;

        if(!is_array($selectors)) $selectors = [$selectors];

        // Prepare the attribute names
        $attrNames = array_map(function($name) {
            return trim($name);
        }, array_filter(explode(",", $attrName)));

        foreach ($selectors as $selector) {
            if (!$selector) continue;

            try {
                $crawler->filter($selector)->each(function ($node, $i) use (&$attrNames) {
                    /** @var Crawler $node */
                    /** @var DOMElement $child */
                    $child = $node->getNode(0);

                    // Remove the attribute
                    foreach($attrNames as $attrName) $child->removeAttribute($attrName);
                });

            } catch(\Exception $e) {
                Informer::addError($selector . " - " . $e->getMessage())->setException($e)->addAsLog();
            }
        }
    }

    /**
     * Find and replace in the value of an attribute of the elements found via selectors.
     *
     * @param Crawler $crawler
     * @param array   $selectors
     * @param string  $attrName     Name of the attribute. E.g. "src"
     * @param string  $find
     * @param string  $replace
     * @param bool    $regex        True if find and replace strings should be considered as regular expressions.
     */
    public function findAndReplaceInElementAttribute(&$crawler, $selectors = [], $attrName, $find, $replace, $regex = false, $url = null, $callback = false, $spin = false) {
        if(empty($selectors) || !$attrName || !$crawler) return;

        // If the "find" is empty, assume the user wants to find everything.
        if(!$find && $find !== "0") {
            $find = $this->selectAllRegex;
            $regex = true;
        }

        if(!is_array($selectors)) $selectors = [$selectors];

        foreach ($selectors as $selector) {
            if (!$selector) continue;

            try {
                $crawler->filter($selector)->each(function ($node, $i) use (&$attrName, &$find, &$replace, &$regex, &$url, &$callback, &$spin) {
                    /** @var Crawler $node */
                    /** @var DOMElement $child */
                    $child = $node->getNode(0);

                    // Get value of the attribute
                    $val = $child->getAttribute($attrName);

                    // Find and replace in the attribute's value and set the new attribute value
                    $child->setAttribute($attrName, $this->findAndReplaceSingle($find, $replace, $val, $regex, true, $url ?: $this->getUrl(), $callback, $spin));
                });

            } catch(\Exception $e) {
                Informer::addError("{$selector}, {$attrName} - " . $e->getMessage())->setException($e)->addAsLog();
            }
        }
    }

    /**
     * Find and replace in an element's HTML code.
     *
     * @param Crawler $crawler
     * @param array   $selectors
     * @param string  $find
     * @param string  $replace
     * @param bool    $regex        True if find and replace strings should be considered as regular expressions.
     */
    public function findAndReplaceInElementHTML(&$crawler, $selectors = [], $find, $replace, $regex = false, $url = null, $callback = false, $spin = false) {
        if(empty($selectors) || !$crawler) return;

        // If the "find" is empty, assume the user wants to find everything.
        if(!$find && $find !== "0") {
            $find = $this->selectAllRegex;
            $regex = true;
        }

        if(!is_array($selectors)) $selectors = [$selectors];

        foreach ($selectors as $selector) {
            if (!$selector) continue;

            try {
                $crawler->filter($selector)->each(function ($node, $i) use (&$find, &$replace, &$regex, &$url, &$callback, &$spin) {
                    /** @var Crawler $node */
                    $firstHtml = Utils::getNodeHTML($node);
                    $child = $node->getNode(0);

                    $html = $this->findAndReplaceSingle($find, $replace, $firstHtml, $regex, true, $url ?: $this->getUrl(), $callback, $spin);

                    // If there is no change, continue with the next one.
                    if ($html === $firstHtml) return;

                    if(mb_strpos($html, "<html") !== false || mb_strpos($html, "<body") !== false) return;

                    // Get parent tag name of the new HTML. The tag name will be used to retrieve the manipulated HTML from
                    // a dummy crawler.
                    $tagName = null;
                    if(preg_match('/^<([^\s>]+)/', $html, $matches)) {
                        $tagName = $matches[1];
                    }

                    // Create a dummy crawler so that we can get the manipulated HTML as DOMElement. We are able to add
                    // a DOMElement to the document, but not an HTML string directly.
//                $html = "<html><head><meta charset='utf-8'></head><body><div>" . $html . "</div></body></html>";
//                $dummyCrawler = new Crawler($html);

                    $dummyCrawler = $this->createDummyCrawler($html);

                    // Get the child element as DOMElement from the dummy crawler.
                    $newChild = $dummyCrawler->filter('body > div' . ($tagName ? ' > ' . $tagName : ''))->first()->getNode(0);

                    // If we successfully retrieved the new child
                    if($newChild) {
                        // Import the new child element to the main crawler's document. This is vital, because
                        // DOMElement::replaceChild requires the new child to be in the same document.
                        $newChild = $child->parentNode->ownerDocument->importNode($newChild, true);

                        // Now, we can replace the current child with the new child.
                        if($newChild) $child->parentNode->replaceChild($newChild, $child);
                    }
                });

            } catch(\Exception $e) {
                Informer::addError("{$selector} - " . $e->getMessage())->setException($e)->addAsLog();
            }
        }
    }

    /**
     * Get values for a selector setting
     *
     * @param Crawler $crawler              See {@link AbstractBot::extractValuesWithSelectorData}
     * @param string $settingName           Name of the setting from which the selector data will be retrieved
     * @param string $defaultAttr           See {@link AbstractBot::extractValuesWithSelectorData}
     * @param bool   $contentType           See {@link AbstractBot::extractData}
     * @param bool   $singleResult          See {@link AbstractBot::extractData}
     * @param bool   $trim                  See {@link AbstractBot::extractData}
     * @return array|mixed|null             If there are no results, returns null. If $singleResult is true, returns a
     *                                      single result. Otherwise, returns an array. If $singleResult is false,
     *                                      returns an array of arrays, where each inner array is the result of a single
     *                                      selector data.
     */
    public function extractValuesForSelectorSetting($crawler, $settingName, $defaultAttr, $contentType = false,
                                                    $singleResult = false, $trim = true, $allAjaxData = [], $postData = null) {

        $selectors = $this->getSetting($settingName);
        if (!$selectors) return null;

        $results = [];

        // TODO: If there is no selector but options box options, they might be applied. For example, if there are
        // templates, the user might want to define something, without using a selector. If this is done, it must be
        // applicable in every setting having an options box, not just here.

        foreach($selectors as $data) {
            // If we have ajax number
            if (isset($data['ajax']) && $ajaxNumber = $data['ajax']) {
                $crawler = isset($allAjaxData[$ajaxNumber - 1]) ? $allAjaxData[$ajaxNumber - 1] : '';
                if (!$crawler) continue;
            }

            // Get the result for this selector data
            $result = $this->extractValuesWithSelectorData($crawler, $data, $defaultAttr, $contentType, $singleResult, $trim, $postData);
            if (!$result) continue;

            $results[] = $result;

            // One match is enough
            if ($singleResult) break;
        }

        if (!$results) return null;
        return $singleResult ? $results[0] : $results;
    }

    /**
     * Extract values from the crawler using selector data.
     *
     * @param Crawler $crawler      The crawler from which the data should be extracted
     * @param array   $data         Selector data that have these keys: "selector" (optional), "attr" (optional),
     *                              "options_box" (optional).
     * @param string  $defaultAttr  Attribute value that will be used if the attribute is not found in the settings
     * @param bool    $contentType  See {@link AbstractBot::extractData}
     * @param bool    $singleResult See {@link AbstractBot::extractData}
     * @param bool    $trim         See {@link AbstractBot::extractData}
     * @return array|null|string See {@link AbstractBot::extractData}
     * @since 1.8.0
     */
    public function extractValuesWithSelectorData($crawler, $data, $defaultAttr, $contentType = false,
                                                  $singleResult = false, $trim = true, $postData = null) {

        $selector = Utils::array_get($data, 'selector');
        $attr     = Utils::array_get($data, 'attr');
        if (!$attr) $attr = $defaultAttr;

        $result = $this->extractData($crawler, $selector, $attr, $contentType, $singleResult, $trim);
        if (!$result) return null;

        // Apply options box settings
        $optionsBoxApplier = OptionsBoxService::getInstance()->createApplierFromSelectorData($data);
        if ($optionsBoxApplier) {
            $result = is_array($result) ?
                $optionsBoxApplier->applyToArray($result, $contentType ? 'data' : null, $this->getUrl(), $this->getSettingsImpl(), $postData) :
                $optionsBoxApplier->apply($result, $this->getUrl(), $this->getSettingsImpl(), $postData);
        }

        return $result;
    }

    /**
     * Extracts specified data from the crawler
     *
     * @param Crawler           $crawler
     * @param array|string      $selectors    A single selector as string or more than one selectors as array
     * @param string|array      $dataType     "text", "html", "href" or attribute of the element (e.g. "content")
     * @param string|null|false $contentType  Type of found content. This will be included as "type" in resultant
     *                                        array.
     * @param bool              $singleResult True if you want a single result, false if you want all matches. If true,
     *                                        the first match will be returned.
     * @param bool              $trim         True if you want each match trimmed, false otherwise.
     * @return array|null|string              If found, the result. Otherwise, null. If there is a valid content
     *                                        type, then the result will include an array including the position of
     *                                        the found value in the crawler HTML. If the content type is null or
     *                                        false, then just the found value will be included. <p><p> If there are
     *                                        more than one dataType:
     *                                        <li>If more than one match is found, then the "data" value will be an
     *                                        array.</li>
     *                                        <li>If only one match is found, then the data will be a string.</li>
     */
    public function extractData($crawler, $selectors, $dataType, $contentType, $singleResult, $trim) {
        // Check if the selectors are empty. If so, do not bother.
        if(empty($selectors) || !$crawler) return null;

        // If the selectors is not an array, make it one.
        if(!is_array($selectors)) $selectors = [$selectors];

        // If the data type is not an array, make it one.
        if(!is_array($dataType)) {
            $dataType = [$dataType];

        } else {
            // Make sure each type in the data type array is unique
            $dataType = array_unique($dataType);
        }

        $crawlerHtml = $crawler->html();
        $results = [];
        foreach($selectors as $selector) {
            if(!$selector) continue;
            if($singleResult && !empty($results)) break;

            $offset = 0;
            try {
                $crawler->filter($selector)->each(function($node, $i) use ($crawler, $dataType,
                    $singleResult, $trim, $contentType, &$results, &$offset, &$crawlerHtml) {
                    /** @var Crawler $node */

                    // If single result is needed and we have found one, then do not continue.
                    if($singleResult && !empty($results)) return;

                    $value = null;
                    foreach ($dataType as $dt) {
                        try {
                            $val = null;
                            switch ($dt) {
                                case "text":
                                    $val = $node->text();
                                    break;
                                case "html":
                                    $val = Utils::getNodeHTML($node);
                                    break;
                                default:
                                    $val = $node->attr($dt);
                                    break;
                            }

                            if($val) {
                                if($trim) $val = trim($val);
                                if($val) {
                                    if(!$value) $value = [];
                                    $value[$dt] = $val;
                                }
                            }

                        } catch (\InvalidArgumentException $e) { }
                    }

                    try {
                        if($value && !empty($value)) {
                            if ($contentType) {
                                $html = Utils::getNodeHTML($node);
                                $start = mb_strpos($crawlerHtml, $html, $offset);
                                $results[] = [
                                    "type"  =>  $contentType,
                                    "data"  =>  sizeof($value) == 1 ? array_values($value)[0] : $value,
                                    "start" =>  $start,
                                    "end"   =>  $start + mb_strlen($html)
                                ];
                                $offset = $start + 1;
                            } else {
                                $results[] = sizeof($value) == 1 ? array_values($value)[0] : $value;
                            }
                        }

                    } catch(\InvalidArgumentException $e) { }
                });

            } catch(\Exception $e) {
                Informer::addError("{$selector} - " . $e->getMessage())->setException($e)->addAsLog();
            }
        }

        // Return the results
        if($singleResult && !empty($results)) {
            return $results[0];

        } else if(!empty($results)) {
            return $results;
        }

        return null;
    }

    /**
     * Modify media elements in the crawler. This method finds the elements that belongs to the given media file and
     * modifies those elements with the given callback. In fact, the modification is done by the callback itself. This
     * method only finds the elements.
     *
     * @param Crawler   $crawler   The crawler in which the media file will be searched for
     * @param MediaFile $mediaFile The media file
     * @param callable  $callback  A callback that takes a MediaFile and a DOMElement instance and returns void. E.g.
     *                             function(MediaFile $mediaFile, DOMElement $domElement) {}
     * @since 1.8.0
     */
    public function modifyMediaElement($crawler, $mediaFile, $callback) {
        // Set media alt and title in the elements having this media's local URL as their 'src' value
        $this->modifyElementWithCallback($crawler, '[src^="' . $mediaFile->getLocalUrl() . '"]',
            function($node) use (&$mediaFile, &$callback) {
                /** @var Crawler $node */
                /** @var \DOMElement $child */
                $child = $node->getNode(0);

                call_user_func($callback, $mediaFile, $child);
            }
        );
    }

    /**
     * Notify the users via email if no value is found via one of the supplied CSS selectors.
     *
     * @param string  $url                         The URL
     * @param Crawler $crawler                     The crawler in which selectors will be looked for
     * @param array   $selectors                   CSS selectors. Each inner array should have <b>selector</b> and
     *                                             <b>attr</b> keys.
     * @param string  $lastEmailDateMetaKey        Post meta key that stores the last time a similar email sent.
     * @param bool    $bypassInactiveNotifications True if you want to run this method even if notifications are not
     *                                             activated in settings.
     */
    public function notifyEmail($url, $crawler, $selectors, $lastEmailDateMetaKey) {
        $this->notifyUser($url, $crawler, $selectors, $lastEmailDateMetaKey);
    }
    
    protected function notifyUser($url, $crawler, $selectors, $lastEmailDateMetaKey, $bypassInactiveNotifications = false) {
        if(!$bypassInactiveNotifications && !Settings::isNotificationActive()) return;

        // Check if the defined interval has passed.
        $this->addSingleKey($lastEmailDateMetaKey);
        $lastEmailDate = $this->getSetting($lastEmailDateMetaKey);
        $emailIntervalInSeconds = Settings::getEmailNotificationInterval() * 60;

        if($lastEmailDate) {
            $lastEmailDate = strtotime($lastEmailDate);
            if(time() - $lastEmailDate < $emailIntervalInSeconds) return;
        }

        $this->loadSiteIfPossible();

        // Get the email addresses that can be sent notifications
        $emailAddresses = Settings::getNotificationEmails();
        if(!$emailAddresses) return;

        $messagesEmptyValue = [];

        // Check each selector for existence.
        foreach($selectors as $selectorData) {
            $selector = Utils::getValueFromArray($selectorData, "selector", false);
            if(!$selector) continue;

            $attr = Utils::getValueFromArray($selectorData, "attr", "text");

            $data = $this->extractData($crawler, $selector, $attr, null, false, true);

            // If no value is found by the selector, add a new message string including selector's details.
            if(!$data) {
                $messagesEmptyValue[] = $selector . " | " . $attr;
            }
        }

        // If there are messages, send them to the email addresses.
        if(!empty($messagesEmptyValue)) {
            // We will send HTML.
            add_filter('wp_mail_content_type', function() {
                return 'text/html';
            });

            $siteName = $this->site ? " (" . $this->site->post_title . ") " : '';

            $subject = _kdn("Empty CSS selectors found") . $siteName . " - " . _kdn("KDN Auto Leech");

            // Prepare the body
            $body = Utils::view('emails.notification-empty-value')->with([
                'url'                   =>  $url,
                'messagesEmptyValue'    =>  $messagesEmptyValue,
                'site'                  =>  $this->site
            ])->render();

            /**
             * Fires just before notification emails are sent
             *
             * @param AbstractBot   $this                   The bot itself
             * @param string        $url                    URL of the page in which at least a value is found to be empty
             * @param Crawler       $crawler                The crawler in which selectors will be looked for
             * @param array         $selectors              CSS selectors that were used to find empty-valued elements
             * @param string        $lastEmailDateMetaKey   Post meta key that stores the last time a similar email sent.
             * @param array         $emailAddresses         Email addresses to which a notification email should be sent
             * @param string        $subject                Subject of the notification email
             * @param string        $body                   Body of the notification email
             * @since 1.6.3
             */
            do_action('kdn/notification/before_notify', $this, $url, $crawler, $selectors, $lastEmailDateMetaKey, $emailAddresses, $subject, $body);

            // Send emails
            foreach($emailAddresses as $to) {
                $success = wp_mail($to, $subject, $body);
            }

            /**
             * Fires just after notification emails are sent
             *
             * @param AbstractBot   $this                   The bot itself
             * @param string        $url                    URL of the page in which at least a value is found to be empty
             * @param Crawler       $crawler                The crawler in which selectors will be looked for
             * @param array         $selectors              CSS selectors that were used to find empty-valued elements
             * @param string        $lastEmailDateMetaKey   Post meta key that stores the last time a similar email sent.
             * @param array         $emailAddresses         Email addresses to which a notification email should be sent
             * @param string        $subject                Subject of the notification email
             * @param string        $body                   Body of the notification email
             * @since 1.6.3
             */
            do_action('kdn/notification/after_notify', $this, $url, $crawler, $selectors, $lastEmailDateMetaKey, $emailAddresses, $subject, $body);
        }

        // Update last email sending date as now.
        if($this->siteId) Utils::savePostMeta($this->siteId, $lastEmailDateMetaKey, (new \DateTime())->format(Constants::$MYSQL_DATE_FORMAT));
    }

    /*
     *
     */

    /**
     * Creates a crawler with the right encoding.
     *
     * @param string $html
     * @param string $url
     * @return Crawler
     */
    public function createCrawler($html, $url) {
        if($this->useUtf8) {
            // Check if charset is defined as meta Content-Type. If so, replace it.
            // The regex below is taken from Symfony\Component\DomCrawler\Crawler::addContent
            $regexCharset = '/\<meta[^\>]+charset *= *["\']?([a-zA-Z\-0-9_:.]+)/i';
            if(preg_match($regexCharset, $html, $matches)) {
                // Change only if it is not already utf-8
                $charset = $matches[1];
                if(strtolower($charset) !== "utf-8") {

                    // Convert the encoding from the defined charset to UTF-8 if it is required
                    if ($this->convertEncodingToUtf8) {
                        // Get available encodings
                        $availableEncodings = array_map('strtolower', mb_list_encodings());

                        // Make sure the encoding exists in available encodings.
                        if (in_array(strtolower($charset), $availableEncodings)) {
                            $html = mb_convert_encoding($html, "UTF-8", $charset);

                            // Now match again to get the right positions after converting the encoding. I'm not sure if the
                            // positions might change after converting the encoding. Hence, to be on the safe side, we're
                            // matching again.
                            preg_match($regexCharset, $html, $matches);

                        // Otherwise, we cannot convert the encoding. Inform the user.
                        } else {
                            Informer::addError(sprintf(_kdn('Encoding %1$s does not exist in available encodings.'), $charset))
                                ->addAsLog();
                        }
                    }

                    if ($matches) {
                        $pos0 = stripos($html, $matches[0]);
                        $pos1 = $pos0 + stripos($matches[0], $matches[1]);

                        $html = substr_replace($html, "UTF-8", $pos1, strlen($matches[1]));
                    }
                }

            // Otherwise
            } else {
                // Make sure the charset is UTF-8
                $html = $this->findAndReplaceSingle(
                    '(<head>|<head\s[^>]+>)',
                    '$1 <meta charset="UTF-8" />',
                    $html,
                    true
                );
            }
        }

        /**
         * PREPARE THE HTML
         * We do not need to do that, because sometimes the target page is not a HTML page.
         *
         * @since 2.1.8
         */
        
        // Remove chars that come before the first "<"
        // $html = mb_substr($html, mb_strpos($html, "<"));

        // Remove chars that come after the last ">"
        // $html = mb_substr($html, 0, mb_strrpos($html, ">") + 1);

        /*
         * CREATE THE CRAWLER
         */

        $crawler = new Crawler(null, $url);
        $crawler->addContent($html);

        return $crawler;
    }

    /**
     * Creates a dummy Crawler from an HTML.
     *
     * @param string $html
     * @return Crawler
     */
    public function createDummyCrawler($html) {
        $html = "<html><head><meta charset='utf-8'></head><body><div>" . $html . "</div></body></html>";
        return new Crawler($html);
    }

    /**
     * Gets the content from a dummy crawler created by {@link createDummyCrawler}
     *
     * @param Crawler $dummyCrawler
     * @return string
     */
    public function getContentFromDummyCrawler($dummyCrawler) {
        $divWrappedHtml = Utils::getNodeHTML($dummyCrawler->filter('body > div')->first());
        return mb_substr($divWrappedHtml, 5, mb_strlen($divWrappedHtml) - 11);
    }

    /**
     * Sets {@link $site} variable if there is a valid {@link $siteId}.
     */
    private function loadSiteIfPossible() {
        if(!$this->site && $this->siteId) {
            $this->site = get_post($this->siteId);
        }
    }

    /**
     * @return int|null Site ID for which this bot is created
     */
    public function getSiteId() {
        return $this->siteId;
    }

    /**
     * @return string See {@link $latestResponseContent}
     */
    public function getLatestResponseContent() {
        return $this->latestResponseContent;
    }

    /*
     * PRIVATE METHODS
     */

    /**
     * @param Crawler $crawler  The crawler in which the changes will be applied
     * @param Uri $baseUri      Base URI that is retrieved by using <base> tag's href attribute
     * @param string $attr      Target attribute. E.g. 'href', or 'cite', or 'ping', or 'src'
     */
    private function resolveRelativeUrlForAttribute(&$crawler, $baseUri, $attr) {
        if (!$crawler) return;

        $crawler->filter('[' . $attr . ']')->each(function ($node, $i) use (&$attr, &$baseUri) {
            /** @var Crawler $node */
            /** @var DOMElement $child */
            $child = $node->getNode(0);

            // Get value of the attribute
            $val = $child->getAttribute($attr);

            // Find and replace in the attribute's value and set the new attribute value
            $child->setAttribute($attr, Uri::resolve($baseUri, $val));
        });
    }
}