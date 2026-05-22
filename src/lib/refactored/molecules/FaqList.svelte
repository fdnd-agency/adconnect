<script>
	export let question
	export let answer
	export let open = false

    import { IconChevronDown } from '$lib/icons'

    const vraag = "Wat is een Associate degree?"
    const antwoord = "Een Associate Degree is een praktijkgerichte, tweejarige opleiding op hbo-niveau. De opleiding combineert theoretische kennis met praktische ervaring, zodat studenten snel inzetbaar zijn in het werkveld en de mogelijkheid hebben om door te stromen naar een bacheloropleiding."
</script>

<details class="accordion adaptive" bind:open>
	<summary class="accordion__trigger">{vraag} <div class="accordion__icon"><IconChevronDown /></div></summary>
	<p class="accordion__content">{antwoord}</p>
</details>

<style>
    .accordion {
        border: 1px solid var(--neutral-300);
        border-radius: .5em;
        padding: 1em;
        position: relative;
        z-index: 1;
        background-color: var(--text-white);

        p {
            width: 100%;
        }

        @media (min-width: 768px) {
            width: 55vw;
            align-self: center;
        }
    }

    .accordion__trigger {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-heading);
        font-weight: var(--heading-font-weight);
        font-size: var(--p-s-size);
        line-height: 2em;
        cursor: pointer;
    }

    ::details-content {
        transition:
        height 0.5s ease,
        content-visibility 0.5s ease allow-discrete;
        height: 0;
        overflow: clip;
    }

    [open]::details-content {
        height: auto;
    }

    summary::-webkit-details-marker {
        display: none;
    }

    .accordion__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 39px;
        height: 36px;
        padding: 0 .4em 0 0.5em;
        border-radius: .4em;
        background-color: var(--primary-orange);
        transition: transform 0.3s;
    }

    details[open] .accordion__icon {
        transform: rotate(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
        ::details-content {
            transition: none;
        }

        .accordion__icon {
            transition: none;
        }
    }

    @media (prefers-contrast: more) {
        .accordion {
            outline: 2px solid var(--primary-blue);
        }
    }

    @media (prefers-color-scheme: dark) {
        .accordion.adaptive {
            background-color: var(--primary-blue);
            color: var(--text-white);
        }
    }

   @media (inverted-colors: inverted) {
        .accordion {
            background-color: var(--primary-orange);
            color: var(--text-white);
        }
    }

</style>
