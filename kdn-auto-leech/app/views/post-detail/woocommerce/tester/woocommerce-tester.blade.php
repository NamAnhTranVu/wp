<?php
/** @var \KDNAutoLeech\PostDetail\WooCommerce\WooCommerceData $detailData */
/** @var \KDNAutoLeech\Objects\Crawling\Data\PostData $postData */
?>

{{-- THUMBNAIL AND GALLERY IMAGES --}}
<div class="container-fluid">
    <div class="row">
        {{-- THUMBNAIL --}}
        <div class="col col-sm-6 thumbnail-image">
            <div class="section-title">{{ _kdn('Featured Image') }}</div>
            <?php $thumbData = $postData ? $postData->getThumbnailData() : null; ?>
            @if($thumbData)
                <a href="{{ $thumbData->getLocalUrl() }}" target="_blank">
                    <img class="img-responsive" src="{{ $thumbData->getLocalUrl() }}">
                </a>
            @else
                <div class="not-found-message">
                    {{ _kdn("No featured image") }}
                </div>
            @endif
        </div>

        {{-- GALLERY IMAGES--}}
        <div class="col col-sm-6 gallery-images">
            <div class="section-title">{{ _kdn('Gallery Images') }}</div>
            @if($detailData->getGalleryImageUrls())

                @foreach($detailData->getGalleryImageUrls() as $imageUrl)
                    <div class="gallery-image">
                        <a href="{{ $imageUrl }}" target="_blank">
                            <img class="img-responsive" src="{{ $imageUrl }}">
                        </a>
                    </div>
                @endforeach

            @else
                <div class="not-found-message">
                    {{ _kdn("No gallery images") }}
                </div>
            @endif
        </div>
    </div>

</div>

{{-- PRODUCT INFORMATION --}}
@include('site-tester.partial.detail-table', [
    'tableData' => $tableData
])

{{-- DATA --}}
<div class="data-container">
    <?php $str = (print_r($detailData, true)); ?>
    @include('site-tester.partial.toggleable-textarea', [
        'title'      => _kdn('Data'),
        'toggleText' => _kdn('Toggle data'),
        'id'         => 'woocommerce-data',
        'hidden'     => true,
        'content'    => $str
    ])
</div>