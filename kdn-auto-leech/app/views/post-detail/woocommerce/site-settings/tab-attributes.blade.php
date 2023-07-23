<table class="kdn-settings">

    {{-- ATTRIBUTE NAME SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_attribute_name_selectors',
        'title'         => _kdn('Attribute Name Selectors'),
        'info'          => _kdn("Selectors that find names of the attributes."),
        'optionsBox'    => [
            'translation'   => true
        ],
    ])

    {{-- ATTRIBUTE VALUE SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_attribute_value_selectors',
        'title'         => _kdn('Attribute Value Selectors'),
        'info'          => _kdn("Selectors that find values of the attributes whose names are found by using attribute name
            selectors."),
        'optionsBox'    => [
            'translation'   => true
        ],
    ])

    {{-- ATTRIBUTE VALUE SEPARATORS --}}
    @include('form-items.combined.multiple-text-with-label', [
        'name'          => '_wc_attribute_value_separators',
        'title'         => _kdn('Attribute Value Separators'),
        'info'          => _kdn("Set separators for attribute values found by selectors. For example, if a attribute value
            selector finds 'small, medium, large', when you add ',' as separator, there will be three values as
            'small', 'medium', and 'large'. Otherwise, the attribute value will be 'small, medium, large'. If you add
            more than one separator, all will be applied."),
        'placeholder'   => _kdn('Separator...'),
    ])

    {{-- CUSTOM ATTRIBUTES --}}
    @include('form-items.combined.multiple-key-value-with-label', [
        'name'              => '_wc_custom_attributes',
        'title'             => _kdn('Custom Attributes'),
        'info'              => _kdn("You can define your custom attributes here. When writing attribute value, you can enter more
            than one value by separating them with commas. Custom attributes will be added to each product."),
        'keyPlaceholder'    => _kdn('Attribute name...'),
        'valuePlaceholder'  => _kdn('Comma-separated attribute values...'),
    ])

</table>