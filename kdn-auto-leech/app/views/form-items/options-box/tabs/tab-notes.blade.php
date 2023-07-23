<div class="description">
    {{ _kdn('You can take notes about the options you configured, or anything. This tab is just for taking notes.') }}
</div>

<table class="kdn-settings">
    <tr>
        <td>
            @include('form-items/textarea', [
                'name'          => '_options_box[note]',
                'rows'          => 6,
                'showButtons'   => false,
                'placeholder'   =>  _kdn('Notes...'),
            ])
        </td>
    </tr>

</table>