<script>
    import { page } from "$app/stores";

    // Import components Atomic Design
    import { MultipleFaq, SingleFaq, NavPros } from '$lib'
   
    // Import images Atomic Design
    import { mail, map, phone, lightcircle, darkcircle } from '$lib'

    export let breadcrumb = "";

</script>

<svelte:head>
  <title>Contact | Overlegplatform Associate degrees</title>
</svelte:head>

<NavPros />

<section class="contact-hero" id="main">

     {#if $page.url.pathname !== "/"}
      <nav class="hero-breadcrumb">
        {#if breadcrumb}
          {breadcrumb}
        {:else}
          <a href="/">Home</a><a href="{$page.url.pathname}">{$page.url.pathname}</a>
        {/if}
      </nav>
    {/if}

    <h1>Vragen? Neem contact op</h1>
    <p class="intro">Heb je vragen of wil je meer weten over Associate Degrees neem dan via het onderstaande formulier contact met ons op.</p>

    <div class="contact-wrapper">
        <section class="contact-info">
            <h2>Contactgegevens</h2>
            <p>Heb je vragen? Vul het contactformulier in of neem contact op via de onderstaande contactgegevens.</p>
            <ul>
                <li><a href="/"><img src="{phone}" alt="">Telefoonnummer</a></li>
                <li><a href="mailto:platformassociatedegrees@outlook.com"><img src="{mail}" alt="">platformassociatedegrees@outlook.com</a></li>
                <li><a href="/"><img src="{map}" alt="">Amsterdam</a></li>
            </ul>

            <img class="circle-info" src="{lightcircle}" alt="">
        </section>

        <form class="contact-form">
                <label for="name"><p>Voor + Achternaam<span>*</span></p>
                    <input type="text" id="name" placeholder="Bijv. Pieter van der Veen" required>
                </label>
                <label for="mail"><p>E-mailadres<span>*</span></p>
                    <input type="email" id="mail" placeholder="Bijv. pietervdv@gmail.com">
                </label>
                <label for="tel"><p>Telefoonnummer<span>*</span></p>
                    <input type="tel" id="tel" placeholder="Bijv. +31 650328798">
                </label>
                <label for="message"><p>Bericht<span>*</span></p>
                    <textarea id="message" placeholder="Beste Overlegplatform Ad's.."></textarea>
                </label>
                <button class="button-outline-white">Formulier verzenden</button>
        </form>
    </div>
</section>

<section class="faq-section">
    <h2>Veelgestelde vragen</h2>

    <MultipleFaq>
        <SingleFaq
            open={true}
            question="Wat is een Associate Degree Ad?"
            answer="Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna."
        />
        
        <SingleFaq
            question="Hoe lang duurt een Associate degree?"
            answer="Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna."
        />

        <SingleFaq
            question="Wat is het verschil tussen een Associate Degree en een Bachelor?"
            answer="Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna."
        />

        <SingleFaq
            question="Welke voordelen heeft het behalen van een Associate Degree?"
            answer="Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna."
        />
    </MultipleFaq>
</section>

<style>
    .contact-hero {
        box-sizing: border-box;
        background-color: var(--blue-100);
        width: 100%;
        padding: 3em 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;

        @media (min-width: 768px) {
            padding: 5em 5%;
            gap: 1.5em;
        }
    }

    nav.hero-breadcrumb {
        display: flex;
        justify-content: center;
        margin: 0 0 -1em 0;
        font-weight: var(--button-font-weight);
        font-family: var(--button-outline-font-family);
        gap: .5em;

        a:first-of-type {
            font-weight: var(--heading-font-weight);
        }
        
        a {
            color: var(--blue-800);
        }
    }

    h1, .intro {
        text-align: center;
    }

    .contact-wrapper {
        display: flex;
        flex-direction: column-reverse;
        gap: 1em;
        width: 100%;
    }

    @media (min-width: 768px) {
        .contact-wrapper {
            flex-direction: row;
            gap: 2em;
        }
    }

    .contact-form {
        background-color: var(--text-white);
        border: 1px solid var(--neutral-300);
        border-radius: 1em;
        padding: 1.5em;
    }

    @media (min-width: 768px) {
        .contact-form {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1em;
        }

        .contact-form label:nth-child(1),
        .contact-form label:nth-child(4),
        .contact-form button {
            grid-column: 1 / -1; /* full-width */
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: .8em;
    }

    label {
        display: flex;
        flex-direction: column;
        font-family: var(--font-body);
        font-weight: var(--text-font-weight);
        font-size: var(--p-s-size);

        p {
            display: flex;
            gap: .5em;

            span {
                color: var(--primary-orange);
            }
        }

        input, textarea {
            font-family: var(--font-body);
            font-weight: var(--text-font-weight);
            font-size: var(--p-s-size);
            padding: .9em;
            background-color: #F2F2F2;
            border: 1px solid var(--neutral-300);
            border-radius: .5em;
            margin: .5em 0 0 0;

            &::-webkit-input-placeholder {
                color: var(--blue-800);
            }
        }

        textarea {
            height: 7em;
        }
    }

    .contact-info {
        background-color: var(--primary-blue);
        display: flex;
        flex-direction: column;
        padding: 1.5em;
        border-radius: 1em;
        gap: .7em;
        position: relative;
        overflow: hidden;

        ul {
            list-style-type: none;
            display: flex;
            flex-direction: column;
            gap: .5em;
        }

        a {
            display: flex;
            align-items: center;
            gap: .5em;
            color: var(--text-white);
            word-break: break-all;
            position: relative;
            z-index: 1;
        }
    }

    @media (min-width: 768px) {
        .contact-info {
            width: 40%;
        }
    }
    
    .circle-info {
        display: none;

         @media (min-width: 768px) {
            width: 17em;
            right: -10%;
            bottom: -10%;
            display: block;
            position: absolute;
        }
    }

    .contact-info h2, .contact-info p {
        color: var(--text-white);
        word-break: break-all;
    }

    /* FAQ */
    .faq-section {
        display: flex;
        flex-direction: column;
        gap: 2em;
        padding: 3em 5%;
        box-sizing: border-box;
        position: relative;

        @media (min-width: 768px) {
            padding: 5em 5%;
        }
    }

    .faq-section h2 {
        text-align: center;
    }
</style>