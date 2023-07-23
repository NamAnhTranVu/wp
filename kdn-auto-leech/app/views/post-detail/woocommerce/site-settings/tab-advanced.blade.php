<table class="kdn-settings">

    {{-- PURCHASE NOTE SELECTORS --}}
    @include('form-items.combined.multiple-selector-with-attribute', [
        'name'          => '_wc_purchase_note_selectors',
        'title'         => _kdn('Purchase Note Selectors'),
        'info'          => _kdn("CSS selectors for purchase notes. This gets text of the found element by default. When
            there are multiple selectors, the first match will be used by default."),
        'optionsBox'    => [
            'translation'   => true
        ],
        'class'         => 'wc-purchase-note',
    ])

    {{-- ADD ALL FOUND PURCHASE NOTES --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_wc_purchase_note_add_all_found',
        'title' => _kdn('Add all found purchase notes?'),
        'info'  => _kdn("Check this if you want to add all purchase notes found by purchase note selectors. Otherwise,
            when there are multiple selectors, only the first match will be used."),
        'class' => 'wc-purchase-note',
    ])

    {{-- CUSTOM PURCHASE NOTE --}}
    @include('form-items.combined.multiple-textarea-with-label', [
        'name'          => '_wc_custom_purchase_notes',
        'title'         => _kdn('Custom Purchase Note'),
        'info'          => _kdn("Enter custom purchase notes for the product. If you enter more than one, a random
            purchase note will be selected when saving a product."),
        'optionsBox'    => true,
        'placeholder'   => _kdn('Custom purchase note...'),
        'rows'          => 4,
        'class'         => 'wc-purchase-note',
    ])

    {{-- ALWAYS ADD CUSTOM PURCHASE NOTE --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_wc_always_add_custom_purchase_note',
        'title' => _kdn('Always add custom purchase note?'),
        'info'  => _kdn("Check this if you want to add the custom purchase note always. If you do not check this,
            custom purchase note will be added only if there is no purchase note found by selectors. If you check this,
            the purchase note of the product will be created by using both the purchase notes found by selectors and the
            custom purchase note. The purchase notes found by selectors will be added after the custom purchase note."),
        'class' => 'wc-purchase-note',
    ])

    {{-- ENABLE REVIEWS --}}
    @include('form-items.combined.checkbox-with-label', [
        'name'  => '_wc_enable_reviews',
        'title' => _kdn('Enable reviews?'),
        'info'  => _kdn("Check this if you want to enable reviews for the product."),
    ])

    {{-- MENU ORDER --}}
    @include('form-items.combined.input-with-label', [
        'name'  => '_wc_menu_order',
        'title' => _kdn('Menu Order'),
        'info'  => _kdn("Enter the menu order for the product."),
        'type'  => 'number',
        'step'  => 1,
    ])

</table>