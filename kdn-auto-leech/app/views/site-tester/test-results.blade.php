@if(isset($template))
    <div class="details">
        <h2>
            <span>{{ _kdn('Template') }}</span>
            @if(isset($templateMessage) && $templateMessage)
                <span class="small">{{ $templateMessage }}</span>
            @endif
            <button class="button" id="go-to-details">{{ _kdn('Go to details') }}</button>
        </h2>
        <div class="inside">
            <div class="template">
                {!! $template !!}
            </div>

            {{-- SOURCE CODE --}}
            @if(isset($template) && isset($showSourceCode) && $showSourceCode)
                <div class="source-code-container">
                    @include('site-tester.partial.toggleable-textarea', [
                        'title'      => _kdn('Source Code') . ' (' . _kdn("Character count") . ': ' . mb_strlen($template) . ')',
                        'toggleText' => _kdn('Toggle source code'),
                        'id'         => 'source-code',
                        'hidden'     => true,
                        'content'    => $template
                    ])
                </div>
            @endif

            <div class="clear-fix"></div>
        </div>
        <div class="clear-fix"></div>
    </div>
@endif

{{-- SHOW INFORMATION IF THERE ARE ANY--}}
@if(\KDNAutoLeech\Objects\Informing\Informer::getInfos())
    <div class="details information">
        <h2>
            <span>{{ _kdn('Information') }}</span>
            <button class="button go-to-top">{{ _kdn('Go to top') }}</button>
        </h2>
        <div class="inside">
            @include('partials.info-list', ['noTitle' => true])
        </div>
    </div>
@endif

{{-- SHOW OTHER POST DETAIL VIEWS --}}
@if (isset($postDetailViews))
    {!! $postDetailViews !!}
@endif

{{-- POST DETAILS --}}
<div class="details" id="details">
    <h2>
        <span>{{ _kdn('Details') }}</span>
        <button class="button go-to-top">{{ _kdn('Go to top') }}</button>
    </h2>
    <div class="inside">
        @include('site-tester.partial.detail-table', [
            'tableData' => $info
        ])

        {{-- POST DATA--}}
        @if(isset($data))
            <div class="data-container">
                <?php $str = (print_r($data, true)); ?>
                @include('site-tester.partial.toggleable-textarea', [
                    'title'      => _kdn('Data'),
                    'toggleText' => _kdn('Toggle data'),
                    'id'         => 'post-data',
                    'hidden'     => true,
                    'content'    => $str
                ])
            </div>
        @endif

        <div class="clear-fix"></div>
        <div class="go-to-top-container">
            <button class="button go-to-top">{{ _kdn('Go to top') }}</button>
        </div>

    </div>
</div>