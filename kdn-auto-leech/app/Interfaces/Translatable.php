<?php

namespace KDNAutoLeech\Interfaces;


interface Translatable {

    /**
     * NOTE: Translate more wisely. For example, instead of translating listNumbers, listTitles, etc., just translate
     * the final post template. By this way, the number of chars to be translated will be less, hence, less money will
     * be spent for the translation service.
     *
     * NOTE: The fields must have mutator and accessor methods. In other words, if there is "title", then there must be
     * setTitle and getTitle methods so that "title" can be translated.
     *
     * @return array Stores the names of the fields that can be translated. The values indicate the translatable keys of
     *      the fields. E.g. if the value of "attachmentData" field has a an array value, whose each item
     *      has translatable values in "title" and "alt" keys, ["attachmentData" => ["title", "alt"]] indicates this.
     *      Make sure the value is defined for a translatable field. If you do not specify a value, the field won't be
     *      considered as translatable. So, ["title"] is not translatable, while ["title" => ""] is translatable. An
     *      empty value means the value of the field is entirely translatable. Objects are translatable as well. In
     *      case of objects, set the field names that have setter and getter methods. E.g. if "attachmentData" stores
     *      an array of MediaFile instances, and each media file has a mediaTitle field and setMediaTitle and
     *      getMediaTitle methods, then ["attachmentData" => ["mediaTitle"]] indicates this.
     * @since 1.8.0
     */
    public function getTranslatableFields();

}