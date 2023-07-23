<?php

namespace KDNAutoLeech\Objects\Traits;


use KDNAutoLeech\Objects\Enums\InformationType;
use KDNAutoLeech\Objects\Informing\Information;
use KDNAutoLeech\Objects\Informing\Informer;

trait FindAndReplaceTrait {

    /**
     * Applies replacement to the given subject.
     *
     * @param array  $findAndReplaces An array of arrays. Inner array should have:
     *                                <b>"regex":    </b> (bool)    If this key <u>exists</u>, then search will be
     *                                performed as regular expression. If not, a normal search will be done.
     *                                <b>"find":     </b> (string)  What to find
     *                                <b>"replace":  </b> (string)  Replacement for what is found
     * @param string $subject         The subject to which finding and replacing will be applied
     * @param bool   $trim            True if you want the final result to be trimmed. Otherwise, false.
     * @return string The subject with all of the replacements are done
     */
    public function findAndReplace($findAndReplaces, $subject, $trim = true, $targetURL = null) {
        if($findAndReplaces && !empty($findAndReplaces)) {
            // We need to catch preg_replace errors. PHP does not throw an exception when there is an error with
            // preg_replace. So, let's set up an error handler that throws an exception. Then, we can catch it to show
            // the error message.
            set_error_handler(function($errno, $errstr) {
                throw new \Exception($errstr, $errno);
            });

            foreach ($findAndReplaces as $fr) {
                if(!isset($fr['find']) && !isset($fr['spin']) || (empty($fr['find']) && $fr['find'] !== "0" && !isset($fr['spin']))) continue;

                // If this is a simple find-replace, do it and continue with the next one.
                if (!isset($fr['regex']) && !isset($fr['spin'])) {
                    $fr['find'] = $targetURL ? str_replace('%%target_url%%', $targetURL, $fr['find']) : $fr['find'];
                    $subject    = str_replace($fr['find'], $fr['replace'], $subject);
                } else {
                    // If this is a find-replace with regular expression. Do these below.

                    /**
                    * Simple spinner.
                    *
                    * @since 2.1.8
                    */
                    if (isset($fr['spin'])) {
                        $dataspins = preg_replace('/^\{|\}|\r\n/i', '', $fr['replace']);
                        $dataspins = explode('{', $dataspins);
                        $dataspins = array_unique($dataspins);
                        foreach($dataspins as $key => $dataspin){
                            $dataspin = explode('|', $dataspin);
                            $dataspin = array_unique($dataspin);
                            foreach($dataspin as $k => $spin){
                                $spin = preg_replace('/([!@#$%^&*(),.?":{}|<>+\/])/i', '\$1', $spin);
                                $number = preg_match_all('/'.$spin.'/i', $subject, $counter);
                                if($number > 0){
                                    for($i = 0; $i < $number; $i++){
                                        $spinto = $dataspin[array_rand($dataspin)];
                                        $subject = preg_replace('/<([\S\s]*?)>(*SKIP)(*FAIL)|\b('.$spin.')\b/i', $spinto, $subject, 1);
                                    }
                                }
                            }
                        }
                    } else {
                        // Replace %%target_url%% in find with current URL being crawl.
                        $fr['find'] = $targetURL ? preg_replace('/%%target_url%%/i', preg_quote($targetURL, '/'), $fr['find']) : $fr['find'];

                        // This is a regular expression.
                        try {

                            /**
                             * If callback is checked.
                             *
                             * @since 2.1.8
                             */
                            if (isset($fr['callback'])) {
                                $callback = $fr['replace'];
                                $callback_find = !starts_with($fr['find'], '/') ? '/' . $fr['find'] . '/' : $fr['find'];
                                $callback_result = '$r = '.'preg_replace_callback( $callback_find, '.$callback.', $subject );';
                                eval($callback_result);
                            } else {
                                // If the regular expressions starts with a '/', then treat it as it has delimiters. Otherwise,
                                // surround it with delimiters, treat it as it does not have delimiters.
                                $r = preg_replace(!starts_with($fr['find'], '/') ? '/' . $fr['find'] . '/' : $fr['find'], $fr['replace'], $subject);
                            }

                            // If the result is null, throw an exception to show the user a message about the error. Actually,
                            // if there was an error, this line is not even reached since the defined error handler throws an
                            // exception. However, we are just being cautious.
                            if ($r === null)
                                throw new \Exception(_kdn("An error occurred while replacing with the regular expression."));

                            $subject = $r;

                        } catch (\Exception $e) {
                            switch($e->getCode()) {
                                case PREG_INTERNAL_ERROR:
                                    $error = "Internal error";
                                    break;
                                case PREG_NO_ERROR:
                                    $error = "No error";
                                    break;
                                case PREG_BACKTRACK_LIMIT_ERROR:
                                    $error = "Backtrack limit error";
                                    break;
                                case PREG_RECURSION_LIMIT_ERROR:
                                    $error = "Recursion limit error";
                                    break;
                                case PREG_BAD_UTF8_OFFSET_ERROR:
                                    $error = "Bad UTF8 offset error";
                                    break;
                                case PREG_BAD_UTF8_ERROR:
                                    $error = "Bad UTF8 error";
                                    break;
                                case PREG_JIT_STACKLIMIT_ERROR:
                                    $error = "JIT stacklimit error";
                                    break;
                                default:
                                    $error = "Unknown error";
                                    break;
                            }

                            // Get the error message
                            $message = $e->getMessage();

                            $error  = _kdn("Type") . ': ' . $error . ($message ? ": {$message}" : '');
                            $detail = _kdn("Find") . ": " . $fr['find'] . " | " . _kdn("Replace") . ": " . $fr['replace'];

                            Informer::add((new Information($error, $detail, InformationType::ERROR))->addAsLog());
                        }
                    }
                }
                // Replace %%target_url%% in replace field with current URL being crawl.
                $subject = $targetURL ? preg_replace('/%%target_url%%/i', $targetURL, $subject) : $subject;
            }

            // Restore the error handler.
            restore_error_handler();
        }

        return $trim ? trim($subject) : $subject;
    }

    /**
     * Applies find-replace options to all the given subjects.
     *
     * @param array        $findAndReplaces   See {@link findAndReplace}
     * @param array|string $subjects          An array of strings to which the find-replace options will be applied
     * @param null|string  $innerKey          If given $subjects array contains arrays as its values, then you can
     *                                        define this to point which key of the inner array contains the subject.
     *                                        E.g. if a value of $subjects is
     *                                        ["data" => "subject", "start" => 2000, "end" => 5000],
     *                                        then you can pass "data" as $innerKey so that find-replaces will be
     *                                        applied to "subject".
     * @param bool         $trim              See {@link findAndReplace}
     * @return array|string If the subjects were an array, returns an array. Otherwise, returns a string.
     * @uses  FindAndReplaceTrait::findAndReplace()
     * @since 1.8.0
     */
    public function applyFindAndReplaces(&$findAndReplaces, $subjects, $innerKey = null, $trim = true, $url = null) {
        // If there are no subjects, return the subjects.
        if (!$subjects) return $subjects;

        // If the subjects is not an array, make it and array and mark it as "single" so that we can return a single
        // item after the operations are done.
        $isSingle = !is_array($subjects);
        if ($isSingle) {
            $subjects = [$subjects];
        }

        // Find and replace for each subject
        foreach($subjects as &$subject) {
            $haystack = $innerKey !== null ? $subject[$innerKey] : $subject;

            // If the subject is array, replace its short codes, assuming it is a string array.
            if (is_array($haystack)) {
                $result = $this->applyFindAndReplaces($findAndReplaces, $haystack, null, $trim, $url);

            } else {
                $result = $this->findAndReplace($findAndReplaces, $haystack, $trim, $url);
            }

            if ($innerKey) {
                $subject[$innerKey] = $result;
            } else {
                $subject = $result;
            }
        }

        // If the subjects were single, return a single item. Otherwise, return the array.
        return $isSingle ? $subjects[0] : $subjects;
    }

    /**
     * Find and replace something in a subject.
     *
     * @param string $find    Find
     * @param string $replace Replace
     * @param string $subject The text to be searched
     * @param bool   $regex   True if find string is a regex.
     * @param bool   $trim    True if you want the final result to be trimmed. Otherwise, false.
     * @return string
     */
    public function findAndReplaceSingle($find, $replace, $subject, $regex = false, $trim = true, $targetURL = null, $callback = false, $spin = false) {
        $fr = $this->createFindReplaceConfig($find, $replace, $regex, $callback, $spin);
        return $this->findAndReplace([$fr], $subject, $trim, $targetURL);
    }

    /**
     * Create a find-and-replace config that can be used with {@link findAndReplace} and {@link findAndreplaceSingle}
     *
     * @param string $find      Find
     * @param string $replace   Replace
     * @param bool   $regex     True if find string is a regex.
     * @return array
     */
    public function createFindReplaceConfig($find, $replace, $regex = false, $callback = false, $spin = false) {
        $fr = [];
        $fr['find'] = $find;
        $fr['replace'] = $replace;
        if($regex) $fr['regex'] = true;
        if($callback) $fr['callback'] = true;
        if($spin) $fr['spin'] = true;
        return $fr;
    }

    /**
     * Create a find-replace config that finds a URL and replaces it with another URL
     *
     * @param string $findUrl URL to be found
     * @param string $replaceUrl URL to be replaced
     * @return array
     * @since 1.8.0
     */
    protected function createFindReplaceConfigForUrl($findUrl, $replaceUrl) {
        // Ampersands (&) are converted to &amp; by Crawler. So, it is better to check availability of & and &amp;
        // both to make sure the replacement will be done.
        return $this->createFindReplaceConfig(
            str_replace('&', '(?:&|&amp;)', preg_quote($findUrl, '/')),
            $replaceUrl,
            true
        );
    }
}