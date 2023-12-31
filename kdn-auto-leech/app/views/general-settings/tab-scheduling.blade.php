<div class="kdn-settings-title">
    <h3>{{ _kdn('Scheduling') }}</h3>
    <span>{{ _kdn('Set time intervals to crawl the sites') }}</span>
</div>

<table class="kdn-settings">
    @if($isGeneralPage)
        {{-- SCHEDULING IS ACTIVE --}}
        <tr>
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_is_scheduling_active',
                    'title' =>  _kdn('Scheduling is active?'),
                    'info'  =>  _kdn('If you want to activate automated checking and crawling for the
                        active sites, check this.')
                ])
            </td>
            <td>
                @include('form-items/checkbox', [
                    'name'          =>  '_kdn_is_scheduling_active',
                    'dependants'    =>  '["#url-collection-interval", "#post-crawling-interval"]',
                ])
            </td>
        </tr>

        {{-- INTERVAL URL COLLECTION --}}
        <tr id="url-collection-interval">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_interval_url_collection',
                    'title' =>  _kdn('Post URL Collection Interval'),
                    'info'  =>  _kdn('Set interval for post URL collection.')
                ])
            </td>
            <td>
                @include('form-items/select', [
                    'name'      =>  '_kdn_interval_url_collection',
                    'options'   =>  $intervals,
                    'isOption'  =>  $isOption,
                ])
            </td>
        </tr>

        {{-- INTERVAL POST CRAWLING --}}
        <tr id="post-crawling-interval">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_interval_post_crawl',
                    'title' =>  _kdn('Post Crawl Interval'),
                    'info'  =>  _kdn('Set interval for post crawling, i.e. saving posts by visiting collected
                        URLs.')
                ])
            </td>
            <td>
                @include('form-items/select', [
                    'name'      =>  '_kdn_interval_post_crawl',
                    'options'   =>  $intervals,
                    'isOption'  =>  $isOption,
                ])
            </td>
        </tr>
    @endif

    {{-- MAX NUMBER OF PAGES TO BE CRAWLED PER CATEGORY --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_max_page_count_per_category',
                'title' =>  _kdn('Maximum number of pages to crawl per category'),
                'info'  =>  _kdn('How many pages at maximum can be crawled for each category of each
                    site? Set this <b>0</b> to get all available pages for each category.')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_max_page_count_per_category',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  0,
            ])
        </td>
    </tr>

    {{-- NO NEW URL PAGE TRIAL LIMIT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_no_new_url_page_trial_limit',
                'title' =>  _kdn('Maximum number of pages to check to find new post URLs'),
                'info'  =>  _kdn('How many pages should be checked before going back checking the first
                    page of the category, if there is no new URLs found? Default is <b>0</b>,
                    meaning that all of the pages will be checked until the last page.
                    <br /><br />
                    For example, if you say 3 pages and there is no new posts found in 3 different
                    pages of a category in a row, e.g. 4th, 5th, and 6th pages, then the crawler
                    goes to the first page to check for new URLs, without trying 7th and pages
                    coming after 7th page.')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_no_new_url_page_trial_limit',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  0,
            ])
        </td>
    </tr>

    {{-- RUN COUNT FOR EACH URL COLLECTION EVENT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_run_count_url_collection',
                'title' =>  _kdn('Run count for URL collection event'),
                'info'  =>  _kdn('For example, when you set this to 2, and interval for URL collection to 1 minute,
                        URL collection event will be run 2 times every minute. Default value is 1.')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_run_count_url_collection',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  1,
            ])
        </td>
    </tr>

    {{-- RUN COUNT FOR EACH POST CRAWLING EVENT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_run_count_post_crawl',
                'title' =>  _kdn('Run count for post-crawling event'),
                'info'  =>  _kdn('For example, when you set this to 3, and interval for post crawl to 2 minutes,
                        post-crawling event will be run 3 times every 2 minutes. Default value is 1.')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_run_count_post_crawl',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  1,
            ])
        </td>
    </tr>

    {{-- SECTION: RECRAWLING --}}
    @include('partials.table-section-title', ['title' => _kdn("Recrawling")])

    @if($isGeneralPage)
        {{-- POST RECRAWLING IS ACTIVE --}}
        <tr id="is-post-recrawling-active">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_is_recrawling_active',
                    'class' =>  'label-recrawl',
                    'title' =>  _kdn('Recrawling is active?'),
                    'info'  =>  _kdn('If you want to activate post recrawling for active sites, check this. By this way,
                    the posts will be recrawled (updated).')
                ])
            </td>
            <td>
                @include('form-items/checkbox', [
                    'name'          =>  '_kdn_is_recrawling_active',
                    'dependants'    =>  '["#post-recrawling-interval"]',
                ])
            </td>
        </tr>

        {{-- INTERVAL POST RECRAWLING --}}
        <tr id="post-recrawling-interval">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_interval_post_recrawl',
                    'class' =>  'label-recrawl',
                    'title' =>  _kdn('Post Recrawl Interval'),
                    'info'  =>  _kdn('Set interval for post crawling, i.e. saving posts by visiting collected
                        URLs.')
                ])
            </td>
            <td>
                @include('form-items/select', [
                    'name'      =>  '_kdn_interval_post_recrawl',
                    'options'   =>  $intervals,
                    'isOption'  =>  $isOption,
                ])
            </td>
        </tr>
    @endif

    {{-- RUN COUNT FOR EACH POST RECRAWLING EVENT --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_run_count_post_recrawl',
                'class' =>  'label-recrawl',
                'title' =>  _kdn('Run count for post-recrawling event'),
                'info'  =>  _kdn('For example, when you set this to 3, and interval for post recrawl to 2 minutes,
                        post-recrawling event will be run 3 times every 2 minutes. Default value is 1.')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_run_count_post_recrawl',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  1,
            ])
        </td>
    </tr>

    {{-- MAX RECRAWL COUNT --}}
    <tr id="max-recrawl-count">
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_max_recrawl_count',
                'class' =>  'label-recrawl',
                'title' =>  _kdn('Maximum recrawl count per post'),
                'info'  =>  _kdn('How many times at maximum a post can be recrawled (updated). Set this to 0 if
                    you do not want to limit. Default: 0')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_max_recrawl_count',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  0,
            ])
        </td>
    </tr>

    {{-- MIN TIME BETWEEN RECRAWLS --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_min_time_between_two_recrawls_in_min',
                'class' =>  'label-recrawl',
                'title' =>  _kdn('Minimum time between two recrawls for a post (in minutes)'),
                'info'  =>  _kdn('At least how many minutes should pass after the last recrawl so that a post can be
                    suitable for recrawling again? E.g. if you set this to 60 minutes, for a post to become suitable for
                    recrawling again, there should have passed at least 60 minutes. Set 0 to set no limit.
                    Default: 1440 (1 day)')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_min_time_between_two_recrawls_in_min',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  0,
            ])
        </td>
    </tr>

    {{-- RECRAWL POSTS NEWER THAN --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_recrawl_posts_newer_than_in_min',
                'class' =>  'label-recrawl',
                'title' =>  _kdn('Recrawl posts newer than (in minutes)'),
                'info'  =>  _kdn('E.g. if you set this to 1440 minutes, the posts older than 1 day will not be
                    recrawled. Set 0 to set no limit. Default: 43200 (1 month)')
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_recrawl_posts_newer_than_in_min',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  0,
            ])
        </td>
    </tr>

    {{-- SECTION: DELETING --}}
    @include('partials.table-section-title', ['title' => _kdn("Deleting")])

    @if($isGeneralPage)
        {{-- POST DELETING IS ACTIVE --}}
        <tr id="is-post-deleting-active">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_is_deleting_posts_active',
                    'class' =>  'label-post-deleting',
                    'title' =>  _kdn('Deleting is active?'),
                    'info'  =>  _kdn('If you want to activate post deleting, check this. By this way, the old posts
                        that were crawled previously will be deleted. The posts will be <b>deleted permanently</b>.
                        <b>They will not be sent to the trash.</b> You cannot access or retrieve the posts after they
                        are deleted.')
                ])
            </td>
            <td>
                @include('form-items/checkbox', [
                    'name'          =>  '_kdn_is_deleting_posts_active',
                    'dependants'    =>  '["#post-deleting-interval"]',
                ])
            </td>
        </tr>

        {{-- INTERVAL POST DELETE --}}
        <tr id="post-deleting-interval">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_interval_post_delete',
                    'class' =>  'label-post-deleting',
                    'title' =>  _kdn('Post Delete Interval'),
                    'info'  =>  _kdn('Set interval for post deleting event.')
                ])
            </td>
            <td>
                @include('form-items/select', [
                    'name'      =>  '_kdn_interval_post_delete',
                    'options'   =>  $intervals,
                    'isOption'  =>  $isOption,
                ])
            </td>
        </tr>

        {{-- MAX NUMBER OF POSTS TO DELETE --}}
        <tr id="max-post-delete-count">
            <td>
                @include('form-items/label', [
                    'for'   =>  '_kdn_max_post_count_per_post_delete_event',
                    'class' =>  'label-post-deletingl',
                    'title' =>  _kdn('Maximum number of posts to delete for each run'),
                    'info'  =>  sprintf(_kdn('Maximum number of posts that can be deleted for each run of post delete
                        event. The posts will be deleted WordPress-way to allow other plugins to interrupt or listen to
                        the process. So, a lot of work will be done each time a post is being deleted. Please keep this
                        in mind. <b>Setting this option to a low value is highly recommended.</b> Default: %s, Min: %s'), 30, 1)
                ])
            </td>
            <td>
                @include('form-items/text', [
                    'name'      =>  '_kdn_max_post_count_per_post_delete_event',
                    'isOption'  =>  $isOption,
                    'type'      =>  'number',
                    'min'       =>  1,
                ])
            </td>
        </tr>
    @endif

    {{-- DELETE POSTS OLDER THAN --}}
    <tr>
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_delete_posts_older_than_in_min',
                'class' =>  'label-post-deleting',
                'title' =>  _kdn('Delete posts older than (in minutes)'),
                'info'  =>  sprintf(_kdn('E.g. if you set this to 1440 minutes, the posts older than 1 day will be
                    deleted. Default: 43200 (1 month), Min: %1$s'), 1)
            ])
        </td>
        <td>
            @include('form-items/text', [
                'name'      =>  '_kdn_delete_posts_older_than_in_min',
                'isOption'  =>  $isOption,
                'type'      =>  'number',
                'min'       =>  1,
            ])
        </td>
    </tr>

    {{-- DELETE POST ATTACHMENTS --}}
    <tr id="delete-post-attachments">
        <td>
            @include('form-items/label', [
                'for'   =>  '_kdn_is_delete_post_attachments',
                'class' =>  'label-post-deleting',
                'title' =>  _kdn('Delete post attachments?'),
                'info'  =>  _kdn('If you want the attachments of the posts to be deleted along with the post, check this.')
            ])
        </td>
        <td>
            @include('form-items/checkbox', [
                'name' =>  '_kdn_is_delete_post_attachments',
            ])
        </td>
    </tr>

    <?php

    /**
     * Fires before closing table tag in scheduling tab of general settings page.
     *
     * @param array $settings       Existing settings and their values saved by user before
     * @param bool  $isGeneralPage  True if this is called from a general settings page.
     * @param bool  $isOption       True if this is an option, instead of a setting. A setting is a post meta, while
     *                              an option is a WordPress option. This is true when this is fired from general
     *                              settings page.
     * @since 1.6.3
     */
    do_action('kdn/view/general-settings/tab/scheduling', $settings, $isGeneralPage, $isOption);

    ?>

</table>