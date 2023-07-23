@extends('tools.base.tool-container')

@section('title')
    {{ _kdn('Manually recrawl (update) a post') }}
@overwrite

@section('content')
    <form action="" class="tool-form">
        {{--{!! wp_nonce_field('kdn-tools', \KDNAutoLeech\Constants::$NONCE_NAME) !!}--}}

        @include('partials.form-nonce-and-action')

        <input type="hidden" name="tool_type" value="recrawl_post">

        <div class="panel-wrap kdn-settings-meta-box">

            <table class="kdn-settings">
                {{-- SITE --}}
                <tr>
                    <td>
                        @include('form-items/label', [
                            'for'   =>  '_kdn_tools_recrawl_post_id',
                            'title' =>  _kdn('Post ID'),
                            'info'  =>  _kdn('Write the ID of the post you want to update.'),
                        ])
                    </td>
                    <td>
                        @include('form-items/text', [
                            'name'          =>  '_kdn_tools_recrawl_post_id',
                            'type'          =>  'text',
                            'min'           =>  0,
                            'placeholder'   => _kdn('Post ID...')
                        ])
                    </td>
                </tr>

            </table>

            @include('form-items/submit-button', [
                'text'  =>  _kdn('Recrawl')
            ])

            <div class="recrawl-count">
                <span class="label-count">{{ _kdn('Recrawling:') }}</span> <span class="processed">0</span> / <span class="count">0</span> -
                <span class="label-times">{{ _kdn('Run count:') }}</span> <span class="times">0</span> -
                <span class="label-total">{{ _kdn('Total:') }}</span> <span class="total">0</span>
            </div>

            @include('partials/test-result-container')
        </div>
    </form>
@overwrite