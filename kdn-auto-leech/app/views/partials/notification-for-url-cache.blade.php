@if(isset($isResponseFromCache) && $isResponseFromCache)
    <div class="from-cache">
        <span>{{ _kdn("Response retrieved from cache.") }}</span>

        {{-- INVALIDATE CACHE --}}
        @if (isset($testUrl) && $testUrl)
            <span>
                <a role="button" class="invalidate-cache-for-this-url" data-url="{{ $testUrl }}" title="{{ _kdn("Invalidate cache for this URL") }}">{{ _kdn("Invalidate") }}</a>
            </span>
            <span>
                <a role="button" class="invalidate-all-test-url-caches" data-url="{{ $testUrl }}" title="{{ _kdn("Invalidate all test URL caches") }}">{{ _kdn("Invalidate all") }}</a>
            </span>
        @endif
    </div>
@endif