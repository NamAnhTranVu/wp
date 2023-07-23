<?php

namespace KDNAutoLeech\Objects\Translation;


use KDNAutoLeech\Exceptions\MethodNotExistException;

class TranslatableMapFiller {

    private $separator = '.';

    /**
     * Fills the given map with the data extracted from given $value. The resultant array is a flat array where
     * keys are dot notation keys and the values are their values retrieved from the given $value.
     *
     * @param mixed  $value     The value from which the data will be extracted to fill the given map.
     * @param array  $map       An associative array showing the fields from which the data will be extracted.
     * @param string $separator Separator used in the dot notation.
     * @return array|null Flattened array where keys are dot keys and the values are their corresponding values
     *                          extracted from $value.
     * @throws MethodNotExistException See <a href='psi_element://getForObject()'>getForObject()</a>
     * @since 1.8.0
     */
    public function fillAndFlatten($value, $map, $separator = '.') {
        $this->separator = $separator;

        // If there is no map, return null.
        if (!$map) return null;

        // Prepare the map such that its keys are dot keys and its values are empty strings. By this way, it will be
        // much easier to deal with it.
        $map = $this->prepareMap($map);
        if ($map === null) return null;

        // Now, we will fill the values of the prepared map by getting them from the given $value.
        $results = [];
        foreach($map as $dotKey => $val) {
            // There must be a dot key.
            if ($dotKey === null || $dotKey === '') continue;

            // Extract the values from the given $value for this dot key
            $res = $this->getResult($value, $dotKey);

            // If there is no result, continue with the next one.
            if (!$res) continue;

            // Add the results
            $results = array_merge($results, $res);
        }

        return $results;
    }

    /*
     * MAP PREPARER METHOD
     */

    /**
     * Turns an array into a key-value pair, where keys are dot keys. E.g. ['key' => ['inner1', 'inner2']] becomes
     * ['key.inner1' => '', 'key.inner2' => '']
     *
     * @param null|string|array $map The map to be prepared, such as {@link Translatable::getTranslatableFields()}
     * @param null|string       $parentKey
     * @return null|array Prepared map or null.
     * @since 1.8.0
     */
    private function prepareMap($map, $parentKey = null) {
        // If the map is not an array
        if (!is_array($map)) {
            // If it is null, return null. It cannot be null.
            if ($map === null) return null;

            // Parent key cannot be null or empty.
            if ($parentKey === null || $parentKey === '') return null;

            // Create a 1-item associative array whose key is the dot key and value is empty.
            return [
                $map !== '' ? $parentKey . $this->separator . $map : $parentKey => ''
            ];
        }

        // Get the type of the array
        $isAssociative = !$this->isSequentialArray($map);

        $preparedMap = [];

        // If the array is associative
        if ($isAssociative) {
            foreach($map as $key => $value) {
                // Get the parent key for this item
                $currentParentKey = implode($this->separator, array_filter([$parentKey, $key], function($v) {
                    return $v !== null && $v !== '';
                }));

                // Prepare the item's value by using the prepared parent key
                $res = $this->prepareMap($value, $currentParentKey);
                if (!$res) continue;

                // Add its value to the prepared map
                $preparedMap = array_merge($preparedMap, $res);
            }

        // If the array is sequential and there is a parent key
        } else if($parentKey !== null && $parentKey !== '') {
            foreach($map as $value) {
                // Use the parent key directly without considering the index of the item.
                $res = $this->prepareMap($value, $parentKey);
                if (!$res) continue;

                // Add its value to the prepared map
                $preparedMap = array_merge($preparedMap, $res);
            }
        }

        return $preparedMap ?: null;
    }

    /*
     * MAP FILLER METHODS
     */

    /**
     * Extract data from a value by using dot notation.
     *
     * @param mixed       $value        Value of dot key will be extracted from this.
     * @param string      $dotKey       A dot notation that will be used to extract the data from $value.
     * @param null|string $parentKey    Parent dot key for $dotKey, if exists. When flattening, the found item will be
     *                                  added under the parent key.
     * @return array|null Flattened array where keys are dot keys and the values are their corresponding values.
     * @since 1.8.0
     * @throws MethodNotExistException See {@link getForObject()}
     */
    private function getResult($value, $dotKey, $parentKey = null) {
        // If the value is an object
        if (is_object($value)) {
            $res = $this->getForObject($value, $dotKey, $parentKey);

        // If it is an array
        } else if (is_array($value)) {
            $res = $this->getForArray($value, $dotKey, $parentKey);

        // Otherwise
        } else {
            $dotKeyParts = explode($this->separator, $dotKey);
            $firstKey    = array_shift($dotKeyParts);

            $res = $this->getForString($value, $firstKey, $parentKey);
        }

        return $res;
    }

    /**
     * Extract data from an object by using dot notation.
     *
     * @param object      $object       Value of dot key will be extracted from this.
     * @param string      $dotKey       A dot notation that will be used to extract the data from $value.
     * @param null|string $parentKey    Parent dot key for $dotKey, if exists. When flattening, the found item will be
     *                                  added under the parent key.
     * @return array|null Flattened array where keys are dot keys and the values are their corresponding values.
     * @since 1.8.0
     * @throws MethodNotExistException If a getter method does not exist in the given object's class.
     */
    private function getForObject($object, $dotKey, $parentKey = null) {
        if (!$dotKey) return null;

        // Get first key in the dot notation and the remaining keys (the dot key that does not include the first key)
        $dotKeyParts     = explode($this->separator, $dotKey);
        $firstKey        = array_shift($dotKeyParts);
        $remainingDotKey = implode($this->separator, $dotKeyParts);

        // To get the value, we need the getter method's name.
        $getterMethodName = $this->getGetterMethodName($firstKey);

        // If the method does not exist in the object, throw an exception.
        if(!method_exists($object, $getterMethodName)) {
            throw new MethodNotExistException(sprintf('%1$s method does not exist in %2$s', $getterMethodName, get_class($object)));
        }

        // Get the value by calling the getter
        $value = $object->$getterMethodName();

        // Prepare the item's parent key
        $parentKey = $parentKey !== null && $parentKey !== '' ? $parentKey . $this->separator . $firstKey : $firstKey;

        return $this->getResult($value, $remainingDotKey, $parentKey);

    }

    /**
     * Extract data from an array by using dot notation.
     *
     * @param array       $arr          Value of dot key will be extracted from this.
     * @param string      $dotKey       A dot notation that will be used to extract the data from $value.
     * @param null|string $parentKey    Parent dot key for $dotKey, if exists. When flattening, the found item will be
     *                                  added under the parent key.
     * @return array|null Flattened array where keys are dot keys and the values are their corresponding values.
     * @since 1.8.0
     * @throws MethodNotExistException See {@link getForObject()}
     */
    private function getForArray($arr, $dotKey, $parentKey = null) {
        // Get first key in the dot notation and the remaining keys (the dot key that does not include the first key)
        $dotKeyParts     = explode($this->separator, $dotKey);
        $firstKey        = array_shift($dotKeyParts);
        $remainingDotKey = implode($this->separator, $dotKeyParts);

        // If there is a dot key and the array is an associative array
        if ($dotKey !== null && $dotKey !== '' && isset($arr[$firstKey])) {
            $parentKey = $parentKey ? $parentKey . $this->separator . $firstKey : $firstKey;

            // Prepare the value at $firstKey index of the array
            $res = $this->getResult($arr[$firstKey], $remainingDotKey, $parentKey);

            return $res;

        } else {
            $results = [];

            // Array does not have keys. It is a sequential array.
            foreach($arr as $i => $value) {
                // Prepare it by adding the index to the parent key
                $res = $this->getResult($arr[$i], $dotKey, $parentKey . $this->separator . $i);
                if (!$res) continue;

                // Collect the results
                $results = array_merge($results, $res);
            }

            return $results;
        }
    }

    /**
     * Extract data from a value that is not an array or an object by using dot notation.
     *
     * @param null|string|float|double $value     Value of dot key will be extracted from this.
     * @param string                   $dotKey    A dot notation that will be used to extract the data from $value.
     * @param null|string              $parentKey Parent dot key for $dotKey, if exists. When flattening, the found
     *                                            item will be added under the parent key.
     * @return array|null Flattened array where keys are dot keys and the values are their corresponding values.
     * @since 1.8.0
     */
    private function getForString($value, $dotKey, $parentKey) {
        // Merge the parent key and the dot key to create a combined dot key
        $key = implode($this->separator, array_filter([$parentKey, $dotKey], function($v) {
            return $v !== null && $v !== '';
        }));

        // If the value is numeric, empty or null, or the key does not exist, return null.
        if (is_numeric($value) || $value === '' || $value === null || $key === null || $key === '') return null;

        // Create a 1-item associative array with the key and the value.
        return [$key => $value];
    }

    /*
     * OTHER HELPERS
     */

    /**
     * Check if an array is sequential, i.e. it has array keys starting from 0 and increasing one by one.
     *
     * @param array $arr
     * @return bool True if sequential. False if associative.
     * @since 1.8.0
     * @see https://stackoverflow.com/a/173479/2883487
     */
    private function isSequentialArray($arr) {
        // If the zero key does not exist, the array is not sequential.
        if (!array_key_exists(0, $arr)) return false;

        // If the array is empty, it is sequential.
        if ($arr === []) return true;

        // If the array keys start from 0 and increase one by one, it is sequential.
        return array_keys($arr) === range(0, count($arr) - 1);
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

}