<div class="wrap container-general-settings">

    @if(isset($_GET["success"]))
        @include('partials/alert', [
            'type'      =>  $_GET["success"] == 'true' ? 'success' : 'error',
            'message'   =>  $_GET["success"] == 'true' ?
                            _kdn("Settings updated.") :
                            (isset($_GET["message"]) && $_GET["message"] ? $_GET["message"] : _kdn("An error occurred."))
        ])
    @endif

    <h1>{{ _kdn('General Settings') }}</h1>
    <form action="admin-post.php" method="post" id="post">
        {{-- Tests here will be done in PostService class. Below nonce field is there because of this. --}}
        {{--{!! wp_nonce_field('kdn-settings-metabox', \KDNAutoLeech\Constants::$NONCE_NAME) !!}--}}

        {{--<input type="hidden" name="action" value="kdn_general_settings" id="hiddenaction">--}}

        {{-- ADD NONCE AND ACTION --}}
        @include('partials.form-nonce-and-action')

        @include('general-settings/button-container', ['class' => 'top right', 'id' => 'submit-top'])

        {{--<input type="hidden" name="action" value="general_settings">--}}
        <div class="details">
            <div class="inside">
                <div class="panel-wrap kdn-settings-meta-box kdn-general-settings">

                    @include('partials/form-error-alert')

                    @include('general-settings/settings')

                </div>
            </div>
        </div>

        @include('general-settings/button-container', ['id' => 'submit-bottom'])
    </form>
</div>