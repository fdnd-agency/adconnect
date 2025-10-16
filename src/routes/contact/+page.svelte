<script>
    import { page } from "$app/stores";
    import NavPros from '$lib/components/header/NavPros.svelte';

    // Import afbeeldingen
    import mail from '$lib/assets/icon-mail.svg';
    import map from '$lib/assets/icon-map.svg';
    import phone from '$lib/assets/icon-phone.svg';
    import lightcircle from '$lib/assets/light-circle.svg';
    import darkcircle from '$lib/assets/dark-circle.svg';

    export let breadcrumb = "";

</script>

<svelte:head>
  <title>Contact | Overlegplatform Associate degrees</title>
</svelte:head>

<NavPros />

<section class="contact-hero">

     {#if $page.url.pathname !== "/"}
      <nav class="hero-breadcrumb">
        {#if breadcrumb}
          {breadcrumb}
        {:else}
          <a href="/">Home</a>{$page.url.pathname}
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
                <label for="name">Voor + Achternaam
                    <input type="text" id="name" placeholder="Bijv. Pieter van der Veen">
                </label>
                <label for="mail">E-mailadres
                    <input type="email" id="mail" placeholder="Bijv. pietervdv@gmail.com">
                </label>
                <label for="phone">Telefoonnummer
                    <input type="phone" id="phone" placeholder="Bijv. +31 6503287958">
                </label>
                <label for="message">Bericht
                    <textarea id="message" placeholder="Beste Overlegplatform Ad's.."></textarea>
                </label>
                <button class="button-outline-white">Formulier verzenden</button>
        </form>
    </div>
</section>

<section class="faq">
    <h2>Veelgestelde vragen</h2>

    <img class="circle-faq" src="{darkcircle}" alt="">

    <details open>
        <summary>Wat is een Associate Degree Ad?</summary>
        <p>Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna.</p>
    </details>

    <details>
        <summary>Hoe lang duurt een Associate Degree?</summary>
        <p>Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna.</p>
    </details>

    <details>
        <summary>Wat is het verschil tussen een Associate Degree en een Bachelor</summary>
        <p>Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna.</p>
    </details>

    <details>
        <summary>Welke voordelen heeft het behalen van een Associate Degree?</summary>
        <p>Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna.</p>
    </details>
</section>

