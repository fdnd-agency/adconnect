<svg viewBox="0 0 361 338" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="cat-body" d="M0 0V338H360.5V0L270.5 63H86.5L0 0Z" fill="#F37827"/>
    <circle class="eye-border-left" cx="92" cy="172" r="56" fill="white"/>
    <circle class="outer-eye-left" cx="91.5" cy="171.5" r="44.5" fill="black"/>
    <circle class="inner-eye-left" cx="105.5" cy="154.5" r="25.5" fill="white"/>
    <circle class="eye-border-right" cx="274" cy="169" r="56" fill="white"/>
    <circle class="outer-eye-right" cx="273.5" cy="168.5" r="44.5" fill="black"/>
    <circle class="inner-eye-right" cx="287.5" cy="151.5" r="25.5" fill="white"/>
    <path class="mouth" d="M158 256V231H212.5V258.5C208.833 264 197.8 274.6 183 273C168.2 271.4 160.167 261 158 256Z" fill="#F2A9A1"/>
    <path class="teeth-left" d="M170 247L174.33 230.5H165.67L170 247Z" fill="white"/>
    <path class="teeth-right" d="M202 247L206.33 230.5H197.67L202 247Z" fill="white"/>
    <path class="paw-left" d="M76 337.5C76 322.312 88.3122 310 103.5 310C118.688 310 131 322.312 131 337.5V338H76V337.5Z" fill="#C44F01"/>
    <path class="paw-right" d="M213 337.5C213 322.312 225.312 310 240.5 310C255.688 310 268 322.312 268 337.5V338H213V337.5Z" fill="#C44F01"/>
    <rect class="brows" x="17" y="70" width="310" height="40" fill="#F37827"/>
</svg>

<style>
    svg {
        position: fixed;
        bottom: 0;
        width: 60%;
        max-width: 18em;

        /* Brows */
        .brows {
            transition: transform 0.3s ease;
        }

        /* Mouth */
        .mouth {
            transition: transform 0.3s ease;
            transform-origin: center;
        }

        .teeth-left {
            transition: transform 0.3s ease;
            transform-origin: center;
        }

        .teeth-right {
            transition: transform 0.3s ease;
            transform-origin: center;
        }

        .outer-eye-left,
        .outer-eye-right {
            transform-origin: center center;
            animation: blink 4s infinite;
        }
    }

    /* When switcher is on brows are going down */
    :global(.mood:has(.switcher:checked) + svg .brows) {
        transform: translateY(40px); /* pas aan naar wat mooi is */
        transition: transform 0.3s ease;
    }

    /* When switcher is on mouth is inverted */
    :global(.mood:has(.switcher:checked) ~  svg .mouth) {
        transform: translateY(155px) scaleY(-1);
    }

    /* When switcher is on teeth left is inverted */
    :global(.mood:has(.switcher:checked) ~ svg .teeth-left) {
        transform: translateY(155px) scaleY(-1);
    }

    /* When switcher is on teeth right is inverted */
    :global(.mood:has(.switcher:checked) ~ svg .teeth-right ){
        transform: translateY(155px) scaleY(-1);
    }

    /* Eyes blinking */
    @keyframes blink {
        0%, 90%, 100% { 
            transform: scaleY(1); 
        }

        95% { 
            transform: scaleY(0.1); 
        }
    }
</style>