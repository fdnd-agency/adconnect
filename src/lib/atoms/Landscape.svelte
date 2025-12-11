
<svg class="scene" viewBox="0 0 1512 982" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <path class="clouds" d="M195.5 328.5C147.5 248.1 45.1667 212.667 0 205V787H1514.5V411.5L1361.5 386.5L1325 464L1224.5 386.5L1174 475.5L913 328.5L657.5 361.5L613 450.5L524 361.5L420 411.5C364.4 285.9 247.167 303.833 195.5 328.5Z" fill="#F4FFFF"/>
    <circle class="moon" cx="431.5" cy="297.5" r="140.5" fill="#FFFBD5"/>
    <path class="mountains" d="M71.4486 515.114H0V953H1513V446.553L1269.97 386L929.838 584.175L524.292 666.247L71.4486 515.114Z" fill="url(#paint4_linear_199_246)" />
    <rect class="water" y="858" width="895" height="123" fill="url(#paint1_linear_199_246)"/>
    <path class="grass-left" d="M87.5 734H0V858.5H773.5L593 824.5L462.5 775L350.5 789L87.5 734Z" fill="url(#paint2_linear_199_246)"/>
    <path class="grass-right-top" d="M896.5 926.5L655 887.5L800 834L887.5 791L1037.5 802L1224.5 761.5L1513 632V926.5H896.5Z" fill="url(#paint3_linear_199_246)"/>
    <path class="grass-right-bottom" d="M1513 981.5H529L1388.5 845L1513 875V981.5Z" fill="url(#paint4_linear_199_246)" />
    <g class="star" filter="url(#filter1_d_199_246)">
    <circle cx="1028.5" cy="498.5" r="7.5" fill="#D9D9D9"/>
    </g>
    <g class="star" filter="url(#filter2_d_199_246)">
    <circle cx="921" cy="243" r="10" fill="#D9D9D9"/>
    </g>
    <g class="star" filter="url(#filter3_d_199_246)">
    <circle cx="1190" cy="253" r="10" fill="#D9D9D9"/>
    </g>
    <g class="star" filter="url(#filter4_d_199_246)">
    <circle cx="1217.5" cy="84.5" r="9.5" fill="#D9D9D9"/>
    </g>
    <g class="star" filter="url(#filter5_d_199_246)">
    <circle cx="905.5" cy="80.5" r="5.5" fill="#D9D9D9"/>
    </g>
    <g class="star" filter="url(#filter6_d_199_246)">
    <circle cx="1486.5" cy="68.5" r="5.5" fill="#D9D9D9"/>
    </g>
    <defs>
    <!-- Left grass top gradient -->
    <linearGradient id="paint0_linear_199_246" x1="-2.1642e-07" y1="663.188" x2="1513" y2="675.949" gradientUnits="userSpaceOnUse">
    <stop stop-color="#59855A"/>
    <stop offset="1" stop-color="#ABEC5C"/>
    </linearGradient>
    <!-- Water gradient  -->
    <linearGradient id="paint1_linear_199_246" x1="0" y1="919.5" x2="895" y2="919.5" gradientUnits="userSpaceOnUse">
    <stop stop-color="#ABE3E6"/>
    <stop offset="1" stop-color="#D7FFFF"/>
    </linearGradient>
    <!-- Left grass bottom -->
    <linearGradient id="paint2_linear_199_246" x1="0" y1="796.25" x2="773.5" y2="796.25" gradientUnits="userSpaceOnUse">
    <stop stop-color="#3D6059"/>
    <stop offset="1" stop-color="#69815F"/>
    </linearGradient>
    <!-- Right grass top -->
    <linearGradient id="paint3_linear_199_246" x1="655" y1="779.359" x2="1513" y2="779.141" gradientUnits="userSpaceOnUse">
    <stop stop-color="#3D6059"/>
    <stop offset="1" stop-color="#5A8C59"/>
    </linearGradient>
    <!-- Right grass bottom -->
    <linearGradient id="paint4_linear_199_246" x1="529" y1="913.25" x2="1513" y2="913.25" gradientUnits="userSpaceOnUse">
    <stop stop-color="#4F785A"/>
    <stop offset="1" stop-color="#AAE95D"/>
    </linearGradient>
    </defs>
</svg>

<style>
    svg {
        background-color: #BCFFFE;
        transition: background-color 0.5s ease; 
        position: fixed;  
        top: 0;
        left: 0;
        width: 100vw;      /* volledige breedte van scherm */
        height: 100vh;     /* volledige hoogte van scherm */
        z-index: -1;
    }

    :global(.wrapper:has(.switcher:checked) .scene) {
        background-color: #424799;
        transition: background-color 0.5s ease; 
        background-color: color-mix(in srgb, #79669E 70%, #424799 30%);
    }

    .moon {
        transition: transform 1s ease;
        transform: translateY(100%);
    }

    :global(.wrapper:has(.switcher:checked) .moon) {
        transform: translateY(-10%);
    }

    .clouds {
        transform: translateY(-10%);
        transition: transform 1s ease;
    }

    :global(.wrapper:has(.switcher:checked) .clouds) {
        transition: transform 1s ease;
        transform: translateY(100%);
    }

    /* Sterren standaard onzichtbaar */
    .scene .star {
        opacity: 0;
        transition: opacity 1s ease;
    }

    /* Wanneer switcher aan → sterren zichtbaar */
    :global(.wrapper:has(.switcher:checked) .star) {
        opacity: 1;
    }

    :global(.wrapper:has(.switcher:checked) .water) {
        fill: #E6E6FF;
    }

    /* Wanneer switcher aan → andere kleuren */
    :global(.wrapper:has(.switcher:checked) linearGradient stop:first-child) { 
        stop-color: #445483; 
    }

    :global(.wrapper:has(.switcher:checked) linearGradient stop:last-child) { 
        stop-color: #95BBEA;
    }

    /* Vloeiende overgang */
    :global(.wrapper linearGradient stop) {
    transition: stop-color 1s ease;
    }

    /* Alleen mountains gradient veranderen */
    :global(.wrapper:has(.switcher:checked) #paintMountains_linear stop:first-child) { 
        stop-color: #445483; 
    }

    :global(.wrapper:has(.switcher:checked) #paintMountains_linear stop:last-child) { 
        stop-color: #3E517C; 
    }
</style>