<div class="description">
    {{ _kdn('General options. Before applying the options here, the options defined in the find-replace tab will be applied.') }}
</div>

<table class="kdn-settings">

    {{-- TRANSLATION --}}
    <tr id="options-box-translation">
        <td>
            @include('form-items/label', [
                'for'   =>  '_options_box[active_translation]',
                'title' =>  _kdn('Translate?'),
                'info'  =>  _kdn('If you check this, each item will be tried to be translate.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name'  => '_options_box[active_translation]'
            ])
        </td>
    </tr>

    {{-- TREAT AS JSON --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_options_box[treat_as_json]',
                'title' =>  _kdn('Treat as JSON?'),
                'info'  =>  sprintf(_kdn('If you check this, each item will be tried to be parsed to JSON. You can then
                        use the values from the JSON using <b>[%1$s]</b> short code. When you check this, the item will be
                        removed if it is not a valid JSON.'), \KDNAutoLeech\Objects\Enums\ShortCodeName::KDN_ITEM) . ' ' . _kdn_kdn_item_short_code_dot_key_for_json()
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name'  => '_options_box[treat_as_json]'
            ])
        </td>
    </tr>

</table>