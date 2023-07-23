<?php

/** @var array $item */
$content = array_get($item, "data");

?>

<div class="post-meta-item">
    {{-- META KEY --}}
    <div class="post-meta-key">
        <span class="name">{{ _kdn("Meta key") }}</span>
        <span>{{ array_get($item, "meta_key") }}</span>
    </div>

    {{-- MULTIPLE --}}
    <div class="post-meta-multiple">
        <span class="name">{{ _kdn("Multiple") }}</span>
        <span class="dashicons dashicons-{{ array_get($item, "multiple") ? 'yes' : 'no' }}"></span>
    </div>

    {{-- JSON --}}
    <div class="post-meta-json">
        <span class="name">{{ _kdn("JSON Parse") }}</span>
        <span class="dashicons dashicons-{{ array_get($item, "json") ? 'yes' : 'no' }}"></span>
    </div>

    {{-- META CONTENT --}}
    <div class="post-meta-content">
        <span class="name">{{ _kdn("Content") }}</span>
        @if(is_array($content) && array_get($item, "multiple"))
            <div>
                <ol>
                    @foreach($content as $value)
                        <li>
                            @if(is_array($value))
                                <div>
                                    <ul>
                                        @foreach($value as $key => $val)
                                            @if(is_array($val))
                                                [{{ $key }}] ↴
                                                @include('site-tester.partial.array', [
                                                    'content' => $val
                                                ])
                                            @else
                                                <li>
                                                    [{{ $key }}] ⇒ {{ $val }}
                                                </li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </div>
                            @else
                                {{ $value }}
                            @endif
                        </li>
                    @endforeach
                </ol>
            </div>
        @else
            @if(is_array($content))
                <div>
                    <ul style="padding-left:18px">
                        @foreach($content as $key => $value)
                            @if(is_array($value))
                                [{{ $key }}] ↴
                                @include('site-tester.partial.array', [
                                    'content' => $value
                                ])
                            @else
                                <li>
                                    [{{ $key }}] ⇒ {{ $value }}
                                </li>
                            @endif
                        @endforeach
                    </ul>
                </div>
            @else
                <span>{{ $content }}</span>
            @endif
        @endif
    </div>
</div>