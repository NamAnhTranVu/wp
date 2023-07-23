@if(isset($buttons))
    <div class="input-group">
        <div class="input-container input-button-container short-code-container">
            <?php /** @var \KDNAutoLeech\Objects\ShortCodeButton $button */ ?>
            @foreach($buttons as $button)
                <button class="button" type="button"
                        data-shortcode-name="{{ $button->getCode() }}"
                        data-clipboard-text="{{ $button->getCodeWithBrackets() }}"
                        data-toggle="tooltip"
                        data-placement="{{ isset($tooltipPos) && $tooltipPos ? $tooltipPos : 'top' }}"
                        title="{{ $button->getDescription() }}"
                >{{ $button->getCodeWithBrackets() }}</button>
            @endforeach

            @if(!isset($noCustomShortCodes) || !$noCustomShortCodes)
                <div class="custom-short-code-container"></div>
            @endif

        </div>
    </div>
@endif