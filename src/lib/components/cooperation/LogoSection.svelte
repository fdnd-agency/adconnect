<script>
    export let cooperation;
</script>

<div class="carousel">
    <ul>
        {#each cooperation as logo}
        <li>
            <a target="_blank" href="{logo.url}"><img src={`https://fdnd-agency.directus.app/assets/${logo.logo}`} alt={logo.name} /></a>
        </li>
        {/each}
    </ul>
</div>

<style>
    .carousel {
        overflow: hidden;
        width: 90%;
        max-width: 1400px;
    }

    ul {
        display: flex;
        animation: scroll 10s linear infinite;
    }

    li {
        flex: 0 0 33.3%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        max-height: 60px;
        width: auto;
        filter: grayscale(100%) brightness(0.8);
        opacity: 0.8;
        transition: filter 0.3s ease, opacity 0.3s ease;
    }

    img:hover {
        filter: grayscale(0%) brightness(1);
        opacity: 1;
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-25%);
        }
    }
</style>
