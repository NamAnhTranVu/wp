{{-- SECTION: WOOCOMMERCE --}}
@include('partials.table-section-title', ['title' => _kdn("WooCommerce")])

<tr id="woocommerce-options-container">
    <td colspan="2">
        @include('post-detail.woocommerce.site-settings.child-post.container')
    </td>
</tr>