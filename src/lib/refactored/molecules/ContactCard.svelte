<script>
    import { RLink, RCardSection, lightcircle, mail, phone, RPicture } from "$lib"
    const { ...props }=$props()
</script>

<section class="contact-card">
    <h2>
        Contactgegevens
    </h2>

    <p>
        Heb je vragen of wil je meer weten over Associate Degrees neem dan via het onderstaande formulier contact met ons op.
    </p>

    <address class="contact-card__details">
        <RLink
            href="tel:+0205995555"
            class="nav-link"
        >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.4062 1.78125C16.75 1.875 17 2.15625 17 2.5C17 10.5312 10.5 17 2.5 17C2.125 17 1.84375 16.7812 1.75 16.4375L1 13.1875C0.9375 12.8438 1.09375 12.4688 1.4375 12.3125L4.9375 10.8125C5.25 10.6875 5.59375 10.7812 5.8125 11.0312L7.375 12.9375C9.8125 11.7812 11.7812 9.78125 12.9062 7.40625L11 5.84375C10.75 5.625 10.6562 5.28125 10.7812 4.96875L12.2812 1.46875C12.4375 1.125 12.8125 0.9375 13.1562 1.03125L16.4062 1.78125Z" fill="white"/>
            </svg>
            Telefoonnummer
        </RLink>
        
        <RLink
            href="mailto:platformads@outlook.com"
            class="nav-link"
        >       
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.6875 3.96875C15.8125 3.875 16 3.96875 16 4.125V10.5C16 11.3438 15.3125 12 14.5 12H1.5C0.65625 12 0 11.3438 0 10.5V4.125C0 3.96875 0.15625 3.875 0.28125 3.96875C1 4.53125 1.90625 5.21875 5.09375 7.53125C5.75 8 6.875 9.03125 8 9.03125C9.09375 9.03125 10.25 8 10.875 7.53125C14.0625 5.21875 14.9688 4.53125 15.6875 3.96875ZM8 8C7.25 8.03125 6.21875 7.09375 5.6875 6.71875C1.53125 3.71875 1.21875 3.4375 0.28125 2.6875C0.09375 2.5625 0 2.34375 0 2.09375V1.5C0 0.6875 0.65625 0 1.5 0H14.5C15.3125 0 16 0.6875 16 1.5V2.09375C16 2.34375 15.875 2.5625 15.6875 2.6875C14.75 3.4375 14.4375 3.71875 10.2812 6.71875C9.75 7.09375 8.71875 8.03125 8 8Z" fill="white"/>
            </svg>
            platformads@outlook.com
        </RLink>
    </address>

    <svg class="circle-info" width="469" height="469" viewBox="0 0 469 469" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M437.388 117.684C502.016 229.624 463.663 372.76 351.724 437.388C239.784 502.016 96.648 463.663 32.0198 351.724C-32.6085 239.784 5.74481 96.648 117.684 32.0198C229.624 -32.6084 372.76 5.74482 437.388 117.684Z" fill="#97AED5" fill-opacity="0.15"/>
    </svg>

</section>

<style>
    .contact-card {
		background-color: light-dark(var(--text-white), var(--primary-blue));
		border: 1px solid var(--neutral-300);
		border-radius: 1em;

		padding: 1.5em;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
        gap: 2em;
        position: relative;

        overflow: hidden;

        @media (min-width: 1080px) {
            width: 40%;        
        }
    }

    .contact-card__details {
        display: flex;
        flex-direction: column;
        font-style: normal;
        gap: 1em;
    }

    .circle-info {
		display: none;

		@media (min-width: 875px) {
			width: 17em;
            right: -10%;
            bottom: -40%;
			display: block;
			position: absolute;
            
		}
    }
</style>
