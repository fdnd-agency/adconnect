<script>
  import { logo, logowhite } from '$lib'

  import { page } from '$app/stores'
</script>

<header>
  <nav>
    <a class="logo" href="/">
      <picture>
        <source srcset={logowhite} media="(prefers-color-scheme: dark)" />
        <img src={logo} alt="Logo" loading="lazy" width="200" height="150" />
      </picture>
    </a>

    <details class="menu">
      <summary>
        <span></span>
        <span></span>
        <span></span>
      </summary>
      <ul class="panel">
        <li><a href="/over-ad">Over Ad's</a></li>
        <li><a href="/publicaties">Publicaties</a></li>
        <li><a href="/talent-award">Talent Award</a></li>
        <li><a href="/nieuws">Nieuws</a></li>
        <li><a href="/ad-dag">Ad-dag</a></li>
        <li><a href="over-ons">Over ons</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </details>

    <ul class="desktop-nav">
      <li><a class={$page.url.pathname === '/over-ad' ? 'menu-button active' : 'menu-button'} href="/over-ad">Over Ad's</a></li>
      <li><a class={$page.url.pathname === '/publicaties' ? 'menu-button active' : 'menu-button'} href="/publicaties">Publicaties</a></li>
      <li><a class={$page.url.pathname === '/talent-award' ? 'menu-button active' : 'menu-button'} href="/talent-award">Talent Award</a></li>
      <li><a class={$page.url.pathname === '/nieuws' ? 'menu-button active' : 'menu-button'} href="/nieuws">Nieuws</a></li>
      <li><a class="button-outline-white" href="/ad-dag">Kom naar Ad-dag</a></li>
    </ul>
  </nav>
</header>

<style>
  /* MOBILE*/
  header {
    background-color: var(--background);
    width: 100%;
    display: flex;
    position: fixed;
    top: 2.8em;
    justify-content: center;
    padding: 1em 5%;
    align-items: center;
  }

  nav {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: var(--background);
    z-index: 99;
    max-width: 1400px;
    box-sizing: border-box;

    .logo img {
      height: 50px;
    }
  }

  summary {
    display: inline-block;
    position: relative;
    cursor: pointer;
    list-style: none;
    -webkit-tap-highlight-color: transparent;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary span {
    display: block;
    position: relative;
    width: 28px;
    height: 3px;
    margin: 6px 0;
    background: light-dark(var(--blue-800), var(--blue-150));
    border-radius: 2px;
    transform-origin: center;
    transition: all 0.3s ease;
  }

  .menu {
    display: block;
    position: relative;
    z-index: 0;
  }
  .menu:hover summary span {
    width: 32px;
  }

  .menu::before {
    content: "";
    display: block;
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .menu[open]::before {
    background: rgba(0, 0, 0, 0.25);
    opacity: 1;
    pointer-events: auto;
  }

  .panel {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: 1000;
    flex-direction: column;
    justify-content: center;
    gap: 1.2rem;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: clamp(1rem, 3vw, 2rem);
    box-sizing: border-box;
    background: var(--background);
    list-style: none;
    text-align: left;
    transform: translateX(100%);
    transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }

  .menu[open] .panel {
    transform: translateX(0);
  }
  .menu[open] summary {
    display: inline-block;
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 1001;
    padding: 6px;
    background: transparent;
    border-radius: 8px;
  }

  .menu[open] summary span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  .menu[open] summary span:nth-child(2) {
    transform: scaleX(0);
    opacity: 0;
  }
  .menu[open] summary span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
  .panel a {
    display: block;
    color: light-dark(var(--blue-800), var(--blue-150));
    font-weight: 500;
    font-size: 1.2rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }

  :global(body:has(.menu[open])) {
    overflow: hidden;
  }

  .desktop-nav {
    display: none;
  }

  /* Desktop */
  @media (min-width: 1160px) {
    header {
      padding: 0.5em 5%;
    }
    .logo {
      display: block;
      height: 50px;
    }

    .logo img {
      width: 12em;
    }

    .menu {
      display: none;
    }

    .desktop-nav {
      display: flex;
      position: relative;
      gap: 2rem;
      list-style: none;
    }

    nav {
      padding: 1rem 0;
    }

    /* Hover animatie menu items */
    .menu-button {
      font-weight: var(--heading-font-weight);
      color: light-dark(var(--blue-800), var(--blue-150));
      padding: 0.5rem 1rem;
    }
  }

  .menu-button:hover::after {
    width: 100%;
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .panel,
    .menu::before,
    summary span {
      transition: none !important;
    }
  }

  /* Hover animatie menu items */
  .menu-button {
    font-weight: var(--heading-font-weight);
    color: light-dark(var(--blue-800), var(--blue-150));
    padding: 0.5rem 1rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      height: 2px;
      width: 0%;
      background: currentColor;
      transition: 0.3s ease;
    }
  }

  .menu-button:hover::after {
    width: 100%;
  }

  a {
    position: relative;
  }

  a.active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(1);
    transition: 0.3s ease;
  }
</style>
