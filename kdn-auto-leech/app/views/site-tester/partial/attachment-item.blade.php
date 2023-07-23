<?php /** @var \KDNAutoLeech\Objects\File\MediaFile $item */ ?>
<div class="attachment-item">
    {{-- ITEM --}}
    <div>
        @if($item->isGalleryImage())
            @if($item->isGalleryImage() === 'direct-file')
                <span class="name">{{ _kdn("Direct file") }}</span>
            @else
                <span class="name">{{ _kdn("Gallery Item") }}</span>
            @endif
        @endif
        <span><a href="{{ $item->getLocalUrl() }}" target="_blank"
           @if(isset($tooltip) && $tooltip)
             data-html="true" data-toggle="tooltip" title="<img src='{{ $item->getLocalUrl() }}'>"
           @endif>
            {{ $item->getLocalUrl() }}
        </a></span>
    </div>

    {{-- TITLE --}}
    @include('site-tester.partial.attachment-item-info', [
        'name' => _kdn('Title'),
        'info' => $item->getMediaTitle()
    ])

    {{-- DESCRIPTION --}}
    @include('site-tester.partial.attachment-item-info', [
        'name' => _kdn('Description'),
        'info' => $item->getMediaDescription()
    ])

    {{-- CAPTION --}}
    @include('site-tester.partial.attachment-item-info', [
        'name' => _kdn('Caption'),
        'info' => $item->getMediaCaption()
    ])

    {{-- ALT --}}
    @include('site-tester.partial.attachment-item-info', [
        'name' => _kdn('Alternate text'),
        'info' => $item->getMediaAlt()
    ])

    {{-- COPY FILES --}}
    @if($item->getCopyFileUrls())
        <div>
            <span class="name">{{ _kdn('Copy file URLs') }}</span>
            <ol>
                @foreach($item->getCopyFileUrls() as $copyFileUrl)
                    <li>
                        <a href="{{ $copyFileUrl }}" target="_blank"
                        @if(isset($tooltip) && $tooltip)
                            data-html="true" data-toggle="tooltip" title="<img src='{{ $item->getLocalUrl() }}'>"
                        @endif>
                            {{ $copyFileUrl }}</a>
                    </li>
                @endforeach
            </ol>
        </div>
    @endif
</div>