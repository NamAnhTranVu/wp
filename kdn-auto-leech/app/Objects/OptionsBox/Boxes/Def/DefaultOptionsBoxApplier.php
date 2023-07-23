<?php

namespace KDNAutoLeech\Objects\OptionsBox\Boxes\Def;


use KDNAutoLeech\Exceptions\StopSavingException;
use KDNAutoLeech\Objects\Enums\ShortCodeName;
use KDNAutoLeech\Objects\Informing\Informer;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxApplier;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Base\BaseOptionsBoxData;
use KDNAutoLeech\Objects\StringCalculator;
use KDNAutoLeech\Objects\Translation\TranslatableTranslator;
use KDNAutoLeech\Objects\Traits\FindAndReplaceTrait;
use KDNAutoLeech\Objects\Traits\ShortCodeReplacer;
use KDNAutoLeech\Utils;

class DefaultOptionsBoxApplier extends BaseOptionsBoxApplier {

    use FindAndReplaceTrait;
    use ShortCodeReplacer;

    // TODO: We need a wildcard in the dot notation used to get values from JSON. When a wildcard is provided, we should
    // get all items. Hence, there will be an array of values.

    /**
     * @var string Stores the resultant value. This will be used as the final value. It will also be used to replace
     *      [kdn-item] short code
     */
    private $finalValue;

    /**
     * @var mixed This can either be array or string. If the item is parsed to JSON, this stores the array version of
     *      the JSON.
     */
    private $arrayValue;

    /*
     *
     */

    private $translator;

    /** @var bool */
    private $shouldApplyGeneralOptions      = true;

    /** @var bool */
    private $shouldApplyFindReplaceOptions  = true;

    /** @var bool */
    private $shouldApplyTemplateOptions     = true;

    /** @var bool */
    private $shouldApplyCalculationOptions  = true;

    /*
     *
     */

    /** @var StringCalculator|null */
    private $stringCalculator = null;

    /** @var bool True if the item should be treated as JSON. */
    private $isTreatAsJson = false;

    /** @var bool True if the item should be transalte. */
    private $isTranslation = false;

    /**
     * Applies the options configured in options box to the given value
     * @param mixed $value
     * @return mixed|null $modifiedValue Null, if the item should be removed. Otherwise, the modified value.
     */
    public function apply($value, $url = null, $botSettings = null, $postData = null) {
        if (!$this->dataExists() || is_object($value) || is_array($value)) return $value;

        $this->finalValue = $value;

        $translationOptions = $botSettings ? $botSettings->getSettingForCheckbox('_active_translation_options') : null;

        if ($translationOptions && $botSettings && $postData) $this->translator = new TranslatableTranslator($botSettings, $postData);

        try {
            $this->applyFindReplaceOptions($url);
            $this->applyGeneralOptions();
            $this->applyCalculationOptions();
            $this->applyTemplateOptions();

        } catch(StopSavingException $e) {
            return null;
        }

        return $this->finalValue;
    }

    /*
     * APPLIER CONFIGURATION METHODS
     */

    /**
     * @param bool $apply True if the general options should be applied. Otherwise, false.
     * @return $this
     */
    public function setApplyGeneralOptions($apply) {
        $this->shouldApplyGeneralOptions = $apply;
        return $this;
    }

    /**
     * @param bool $apply True if the find-replace options should be applied. Otherwise, false.
     * @return $this
     */
    public function setApplyFindReplaceOptions($apply) {
        $this->shouldApplyFindReplaceOptions = $apply;
        return $this;
    }

    /**
     * @param bool $apply True if the calculation options should be applied. Otherwise, false.
     * @return $this
     */
    public function setApplyCalculationOptions($apply) {
        $this->shouldApplyCalculationOptions = $apply;
        return $this;
    }

    /**
     * @param bool $apply True if the template options should be applied. Otherwise, false.
     * @return $this
     */
    public function setApplyTemplateOptions($apply) {
        $this->shouldApplyTemplateOptions = $apply;
        return $this;
    }

    /*
     *
     */

    /**
     * Replaces [kdn-item dot.key] short code in a string, considering whether the value is being treated as JSON.
     *
     * @param string $haystack A string that is searched for kdn-item short code and replaced with value.
     */
    public function replaceItemDotNotationShortCode(&$haystack) {
        // Match kdn-item short codes in the haystack.
        $regexShortCode = sprintf('/\[%1$s[^\]\[]*\]/u', ShortCodeName::KDN_ITEM);
        $result = preg_match_all($regexShortCode, $haystack, $matches);

        // If there is no match, return.
        if ($result === false || !$matches) return;

        // Replace the short codes
        foreach($matches[0] as $shortCode) {
            $shortCodeLength = mb_strlen($shortCode);

            // Remove the brackets, which are the first and the last chars
            $withoutBrackets = mb_substr($shortCode, 1, $shortCodeLength - 2);

            // Explode the short code from spaces. We need the first index. It must store the dot key.
            $parts = explode(' ', $withoutBrackets);
            if ($parts && isset($parts[1])) {
                $key = $parts[1];

                // Get the short code value from the parsed JSON if the item is treated as JSON
                if ($this->isTreatAsJson) {
                    $shortCodeValue = Utils::array_get($this->arrayValue, $key, '');

                // Otherwise, replace it with the final value.
                } else {
                    $shortCodeValue = $this->finalValue;
                }

                // Make sure the value is string.
                if (is_array($shortCodeValue)) {
                    $shortCodeValue = json_encode($shortCodeValue);
                }

            } else {
                // If there is no key, replace the short code with an empty string.
                $shortCodeValue = $this->isTreatAsJson ? '' : $this->finalValue;
            }

            // Replace it
            $haystack = str_replace($shortCode, $shortCodeValue, $haystack);
        }

    }

    /**
     * @return bool See {@link $isTreatAsJson}
     */
    public function isTreatAsJson() {
        return $this->isTreatAsJson;
    }

    /**
     * @return bool See {@link $isTreatAsJson}
     */
    public function isTranslation() {
        return $this->isTranslation;
    }

    /*
     * APPLIER METHODS
     */

    /**
     * Applies the find-replace options if they should be applied.
     */
    private function applyFindReplaceOptions($url = null) {
        // Stop if the find-replace options should not be applied.
        if (!$this->shouldApplyFindReplaceOptions) return;

        $frOptions = $this->getData()->getFindReplaceOptions();
        if (!$frOptions) return;

        $this->finalValue = $this->findAndReplace($frOptions, $this->finalValue, true, $url);
    }

    /**
     * Applies general options if they should be applied.
     *
     * @throws StopSavingException
     */
    private function applyGeneralOptions() {
        if (!$this->shouldApplyGeneralOptions) return;

        $generalOptions = $this->getData()->getGeneralOptions();
        if (!$generalOptions) return;

        // If the item should be translate, translate it.
        if ($generalOptions->isTranslation()) {
            $this->isTranslation = true;

            // If there is no value, stop.
            if ($this->finalValue && $this->translator) {
                // Translate text
                $this->finalValue = $this->translator->translatePreparedTexts([$this->finalValue])[0];

                // If parsing was not successful, stop.
                if ($this->finalValue === null) {
                    Informer::addError(sprintf(_kdn('Can not translate. String: %1$s'), $this->finalValue))
                        ->addAsLog();
                }
            }
        }

        // If the item should be treated as JSON, parse it.
        if ($generalOptions->isTreatAsJson()) {
            $this->isTreatAsJson = true;

            // If there is no value, stop.
            if (!$this->finalValue) throw new StopSavingException();

            // Parse the JSON as array
            $this->arrayValue = json_decode($this->finalValue, true);

            // If parsing was not successful, stop.
            if ($this->arrayValue === null) {
                Informer::addError(sprintf(_kdn('JSON could not be parsed. JSON string: %1$s'), $this->finalValue))
                    ->addAsLog();

                throw new StopSavingException();
            }
        }

    }

    /**
     * Applies the calculation options if they should be applied.
     * @throws StopSavingException If the value is not numeric and the item should be removed completely.
     */
    private function applyCalculationOptions() {
        if(!$this->shouldApplyCalculationOptions) return;

        $calculationOptions = $this->getData()->getCalculationOptions();
        if (!$calculationOptions) return;

        // Get the formulas. If there is no formula, stop.
        $formulas = $calculationOptions->getFormulas();
        if (!$formulas) {
            // If the value is not numeric and it should be removed when it is not numeric, throw an exception, which
            // indicates that the item should be removed.
            if ($calculationOptions->isRemoveIfNotNumeric() && !is_numeric($this->finalValue)) {
                throw new StopSavingException();
            }

            return;
        }

        // Get the calculator
        $calculator = $this->getStringCalculator();

        // Select a random formula
        $formula = $formulas[array_rand($formulas, 1)];

        // Apply calculation options
        try {
            // Replace the kdn-item short codes if the value is array.
            $this->replaceItemDotNotationShortCode($formula);

            // If there is an array value, it means the user wants to use JSON. Hence, in this case, final value is not
            // intended to be used as a number. So, the user must not use X in the formula. He/she must use [kdn-item]
            // short code with a dot notation.
            $this->finalValue = $calculator->calculateForX($formula, is_array($this->arrayValue) ? 0 : $this->finalValue);

        } catch (\Exception $e) {
            $this->finalValue = '';

            if ($calculationOptions->isRemoveIfNotNumeric()) {
                throw new StopSavingException();
            }
        }
    }

    /**
     * Applies the template options if they should be applied.
     *
     * @throws StopSavingException
     */
    private function applyTemplateOptions() {
        if (!$this->shouldApplyTemplateOptions) return;

        // Get the templates. If there is no template, stop.
        $templateOptions = $this->getData()->getTemplateOptions();
        if (!$templateOptions) return;

        // Stop saving if the item is empty and the user wants to remove it.
        if ($templateOptions->isRemoveIfEmpty() && !$this->finalValue) {
            throw new StopSavingException();
        }

        // Select a random template
        $templates = $templateOptions->getTemplates();
        if (!$templates) return;

        $template = $templates[array_rand($templates, 1)];

        // Replace only the item short code in the template.
        $this->replaceShortCode($template, ShortCodeName::KDN_ITEM, $this->finalValue);

        // Replace the kdn-item short codes if the reference value is array.
        $this->replaceItemDotNotationShortCode($template);

        // Set the value as template whose item short code has just been replaced
        $this->finalValue = $template;
    }

    /*
     * HELPERS
     */

    /**
     * Get string calculator configured for this options box
     * @return StringCalculator
     */
    private function getStringCalculator() {
        if (!$this->stringCalculator) {
            $this->stringCalculator = new StringCalculator(
                $this->getData()->getCalculationOptions()->getDecimalSeparatorAfter(),
                $this->getData()->getCalculationOptions()->getPrecision(),
                $this->getData()->getCalculationOptions()->isUseThousandsSeparator()
            );
        }

        return $this->stringCalculator;
    }

    /**
     * @return BaseOptionsBoxData|DefaultOptionsBoxData
     * @since 1.8.0
     */
    public function getData() {
        return parent::getData();
    }

}