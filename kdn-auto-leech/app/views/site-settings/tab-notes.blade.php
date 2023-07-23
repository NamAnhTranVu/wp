<div class="kdn-settings-title">
    <h3>{{ _kdn('Notes') }}</h3>
    <span>{{ _kdn('You can write your notes about this site here. It is just for you to keep notes.') }}</span>
</div>

<table class="kdn-settings">
    {{-- NOTE EDITOR--}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   => '_notes',
                'title' => _kdn('Notes'),
                'info'  => _kdn('Write anything...')
            ])
        </td>
        <td>@include('form-items/template-editor', ['name' => '_notes', 'height' => 450])</td>
    </tr>

    <?php

    /**
     * Fires before closing table tag in notes tab of site settings page.
     *
     * @param array $settings   Existing settings and their values saved by user before
     * @param int $postId       ID of the site
     * @since 1.6.3
     */
    do_action('kdn/view/site-settings/tab/notes', $settings, $postId);

    ?>
</table>