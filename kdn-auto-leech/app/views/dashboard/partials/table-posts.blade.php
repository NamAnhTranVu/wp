{{--
    Required variables:
        $posts: (WP_Post[])

    Optional variables:
        $tableClass: (string)
--}}

<?php
    $isRecrawl = false;
    $isRecrawl = isset($type) && $type && $type != 'crawl' ? true : false;
    $now = strtotime(current_time('mysql'));
?>

{{-- TABLE --}}
<table class="section-table {{ isset($tableClass) && $tableClass ? $tableClass : '' }}">

    {{-- THEAD --}}
    <thead>
        <tr>
            <th>{{ _kdn("Post") }}</th>
            <th>{{ $isRecrawl ? _kdn("Recrawled") : _kdn("Saved") }}</th>
            @if($isRecrawl)
                <th class="col-update-count">{{ _kdn("Update Count") }}</th>
            @endif
        </tr>
    </thead>

    {{-- TBODY --}}
    <tbody>
        @foreach($posts as $post)
            @if(!isset($post->kdn) || !isset($post->kdn->site)) @continue @endif
            <tr>
                {{-- POST --}}
                <td class="col-post">
                    {{-- TITLE --}}
                    <div class="post-title">
                        <a href="{!! get_permalink($post->ID) !!}" target="_blank">
                            {{ $post->post_title }}
                        </a>

                        {{-- EDIT LINK --}}
                        <span class="edit-link">
                            - <a href="{!! get_edit_post_link($post->ID) !!}" target="_blank">
                                {{ _kdn("Edit") }}
                            </a>
                        </span>
                    </div>

                    {{-- DETAILS --}}
                    <div class="post-details">
                        {{-- SITE --}}
                        @include('dashboard.partials.site-link', ['site' => $post->kdn->site])

                        {{-- POST TYPE --}}
                        <span class="post-type">
                            ({{ $post->post_type }})
                        </span>

                        {{-- ID --}}
                        <span class="id">
                            {{ _kdn("ID") }}: {{ $post->ID }}
                        </span> -

                        {{-- TARGET URL --}}
                        <span class="target-url">
                            <a href="{!! $post->kdn->url !!}" target="_blank">
                                {!! mb_strlen($post->kdn->url) > 255 ? mb_substr($post->kdn->url, 0, 255) . "..." : $post->kdn->url !!}
                            </a>
                        </span>
                    </div>

                </td>

                {{-- DATE --}}
                <td class="col-date">
                    {{-- Diff for humans --}}
                    <span class="diff-for-humans">
                        <?php
                            $timestamp = strtotime($isRecrawl ? $post->kdn->recrawled_at : $post->kdn->saved_at);
                        ?>
                        {{ \KDNAutoLeech\Utils::getDiffForHumans($timestamp) }}
                        {{ $timestamp > $now ? _kdn("later") : _kdn("ago") }}
                    </span>

                    <span class="date">
                        ({{ \KDNAutoLeech\Utils::getDateFormatted($isRecrawl ? $post->kdn->recrawled_at : $post->kdn->saved_at) }})
                    </span>
                </td>

                {{-- UPDATE COUNT --}}
                @if($isRecrawl)
                    <td class="col-update-count">
                        {{ $post->kdn->update_count }}
                    </td>
                @endif
            </tr>
        @endforeach
    </tbody>

</table>