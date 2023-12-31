<?php

namespace KDNAutoLeech\Objects\Traits;


use KDNAutoLeech\Objects\Enums\ErrorType;

trait ErrorTrait {

    /** @var array */
    private $_errors = [];

    /**
     * @param string     $errorType              One of the constants in {@link ErrorType}
     * @param null|mixed $value                  Value that will be attached to the error. The errorType is key, and
     *                                           this is its value.
     * @param bool       $checkErrorTypeValidity Set this to true if you want to make sure the error type is defined in
     *                                           {@link ErrorType} class.
     */
    public function addError($errorType, $value = null, $checkErrorTypeValidity = true) {
        if($checkErrorTypeValidity && !ErrorType::isValidValue($errorType)) return;

        $this->_errors[$errorType] = $value;
    }

    /**
     * Get the value for an error.
     *
     * @param string $errorType One of the constants in {@link ErrorType}
     * @return null|mixed
     */
    public function getErrorValue($errorType) {
        return isset($this->_errors[$errorType]) ? $this->_errors[$errorType] : null;
    }

    /**
     * Get the errors.
     *
     * @return array
     */
    public function getErrors() {
        return $this->_errors;
    }

    /**
     * Set errors
     *
     * @param array $errorTypes
     * @param bool $checkErrorTypeValidity Set this to true if you want to make sure the error type is defined in
     *                                     {@link ErrorType} class.
     */
    public function setErrors($errorTypes, $checkErrorTypeValidity = false) {
        foreach($errorTypes as $errorType => $value) {
            $this->addError($errorType, $value, $checkErrorTypeValidity);
        }
    }

    /**
     * Clears the errors.
     */
    public function clearErrors() {
        $this->_errors = [];
    }

    /**
     * Get the descriptions for the current errors.
     *
     * @return array
     */
    public function getErrorDescriptions() {
        $descriptions = [];
        foreach($this->_errors as $errorType => $value) {
            $desc = ErrorType::getDescription($errorType);
            $descriptions[] = $desc === '' ? $value . " - " . $errorType : $desc;
        }

        return $descriptions;
    }

    /**
     * Appends description of each error to its error value, and returns the array of error values.
     *
     * @return array
     */
    public function getDescriptionsWithErrorValues() {
        if(!$this->_errors) return [];

        $errorValues = array_values($this->_errors);
        $descriptions = $this->getErrorDescriptions();

        for($i = 0; $i < count($this->_errors); $i++) {
            $descriptions[$i] .= ' - ' . $errorValues[$i];
        }

        return $descriptions;
    }
}