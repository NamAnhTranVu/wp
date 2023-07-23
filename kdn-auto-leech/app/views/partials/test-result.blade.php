@if(isset($message))
    <p>{!! $message !!}</p>
@endif

{{-- IF JSON PARSE --}}
<?php
    if (isset($results['json']) && $results['json']) {
        $isJSON = $results['json'];
        unset($results['json']);
    }
?>

{{-- RESULT LIST --}}
<ul data-results="{{ json_encode($results) }}">
    <?php
        // If JSON Parse
        if(isset($modifiedResults)) unset($modifiedResults['json']);

        $actualResults = isset($modifiedResults) ? $modifiedResults : $results;
        if (!$actualResults) $actualResults = [];
    ?>
    @if(isset($isJSON) && $isJSON)
        @foreach($actualResults as $result)
            <li><code>{{ print_r(json_decode($result, true), true) }}</code></li>
        @endforeach
    @else
        @foreach($actualResults as $result)
            <li><code>{{ $result }}</code></li>
        @endforeach
    @endif
</ul>

{{-- "NO RESULT" MESSAGE --}}
@if(empty($actualResults))
    <span class="no-result">{{ _kdn('No result') }}</span>
@endif

{{-- If there are modified results and they are different than the results, show the user original results as well. --}}
@if(isset($modifiedResults) && $modifiedResults !== $results)
    <div class="original-results">
        <a role="button" class="see-unmodified-results">{{ _kdn("See unmodified results") }}</a>
        <ul class="hidden">
            @foreach($results as $result)
                <li><code>{{ $result }}</code></li>
            @endforeach
        </ul>
    </div>
@endif

{{-- MEMORY USAGE AND ELAPSED TIME --}}
@if(isset($memoryUsage) && isset($elapsedTime))
    <div class="usage">
        <span title="{{ _kdn("Used memory") }}">{{ $memoryUsage }} MB</span>
        /
        <span title="{{ _kdn("Elapsed time") }}">{{ $elapsedTime }} ms</span>
    </div>
@endif

{{-- "FROM CACHE" INFO --}}
@include('.partials.notification-for-url-cache')

{{-- INFO LIST --}}
@include('partials.info-list')