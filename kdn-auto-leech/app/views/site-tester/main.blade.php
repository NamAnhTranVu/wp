<div class="wrap">
    <h1>{{ _kdn('Site Tester') }}</h1>

    <div class="content">
        <form action="" id="tester-form" type="post">

            {{-- ADD NONCE AND ACTION --}}
            @include('partials.form-nonce-and-action')

            {{-- SITE SELECT--}}
            <div class="input-group site">
                <label for="site_id">{{ _kdn('Site') }} </label>
                <select name="site_id" id="site_id">
                    @foreach($sites as $site)
                        <option value="{{ $site->ID}}">{{ $site->post_title }}</option>
                    @endforeach
                </select>
            </div>

            {{-- TEST TYPE SELECT--}}
            <div class="input-group test-type">
                <label for="test_type">{{ _kdn('Test Type') }}</label>
                <select name="test_type" id="test_type">
                    @foreach(\KDNAutoLeech\Factory::testController()->getGeneralTestTypes() as $testName => $testType)
                        <option value="{{ $testType }}">{{ $testName }}</option>
                    @endforeach
                </select>
            </div>

            {{-- URL --}}
            <div class="input-group url">
                <label for="test_url_part">{{ _kdn('Test URL') }}</label>
                <input type="text" name="test_url_part" id="test_url_part" placeholder="{{ _kdn('Full URL or URL without domain') }}">
            </div>

            {{-- SUBMIT BUTTON --}}
            <div class="input-group submit">
                <button class="button" type="submit">{{ _kdn('Test') }}</button>
            </div>
        </form>

        @include('site-tester.test-history')

        <div id="test-results" class="hidden">

        </div>
    </div>
</div>