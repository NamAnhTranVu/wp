<?php

namespace KDNAutoLeech\Objects\OptionsBox\Enums;


use KDNAutoLeech\Objects\Enums\EnumBase;

class OptionsBoxTab extends EnumBase {

    // These must be the same as the state key defined in each child of TabBase.ts
    const CALCULATIONS     = 'calculations';
    const FIND_REPLACE     = 'findReplace';
    const GENERAL          = 'general';
    const IMPORT_EXPORT    = 'importExport';
    const NOTES            = 'notes';
    const TEMPLATES        = 'templates';
    const FILE_TEMPLATES   = 'fileTemplates';

}