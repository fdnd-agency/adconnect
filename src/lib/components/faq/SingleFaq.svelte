<script>
	export let question;
	export let answer;
	export let open = false;
</script>

<details bind:open>
	<summary>{question}</summary>
	<p>{answer}</p>
</details>

<style>
    details {
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

    details summary {
        cursor: pointer;
        display: flex;
        justify-content: space-between; /* tekst links, icoon rechts */
        align-items: center;
        gap: 0.5em;
        font-family: var(--font-heading);
        font-weight: var(--heading-font-weight);
        font-size: var(--p-s-size);
        line-height: 2em;
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

    details summary::after {
        content: url("/static/chevron-down-blue.svg"); 
        transition: transform 0.3s;
    }

    details[open] summary::after {
        transform: rotate(180deg);
    }
</style>
