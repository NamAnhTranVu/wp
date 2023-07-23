<?php

$dirPathExplanation = sprintf(
    _kdn('The folder paths will be considered as they are relative to uploads directory of WordPress. E.g. if you write
        %1$s, it is considered as %2$s. You cannot define a folder outside of uploads directory of WordPress.'),
    "'images/views'",
    "'wp-content/uploads/images/views'"
);

$folderPathPlaceholder = _kdn('Folder path relative to uploads directory of WordPress...');

?>

<div class="description">
    {{ _kdn("Move and copy the files. Before applying the options in this tab, find-replace options will be applied.") }}
    {!! _kdn_file_options_box_tests_note() !!}
</div>

<table class="kdn-settings">

    {{-- MOVE --}}
    @include('form-items.combined.multiple-text-with-label', [
        'name'          =>  '_options_box[move]',
        'title'         => _kdn('Move files to folder'),
        'info'          => _kdn("Define the folders in which the saved files should be stored. If you set more than
            one path, a random one will be selected.") . ' ' . $dirPathExplanation,
        'placeholder'   => $folderPathPlaceholder,
        'inputKey'      => 'path',
        'addon'         => 'dashicons dashicons-search',
        'test'          => true,
        'data'          => [
            'testType'      => \KDNAutoLeech\Test\Test::$TEST_TYPE_FILE_MOVE,
            'extra'         => $dataExtra
        ],
        'addonClasses'  => 'kdn-test-move'
    ])

    {{-- COPY --}}
    @include('form-items.combined.multiple-text-with-label', [
        'name'          =>  '_options_box[copy]',
        'title'         => _kdn('Copy files to folder'),
        'info'          => _kdn('Define the folders to which the saved files should be copied. If you set more than
            one path, the files will be copied to all.') . ' ' . $dirPathExplanation,
        'placeholder'   => $folderPathPlaceholder,
        'inputKey'      => 'path',
        'addon'         => 'dashicons dashicons-search',
        'test'          => true,
        'data'          => [
            'testType'      => \KDNAutoLeech\Test\Test::$TEST_TYPE_FILE_COPY,
            'extra'         => $dataExtra
        ],
        'addonClasses'  => 'kdn-test-copy'
    ])

</table>