{{--
    Required variables:
        String $title: Title of the form item. Label name.
        String $info: Information about the form item
        String $name: Name of the form item
        String $urlSelector: CSS selector for the URL input

    Optional variables:
        String $id: ID of the <tr> element surrounding the form items
        String $defaultAttr: Default attribute for the selector of the form item
        Other variables of label and multiple form item views.

--}}

<?php
    $attr = isset($defaultAttr) && $defaultAttr ? $defaultAttr : 'text'
?>

<tr @if(isset($id)) id="{{ $id }}" @endif
    @if(isset($class)) class="{{ $class }}" @endif
>
    <td>
        @include('form-items/label', [
            'for'   =>  $name,
            'title' =>  $title,
            'info'  =>  $info . ' ' . _kdn_selector_attribute_info(),
        ])
    </td>
    <td>
        @include('form-items/multiple', [
            'include'       => 'form-items/selector-with-attribute',
            'name'          => $name,
            'addon'         =>  'dashicons dashicons-search',
            'data'          =>  [
                'urlSelector'       =>  $urlSelector,
                'urlAjaxSelector'   =>  $urlAjaxSelector,
                'testType'          =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_SELECTOR_ATTRIBUTE,
                'attr'              =>  $attr,
                'requiredSelectors' =>  $urlSelector . " | " . $urlAjaxSelector, // One of them is enough
            ],
            'test'          => true,
            'addKeys'       => true,
            'addonClasses'  => 'kdn-test-selector-attribute',
            'defaultAttr'   => $attr,
            'ajax'          => true
        ])
        @include('partials/test-result-container')
    </td>
</tr>