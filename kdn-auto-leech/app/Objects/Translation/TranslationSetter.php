<?php

namespace KDNAutoLeech\Objects\Translation;


use KDNAutoLeech\Exceptions\MethodNotExistException;

class TranslationSetter {

    private $separator = '.';

    /**
     * Set the values of a data source with a flat array whose keys are dot notation keys that shows the location of the
     * item whose value will be set, and their values are new values of that item.
     *
     * @param mixed  $dataSource The value whose data will be set by using $flatArr
     * @param array  $flatArr    A flat array. The keys are dot keys and the values are their values.
     * @param string $separator  Separator used in the dot notation.
     * @throws MethodNotExistException See <a href='psi_element://setForObject()'>setForObject()</a>
     * @since 1.8.0
     */
    public function set($dataSource, $flatArr, $separator = '.') {
        $this->separator = $separator;

        foreach($flatArr as $dotKey => $val) {
            $this->setValue($dataSource, $dotKey, $val);
        }
    }

    /*
     *
     */

    /**
     * Set a value using a dot key
     *
     * @param mixed  $dataSource Data source whose value will be set
     * @param string $dotKey     Dot notation key that shows the item whose value will be set in the data source
     * @param mixed  $value      New value
     * @throws MethodNotExistException See {@link setForObject()}
     * @since 1.8.0
     */
    private function setValue(&$dataSource, $dotKey, $value) {
        // If the data source is an object
        if(is_object($dataSource)) {
            $this->setForObject($dataSource, $dotKey, $value);

        // If the it is an array
        } else if (is_array($dataSource)) {
            $this->setForArray($dataSource, $dotKey, $value);

        // Otherwise, directly set the value.
        } else {
            $dataSource = $value;
        }
    }

    /**
     * Set a value using a dot key
     *
     * @param object $dataSource       Data source whose value will be set
     * @param string $dotKey           Dot notation key that shows the item whose value will be set in the data source
     * @param mixed  $value            New value
     * @throws MethodNotExistException If getter or setter method does not exist in the data source for the first key in
     *                                 the dot notation key.
     * @since 1.8.0
     */
    private function setForObject(&$dataSource, $dotKey, $value) {
        // Extract the first key from the dot key
        $remainingDotKey = $dotKey;
        $firstKey = $this->shiftFirstKey($remainingDotKey);

        // Get getter and setter method names of the data source object
        $setterMethodName = $this->getSetterMethodName($firstKey);
        $getterMethodName = $this->getGetterMethodName($firstKey);

        // If the setter method does not exist in the object, throw an exception.
        if(!method_exists($dataSource, $setterMethodName)) {
            throw new MethodNotExistException(sprintf('%1$s method does not exist in %2$s', $setterMethodName, get_class($dataSource)));
        }

        // If the getter method does not exist in the object, throw an exception.
        if(!method_exists($dataSource, $getterMethodName)) {
            throw new MethodNotExistException(sprintf('%1$s method does not exist in %2$s', $getterMethodName, get_class($dataSource)));
        }

        // Get the current value of the item whose value will be changed
        $currentVal = $dataSource->$getterMethodName();

        // Set the value
        $this->setValue($currentVal, $remainingDotKey, $value);

        // Assign the new value to the object using the setter
        $dataSource->$setterMethodName($currentVal);
    }

    /**
     * Set a value using a dot key
     *
     * @param array  $dataSource Data source whose value will be set
     * @param string $dotKey     Dot notation key that shows the item whose value will be set in the data source
     * @param mixed  $value      New value
     * @throws MethodNotExistException See {@link setForObject()}
     * @since 1.8.0
     */
    private function setForArray(&$dataSource, $dotKey, $value) {
        // Extract the first key from the dot key
        $remainingDotKey = $dotKey;
        $firstKey = $this->shiftFirstKey($remainingDotKey);

        // If the first key is not one of the keys of the data source, stop. It must exist.
        if (!isset($dataSource[$firstKey])) return;

        // Set its value
        $this->setValue($dataSource[$firstKey], $remainingDotKey, $value);
    }

    /*
     *
     */

    /**
     * Shifts the first key from a dot key
     *
     * @param string $dotKey A dot notation key
     * @return string|null First key
     * @since 1.8.0
     */
    private function shiftFirstKey(&$dotKey) {
        if ($dotKey === null || $dotKey === '') return null;

        // Explode the dot key from the separators. Set the limit as 2 since we need the first key and the rest of the
        // dot key.
        $exploded = explode($this->separator, $dotKey, 2);
        if ($exploded) {
            // Get the first key
            $firstKey = $exploded[0];

            // The remaining dot key should be in the index 1.
            $dotKey = isset($exploded[1]) ? $exploded[1] : '';
            return $firstKey;
        }

        return null;
    }

    /**
     * Get getter method name of an object's field
     *
     * @param string $fieldName Field name of an object.
     * @return string Name of the getter method that should return the value of given $fieldName
     * @since 1.8.0
     */
    private function getGetterMethodName($fieldName) {
        return "get" . ucfirst($fieldName);
    }

    /**
     * Get setter method name of an object's field
     *
     * @param string $fieldName Field name of an object.
     * @return string Name of the setter method that should set the value of given $fieldName
     * @since 1.8.0
     */
    private function getSetterMethodName($fieldName) {
        return "set" . ucfirst($fieldName);
    }

}