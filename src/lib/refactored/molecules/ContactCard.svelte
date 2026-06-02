<script>
    import { RLink, RCardSection, label, mail, phone, RPicture } from "$lib"
</script>

<section>
    <h2>
        Contactgegevens
    </h2>

    <p>
        Heb je vragen of wil je meer weten over Associate Degrees neem dan via het onderstaande formulier contact met ons op.
    </p>

    <address>
        <RLink
            href="tel:+0205995555"
            class="nav-link"
        >
            +0205995555
        </RLink>
    
        <RLink
            href="mailto:platformads@outlook.com"
            class="nav-link"
        >
            platformads@outlook.com
        </RLink>
    </address>
</section>

<style>
    section {
		background-color: light-dark(var(--text-white), var(--primary-blue));
		border: 1px solid var(--neutral-300);
		border-radius: 1em;
		padding: 1.5em;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
        gap: 1em;

        p {
            width: clamp(25ch, auto, 40)
        }
    }

    address {
        display: flex;
        flex-direction: column;
        font-style: normal;
        gap: 1em;

        padding: 2em 0 0 0;
    }
</style>
