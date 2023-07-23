{{--
    Required variables:
        $activeSites: (WP_Post[])
--}}

@extends('dashboard.partials.section')

@section('content-class') @overwrite
@section('header') @overwrite

@section('title')
    {{ _kdn("Active sites") }} ({{ sizeof($activeSites) }})
@overwrite

@section('content')
    @if(!empty($activeSites))
        <table class="section-table detail-card white">
            <thead>
                <tr>
                    <th></th>
                    <th>{{ _kdn("Last") }}</th>
                    <th>{{ _kdn("Active") }}</th>
                    <th>{{ _kdn("Today") }}</th>
                    <th>{{ _kdn("All") }}</th>
                </tr>
            </thead>
            <tbody>
                @foreach($activeSites as $activeSite)
                    <tr>
                        <td class="site-name">
                            <a href="{!! get_edit_post_link($activeSite->ID) !!}" target="_blank">
                                {{ $activeSite->post_title }}
                            </a>
                        </td>
                        <td>
                            <?php
                                $lastEventDates = [
                                    _kdn("URL Collection") => $activeSite->lastCheckedAt,
                                    _kdn("Post Crawl")     => $activeSite->lastCrawledAt,
                                    _kdn("Post Recrawl")   => $activeSite->lastRecrawledAt,
                                    _kdn("Post Delete")    => $activeSite->lastDeletedAt
                                ];
                            ?>

                            @foreach($lastEventDates as $eventName => $dateStr)
                                <div><span>{{ $eventName }}:</span> <span class="diff-for-humans">{!! sprintf(_kdn('%1$s ago'), \KDNAutoLeech\Utils::getDiffForHumans(strtotime($dateStr))) !!}</span> <span class="date">({{ \KDNAutoLeech\Utils::getDateFormatted($dateStr) }})</span> </div>
                            @endforeach
                        </td>
                        <td>
                            <?php
                                $activeStatuses = [
                                    _kdn("Scheduling") => $activeSite->activeScheduling,
                                    _kdn("Recrawling") => $activeSite->activeRecrawling,
                                    _kdn("Deleting") => $activeSite->activeDeleting
                                ];
                            ?>

                            @foreach($activeStatuses as $eventName => $isActive)
                                <div><span>{{ $eventName }}</span>: <span class="dashicons dashicons-{{ $isActive ? 'yes' : 'no'}}"></span></div>
                            @endforeach
                        </td>
                        <td>
                            <?php
                                $countsToday = [
                                    _kdn("Queue")   => $activeSite->countQueueToday,
                                    _kdn("Saved")   => $activeSite->countSavedToday,
                                    _kdn("Updated") => $activeSite->countRecrawledToday,
                                    _kdn("Deleted") => $activeSite->countDeletedToday,
                                ];
                            ?>

                            @foreach($countsToday as $mName => $mValue)
                                <div><span>{{ $mName }}:</span> {{ $mValue }}</div>
                            @endforeach
                        </td>
                        <td>
                            <?php
                                $countsAll = [
                                    _kdn("Queue")   => $activeSite->countQueue,
                                    _kdn("Saved")   => $activeSite->countSaved,
                                    _kdn("Updated") => $activeSite->countRecrawled,
                                    _kdn("Deleted") => $activeSite->countDeleted,
                                ];
                            ?>

                            @foreach($countsAll as $mName => $mValue)
                                <div><span>{{ $mName }}:</span> {{ $mValue }}</div>
                            @endforeach
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

    @else

        {{ _kdn("No active sites.") }}

    @endif

@overwrite