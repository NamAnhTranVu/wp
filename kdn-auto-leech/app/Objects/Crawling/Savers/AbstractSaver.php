<?php

namespace KDNAutoLeech\Objects\Crawling\Savers;


abstract class AbstractSaver {

    /** @var bool True if the URL request has been made after an event is executed, false otherwise. */
    private $requestMade = false;

    /**
     * @param bool $bool True if the request is made, false otherwise.
     */
    protected function setRequestMade($bool) {
        $this->requestMade = $bool;
    }

    /**
     * @return bool See {@link requestMade}
     */
    public function isRequestMade() {
        return $this->requestMade;
    }
}