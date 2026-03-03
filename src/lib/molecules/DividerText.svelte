<script>
    export let text = ''
</script>

<div class="divider-container">
    <hr class="line" />
    <p>{text}</p>
    <hr class="line" />
</div>

<style>
    .divider-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 90%;
        max-width: 1400px;
        margin: 2em auto;
    }

    hr {
        flex: 1;
        border: none;
        height: 1px;
        border-top: 1px solid var(--neutral-300);
    }

</style>
