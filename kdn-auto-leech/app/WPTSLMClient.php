<?php
namespace KDNAutoLeech;
use KDNAutoLeech\Extensions\Core\Process;
use KDNAutoLeech\Extensions\Manages\Update\Update;
use DateTime;

/**
 * WPTSLMClient.
 *
 * @since   2.3.3
 */
if(!class_exists('WPTSLM')) {

    class WPTSLMClient {
    
        private $productName;
        private $vo;
        private $productId;
        private $type;
        private $apiUrl;
        private $pluginFilePath;
        private $textDomain;





        /**
         * WPTSLMClient constructor.
         *
         * @param string        $productName
         * @param string        $productId
         * @param string        $type
         * @param string        $apiUrl
         * @param string|null   $pluginFilePath     Required only if this is a plugin. Full path for the plugin file.
         * @param string        $textDomain         Text domain of the plugin/theme.
         */
        public function __construct($productName, $productId, $type = 'plugin', $apiUrl, $pluginFilePath, $textDomain) {
            $this->vo               = KDN_AUTO_LEECH_VERSION;
            $this->productName      = $productName;
            $this->productId        = $productId;
            $this->type             = $type;
            $this->apiUrl           = $apiUrl;
            $this->pluginFilePath   = $pluginFilePath;
            $this->textDomain       = $textDomain;
            $this->init();
        }





        /**
         * WPTSLMClient init.
         *
         * @since   2.3.3
         */
        public function init() {
        }





        /**
         * Get a string to be used as prefix for option names.
         *
         * @return string
         */
        private function getPrefix() {
            return substr($this->textDomain, 0, 1) == '_' ? $this->textDomain : '_' . $this->textDomain;
        }
    
    }

}