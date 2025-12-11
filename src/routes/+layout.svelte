<script>
  import favicon from "$lib/assets/favicon-adc.svg";
  import logodark from "$lib/assets/logo-dark.svg";

//   import { TopNav } from "$lib";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <!-- stylesheet -->
  <link rel="stylesheet" href="/stylesheet.css" />
</svelte:head>

<a href="#main" class="skip-link">Ga naar content</a>

<!-- <header class="general-header">
  <TopNav />
</header> -->

<main>
  {@render children?.()}
</main>

<!-- <footer class="footer-grid">
  <div class="wrapper">
    <a href="/" class="logo"><img src={logodark} alt="Terug naar homepagina" width="230" height="75" loading="lazy" /></a>

    <section>
      <h2>AdConnect</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur. Massa et enim vitae quis eget. Quam elit elementum vivamus libero vitae nulla nec eget. Porttitor nunc
        tristique dictumst dui at augue vitae a. Nisl orci ultricies nec quisque. Nulla laoreet elit id vitae ullamcorper.
      </p>
    </section>

    <section>
      <div class="desktop-menu">
        <h2>Menu</h2>
        <ul>
          <li><a href="/">Wat zijn Ad's?</a></li>
          <li><a href="/">Documenten</a></li>
          <li><a href="/">Nieuws</a></li>
          <li><a href="/">Evenementen</a></li>
          <li><a href="/">Nominaties</a></li>
        </ul>
      </div>

      <details class="mobile-menu">
        <summary><h2>Menu</h2></summary>
        <ul>
          <li><a href="/">Wat zijn Ad's?</a></li>
          <li><a href="/">Documenten</a></li>
          <li><a href="/">Nieuws</a></li>
          <li><a href="/">Evenementen</a></li>
          <li><a href="/">Nominaties</a></li>
        </ul>
      </details>
    </section>

    <section>
      <div class="desktop-menu">
        <h2>Thema's</h2>
        <ul>
          <li><a href="/">Impactmakerschap</a></li>
          <li><a href="/">Niveau 5</a></li>
          <li><a href="/">Doorstroom Ad’s</a></li>
          <li><a href="/">Onderzoek houding</a></li>
        </ul>
      </div>

      <details class="mobile-menu">
        <summary><h2>Thema's</h2></summary>
        <ul>
          <li><a href="/">Impactmakerschap</a></li>
          <li><a href="/">Niveau 5</a></li>
          <li><a href="/">Doorstroom Ad’s</a></li>
          <li><a href="/">Onderzoek houding</a></li>
        </ul>
      </details>
    </section>

    <section>
      <div class="desktop-menu">
        <h2>Leden van bestuur</h2>
        <ul>
          <li><a href="/">Roland van der Poel (voorzitter)</a></li>
          <li><a href="/">Carolien van Rijswijk</a></li>
          <li><a href="/">Carolien van Rijswijk</a></li>
          <li><a href="/">Carolien van Rijswijk</a></li>
          <li><a href="/">Carolien van Rijswijk</a></li>
        </ul>
      </div>

      <details class="mobile-menu">
        <summary><h2>Leden van bestuur</h2></summary>
        <ul>
          <li><a href="/">Roland van der Poel (voorzitter)</a></li>
          <li><a href="/">Roland van der Poel (voorzitter)</a></li>
          <li><a href="/">Roland van der Poel (voorzitter)</a></li>
          <li><a href="/">Roland van der Poel (voorzitter)</a></li>
          <li><a href="/">Roland van der Poel (voorzitter)</a></li>
        </ul>
      </details>
    </section>

    <section>
      <div class="desktop-menu">
        <h2>Contact</h2>
        <ul>
          <li><a href="mailto:platformassociatedegrees@outlook.com">platformassociatedegrees@outlook.com</a></li>
        </ul>
      </div>

      <details class="mobile-menu">
        <summary><h2>Contact</h2></summary>
        <ul>
          <li><a href="mailto:platformassociatedegrees@outlook.com">platformassociatedegrees@outlook.com</a></li>
        </ul>
      </details>
    </section>

    <div class="divider"></div>

    <div class="footer-bottom">
      <p>© Overlegplatform Associate Degrees. Alle rechten voorbehouden</p>
      <p>Ontwikkeld door studenten FDND</p>
    </div>
  </div>
</footer> -->

<style>
  :root {
    interpolate-size: allow-keywords;
  }

  :global(*) {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }
  :global(header) {
    overflow: hidden;
  }

  main {
    margin: 7.9em 0 0 0;
  }

  /* Skiplink */
  .skip-link {
    text-decoration: none;
    color: var(--text-white);
    background-color: var(--primary-blue);
    border: 1px solid var(--primary-text);
    padding: 0.7em 1.2em;
    border-radius: 5px;
    transition: 0.3s ease-in;
    position: absolute;
    top: -10rem;
    left: 45%;
    z-index: 99999999;
  }

  .skip-link:focus-visible {
    top: 0;
  }

  footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--primary-blue);
    border-radius: 1em 1em 0 0;

    h2 {
      color: var(--text-white);
      font-size: 25px;
    }
  }

  .wrapper {
    background-color: var(--primary-blue);
    margin: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    position: relative;
    z-index: 20;
    width: 90%;
    align-self: center;
    padding: 2em 0;
  }

  @media (min-width: 768px) {
    .wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2em;
    }
  }

  @media (min-width: 1024px) {
    .wrapper {
      grid-template-columns: 2fr 1fr 1fr 1fr;
      grid-auto-rows: auto;
      width: 90%;
      max-width: 1400px;
      padding: 5em 0 2em 0;
    }
  }

  a {
    color: #fff;
    text-decoration: none;
    display: block;
    transition: 0.2s ease-in-out;

    &:hover {
      transform: translate(5%, 0%);
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.7em;

    li {
      list-style-type: none;
    }
  }

  .logo {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  footer section:nth-of-type(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    padding: 0 0 1em 0;

    p {
      @media (min-width: 768px) {
        max-width: 20em;
      }
    }
  }

  footer section:nth-of-type(5) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  .divider {
    height: 1px;
    background-color: #fff;
    grid-column: 1 / -1;
  }

  .footer-bottom {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    justify-content: space-between;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: block;
  }

  @media (min-width: 768px) {
    .desktop-menu {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .mobile-menu {
      display: none;
    }
  }

  /* Dropdown menu */
  details {
    margin: -0.7em 0 0 0;
  }

  summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    gap: 0.5em;
  }

  /* Change icon when open and close */
  summary::after {
    content: url("/static/chevon-down.svg");
  }

  details[open] summary::after {
    content: url("/static/chevron-up.svg");
  }

  /* Animation open and close */
  ::details-content {
    transition:
      height 0.5s ease,
      content-visibility 0.5s ease allow-discrete;
    height: 0;
    overflow: clip;
    padding: 0.7em 0 0 0;
  }

  [open]::details-content {
    height: auto;
  }
</style>
