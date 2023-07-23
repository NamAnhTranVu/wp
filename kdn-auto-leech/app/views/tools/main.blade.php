<div class="wrap container-tools kdn-settings-meta-box" id="container-tools">
    <h1>{{ _kdn('Tools') }}</h1>

    {{-- TABS --}}
    <h2 class="nav-tab-wrapper">
        <a href="#" data-tab="#tab-manual-crawling"     class="nav-tab nav-tab-active">{{ _kdn('Manual Crawling') }}</a>
        <a href="#" data-tab="#tab-manual-recrawling"   class="nav-tab">{{ _kdn('Manual Recrawling') }}</a>
        <a href="#" data-tab="#tab-urls"                class="nav-tab">{{ _kdn('URLs') }}</a>

        @include('partials.input-url-hash')
    </h2>

    {{-- MANUAL CRAWLING --}}
    <div id="tab-manual-crawling" class="tab">
        @include('tools/tabs/tab-manual-crawling')

        <?php

        /**
         * Fires at the end of closing tag of the content area in Tools page
         *
         * @since 1.6.3
         */
        do_action('kdn/view/tools');

        ?>
    </div>

    {{-- MANUAL RECRAWLING --}}
    <div id="tab-manual-recrawling" class="tab hidden">
        @include('tools/tabs/tab-manual-recrawling')
    </div>

    {{-- URLS --}}
    <div id="tab-urls" class="tab hidden">
        @include('tools/tabs/tab-urls')
    </div>

</div>