<div class="panel-wrap kdn-settings-meta-box">
    <?php wp_nonce_field('kdn-settings-metabox', \KDNAutoLeech\Constants::$NONCE_NAME); ?>

    @include('partials.form-error-alert')

    <?php

    /**
     * Fires after opening div tag of the meta box that contains the site settings
     *
     * @param array $settings   Existing settings and their values saved by user before
     * @param int $postId       ID of the site
     * @since 1.6.3
     */
    do_action('kdn/view/site-settings/main/above-meta-box', $settings, $postId);

    ?>

    {{-- TABS --}}
    <h2 class="nav-tab-wrapper fixable">
        <a href="#" data-tab="#tab-main"                    class="nav-tab nav-tab-active">{{ _kdn('Main') }}</a>
        <a href="#" data-tab="#tab-category"                class="nav-tab">{{ _kdn('Category') }}</a>
        <a href="#" data-tab="#tab-post"                    class="nav-tab">{{ _kdn('Post') }}</a>
        <a href="#" data-tab="#tab-child-post"              class="nav-tab">{{ _kdn('Child post') }}</a>
        <a href="#" data-tab="#tab-templates"               class="nav-tab">{{ _kdn('Post templates') }}</a>
        <a href="#" data-tab="#tab-child-post-templates"    class="nav-tab">{{ _kdn('Child post templates') }}</a>
        <a href="#" data-tab="#tab-notes"                   class="nav-tab">{{ _kdn('Notes') }}</a>

        <?php

        /**
         * Fires before import export tab in tab title area of site settings page
         *
         * @param array $settings   Existing settings and their values saved by user before
         * @param int $postId       ID of the site
         * @since 1.6.3
         */
        do_action('kdn/view/site-settings/add_tab_title', $settings, $postId);

        ?>

        <a href="#" data-tab="#tab-general-settings"
           class="nav-tab {{ isset($settings["_do_not_use_general_settings"]) && $settings["_do_not_use_general_settings"][0] ? '' : 'hidden' }} nav-tab-highlight-on"
        >
            {{ _kdn('Settings') }}
        </a>

        <a href="#" data-tab="#tab-import-export-settings" class="nav-tab">
            <span class="dashicons dashicons-upload"></span>
            <span class="dashicons dashicons-download"></span>
        </a>

        @include('partials.input-url-hash')
        @include('partials.button-toggle-info-texts')
    </h2>

    {{-- MAIN PAGE SETTINGS --}}
    <div id="tab-main" class="tab">
        @include('site-settings.tab-main')
    </div>

    {{-- CATEGORY PAGE SETTINGS --}}
    <div id="tab-category" class="tab hidden">
        @include('site-settings.tab-category')
    </div>

    {{-- POST PAGE SETTINGS --}}
    <div id="tab-post" class="tab hidden">
        @include('site-settings.tab-post')
    </div>

    {{-- POST PAGE SETTINGS --}}
    <div id="tab-child-post" class="tab hidden">
        @include('site-settings.tab-child-post')
    </div>

    {{-- TEMPLATE SETTINGS --}}
    <div id="tab-templates" class="tab hidden">
        @include('site-settings.tab-templates')
    </div>

    {{-- CHILD POST TEMPLATE SETTINGS --}}
    <div id="tab-child-post-templates" class="tab hidden">
        @include('site-settings.tab-child-post-templates')
    </div>

    {{-- NOTES --}}
    <div id="tab-notes" class="tab hidden">
        @include('site-settings.tab-notes')
    </div>

    <?php

    /**
     * Fires before import export tab in tab content area of site settings page
     *
     * @param array $settings   Existing settings and their values saved by user before
     * @param int $postId       ID of the site
     * @since 1.6.3
     */
    do_action('kdn/view/site-settings/add_tab_content', $settings, $postId);

    ?>

    {{-- IMPORT/EXPORT SETTINGS --}}
    <div id="tab-import-export-settings" class="tab hidden">
        @include('site-settings.tab-import-export')
    </div>

    {{-- CUSTOM GENERAL SETTINGS --}}
    <div id="tab-general-settings" class="tab hidden">
        @include('general-settings.settings', ['isPostPage' => true])
    </div>

    <?php

    /**
     * Fires before closing div tag of the meta box that contains the site settings
     *
     * @param array $settings   Existing settings and their values saved by user before
     * @param int $postId       ID of the site
     * @since 1.6.3
     */
    do_action('kdn/view/site-settings/main/below-meta-box', $settings, $postId);

    ?>

    {{-- OPTIONS BOX CONTAINER--}}
    @include('form-items.options-box.options-box-container')

    {{-- QUICK SAVE BUTTON --}}
    @include('form-items.quick-save-settings')

</div>

{{-- DEV TOOLS CONTAINER--}}
@include('form-items.dev-tools.dev-tools-content-container', [
    'data' => [
        'postId' => $postId
    ]
])