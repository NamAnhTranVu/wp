<?php

namespace KDNAutoLeech\Objects\GlobalShortCodes\ShortCodes;


use KDNAutoLeech\Objects\DomainValidator;
use KDNAutoLeech\Objects\GlobalShortCodes\ShortCodes\Base\BaseGlobalShortCode;
use KDNAutoLeech\Utils;

class IFrameGlobalShortCode extends BaseGlobalShortCode {

    /**
     * @return string Tag of the short code. E.g. "kdn-iframe". Use only lower case characters.
     * @since 1.8.0
     */
    public function getTagName() {
        return "kdn-iframe";
    }

    /**
     * @param array       $attributes The attributes passed to the short code. These are prepared by allowing only the
     *                                keys defined in {@link getDefaults()}.
     * @param string|null $content    Content of the short code, if exists.
     * @return string Output of the short code.
     * @since 1.8.0
     */
    protected function parse($attributes, $content) {
        $src = Utils::array_get($attributes, "src");
        //if (!$src) return '';

        // Check the validity of the source. If it is not from a valid domain, return an empty string.
        if ($src) {
            $isValid = DomainValidator::getInstance()->validate('_kdn_allowed_iframe_short_code_domains', $src);
            if (!$isValid) return '';
        }

        $attrString = $this->combineAttributesAsHtmlAttributeString($attributes);

        // Create and output the iframe element
        return "<iframe {$attrString}>{$content}</iframe>";
    }

    /**
     * @return array|null A key-value pair where keys are the allowed attributes of the short code, and the values are
     *                    their default values. This array will be used to sanitize the attributes of the short code.
     *                    If this returns null, no sanitizing will be done and all attributes will be available.
     * @since 1.8.0
     */
    protected function getDefaults() {
        return null;
    }
}