<div class="wrap container-dashboard">

    <h1> {{ _kdn('KDN Auto Leech') }} <small>({!! KDN_AUTO_LEECH_VERSION !!})</small></h1>

    <div class="auto-refresh-container">
        {!! sprintf(
            _kdn("Auto refresh every %s seconds"),
            '<input type="number" name="refresh" id="refresh" placeholder=">= 3" title="' . sprintf(_kdn("At least %s seconds"), 3) . '">'
        ) !!}

        <span class="next-refresh-in hidden">
            - {!! sprintf(_kdn("Next refresh in %s"), '<span class="remaining">0</span>') !!}
        </span>
    </div>

    {{-- Main container --}}
    <div class="container-fluid" id="dashboard-container">
        <div class="row">
            {{-- Active sites --}}
            <div class="col col-sm-12">
                @include('dashboard.section-active-sites', [
                    'activeSites' => $dashboard->getActiveSites(),
                ])
            </div>

            <?php

            /**
             * Fires in the main row in Dashboard page, just after Active Sites section
             *
             * @param KDNAutoLeech\Objects\Dashboard $dashboard
             * @since 1.6.3
             */
            do_action('kdn/view/dashboard/main-row', $dashboard);

            ?>

        </div>

        <div class="row">
            <div class="col col-sm-6">
                <div class="row">
                    {{-- What's happening --}}
                    <div class="col col-sm-12">
                        @include('dashboard.section-whats-happening')
                    </div>

                    {{-- Last recrawled posts --}}
                    <div class="col col-sm-12">
                        @include('dashboard.section-last-posts', [
                            'title'             => _kdn("Last recrawled posts"),
                            'posts'             => $dashboard->getLastRecrawledPosts(),
                            'type'              => 'recrawl',
                            'countOptionName'   => '_kdn_dashboard_count_last_recrawled_posts',
                        ])
                    </div>

                    {{-- Last URLs marked as deleted --}}
                    <div class="col col-sm-12">
                        @include('dashboard.section-last-urls', [
                            'title'             => _kdn("URLs of the last deleted posts"),
                            'urls'              => $dashboard->getLastUrlsMarkedAsDeleted(),
                            'countOptionName'   => '_kdn_dashboard_count_last_deleted_urls',
                            'dateColumnName'    => _kdn("Deleted"),
                            'fieldName'         => 'deleted_at',
                        ])
                    </div>

                    <?php

                    /**
                     * Fires at the end of left column in Dashboard page, just after Last Deleted URLs table
                     *
                     * @param KDNAutoLeech\Objects\Dashboard $dashboard
                     * @since 1.6.3
                     */
                    do_action('kdn/view/dashboard/left-col', $dashboard);

                    ?>

                </div>
            </div>

            <div class="col col-sm-6">
                <div class="row">
                    {{-- Last crawled posts --}}
                    <div class="col col-sm-12">
                        @include('dashboard.section-last-posts', [
                            'title'             => _kdn("Last crawled posts"),
                            'posts'             => $dashboard->getLastCrawledPosts(),
                            'countOptionName'   => '_kdn_dashboard_count_last_crawled_posts',
                        ])
                    </div>

                    {{-- Last URLs added to the queue --}}
                    <div class="col col-sm-12">
                        @include('dashboard.section-last-urls', [
                            'title'             => _kdn("Last URLs added to the queue"),
                            'urls'              => $dashboard->getLastUrlsInQueue(),
                            'countOptionName'   => '_kdn_dashboard_count_last_urls',
                            'dateColumnName'    => _kdn("Created"),
                            'fieldName'         => 'created_at',
                        ])
                    </div>

                    <?php

                    /**
                     * Fires at the end of right column in Dashboard page, just after Last Added URLs table
                     *
                     * @param KDNAutoLeech\Objects\Dashboard $dashboard
                     * @since 1.6.3
                     */
                    do_action('kdn/view/dashboard/right-col', $dashboard);

                    ?>
                </div>
            </div>

        </div>
    </div>


</div>