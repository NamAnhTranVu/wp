<div class="kdn-settings-title">
    <h3>{{ _kdn('Import/Export Settings') }}</h3>
    <span>{{ _kdn('Import settings from another site or copy the settings to import for another site') }}</span>
</div>

<table class="kdn-settings">
    {{-- IMPORT SETTINGS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_import_settings',
                'title' => _kdn('Import Settings'),
                'info'  => _kdn('Paste the settings exported from another site to import. <b>Current settings
                    will be overridden.</b>')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_post_import_settings',
                'placeholder'   =>  _kdn('Paste settings and update. Note: This will override all settings.')
            ])
        </td>
    </tr>

    {{-- EXPORT SETTINGS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_post_export_settings',
                'title' => _kdn('Export Settings'),
                'info'  => _kdn('You can copy the settings here and use the copied code to export settings to
                    another site.')
            ])
        </td>
        <td>
            @include('form-items/textarea', [
                'name'          =>  '_post_export_settings',
                'value'         =>  $settingsForExport,
                'readOnly'      =>  true,
                'noName'        =>  true,
            ])
        </td>
    </tr>
</table>