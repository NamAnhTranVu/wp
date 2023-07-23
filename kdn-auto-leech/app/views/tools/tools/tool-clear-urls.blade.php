@extends('tools.base.tool-container')

@section('title')
    {{ _kdn("Clear URLs") }}
@overwrite

@section('content')
    <form action="" class="tool-form">
        {{--{!! wp_nonce_field('kdn-tools', \KDNAutoLeech\Constants::$NONCE_NAME) !!}--}}

        @include('partials.form-nonce-and-action')
        <input type="hidden" name="tool_type" value="delete_urls">

        <div class="panel-wrap kdn-settings-meta-box">

            <table class="kdn-settings">
                {{-- SITE --}}
                <tr>
                    <td>
                        @include('form-items/label', [
                            'for'   =>  '_kdn_tools_site_id',
                            'title' =>  _kdn('Site'),
                            'info'  =>  _kdn('Select the site whose URLs you want to be deleted from the database.'),
                        ])
                    </td>
                    <td>
                        @include('form-items/select', [
                            'name'      =>  '_kdn_tools_site_id',
                            'options'   =>  $sites,
                        ])
                    </td>
                </tr>

                {{-- URL TYPE --}}
                <tr>
                    <td>
                        @include('form-items/label', [
                            'for'   =>  '_kdn_tools_url_type',
                            'title' =>  _kdn('URL Type'),
                            'info'  =>  _kdn('Select URL types to be cleared for the specified site. If you clear the URLs
                                waiting in the queue, those URLs will not be saved, unless they are collected again. If you
                                clear already-saved URLs, those URLs may end up in the queue again, and they may be saved
                                as posts again. So, you may want to delete the posts as well, unless you want duplicate content.'),
                        ])
                    </td>
                    <td>
                        @include('form-items/select', [
                            'name'      =>  '_kdn_tools_url_type',
                            'options'   =>  $urlTypes,
                        ])
                    </td>
                </tr>

                {{-- SAFETY CHECK --}}
                <tr>
                    <td>
                        @include('form-items/label', [
                            'for'   =>  '_kdn_tools_safety_check',
                            'title' =>  _kdn("I'm sure"),
                            'info'  =>  _kdn('Check this to indicate that you are sure about this.'),
                        ])
                    </td>
                    <td>
                        @include('form-items/checkbox', [
                            'name'      =>  '_kdn_tools_safety_check',
                        ])
                    </td>
                </tr>
            </table>

            @include('form-items/submit-button', [
                'text'  =>  _kdn('Delete URLs')
            ])

            @include('partials/test-result-container')

        </div>
    </form>
@overwrite