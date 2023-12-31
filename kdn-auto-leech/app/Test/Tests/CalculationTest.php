<?php

namespace KDNAutoLeech\Test\Tests;


use KDNAutoLeech\Objects\OptionsBox\Boxes\Def\DefaultOptionsBoxApplier;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Def\DefaultOptionsBoxData;
use KDNAutoLeech\Objects\StringCalculator;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class CalculationTest extends AbstractTest {

    /** @var string */
    private $message;

    /**
     * Conduct the test and return an array of results.
     *
     * @param TestData $data Information required for the test
     * @return array|string|mixed
     */
    protected function createResults($data) {
        // Here, form item values must be an array.
        if(!$data->getFormItemValues() || !is_array($data->getFormItemValues())) return null;

        $formula = array_values($data->getFormItemValues())[0];
        if (!$formula) return [];

        $results = [];

        if ($data->getTestData()) {
            // If the data comes from the options box, we cannot apply all options box settings. So, let's apply some
            // of them.

            /** @var DefaultOptionsBoxApplier $applier */
            $applier = null;

            if ($data->isFromOptionsBox()) {
                $applier = $data->applyOptionsBoxSettingsToTestData(function($applier) {
                    /** @var DefaultOptionsBoxApplier $applier */

                    // Since this is a calculation test, do not apply all calculation options coming from the options box.
                    // There might be a number of calculation options. We want to test only the calculation that the user
                    // wants to test.
                    $applier->setApplyCalculationOptions(false);

                    // Do not apply template options as well. Templates will be made ready after calculations are done.
                    $applier->setApplyTemplateOptions(false);
                });
            }

            // Create a string calculator using the calculation options
            /** @var DefaultOptionsBoxData $boxData */
            $boxData = $data->getOptionsBoxData();
            $calcOptions = $boxData->getCalculationOptions();

            $calc = new StringCalculator(
                $calcOptions->getDecimalSeparatorAfter(),
                $calcOptions->getPrecision(),
                $calcOptions->isUseThousandsSeparator()
            );

            foreach($data->getTestData() as $val) {
                try {
                    if ($applier) $applier->replaceItemDotNotationShortCode($formula);

                    $results[] = $calc->calculateForX($formula, $applier->isTreatAsJson() ? 0 : $val);

                } catch(\Exception $e) {
                    $results[] = "";
                }
            }
        }

        $this->message = sprintf(
            _kdn('Test results for %1$s:'),
            "<span class='highlight formula'>{$formula}</span>"
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
            ->with("message", $this->message);
    }
}