<script>
    import { wrong } from '$lib'
    export let status
</script>

{#if status === 'error'}
    <div class="error visible">
        <img src="{wrong}" alt="">
        <p>Oeps er is iets fout gegaan, het formulier is niet verzonden probeer het opnieuw.</p>
    </div>
{/if}

<style>
    .error {
        color: red;
        display: flex;
        align-items: baseline;
        gap: 1em;
        background-color: #FFE4E4;
        padding: .3em;
        border-radius: .5em;
    }
</style>
