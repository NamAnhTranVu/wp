@extends('tools.base.tool-container', [
    'id'                => 'container-url-queue-manual-crawl',
    'noToggleButton'    => true
])

@section('title')
    {{ _kdn('URLs for Manual Crawling') }}
@overwrite

@section('content')
    {{-- TABLE CONTAINER --}}
    <div class="table-container hidden">

        {{-- CONTROL BUTTONS --}}
        <div class="control-buttons">
            {{-- PAUSE --}}
            <button class="button pause" type="button" title="{{ _kdn('Pause crawling') }}">
                <span class="dashicons dashicons-controls-pause"></span>
                {{ _kdn('Pause') }}
            </button>

            {{-- CONTINUE --}}
            <button class="button continue hidden" type="button" title="{{ _kdn('Continue crawling') }}">
                <span class="dashicons dashicons-controls-play"></span>
                {{ _kdn('Continue') }}
            </button>
        </div>

        {{-- INFO --}}
        <div class="info">
            <span class="dashicons dashicons-warning"></span>
            {{ _kdn('Do not close your browser while URLs are being crawled.') }}
        </div>

        {{-- STATUS --}}
        <div id="status"></div>

        {{-- TABLE CONTROLS --}}
        <div class="table-controls">
            <a role="button" class="show-all-responses">{{ _kdn('Show all results') }}</a>
            <a role="button" class="hide-all-responses">{{ _kdn('Hide all results') }}</a>
        </div>

        {{-- URL QUEUE TABLE --}}
        <table id="table-url-queue-manual-crawl">
            {{-- COLUMN NAMES --}}
            <thead>
            <tr>
                <th class="status">{{ _kdn('Status') }}</th>
                <th class="site">{{ _kdn('Site') }}</th>
                <th class="category">{{ _kdn('Category') }}</th>
                <th class="image">{{ _kdn('Image') }}</th>
                <th class="post-url">{{ _kdn('Post URL') }}</th>
                <th class="controls">
                    <a role="button" class="remove-all">{{ _kdn('Remove all') }}</a>
                </th>
            </tr>
            </thead>

            {{-- TABLE CONTENT--}}
            <tbody>

            {{-- ROW PROTOTYPE FOR URL--}}
            <tr class="prototype url hidden">
                <td class="status">
                    <span class="dashicons dashicons-controls-pause"></span>
                </td>
                <td class="site"></td>
                <td class="category"></td>
                <td class="image"></td>
                <td class="post-url"></td>
                <td class="controls">
                    {{-- REPEAT BUTTON --}}
                    <button class="button repeat" type="button" title="{{ _kdn("Retry/recrawl") }}">
                        <span class="dashicons dashicons-controls-repeat"></span>
                    </button>

                    {{-- DELETE BUTTON --}}
                    <button class="button delete" type="button" title="{{ _kdn("Delete") }}">
                        <span class="dashicons dashicons-trash"></span>
                    </button>
                </td>
            </tr>

            {{-- ROW PROTOTYPE FOR RESPONSE --}}
            <tr class="prototype response hidden">
                <td class="" colspan="6">
                    <div class="response"></div>
                </td>
            </tr>

            </tbody>
        </table>
    </div>

    {{-- DEFAULT MESSAGE --}}
    <span class="default-message">{{ _kdn("No URLs waiting to be saved.") }}</span>
@overwrite
