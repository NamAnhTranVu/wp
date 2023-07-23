<?php

namespace KDNAutoLeech\Test\Tests;


use KDNAutoLeech\Objects\Enums\ShortCodeName;
use KDNAutoLeech\Objects\OptionsBox\Boxes\Def\DefaultOptionsBoxApplier;
use KDNAutoLeech\Objects\Traits\ShortCodeReplacer;
use KDNAutoLeech\Test\Base\AbstractTest;
use KDNAutoLeech\Test\Data\TestData;
use KDNAutoLeech\Utils;

class TemplateTest extends AbstractTest {

    use ShortCodeReplacer;

    private $message;

    /**
     * Conduct the test and return an array of results.
     *
     * @param TestData $data Information required for the test
     * @return array|string|mixed
     */
    protected function createResults($data) {
        // Here, form item values must be an array
        if(!$data->getFormItemValues() || !is_array($data->getFormItemValues())) return [];

        // Get the template
        $template = Utils::array_get($data->getFormItemValues(), 'template');
        if (!$template) return [];

        $results = [];

        if ($data->getTestData()) {
            // If the data comes from the options box, we cannot apply all options box settings. So, let's apply some
            // of them.
            if ($data->isFromOptionsBox()) {
                $data->applyOptionsBoxSettingsToTestData(function($applier) {
                    /** @var DefaultOptionsBoxApplier $applier */

                    // Since this is a template test, do not apply all template options coming from the options box.
                    // There might be a number of template options. We want to test only the template that the user
                    // wants to test.
                    $applier->setApplyTemplateOptions(false);
                });
            }

            foreach($data->getTestData() as $val) {
                // Create a copy since replaceShortCode method works with the reference, i.e. it modifies the template.
                $newTemplate = $template;
                $this->replaceShortCode($newTemplate, ShortCodeName::KDN_ITEM, $val);
                $results[] = $newTemplate;
            }
        }

        $this->message = sprintf(
            _kdn('%2$s Test results for %1$s:'),
            "<span class='highlight template'>" . (mb_strlen($template) > 200 ? mb_substr($template, 0, 199) . '...' : $template) . "</span>",
            sprintf(
                _kdn('Only %1$s short code is replaced for testing purposes.'),
                "<span class='highlight short-code'>[" . ShortCodeName::KDN_ITEM . "]</span>"
            )
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