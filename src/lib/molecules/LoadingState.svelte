<script>
    import { loading } from '$lib'
    export let status
</script>

{#if status === 'submitting'}
    <section class="loading visible">
        <h3>Formulier verzenden...</h3>
        <img class="spinner" src="{loading}" alt="">
    </section>
{/if}

<style>
    .spinner {
        width: 5em;
        height: 5em;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .loading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h3 {
            text-align: center;
        }
    }
</style>
