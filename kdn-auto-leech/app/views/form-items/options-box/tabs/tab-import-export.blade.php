<div class="description">
    {{ _kdn('Import or export options box settings.') }}
</div>

<table class="kdn-settings">

    {{-- IMPORT SETTINGS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_options_box_import_settings',
                'title' => _kdn('Import Settings'),
                'info'  => _kdn('Paste the settings exported from another options box to import. <b>Current settings
                    will be overridden.</b>')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_options_box_import_settings',
                'placeholder'   =>  _kdn('Paste settings and click the import button. Note: This will override all settings.')
            ])
            @include('form-items.button', [
                'buttonClass' => 'options-box-import',
                'text' => _kdn("Import")
            ])
        </td>
    </tr>

    {{-- EXPORT SETTINGS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_options_box_export_settings',
                'title' => _kdn('Export Settings'),
                'info'  => _kdn('You can copy the settings here and use the copied code to export settings to
                    another options box.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_options_box_export_settings',
                'readOnly'      =>  true,
                'noName'        =>  true,
            ])
        </td>
    </tr>

</table>