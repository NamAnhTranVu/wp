<?php /** @var array $content */ ?>
<li>
	<ul style="padding-left:18px">
	    @foreach($content as $k => $v)
	        @if (!is_array($v))
	            <li>[{{ $k }}] ⇒ {!! $v !!}</li>
	        @else
	        	[{{ $k }}] ↴
	            @include('site-tester.partial.array', [
	                'content' => $v
	            ])
	        @endif
	    @endforeach
	</ul>
</li>