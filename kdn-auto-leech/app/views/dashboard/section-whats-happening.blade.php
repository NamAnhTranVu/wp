@extends('dashboard.partials.section')

@section('content-class') whats-happening @overwrite
@section('header') @overwrite

@section('title')
    {{ _kdn("What's happening") }}
@overwrite

@section('content')
    <?php $now = strtotime(current_time('mysql')); ?>

    {{-- CRON EVENTS --}}
    <h3>{{ _kdn("CRON Events") }} <span>({{ sprintf(_kdn('Now: %1$s'), \KDNAutoLeech\Utils::getDateFormatted(current_time('mysql'))) }})</span></h3>
    <table class="detail-card orange">
        <thead>
            <tr>
                <?php
                    $tableHeadValues = [
                        _kdn("URL Collection") => \KDNAutoLeech\Factory::schedulingService()->eventCollectUrls,
                        _kdn("Post Crawl")     => \KDNAutoLeech\Factory::schedulingService()->eventCrawlPost,
                        _kdn("Post Recrawl")   => \KDNAutoLeech\Factory::schedulingService()->eventRecrawlPost,
                        _kdn("Post Delete")    => \KDNAutoLeech\Factory::schedulingService()->eventDeletePosts,
                    ];
                ?>
                <th></th>
                @foreach($tableHeadValues as $name => $eventKey)
                    <th>
                        {{ $name }}
                        <div class="interval-description">{{ $dashboard->getCronEventIntervalDescription($eventKey) }}</div>
                    </th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            <tr>
                <?php
                    $nextEventDates = [
                        [$dashboard->getNextUrlCollectionDate(),    $dashboard->getNextUrlCollectionSite()],
                        [$dashboard->getNextPostCrawlDate(),        $dashboard->getNextPostCrawlSite()],
                        [$dashboard->getNextPostRecrawlDate(),      $dashboard->getNextPostRecrawlSite()],
                        [$dashboard->getNextPostDeleteDate(),       $dashboard->getNextPostDeleteSite()],
                    ];
                ?>
                <td>{{ _kdn("Next") }}</td>

                @foreach($nextEventDates as $v)
                    <?php $timestamp = strtotime($v[0]); ?>
                    <td>
                        <div class="diff-for-humans">
                            {{ \KDNAutoLeech\Utils::getDiffForHumans(strtotime($v[0])) }}
                            {{ $timestamp > $now ? _kdn("later") : _kdn("ago") }}
                        </div>
                        <span class="date">({{ \KDNAutoLeech\Utils::getDateFormatted($v[0]) }})</span>
                        @if($v[1])
                            <div class="next-site">
                                @include('dashboard.partials.site-link', ['site' => $v[1]])
                            </div>
                        @endif
                    </td>
                @endforeach
            </tr>
            <tr>
                <td>{{ _kdn("Last") }}</td>
                <?php
                    $lastEventDates = [
                        $dashboard->getLastUrlCollectionDate(),
                        $dashboard->getLastPostCrawlDate(),
                        $dashboard->getLastPostRecrawlDate(),
                        $dashboard->getLastPostDeleteDate(),
                    ];
                ?>
                @foreach($lastEventDates as $d)
                    <td><div class="diff-for-humans">{!! sprintf(_kdn("%s ago"), \KDNAutoLeech\Utils::getDiffForHumans(strtotime($d))) !!}</div> <span class="date">({{ \KDNAutoLeech\Utils::getDateFormatted($d) }})</span> </td>
                @endforeach
            </tr>
        </tbody>
    </table>

    {{-- COUNTS --}}
    <h3>{{ _kdn("Counts") }}</h3>
    <table class="detail-card counts teal">
        <thead>
            <tr>
                <th></th>
                <th>{{ _kdn("URLs in Queue") }}</th>
                <th>{{ _kdn("Saved Posts") }}</th>
                <th>{{ _kdn("Updated Posts") }}</th>
                <th>{{ _kdn("Deleted Posts") }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ _kdn("Today") }}</td>
                <td>{{ $dashboard->getTotalUrlsInQueueAddedToday() }}</td>
                <td>{{ $dashboard->getTotalSavedPostsToday() }}</td>
                <td>{{ $dashboard->getTotalRecrawledPostsToday() }}</td>
                <td>{{ $dashboard->getTotalDeletedPostsToday() }}</td>
            </tr>
            <tr>
                <td>{{ _kdn("All") }}</td>
                <td>{{ $dashboard->getTotalUrlsInQueue() }}</td>
                <td>{{ $dashboard->getTotalSavedPosts() }}</td>
                <td>{{ $dashboard->getTotalRecrawledPosts() }}</td>
                <td>{{ $dashboard->getTotalDeletedPosts() }}</td>
            </tr>
        </tbody>
    </table>

    {{-- CURRENTLY - URLS --}}
    @if($dashboard->getUrlsCurrentlyBeingCrawled())
        <h3>{{ _kdn("URLs being crawled right now") }}</h3>
        @include('dashboard.partials.table-urls', [
            'urls'          => $dashboard->getUrlsCurrentlyBeingCrawled(),
            'tableClass'    => 'detail-card green',
            'dateColumnName' => _kdn('Created'),
            'fieldName' => 'created_at',
        ])

    @endif

    {{-- CURRENTLY - POSTS --}}
    @if($dashboard->getPostsCurrentlyBeingSaved())
        <h3>{{ _kdn("Posts being saved right now") }}</h3>
        @include('dashboard.partials.table-posts', [
            'posts'         => $dashboard->getPostsCurrentlyBeingSaved(),
            'tableClass'    => 'detail-card green'
        ])

    @endif

@overwrite