<?php
namespace KDNAutoLeech\Extensions\Core\Hooks\Filters;

/** 
 * General settings controller.
 *
 * @since 	2.3.3
 */
class GeneralSettingsController {

	/**
	 * Construct function.
	 */
	public function __construct() {

		// Add new general setting keys.
		add_filter('kdn/general-settings/setting-keys', 			[$this, 'KDN_CustomSettingKeys']);

        // Add new general setting default values.
        add_filter('kdn/general-settings/default-setting-values', 	[$this, 'KDN_CustomSettingDefaultValues']);
		
	}





	/**
	 * Add new general setting keys.
	 *
	 * @param 	array 		$settingKeys 		An array storage all general setting keys.
	 *
	 * @return 	array 		$settingKeys 		An array storage all general setting keys after merge.
	 *
	 * @since 	2.3.3
	 */
	public function KDN_CustomSettingKeys($settingKeys) {

		// Prepare the new setting keys.
		$customSettingKeys = [
            '_kdn_js_cron',											// int     	Interval time to run JS Cron.
            '_kdn_translation_google_translate_end',					// string   End language for Google Translator.
            '_kdn_translation_microsoft_translate_end',				// string   End language for Microsoft Translator.
	        '_kdn_translation_yandex_translate_from',					// string   Language of the original content for Yandex Translator.
	        '_kdn_translation_yandex_translate_to',					// string   Target language for Yandex Translator.
	        '_kdn_translation_yandex_translate_end',					// string   End language for Yandex Translator.
	        '_kdn_translation_yandex_translate_api',					// string   Client secret for Yandex Translator API.
	        '_kdn_translation_yandex_translate_api_randomize',			// bool   	Whether to randomize Yandex Translator API.
	        '_kdn_translation_yandex_translate_test',					// string   Text for testing Yandex Translator API.
		];

		// Merge the old setting keys with new setting keys.
		$settingKeys = array_merge($settingKeys, $customSettingKeys);

		return $settingKeys;

	}





    /**
     * Add new general setting default values.
     *
     * @param 	array 		$settingDefaultValues 		An array storage all default general setting values.
	 *
	 * @return 	array 		$settingDefaultValues 		An array storage all default general setting values after merge.
     */
    public function KDN_CustomSettingDefaultValues($settingDefaultValues) {

    	// Prepare the custom default setting values.
        $customSettingDefaultValues = [
            '_kdn_js_cron' 										=> 30,
            '_kdn_translation_yandex_translate_api_randomize'		=> false,
        ];

		// Merge the old default setting values with new custom default setting values.
        $settingDefaultValues = array_merge($settingDefaultValues, $customSettingDefaultValues);

        return $settingDefaultValues;

    }

}