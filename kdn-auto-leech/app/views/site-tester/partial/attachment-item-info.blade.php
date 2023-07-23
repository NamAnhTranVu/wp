{{--
    Required variables:
        string $info: The information to be shown
        string $name: Name/title of the information
--}}
@if($info)
    <div>
        <span class="name">{{ $name }}</span>
        <span>{{ $info }}</span>
    </div>
@endif