{{--
    Required variables:
        int     $number:     Item number
        int     $siteId:     ID of the site
        string  $siteName:   Name of the site
        string  $testName:   Type of the test
        string  $testKey:    Key for the test
        string  $testUrl:    Test URL
--}}

<?php
    $nameExists = $siteName !== null;
    $testData = [
        'testKey' => $testKey,
        'siteId'  => $siteId,
        'testUrl' => $testUrl,
        'exists'  => $nameExists
    ];
?>

<tr class="test-history-item" data-test="{{ json_encode($testData) }}">
    <td class="controls-leading">
        @include('form-items.partials.button-addon-test', [
            'addon' =>  'dashicons dashicons-search',
            'test'  => true,
        ])
    </td>
    <td>{{ $number }}</td>
    <td class="site-name">
        @if($nameExists)
            <a href="{!! get_edit_post_link($siteId) !!}" target="_blank">
                {{ $siteName }}
            </a>
        @else
            {{ _kdn('Not found') }}
        @endif
    </td>
    <td class="test-type">
        {{ $testName }}
    </td>
    <td class="test-url">
        <a href="{{ $testUrl }}" target="_blank">{{ $testUrl }}</a>
    </td>
    <td class="controls-trailing">
        @include('form-items.remove-button', [
            'disableSort' => true
        ])
    </td>
</tr>