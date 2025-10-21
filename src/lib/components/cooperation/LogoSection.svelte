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
