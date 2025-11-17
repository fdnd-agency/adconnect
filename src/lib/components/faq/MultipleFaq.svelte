<script>
	import FaqItem from '$lib/components/faq/SingleFaq.svelte';
	import darkcircle from '$lib/assets/dark-circle.svg';
</script>

<section class="faq">
	<img class="circle-faq" src={darkcircle} alt="">

	<slot />
</section>

<style>
    .faq {
        display: flex;
        flex-direction: column;
        gap: 1em;
        box-sizing: border-box;
        position: relative;
    }

    .circle-faq {
        position: absolute;
        width: 20em;
        left: -10%;
        bottom: -10%;
        z-index: 0;

         @media (min-width: 768px) {
            width: 25em;
            left: 5%;
            bottom: -15%;
            position: absolute;
             z-index: 0;
        }
    }
</style>
