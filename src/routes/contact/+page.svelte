<script>
  import { page } from "$app/stores";
  $: pathname = $page.url.pathname;
  import { enhance } from "$app/forms";

  // Import components Atomic Design
  import { MultipleFaq, SingleFaq, NavPros, Breadcrumb, ErrorState, SuccesState, LoadingState } from "$lib";

  // Import images Atomic Design
  import { mail, map, phone, lightcircle, darkcircle, birdcheck, loading, wrong } from "$lib";

  const breadcrumb = "";

  // Variable to check the status of the form
  let status = "";

  // Function when form is submitting
  function formSubmit() {
    // When submitting show the loading UI state
    status = "submitting";

    return async ({ result, update }) => {
      // When the form is correct submitted then show succes UI state
      if (result.type === "success") {
        status = "success";
        // When the form isn't correct submitted then show error UI state
      } else if (result.type === "failure") {
        status = "error";
      }

      // Update the form to see the correct UI state
      await update();
    };
  }
</script>

<svelte:head>
  <title>Contact | Overlegplatform Associate degrees</title>
</svelte:head>

<NavPros />

<section class="contact-hero" id="main">
  {#if pathname !== "/"}
    <nav class="hero-breadcrumb">
      {#if breadcrumb}
        {breadcrumb}
      {:else}
        <a href="/">Home</a><a href={pathname}>{pathname}</a>
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
        <li><a href="/"><img src={phone} alt="" />Telefoonnummer</a></li>
        <li><a href="mailto:platformassociatedegrees@outlook.com"><img src={mail} alt="" />platformads@outlook.com</a></li>
        <li><a href="/"><img src={map} alt="" />Amsterdam</a></li>
      </ul>

      <img class="circle-info" src={lightcircle} alt="" />
    </section>

    <div class="wrapper-form">
      {#if (status === "") | (status === "error")}
        <form class="contact-form" method="POST" use:enhance={formSubmit}>
          <input type="hidden" name="access_key" value="6195e1b0-246a-4f48-ad4a-36914847623b" />
          <input type="hidden" name="subject" value="Nieuwe inzending contactformulier" />
          <input type="hidden" name="from_name" value="Overlegplatform Ad" />
          <label for="name"
            ><p>Naam + Achternaam<span>*</span></p>
            <input type="text" name="name" id="name" placeholder="Bijv. Jan van Huizen" required />
          </label>
          <label for="email"
            ><p>E-mailadres<span>*</span></p>
            <input type="email" name="email" id="email" placeholder="Bijv. janvanhuizen@gmail.com" required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" />
          </label>
          <label for="message"
            ><p>Jouw vraag<span>*</span></p>
            <textarea name="message" id="message" placeholder="Beste Overlegplatform Ad's, ik heb een vraag over.." required></textarea>
          </label>
          <div>
            <button class="button-outline-white" type="submit">Formulier verzenden</button>
            {#if status === "error"}
              <section class="error visible">
                <p>Oeps er is iets fout gegaan, het formulier is niet verzonden probeer het opnieuw.</p>
              </section>
            {/if}
          </div>
        </form>
      {/if}

      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        <Breadcrumb />
      </div>

      <h1>Vragen? Neem contact op</h1>
      <p class="intro">Heb je vragen of wil je meer weten over Associate Degrees neem dan via het onderstaande formulier contact met ons op.</p>

      <div class="contact-wrapper">
        <section class="contact-info">
          <h2 class="white">Contactgegevens</h2>
          <p class="white">Heb je vragen? Vul het contactformulier in of neem contact op via de onderstaande contactgegevens.</p>
          <ul>
            <li><a href="/" class="white"><img src={phone} alt="" />Telefoonnummer</a></li>
            <li><a href="mailto:platformassociatedegrees@outlook.com" class="white"><img src={mail} alt="" />platformads@outlook.com</a></li>
          </ul>

          <img class="circle-info" src={lightcircle} alt="" />
        </section>

        <div class="wrapper-form">
          {#if (status === "") | (status === "error")}
            <h2>Contactformulier</h2>
            <form class="contact-form" method="POST" use:enhance={formSubmit}>
              <input type="hidden" name="access_key" value="6195e1b0-246a-4f48-ad4a-36914847623b" />
              <input type="hidden" name="subject" value="Nieuwe inzending contactformulier" />
              <input type="hidden" name="from_name" value="Overlegplatform Ad" />
              <label for="name"
                ><p>Naam + Achternaam<span>*</span></p>
                <input type="text" name="name" id="name" placeholder="Bijv. Jan van Huizen" required />
              </label>
              <label for="email"
                ><p>E-mailadres<span>*</span></p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Bijv. janvanhuizen@gmail.com"
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                />
              </label>
              <label for="message"
                ><p>Jouw vraag<span>*</span></p>
                <textarea name="message" id="message" placeholder="Beste Overlegplatform Ad's, ik heb een vraag over.." required></textarea>
              </label>

              <button class="button-outline-white" type="submit">Formulier verzenden</button>

              <p class="strict">Velden met een '<span class="orange">*</span>' zijn verplicht</p>

              <!-- Error state -->
              <ErrorState {status} />
            </form>
          {/if}

          <!-- Loading state -->
          <LoadingState {status} />

          <!-- Succes state -->
          <SuccesState {status} />
        </div>
      </div>
    </div>
  </div>
</section>

<section class="faq-section">
  <h2>Veelgestelde vragen</h2>

  <MultipleFaq>
    <SingleFaq
      open={true}
      question="Wat is een Associate degree?"
      answer="Een Associate Degree is een praktijkgerichte, tweejarige opleiding op hbo-niveau. De opleiding combineert theoretische kennis met praktische ervaring, zodat studenten snel inzetbaar zijn in het werkveld en de mogelijkheid hebben om door te stromen naar een bacheloropleiding."
    />

    <SingleFaq
      question="Hoe lang duurt een Associate degree?"
      answer="Een Ad duurt doorgaans twee jaar bij een voltijdopleiding. Bij deeltijd kan dit langer zijn, afhankelijk van de persoonlijke planning en werkervaring."
    />

    <SingleFaq
      question="Wat is het verschil tussen een Associate degree en een Bachelor?"
      answer="Een bacheloropleiding duurt meestal vier jaar en richt zich breder op theorie en verdieping, terwijl een Ad intensief, praktijkgericht en korter is, met direct toepasbare vaardigheden voor het werkveld."
    />

    <SingleFaq
      question="Welke voordelen heeft het behalen van een Associate degree?"
      answer="Met een Ad-diploma ben je snel inzetbaar in de praktijk, heb je een erkend hbo-kwalificatieniveau en kun je doorstromen naar een bachelor. Daarnaast vergroot het je carrièremogelijkheden en professionele netwerk."
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

    .breadcrumbs {
        margin: 0 0 -1em 0;
        :global(a) {
            color: var(--blue-800);
        }
    }
  }

  .breadcrumbs {
    margin: 0 0 -1em 0;
    :global(a) {
      color: var(--blue-800);
    }
  }

  h1,
  .intro {
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
        display: flex;
        flex-direction: column-reverse;
        gap: 1em;
        width: 100%;

        h2 {
            font-size: 25px;
        }
    }

    @media (min-width: 768px) {
        .contact-wrapper {
            flex-direction: row;
            gap: 2em;
            max-width: 1400px;
        }
    }

    .contact-form {
        width: 100%;
    }

    .wrapper-form {
        width: 100%;
        background-color: var(--text-white);
        border: 1px solid var(--neutral-300);
        border-radius: 1em;
        padding: 1.5em;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        gap: 1em;
    }

    @media (min-width: 768px) {
        .contact-form {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1em;
        }

        .contact-form label:nth-child(6) {
            grid-column: 1 / -1; /* full-width */
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: .8em;

        .strict {
            background-color: var(--blue-100);
            padding: .5em 1em;
            width: fit-content;
            height: fit-content;
            border-radius: .5em;
        }

        .orange {
            color: var(--primary-orange);
        }
    }

    a {
      display: flex;
      align-items: center;
      gap: 0.5em;
      color: var(--text-white);
      word-break: break-all;
      position: relative;
      z-index: 1;
    }
  }

    input:invalid:not(:placeholder-shown),
    textarea:invalid:not(:placeholder-shown) {
        outline: 2px solid red;
    }

    input:valid,
    textarea:valid {
        outline: 2px solid rgb(1, 213, 5);
    }

    .contact-info {
        background-color: var(--primary-blue);
        color: var(--text-white);
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

        h2 {
            font-size: 25px;
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
  }

  .circle-info {
    display: none;

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
  }

  .contact-info h2,
  .contact-info p {
    color: var(--text-white);
  }

  /* FAQ */
  .faq-section {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 3em 5%;
    box-sizing: border-box;
    position: relative;

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

    @media (min-width: 768px) {
      flex-direction: row;
    }

    .white {
        color: var(--text-white);
    }
  }
</style>
