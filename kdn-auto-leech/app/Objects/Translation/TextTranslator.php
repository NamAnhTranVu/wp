<?php

namespace KDNAutoLeech\Objects\Translation;


use DOMElement;
use DOMNode;
use Symfony\Component\DomCrawler\Crawler;
use KDNAutoLeech\Objects\Crawling\Bot\DummyBot;
use KDNAutoLeech\Objects\Enums\InformationMessage;
use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\Traits\FindAndReplaceTrait;
use KDNAutoLeech\Objects\Traits\ShortCodeReplacer;
use KDNAutoLeech\Objects\Translation\Clients\AbstractTranslateAPIClient;
use KDNAutoLeech\Objects\Translation\Clients\GoogleTranslateAPIClient;
use KDNAutoLeech\Objects\Translation\Clients\MicrosoftTranslateAPIClient;
use KDNAutoLeech\Extensions\Translation\yandex\translateapi\src\Translator;
use KDNAutoLeech\Extensions\Translation\yandex\translateapi\src\Exception;
use KDNAutoLeech\Utils;

/**
 * Translates a multidimensional array of texts.
 *
 *        === HOW THIS WORKS ===
 *
 *  1. Flattens given multidimensional text array by replacing short codes with HTML elements so that the short codes
 * themselves will not be translated to prevent the translation service from altering the short codes and hence making
 * them invalid.
 *  2. Finds texts that are longer than a threshold and divides them into smaller pieces by encapsulating the texts with
 * an HTML element and giving them an ID. The ID is given so that the translated version of the text can be replaced
 * with the original text. In other words, the ID is used to locate a divided text in the source code.
 *  3. Sends flattened and divided texts to a translation API and retrieves translation of the flattened and divided
 * texts.
 *  4. Remaps the flattened texts by assigning text items to their location in the original multidimensional array, by
 * combining divided texts by using their ID along the way. Also, reverts the short code HTML elements to the short codes.
 *
 * Simply, this class takes a multidimensional array and gives their translated versions.
 *
 * @package KDNAutoLeech\objects\translation
 */
class TextTranslator {

    use FindAndReplaceTrait;
    use ShortCodeReplacer;

    // TODO: Test huge number of too long texts to see if translation services fail.

    // NOTE: When translating text by specifying a max length, subtract 300-400 chars from the max possible length. Because,
    // we add IDs and classes to the nodes. E.g. If max allowed value is 10000, write 9600 when calling the translation
    // method.

    /*
     *
     */

    /** @var string Option key used to store previously retrieved supported languages of Google Translate */
    const OPTION_KEY_CACHED_LANGUAGES_GOOGLE_TRANSLATE = "_kdn_translation_cached_languages_google_translate";

    /** @var string Option key used to store previously retrieved supported languages of Microsoft Translator Text */
    const OPTION_KEY_CACHED_LANGUAGES_MICROSOFT_TRANSLATOR_TEXT = "_kdn_translation_cached_languages_microsoft_translator_text";

    /** @var string Option key used to store previously retrieved supported languages of Microsoft Translator Text */
    const OPTION_KEY_CACHED_LANGUAGES_YANDEX_TRANSLATOR = "_kdn_translation_cached_languages_yandex_translator";

    /*
     *
     */

    /** @var array Texts to be translated. This can be a multi-level array. */
    private $texts;

    /** @var array Stores prepared long texts. Structure: [dotKey => preparedLongText] */
    private $longTextsPrepared = [];

    /** @var DummyBot */
    private $dummyBot;

    /** @var string Format for IDs that will be set to the elements needing to be translated. */
    private $translateNodeIdFormat = "kdn-translate-%s";

    /** @var string Class name that will be added to the HTML tags that need to be unwrapped after translation. */
    private $classUnwrap = "kdn-translate-unwrap";

    /** @var string Tag name that will be used to encapsulate divided texts */
    private $translateElementTagName = "kdn";

    /*
     *
     */

    /** @var string The key that will be used for options in select elements for Google Cloud Translation  */
    const KEY_GOOGLE_CLOUD_TRANSLATION = "google_translate";

    /** @var string The key that will be used for options in select elements for Microsoft Translator Text */
    const KEY_MICROSOFT_TRANSLATOR_TEXT = "microsoft_translator_text";

    /** @var string The key that will be used for options in select elements for Microsoft Translator Text */
    const KEY_YANDEX_TRANSLATOR = "yandex_translator";

    /**
     * @var bool If true, the texts will not be translated. Instead, they will be appended dummy values to mock the
     *      translation.
     */
    private $dryRun = false;

    /*
     * VARIABLES USED TO HANDLE SHORT CODES
     */

    /** @var string Tag of the HTML elements that store short code data */
    private $shortCodeElementTagForOpening = 'kdn-sc-open';

    /** @var string Tag of the HTML elements that store the closing tag of the short codes */
    private $shortCodeElementTagForClosing = 'kdn-sc-close';

    /**
     * @var string The short code elements' name attribute that stores short code name E.g. for [kdn-script
     *      src="..." async] short code, this attribute stores "kdn-script"
     */
    private $shortCodeElementNameAttr = 'data-name';

    /**
     * @var string The short code elements' options attribute that stores short code options. E.g. for [kdn-script
     *      src="..." async] short code, this attribute stores 'src="..." async'.
     */
    private $shortCodeElementOptionsAttr = 'data-options';

    /**
     * @var null|string Stores the match for short code matching regex. Basically, it is pipe-separated and regex-quoted
     * short code names.
     */
    private $shortCodeMatchPartForRegex = null;

    /**
     * @var null|string Stores the regular expression that matches the short codes that are defined in WordPress.
     *                  $1: Short code name
     *                  $2: Short code options
     */
    private $shortCodeOpeningTagMatchRegex = null;

    /**
     * @var null|string Stores the regular expression that matches the closing tags of the short codes that are defined
     *                  in WordPress.
     *                  $1: Short code name
     */
    private $shortCodeClosingTagMatchRegex = null;

    /**
     * @param array $texts  See {@link $texts}
     * @param bool  $dryRun See {@link $dryRun}
     */
    public function __construct($texts, $dryRun = false) {
        $this->texts  = $texts;
        $this->dryRun = $dryRun;

        $this->dummyBot = new DummyBot([]);
    }

    /**
     * Translate texts from a language to another using Google Cloud Translation API.
     *
     * @param string $projectId ID of the project created on Google Developers Console
     * @param string $apiKey    Public API key of the project
     * @param string $to        The target language to translate to. Must be a valid ISO 639-1 language code.
     * @param string $from      The source language to translate from. Must be a valid ISO 639-1 language code.
     *                          Leave this empty or pass 'detect' to automatically detect the language.
     * @return array Translations. An array of strings.
     */
    public function translateWithGoogle($projectId, $apiKey, $to, $from = '', $end = '') {
        return $this->translate(new GoogleTranslateAPIClient($projectId, $apiKey), [
            'source'    => $this->sanitizeFrom($from),
            'target'    => $to,
            'end'       => $end,
        ]);
    }

    /**
     * Translate texts from a language to another using Microsoft Translator Text API.
     *
     * @param string $clientSecret Client secret obtained from Microsoft Translator Text API
     * @param string $to           The target language to translate to. Must be a valid ISO 639-1 language code.
     * @param string $from         The source language to translate from. Must be a valid ISO 639-1 language code.
     *                             Leave this empty or pass 'detect' to automatically detect the language.
     * @return array Translations. An array of strings.
     */
    public function translateWithMicrosoft($clientSecret, $to, $from = '', $end = '') {
        return $this->translate(new MicrosoftTranslateAPIClient($clientSecret), [
            'from'  => $this->sanitizeFrom($from),
            'to'    => $to,
            'end'   => $end
        ]);
    }

    /**
     * Translate texts from a language to another using Yandex Translator API.
     *
     * @param string $api           API Key obtained from Yandex Translator API
     * @param string $to            The target language to translate to. Must be a valid ISO 639-1 language code.
     * @param string $from          The source language to translate from. Must be a valid ISO 639-1 language code.
     *                              Leave this empty or pass 'detect' to automatically detect the language.
     * @return array Translations. An array of strings.
     */
    public function translateWithYandex($api, $to, $from = '', $end = '') {

        $texts              = $this->texts;     // The all text packages.
        $maxLength          = 8000;             // Max length for each text parts.
        $errorCodes         = [401, 404];
        $allTexts           = [];

        // Try to translate each text package.
        foreach ($texts as $key => $text) {
            $allTextsCached = '';
            $textsCached    = wordwrap($text, $maxLength, ' [|||]', true);
            $textsCached    = explode('[|||]', $textsCached);

            // Try to translate each text part.
            foreach ($textsCached as $textCached) {

                $textTranslated = '';

                // Try to translate with each API Key.
                foreach ($api as $arrKey => $apiKey) {
                
                    // Try to translate.
                    try {

                        // Initialize Yandex Translator.
                        $yandexTranslator = new Translator($apiKey);

                        // Try to translate from the first language to second language.
                        $textTranslated = $yandexTranslator->translate($textCached, $this->sanitizeFrom($from) ? $from . '-' . $to : $to, true)->getResult()[0];

                        // Try to translate from the second language to end language.
                        if ($end) $textTranslated = $yandexTranslator->translate($textTranslated, $to . '-' . $end, true)->getResult()[0];

                        // Otherwise, append translated text into cache variable and out loop of API Key.
                        $allTextsCached .= $textTranslated;
                        break;

                    // Catch errors for each API Key.
                    } catch (\Exception $e) {

                        // Remove this key, so you do not to need try this again.
                        if (array_search($e->getCode(), $errorCodes) !== false) {
                            unset($api[$arrKey]);
                        }

                        // Add and information for this exception.
                        Informer::add(Information::fromInformationMessage(
                            InformationMessage::TRANSLATION_ERROR,
                            $e->getMessage(),
                            InformationType::ERROR
                        )->setException($e));

                        // Try with another API Key.
                        continue;
                    }

                }

            }

            $allTexts[$key] = $allTextsCached;
            $allTextsCached = '';
        }

        return $allTexts;

    }

    /**
     * @param string $from Original 'from' value that will be used to define 'from' value in translate API request
     * @return string Sanitized value that can be safely sent to the APIs
     * @since 1.8.0
     */
    private function sanitizeFrom($from) {
        return $from == 'detect' ? '' : $from;
    }

    /**
     * A helper method to be used to translate {@link $texts}.
     *
     * @param AbstractTranslateAPIClient $apiClient
     * @param array                      $options
     * @return array Translated texts.
     */
    private function translate(AbstractTranslateAPIClient $apiClient, $options = []) {
        // Prepare the texts
        $flattened          = $this->flattenTexts($this->texts, $apiClient->getMaxTextLength());
        $flattenedPrepared  = $this->getTextsToTranslateFromFlattened($flattened);
        $chunks             = array_chunk($flattenedPrepared, $apiClient->getMaxTextCountPerBatch());

        // If there is a max text constraint per batch, create chunks such that total length of the texts in each chunk
        // does not exceed the given limit.
        if ($apiClient->getMaxTextLengthPerBatch() > 0) {
            $newChunks = [];
            foreach($chunks as $chunk) {
                $newChunks = array_merge($newChunks, Utils::chunkArrayByTotalTextLength($chunk, $apiClient->getMaxTextLengthPerBatch()));
            }

            // This is left commented-out for later use in debugging if necessary. They should be equal.
//            $isEqual = array_flatten($newChunks) == array_flatten($chunks);

            $chunks = $newChunks;
        }

        $allTranslations = [];

        // Translate each chunk and store the translations in an array.
        foreach($chunks as $chunk) {
            // If this is a dry run, just append a text to the to-be-translated values.
            if ($this->dryRun) {
                $translations = array_map(function($v) {
                    $needle = '>';
                    $pos = strpos($v, $needle);

                    if ($pos !== false) {
                        return substr_replace($v, $needle . '(TRANSLATION TEST)', $pos, strlen($needle));
                    } else {
                        return $v . ' (TRANSLATION TEST)';
                    }
                }, $chunk);

            } else {
                // Translate using the callback
                $translations = $apiClient->translateBatch($chunk, $options);

                if (isset($options['end']) && $options['end'] && $translations) {
                    if(isset($options['target']) && $options['target']) {
                        $newOptions = [
                            'source'    => $options['target'],
                            'target'    => $options['end']
                        ];
                    } else {
                        $newOptions = [
                            'from'      => $options['to'],
                            'to'        => $options['end']
                        ];
                    }

                    $translations = $apiClient->translateBatch($translations, $newOptions);
                }
            }

            $allTranslations = array_merge($allTranslations, array_values($translations));
        }

        // Prepare the translations
        try {
            $allTranslations = $this->remapTranslatedTexts($allTranslations, $flattened);

        } catch (\Exception $e) {
            Informer::add(Information::fromInformationMessage(
                InformationMessage::TRANSLATION_ERROR,
                $e->getMessage(),
                InformationType::ERROR
            )->setException($e)->addAsLog());
        }

        return $allTranslations;
    }

    /*
     * HELPERS
     */

    /**
     * Flattens a multidimensional texts array. Divides the texts into several pieces if they are longer than the
     * maximum allowed length.
     *
     * @param array      $texts               An array. It can have inner arrays.
     * @param int        $maxValueLength      Max length that an item of the flattened array can have. If this is
     *                                        greater than zero, the value will be separated from end of sentences to
     *                                        satisfy the limit as much as possible.
     * @param null|array $flattened           No need to pass a value to this. Used in recursion.
     * @param null|array $parentDotNotatedKey No need to pass a value to this. Used in recursion.
     * @param int        $depth               No need to pass a value to this. Used in recursion.
     * @return array
     */
    public function flattenTexts($texts, $maxValueLength = 0, $flattened = null, $parentDotNotatedKey = null, $depth = 0) {
        if(!$flattened) $flattened = [];

        foreach($texts as $key => $value) {
            // Prepare the dot key.
            $dotKey = $parentDotNotatedKey ? ($parentDotNotatedKey . "." . $key) : $key;

            // If value is an array, recursively repeat the operation.
            if(is_array($value)) {
                $flattened = $this->flattenTexts($value, $maxValueLength, $flattened, $dotKey, $depth + 1);

            // If we finally reached a non-array value, we can add it to the flattened array.
            } else {
                // Replace short codes with HTML elements so that they won't be changed by translation service
                $this->replaceShortCodesWithHtmlElement($value);

                $length = mb_strlen($value);

                // If there is no need to divide the value into several substrings, we can directly add it.
                if($maxValueLength < 1 || $length <= $maxValueLength) {
                    $flattened[] = [
                        "key"       => $dotKey,
                        "value"     => $value,
                        "length"    => $length,
                    ];

                // Otherwise, let's divide the value into small pieces.
                } else {
                    // Since we want to translate the texts, it is important that we divide the text into small pieces
                    // from the end of the paragraphs or the sentences for a better translation. After separation,
                    // add all the substrings to the flattened array.
                    //
                    // * NOTE THAT * the HTML must be valid after division.
                    //  . We can create a Crawler for this text, find the nodes that contain texts, assign them a
                    // unique ID, and then add each of them to the flattened array one by one, with their unique element
                    // ID. After that, after the translation, we can replace the text nodes with the translated HTML and
                    // remove the IDs.

                    // Create a dummy Crawler
                    $dummyCrawler = $this->dummyBot->createDummyCrawler($value);

                    // Prepare the crawler for translation. Here, the elements that need to be translated are marked with
                    // IDs and classes. This marking is done by considering the maximum length constraint.
                    $nextId = 0;
                    $dummyCrawler->filter("body > div")->each(function($node) use (&$maxValueLength, &$nextId) {
                        /** @var Crawler $node */
                        $this->prepareNodeForTranslation($node->getNode(0), $maxValueLength, $nextId);
                    });

//                    $text = $this->dummyBot->getContentFromDummyCrawler($dummyCrawler);

                    // Find the elements that need to be translated and add them to the flattened array with their IDs.
                    $count = 0;
                    $dummyCrawler->filter(sprintf("[id*=%s]", sprintf($this->translateNodeIdFormat, '')))->each(function($node) use (&$count, &$flattened, &$dotKey) {
                        /** @var Crawler $node */
                        /** @var DOMElement $element */
                        $element = $node->getNode(0);

                        $id = $element->getAttribute("id");
                        $html = Utils::getNodeHTML($node);
                        $length = mb_strlen($html);

                        $flattened[] = [
                            "key"            => $dotKey . "." . $count,
                            "value"          => $html,
                            "length"         => $length,
                            "element_id"     => $id,
                            "parent_dot_key" => $dotKey,
                        ];
                        $count++;
                    });

                    // Store the prepared long text.
                    $text = $this->dummyBot->getContentFromDummyCrawler($dummyCrawler);

                    $this->longTextsPrepared[$dotKey] = $text;
                }
            }

        }

        return $flattened;
    }

    /**
     * Replaces the short codes inside the value with short code HTML elements so that they will not be translated.
     * See {@link $shortCodeElementTag}, {@link $shortCodeElementNameAttr}, and {@link $shortCodeElementOptionsAttr}.
     *
     * @param string $value
     * @since 1.8.0
     */
    private function replaceShortCodesWithHtmlElement(&$value) {
        // If there is no value or the value does not have a short code, nothing to do.
        if (!$value || !$this->hasShortCode($value)) return;

        // Get the regex that matches the short codes' opening parts
        $openingRegex = $this->getShortCodeMatchRegexForOpeningTag();

        // If there is no regex, nothing to do.
        if (!$openingRegex) return;

        // Match the short codes
        preg_match_all($openingRegex, $value, $matches);

        // If there is no match, nothing to do.
        if (!$matches || sizeof($matches) < 2) return;

        // $matches contain each capture group under the group's index. The regex matches three groups. $0 is the entire
        // short code, $1 is the short code name, and $2 is the short code options. So, $matches must have 3 indices as
        // 0, 1, and 2.
        $matchCount = sizeof($matches[0]);
        for($i = 0; $i < $matchCount; $i++) {
            $entireShortCode    = $matches[0][$i];
            $scName             = $matches[1][$i];
            $scOptions          = isset($matches[2]) && isset($matches[2][$i]) ? $matches[2][$i] : '';

            // Create the HTML element
            $htmlElement = $this->createShortCodeHtmlElementOpeningTag($scName, $scOptions);
            if (!$htmlElement) continue;

            // Replace the short code in the value with the HTML element
            $value = $this->findAndReplaceSingle($entireShortCode, $htmlElement, $value);
        }

        // Replace the closing tags of the short codes
        $closingRegex = $this->getShortCodeMatchRegexForClosingTag();
        if (!$closingRegex) return;

        $value = $this->findAndReplaceSingle($closingRegex, $this->createShortCodeHtmlElementClosingTag('$1'), $value, true);
    }

    /**
     * Creates a dummy HTML element for a short code.
     *
     * @param string      $shortCodeName    Name of the short code. See {@link $shortCodeElementNameAttr}.
     * @param string|null $shortCodeOptions Options of the short code. See {@link $shortCodeElementOptionsAttr}.
     * @return null|string An HTML element string whose tag is {@link $shortCodeElementTag}. The name and options
     *                     values are stored in {@link $shortCodeElementNameAttr} and
     *                     {@link $shortCodeElementOptionsAttr}, respectively. E.g. for [kdn-script async src="..."],
     *                     this will be returned:
     *                     &lt;kdn-sc-opening data-name="kdn-script" data-options="async src="...""&gt;&lt;/kdn-sc-opening&gt;
     * @since 1.8.0
     */
    private function createShortCodeHtmlElementOpeningTag($shortCodeName, $shortCodeOptions = null) {
        if (!$shortCodeName) return null;

        $optionsPart = '';
        if ($shortCodeOptions) $optionsPart = sprintf(' %1$s="%2$s"', $this->shortCodeElementOptionsAttr, htmlspecialchars($shortCodeOptions));

        return sprintf('<%1$s %2$s="%3$s"%4$s></%1$s>',
            $this->shortCodeElementTagForOpening,
            $this->shortCodeElementNameAttr,
            $shortCodeName,
            $optionsPart
        );
    }

    /**
     * Creates a dummy HTML element for a short code.
     *
     * @param string      $shortCodeName Name of the short code. See {@link $shortCodeElementNameAttr}.
     * @return null|string An HTML element string whose tag is {@link $shortCodeElementTag}. The name is stored in
     *                     {@link $shortCodeElementNameAttr}. E.g. for [/kdn-script],
     *                     this will be returned:
     *                     &lt;kdn-sc-closing data-name="kdn-script"&gt;&lt;/kdn-sc-closing&gt;
     * @since 1.8.0
     */
    private function createShortCodeHtmlElementClosingTag($shortCodeName) {
        if (!$shortCodeName) return null;

        return sprintf('<%1$s %2$s="%3$s"></%1$s>',
            $this->shortCodeElementTagForClosing,
            $this->shortCodeElementNameAttr,
            $shortCodeName
        );
    }

    /**
     * Get the regular expression that matches any short code defined in WordPress.
     *
     * @return false|string If there is no regex, false. Otherwise, the regex. The matches are: <ul>
     *                      <li>$0: Full short code. E.g. [kdn-script async src="..."]</li>
     *                      <li>$1: Short code name. E.g. kdn-script</li>
     *                      <li>$2: Short code options (might not exist). E.g. async src="..."</li>
     *                      </ul>
     * @since 1.8.0
     */
    private function getShortCodeMatchRegexForOpeningTag() {
        // If the regex was prepared before, return it.
        if ($this->shortCodeOpeningTagMatchRegex !== null) return $this->shortCodeOpeningTagMatchRegex;

        // Get the match part
        $matchPart = $this->getShortCodeMatchPartForRegex();
        if (!$matchPart) {
            $this->shortCodeOpeningTagMatchRegex = false;
            return false;
        }

        // $0: Entire short code
        // $1: Short code name
        // $2: Short code options
        $regex = '/\[(' . $matchPart . ')(?:\s([^\s].*?))?\]/';

        $this->shortCodeOpeningTagMatchRegex = $regex;
        return $this->shortCodeOpeningTagMatchRegex;
    }

    /**
     * Get the regular expression that matches the closing tag of any short code defined in WordPress.
     *
     * @return false|string If there is no regex, false. Otherwise, the regex. The matches are: <ul>
     *                      <li>$0: Full closing tag. E.g. [/kdn-script]</li>
     *                      <li>$1: Short code name. E.g. kdn-script</li>
     *                      </ul>
     * @since 1.8.0
     */
    private function getShortCodeMatchRegexForClosingTag() {
        // If the regex was prepared before, return it.
        if ($this->shortCodeClosingTagMatchRegex !== null) return $this->shortCodeClosingTagMatchRegex;

        // Get the match part
        $matchPart = $this->getShortCodeMatchPartForRegex();
        if (!$matchPart) {
            $this->shortCodeClosingTagMatchRegex = false;
            return false;
        }

        // $0: Entire closing tag
        // $1: Short code name
        $regex = '/\[\/(' . $matchPart . ')\]/';

        $this->shortCodeClosingTagMatchRegex = $regex;
        return $this->shortCodeClosingTagMatchRegex;
    }

    /**
     * @return false|string See {@link $shortCodeMatchPartForRegex}.
     * @since 1.8.0
     */
    private function getShortCodeMatchPartForRegex() {
        if ($this->shortCodeMatchPartForRegex !== null) return $this->shortCodeMatchPartForRegex;

        // We need to change all short code tags defined in WordPress.
        global $shortcode_tags;

        if (!$shortcode_tags) {
            $this->shortCodeMatchPartForRegex = false;
            return false;
        }

        // Get the names of the short codes
        $shortCodeNames = array_keys($shortcode_tags);

        // Create the regex that matches only the shorts defined in WordPress.
        $matchPart = implode('|', array_map(function($v) {
            return preg_quote($v);
        }, $shortCodeNames));

        $this->shortCodeMatchPartForRegex = $matchPart;
        return $this->shortCodeMatchPartForRegex;
    }

    /**
     * Extract to-be-translated texts from the flattened array
     *
     * @param array $flattened A flattened text array retrieved from {@link flattenTexts}
     * @return array An array of texts
     */
    public function getTextsToTranslateFromFlattened($flattened) {
        return array_column($flattened, "value");
    }

    /**
     * @param array $translatedTexts An array of texts, which stores translated values of the items in the flattened
     *                               array.
     * @param array $flattened       A flattened text array retrieved from {@link flattenTexts}
     * @param int   $startIndex      Index of flattened array item that corresponds to the 0th item of $translatedTexts
     * @return array
     * @throws \Exception When $startIndex is not valid.
     */
    public function remapTranslatedTexts($translatedTexts, $flattened, $startIndex = 0) {
        // Get translated flattened array
        $translatedFlattened = $flattened;
        for($i = $startIndex; $i < sizeof($translatedTexts); $i++) {
            if(!isset($flattened[$i])) throw new \Exception("Item with start index {$i} does not exist in flattened array.");

            $translatedFlattened[$i]["value"] = $translatedTexts[$i];
        }

        $texts = $this->expandFlattenedTexts($translatedFlattened);

        return $texts;
    }

    /**
     * Expands a flattened texts array.
     *
     * @param array $flattened     A flattened text array retrieved from {@link flattenTexts}
     * @return array Expanded array
     */
    public function expandFlattenedTexts($flattened) {
        // Recreate the original text array by using the dot-notation keys in flattened array
        $texts = [];
        $combinedContent = null;

        /** @var array $crawlers Stores crawlers for long texts. Structure: [string dot_key => Crawler crawler] */
        $crawlers = [];

        for($i = 0; $i < sizeof($flattened); $i++) {
            $item = $flattened[$i];

            $dotKey         = $item["key"];
            $value          = $this->revertShortCodeHtmlElements($item["value"]); // Revert the short code HTML elements back to the short codes
            $parentDotKey   = Utils::array_get($item, "parent_dot_key", null);
            $elementId      = Utils::array_get($item, "element_id");

            if($parentDotKey && $elementId) {
                if(!isset($crawlers[$parentDotKey])) {
                    $longText = Utils::array_get($this->longTextsPrepared, $parentDotKey);

                    // Revert the operation that replaced short codes with dummy HTML elements
                    $longText = $this->revertShortCodeHtmlElements($longText);

                    $crawlers[$parentDotKey] = $this->dummyBot->createDummyCrawler($longText);
                }

                /** @var Crawler $crawler */
                $crawler = $crawlers[$parentDotKey];
                $this->dummyBot->findAndReplaceInElementHTML($crawler, ['[id="'. $elementId . '"]'], ".*?", $value, true);

            } else {
                // Before setting the value, revert the operation that replaced short codes with dummy HTML elements
                array_set($texts, $dotKey, $this->revertShortCodeHtmlElements($value));
            }

        }

        // If there are crawlers, get their content and assign to the related dot key.
        if($crawlers) {
            $idSelector                 = "[id*=" . sprintf($this->translateNodeIdFormat, '') . "]";
            $translateIdRegex           = sprintf($this->translateNodeIdFormat, "[0-9]+");
            $emptyIdRegex               = '(\sid=?(?:\'\'|""))|(\sid)[>\s]';
            $unwrapSelector             = "." . $this->classUnwrap;
            $unwrapFindRegex            = sprintf('^<([^\s>]+).*?class=["\']%1$s["\'].*?>((?:.|\n)*)?<\/\1>$', $this->classUnwrap);
            $unwrapReplaceRegex         = "$2";
            $findUnnecessaryNewLines    = sprintf('(<%1$s.*?>|<\/%1$s>)\n', $this->translateElementTagName);

            foreach($crawlers as $dotKey => $crawler) {
                // Remove added IDs
                $this->dummyBot->findAndReplaceInElementAttribute($crawler, [$idSelector], 'id', $translateIdRegex, '', true);

                // Remove empty ID attributes
                $this->dummyBot->findAndReplaceInElementHTML($crawler, ["[id]"], $emptyIdRegex, "", true);

                // Remove unnecessary new-lines
                $content = $this->dummyBot->getContentFromDummyCrawler($crawler);
                $content = $this->findAndReplaceSingle($findUnnecessaryNewLines, "$1", $content, true, false);
                $crawler = $this->dummyBot->createDummyCrawler($content);

                // Find elements to be unwrapped from their encapsulating tags and create an array storing what to find
                // and with what to replace to unwrap the surrounding tags. We are doing the replacement operation twice.
                // This is because we cannot directly remove surrounding tags. Hence, we need to do it in the raw text
                // instead of in Crawler. So, we find the elements to be unwrapped, get their HTML, remove the surrounding
                // tags, and after this, use this information to get rid of surrounding tags in the raw text of source HTML.
                $findAndReplaces = [];
                $crawler->filter($unwrapSelector)->each(function($node) use (&$findAndReplaces, &$unwrapFindRegex, &$unwrapReplaceRegex) {
                    /** @var Crawler $node */
                    $html = Utils::getNodeHTML($node);
                    $replaced = $this->findAndReplaceSingle($unwrapFindRegex, $unwrapReplaceRegex, $html, true, false);
                    $findAndReplaces[] = [
                        "find"    => $html,
                        "replace" => $replaced
                    ];
                });

                // Get the prepared content
                $content = $this->dummyBot->getContentFromDummyCrawler($crawler);

                // Remove the surrounding tags.
                $content = $this->findAndReplace($findAndReplaces, $content, false);

                // Assign the content to the related key
                array_set($texts, $dotKey, trim($content));
            }
        }

        return $texts;
    }

    /**
     * Revert the operation that replaced short codes with dummy HTML elements, i.e.
     * {@link replaceShortCodesWithHtmlElement()}
     *
     * @param string $value
     * @return string The value whose short code elements are reverted to the short codes.
     * @since 1.8.0
     */
    private function revertShortCodeHtmlElements($value) {
        // If there is no value, no need to proceed.
        if (!$value) return $value;

        /** @var Crawler $crawler */
        $crawler = null;

        // Stores the find-replaces that will replace the HTMLs with actual short codes
        $findAndReplaces = [];

        // If it has opening element
        if (str_contains($value, '<' . $this->shortCodeElementTagForOpening)) {
            if (!$crawler) $crawler = $this->dummyBot->createDummyCrawler($value);

            $crawler->filter($this->shortCodeElementTagForOpening)->each(function($node) use (&$findAndReplaces) {
                /** @var Crawler $node */
                $html = Utils::getNodeHTML($node);
                $scName = $node->attr($this->shortCodeElementNameAttr);
                $scOptions = $node->attr($this->shortCodeElementOptionsAttr);

                $shortCode = sprintf('[%1$s%2$s]', $scName, $scOptions ? ' ' . htmlspecialchars_decode($scOptions) : '');
                $findAndReplaces[] = $this->createFindReplaceConfig($html, $shortCode);
            });
        }

        // If it has closing element
        if (str_contains($value, '<' . $this->shortCodeElementTagForClosing)) {
            if (!$crawler) $crawler = $this->dummyBot->createDummyCrawler($value);

            $crawler->filter($this->shortCodeElementTagForClosing)->each(function($node) use (&$findAndReplaces) {
                /** @var Crawler $node */
                $html = Utils::getNodeHTML($node);
                $scName = $node->attr($this->shortCodeElementNameAttr);

                $findAndReplaces[] = $this->createFindReplaceConfig($html, "[/{$scName}]");
            });
        }

        // If there are no replacements or there is no Crawler stop.
        if (!$findAndReplaces || !$crawler) return $value;

        // Get the content from the Crawler
        $content = $this->dummyBot->getContentFromDummyCrawler($crawler);

        // Replace the short code elements with actual short codes
        $value = $this->findAndReplace($findAndReplaces, $content, false);

        return $value;
    }

    /**
     * Prepares the node for text translation. The preparation is done by adding IDs and classes to the elements that
     * need to be translated.
     *
     * @param DOMNode $node
     * @param int     $maxTextLength          Maximum length a text can have.
     * @param int     $nextTranslationId      ID of the next to-be-translated element. Pass a variable for this
     *                                        parameter so that the count can be tracked.
     */
    public function prepareNodeForTranslation($node, $maxTextLength = 0, &$nextTranslationId = 0) {
        // Get HTML of the node and find its length.
        $html = $node->ownerDocument->saveHTML($node);
        $length = mb_strlen($html);
        $lengthTrimmed = mb_strlen(trim($html));

        // If this node has a sibling, process it.
        if($node->nextSibling) $this->prepareNodeForTranslation($node->nextSibling, $maxTextLength, $nextTranslationId);

        // No need to proceed further if this is an empty element. No need to check its children as well.
        if($lengthTrimmed < 1) return;

        // Do not proceed further if this is a comment node. No need to check its children as well.
        if($node->nodeName == '#comment') return;

        $isLong = $length > $maxTextLength;

        // If this is a text node, divide it and wrap each part with p tag so that we can find the parts of the text
        // node after translation.
        if($node->nodeName == '#text') {
            // Divide the text so that length of each part is less than $maxTextLength. Wrap each part with
            // <p id="kdn-translate-[number]" class="kdn-translate-unwrap">

            $offsets = [];

            // If this is a long text, divide it.
            if($isLong) {
                $tryCount = 0;
                while(!$offsets) {

                    switch($tryCount) {
                        // 1. Check for new-lines:  \n
                        case 0:
                            preg_match_all('/\n/', $html, $matches, PREG_OFFSET_CAPTURE);
                            break;

                        // 2. Check for ..., !, ?, ., :, ", ', ], ), } etc:     \.{2,}|[.?!:][]\"')}]*
                        case 1:
                            preg_match_all('/\.{2,}|[.?!:][]\"\')}]*/', $html, $matches, PREG_OFFSET_CAPTURE);
                            break;

                        // 3. We could not find a good division location. Just divide the text from locations that satisfy
                        // the max length constraint. This is bad for translation. However, it is better than no translation
                        // at all.
                        case 2:
                            $offsets[] = $maxTextLength - 1;
                            while(true) {
                                $newOffset = $offsets[sizeof($offsets) - 1] + $maxTextLength - 1;
                                $offsets[] = $newOffset;

                                if($newOffset > $length - 1) break;
                            };

                            break 2;

                        // Get ouf of the while loop.
                        default:
                            break 2;
                    }

                    if(isset($matches) && $matches && $matches = $matches[0]) {
                        $offsets = $this->findClosestOffsetFromMatches($matches, $maxTextLength);
                    }

                    // Invalidate the matches.
                    $matches = [];

                    // Increase the try count.
                    $tryCount++;
                }

            // Otherwise, no need to divide. Just add the maximum offset so that the text wont't be divided.
            } else {
                $offsets[] = $length - 1;
            }

            // If there are offsets that we can use to divide the text, let's divide it.
            if($offsets) {
                // Add 0 to the beginning of $offsets.
                array_unshift($offsets, 0);

                // Make sure the last offset is not greater than the max offset there can be.
                if($offsets[sizeof($offsets) - 1] > $length - 1) $offsets[sizeof($offsets) - 1] = $length - 1;

                // Divide the text using the offsets.
                $modifiedText = '';
                for($i = 0; $i < sizeof($offsets) - 1; $i++) {
                    $startOffset = $offsets[$i];
                    $endOffset = $offsets[$i + 1];

                    // Increase start offset by 1 if this is not the first offset. By this way, we avoid using the
                    // same offset for the next item in the loop. This is important because we do not want to duplicate
                    // end-of-sentence chars. E.g. if there is a space at an offset and the offset is used as the end
                    // offset for this one and as the start offset for the next one, the space char is duplicated. To
                    // avoid this, we do not use the same offset twice.
                    if($i > 0 && $startOffset + 1 < $endOffset) $startOffset += 1;

                    $text = mb_substr($html, $startOffset, $endOffset - $startOffset + 1);
                    if(!$text || !trim($text)) continue;

                    $text = sprintf('<%4$s id="%1$s" class="%2$s">%3$s</%4$s>', sprintf($this->translateNodeIdFormat,
                        $nextTranslationId), $this->classUnwrap, $text, $this->translateElementTagName);
                    $nextTranslationId++;

                    $modifiedText .= $text;
                }

                // No need to proceed if modified text is empty.
                if(!$modifiedText) return;

                // Replace the node's text with the modified version.
                // We cannot just change the nodeValue, because it strips HTML tags. To be able to successfully change it,
                // first, create a document fragment. Then, append the newValue to the fragment. Finally, replace the
                // node with the fragment.
                $fragment = $node->ownerDocument->createDocumentFragment();

                // Suppress warnings so that the script keeps running.
                // There may be problems regarding a few characters, such as &amp;, when parsing XML. So, handle the
                // errors to keep the script running.
                if (@$fragment->appendXML($modifiedText)) {
                    $node->parentNode->replaceChild($fragment, $node);

                } else {
                    // Write an error to the error log file.
                    error_log("KDN Auto Leech - XML is not valid for '" . mb_substr($modifiedText, 0, 250) . "'");
                }

            }

            // We are done with this node.
            return;
        }

        // If this non-text element is not long, just add an ID to it. Make sure this is a DOMElement, because attribute
        // getters and setters are only available for DOMElement.
        if(!$isLong && is_a($node, DOMElement::class)) {
            /** @var DOMElement $node */

            $prevId = $node->getAttribute("id");
            $idToAdd = sprintf($this->translateNodeIdFormat, $nextTranslationId);
            $newId = $prevId ? ($prevId . " " . $idToAdd) : $idToAdd;

            $node->setAttribute("id", $newId);

            // Increase next ID by one.
            $nextTranslationId++;

            // We are done with this node.
            return;
        }

        // If it is long and has children, process them as well.
        if($isLong && $node->hasChildNodes()) {
            $this->prepareNodeForTranslation($node->childNodes->item(0), $maxTextLength, $nextTranslationId);
        }

    }

    /**
     * Finds offsets that can be used to divide a text so that a max-length constraint is satisfied.
     *
     * @param array $matches   An array of arrays. Each inner array must have 2 values. Index 0 stores the matched
     *                         text, and index 1 stores the offset of the matched text.
     * @param int $maxLength   Maximum length of text between two offsets.
     * @return \int[] The offsets
     */
    public function findClosestOffsetFromMatches($matches, $maxLength) {
        $offsets = [];
        $minOffset = 0;
        $maxOffset = $maxLength - 1;

        $closestOffset = 0;
        for($i = 0; $i < sizeof($matches); $i++) {
            $match = $matches[$i];

            // $match[1] is the offset.
            $currentOffset = $match[1];

            // If current offset satisfies the constraints, assign it as the closest offset.
            if($currentOffset < $maxOffset && $currentOffset >= $minOffset) {
                // The matches are ordered by their offset in ascending. So, it is safe to assign the found offset as
                // the closest offset.
                $closestOffset = $currentOffset + mb_strlen($match[0]);

            // Otherwise, we have found the best possible offset that satisfies the max length constraint. So, let's
            // add this offset to the result. Then, continue looking for another offset.
            } else if($currentOffset > $maxOffset && $closestOffset > 0) {
                $offsets[] = $closestOffset;

                $minOffset = $closestOffset + 1;
                $maxOffset = $minOffset + $maxLength - 1;

                // Invalidate the closest offset and continue looking for the next closest offset from the previous
                // match. Because, the previous match might be valid for current constraints.
                $closestOffset = 0;
                $i--;
            }
        }

        // Add the last found closest offset if it is not already added.
        if($closestOffset > 0 && $offsets && $offsets[sizeof($offsets) - 1] != $closestOffset) {
            $offsets[] = $closestOffset;
        }

        return $offsets;
    }

    /*
     * STATIC HELPERS
     */

    /**
     * Get the options that can be used in a select element that the user can select which translation service he/she
     * wants to use.
     *
     * @return array
     */
    public static function getTranslationServiceOptionsForSelect() {
        return [
            TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION    => _kdn('Google Cloud Translation API'),
            TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT   => _kdn('Microsoft Translator Text API'),
            TextTranslator::KEY_YANDEX_TRANSLATOR           => _kdn('Yandex Translator API'),
        ];
    }

    /**
     * Get supported languages for translation APIs.
     *
     * @param array $data                The structure is: [
     *                                      TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION  => ["project_id" => '', "api_key" => ''],
     *                                      TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT => ["client_secret" => '']
     *                                   ]
     * @param bool  $fromCacheIfPossible True if you want to get the cached results if they exist. False if you want to
     *                                   get the results by making requests no matter what.
     *
     * @return array The structure is: [
     *                                   TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION  => ["code1" => "Lang 1", "code2" => "Lang 2", ...],
     *                                   TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT => ["code1" => "Lang 1", "code2" => "Lang 2", ...]
     *                                   ]
     */
    public static function getSupportedLanguages($data = [], $fromCacheIfPossible = true) {
        $googleTranslateProjectId       = Utils::array_get($data, TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION . ".project_id");
        $googleTranslateApiKey          = Utils::array_get($data, TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION . ".api_key");
        $microsoftTranslateClientSecret = Utils::array_get($data, TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT . ".client_secret");
        $yandexTranslateApi             = Utils::array_get($data, TextTranslator::KEY_YANDEX_TRANSLATOR . ".api");

        // Initialize the results
        $results = [
            TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION    => [],
            TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT   => [],
            TextTranslator::KEY_YANDEX_TRANSLATOR           => [],
            "errors"                                        => [],
        ];

        // Get cached values if they are requested
        $googleTranslateCache           = $fromCacheIfPossible ? get_option(static::OPTION_KEY_CACHED_LANGUAGES_GOOGLE_TRANSLATE, [])           : [];
        $microsoftTranslatorTextCache   = $fromCacheIfPossible ? get_option(static::OPTION_KEY_CACHED_LANGUAGES_MICROSOFT_TRANSLATOR_TEXT, [])  : [];
        $yandexTranslatorCache          = $fromCacheIfPossible ? get_option(static::OPTION_KEY_CACHED_LANGUAGES_YANDEX_TRANSLATOR, [])  : [];

        /*
         * GOOGLE TRANSLATE
         */

        if($googleTranslateCache) {
            $results[TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION] = $googleTranslateCache;

        } else if($googleTranslateProjectId && $googleTranslateApiKey) {
            $translate = new GoogleTranslateAPIClient($googleTranslateProjectId, $googleTranslateApiKey);
            $languages = $translate->getLocalizedLanguagesAsAssocArray();

            $results[TextTranslator::KEY_GOOGLE_CLOUD_TRANSLATION] = $languages;

            // Update the cache
            update_option(static::OPTION_KEY_CACHED_LANGUAGES_GOOGLE_TRANSLATE, $languages, false);
        }

        /*
         * MICROSOFT TRANSLATOR TEXT
         */

        if($microsoftTranslatorTextCache) {
            $results[TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT] = $microsoftTranslatorTextCache;

        } else if($microsoftTranslateClientSecret) {
            $translate = new MicrosoftTranslateAPIClient($microsoftTranslateClientSecret);
            $languages = $translate->getLocalizedLanguagesAsAssocArray();

            $results[TextTranslator::KEY_MICROSOFT_TRANSLATOR_TEXT] = $languages;

            // Update the cache
            update_option(static::OPTION_KEY_CACHED_LANGUAGES_MICROSOFT_TRANSLATOR_TEXT, $languages, false);
        }

        /*
         * YANDEX TRANSLATOR
         */

        if($yandexTranslatorCache) {
            $results[TextTranslator::KEY_YANDEX_TRANSLATOR] = $yandexTranslatorCache;

        } else if($yandexTranslateApi) {
            $translate = new Translator($yandexTranslateApi);
            $languages = $translate->getSupportedLanguages('vi')['langs'];

            $results[TextTranslator::KEY_YANDEX_TRANSLATOR] = $languages;

            // Update the cache
            update_option(static::OPTION_KEY_CACHED_LANGUAGES_YANDEX_TRANSLATOR, $languages, false);
        }

        return $results;
    }

    /**
     * Prepares "from" languages for select by prepending a "detect language" item.
     *
     * @param array $languages
     * @return array
     */
    public static function prepareFromLanguagesForSelect($languages) {
        $detectLanguageItem = ['detect' => _kdn("Detect language")];
        return $languages ? $detectLanguageItem + $languages : $languages;
    }

}