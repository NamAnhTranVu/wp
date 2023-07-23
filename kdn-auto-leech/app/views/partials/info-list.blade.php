@if(\KDNAutoLeech\Objects\Informing\Informer::getInfos())
    <div class="info-list-container">
        @if (!isset($noTitle) || !$noTitle)
            <span class="title">{{ _kdn("Information") }}</span>
        @endif
        <ul>
            @foreach(\KDNAutoLeech\Objects\Informing\Informer::getInfos() as $info)
                <li>
                    <?php /** @param KDNAutoLeech\Objects\Informing\Information $info */ ?>
                    <div class="message">
                        <span class="name">{{ _kdn('Message') }}:</span>
                        <span class="description">{{ $info->getMessage() }}</span>
                    </div>

                    @if($info->getDetails())
                        <div class="details">
                            <span class="name">{{ _kdn('Details') }}:</span>
                            <span class="description">{{ $info->getDetails() }}</span>
                        </div>
                    @endif

                    <div class="type">
                        <span class="name">{{ _kdn('Type') }}:</span>
                        <span class="description">{{ $info->getType() }}</span>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>
@endif