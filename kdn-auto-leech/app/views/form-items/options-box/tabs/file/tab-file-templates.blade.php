<?php

/**
 * @var array $defaultTemplateOptions Default options for the template form items
 */
$defaultTemplateOptions = [
    'inputKey'      =>  'template',
    'placeholder'   =>  _kdn('Template...'),
    'addKeys'       =>  true,
    'remove'        =>  true,
    'addon'         =>  'dashicons dashicons-search',
    'data'          =>  [
        'testType'  =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FILE_TEMPLATE,
        'extra'     =>  $dataExtra
    ],
    'test'          =>  true,
    'addonClasses'  => 'kdn-test-template',
    'showButtons'   => false,
    'rows'          => 4
];

?>

<div class="description">
    {{ _kdn('You can create templates for the current file. You can use the short codes below. In addition, you can
        use custom short codes you defined in the settings. When there are more than one template, a random one
        will be selected for each found item. Before applying the options in this tab, find-replace and file operations
        options will be applied, respectively.') }}
    {!! _kdn_file_options_box_tests_note() !!}
    {!! _kdn('Values of the short codes about the files might change when they are applied to saved files.') !!}
</div>

{{-- SHORT CODE BUTTONS --}}
@include('form-items.partials.short-code-buttons', [
    'buttons' => array_merge($buttonsOptionsBoxTemplates, $buttonsFileOptionsBoxTemplates),
])

<table class="kdn-settings">

    {{-- FILE NAME TEMPLATES --}}
    @include('form-items.combined.multiple-textarea-with-label', [
        'name'  => '_options_box[templates_file_name]',
        'title' => _kdn('File name templates'),
        'info'  => sprintf(
                _kdn('Define templates for the name of the file. File extension will be added to the name automatically.
                    Short codes in file names will be treated differently. Opening and closing brackets for the short codes
                    will be replaced with <b>%1$s</b> and <b>%2$s</b>, respectively. You can write short codes regularly.
                    This is just to inform you so that you do not get surprised when you see opening and closing brackets
                    of the short codes are changed in the test results.'),
                \KDNAutoLeech\Objects\File\FileService::SC_OPENING_BRACKETS,
                \KDNAutoLeech\Objects\File\FileService::SC_CLOSING_BRACKETS
            ) . ' ' . _kdn_trans_more_than_one_random_one(),
        'class' => 'file-template',
        'id'    => 'file-name-templates',
    ] + $defaultTemplateOptions)

    {{-- MEDIA TITLE TEMPLATES --}}
    @include('form-items.combined.multiple-textarea-with-label', [
        'name'  => '_options_box[templates_media_title]',
        'title' => _kdn('Media title templates'),
        'info'  => _kdn('Define templates for the title of the media that will be created for the file.') . ' ' . _kdn_trans_more_than_one_random_one(),
        'class' => 'file-template file-media-template',
        'id'    => 'media-title-templates',
    ] + $defaultTemplateOptions)

    {{-- MEDIA DESCRIPTION TEMPLATES --}}
    @include('form-items.combined.multiple-textarea-with-label', [
        'name'  => '_options_box[templates_media_description]',
        'title' => _kdn('Media description templates'),
        'info'  => _kdn('Define templates for the description of the media that will be created for the file.') . ' ' . _kdn_trans_more_than_one_random_one(),
        'class' => 'file-template file-media-template',
        'id'    => 'media-description-templates',
    ] + $defaultTemplateOptions)

    {{-- MEDIA CAPTION TEMPLATES --}}
    @include('form-items.combined.multiple-textarea-with-label', [
        'name'  => '_options_box[templates_media_caption]',
        'title' => _kdn('Media caption templates'),
        'info'  => _kdn('Define templates for the caption of the media that will be created for the file.') . ' ' . _kdn_trans_more_than_one_random_one(),
        'class' => 'file-template file-media-template',
        'id'    => 'media-caption-templates',
    ] + $defaultTemplateOptions)

    {{-- MEDIA ALTERNATE TEXT TEMPLATES --}}
    @include('form-items.combined.multiple-textarea-with-label', [
        'name'  => '_options_box[templates_media_alt_text]',
        'title' => _kdn('Media alternate text templates'),
        'info'  => _kdn('Define templates for the alt text of the media that will be created for the file.') . ' ' . _kdn_trans_more_than_one_random_one(),
        'class' => 'file-template file-media-template',
        'id'    => 'media-alt-templates',
    ] + $defaultTemplateOptions)

</table>