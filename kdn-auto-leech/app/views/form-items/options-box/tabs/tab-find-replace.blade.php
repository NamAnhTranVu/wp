<div class="description">
    {{ _kdn("Find and replace in each item. These options will be applied before any changes are made to the current item.") }} {!! _kdn_trans_regex() !!}
</div>

<table class="kdn-settings">
    <tr>
        <td>
            @include('form-items/multiple', [
                'include'       =>  'form-items/find-replace',
                'name'          =>  '_options_box[find_replace]',
                'addKeys'       =>  true,
                'remove'        =>  true,
                'addon'         =>  'dashicons dashicons-search',
                'data'          =>  [
                    'testType'  =>  \KDNAutoLeech\Test\Test::$TEST_TYPE_FIND_REPLACE,
                    'extra'     =>  $dataExtra
                ],
                'test'          => true,
                'addonClasses'  => 'kdn-test-find-replace'
            ])
            @include('partials/test-result-container')</td>
    </tr>

</table>