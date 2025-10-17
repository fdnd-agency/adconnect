<script>
    import logo from '$lib/assets/logo-desktop.svg';
    import logomobile from '$lib/assets/logomobile.svg';
  </script>
  
  <nav>
    <a class="logo-mobile" href="/"><img src={logomobile} alt="Logo" /></a>
    <a class="logo-desktop" href="/"><img src={logo} alt="Logo" /></a>
    <details class="menu">
      <summary>
        <span></span>
        <span></span>
        <span></span>
      </summary>
      <ul class="panel">
        <li><a href="student/over-ad">Over Ad's</a></li>
        <li><a href="student/talentaward">TalentAward</a></li>
        <li><a href="student/nieuws">Nieuws</a></li>
        <li><a href="/student/ad-dag">kom naar Ad-dag</a></li>
        <li><a href="nominaties">Nominanties</a></li>
        <li><a href="over-ons">over ons</a></li>
        <li><a href="/contact">contact</a></li>
      </ul>
    </details>
  
    <ul class="desktop-nav">
      <li><a class='menu-button' href="/over-ad">Over Ad's</a></li>
      <li><a class='menu-button' href="/talentaward">TalentAward</a></li>
      <li><a class='menu-button' href="/nieuws">Nieuws</a></li>
      <li><a class='button-outline-white' href="/ad-dag">Kom naar Ad-dag</a></li>
    </ul>
  </nav>
  
  <style>

  /* MOBILE*/
  nav {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    background: var(--background);
    z-index: 99;
  }
  
  .logo-mobile img {
    display: block;
    height: 35px;
    margin-left: 55px;
    margin-top: 10px;
  }

  .logo-desktop { display: none; }
  
  summary {
    display: inline-block;
    position: relative;
    cursor: pointer;
    list-style: none;
    -webkit-tap-highlight-color: transparent;
  }

  summary::-webkit-details-marker { display: none; }
  summary span {
    display: block;
    position: relative;
    width: 28px;
    height: 3px;
    margin: 6px 0;
    background: var(--blue-800);
    border-radius: 2px;
    transform-origin: center;
    transition: all .3s ease;
  }
  .menu { display: block; position: relative; z-index: 0; margin-right: 5%; }
  .menu:hover summary span { width: 32px; }
  
  .menu::before {
    content: "";
    display: block;
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0,0,0,0);
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease;
  }

  .menu[open]::before { background: rgba(0,0,0,.25); opacity: 1; pointer-events: auto; }
  
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
    padding: clamp(1rem,3vw,2rem);
    box-sizing: border-box;
    background: var(--background);
    list-style: none;
    text-align: left;
    transform: translateX(100%);
    transition: transform .45s cubic-bezier(.22,.61,.36,1);
    will-change: transform;
  }

  .menu[open] .panel { transform: translateX(0); }
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

  .menu[open] summary span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
  .menu[open] summary span:nth-child(2) { transform: scaleX(0); opacity: 0; }
  .menu[open] summary span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
  .panel a {
    display: block;
    color: var(--blue-800);
    font-weight: 500;
    font-size: 1.2rem;
    text-decoration: none;
    padding: .5rem 1rem;
  }
 
  body:has(.menu[open]) { overflow: hidden; }

  .desktop-nav { display: none; }
  
  /* Desktop */
  @media (min-width: 1024px) {
    .logo-mobile { display: none; }
    .logo-desktop { display: block; margin-left: 5%; height: 50px; }

    .logo-desktop img {
      width: 12em;
    }
  
    .menu { display: none; }
    .desktop-nav {
      display: flex;
      position: relative;
      gap: 2rem;
      margin: 0 5% 0 0;
      list-style: none;
    }

    nav {
      padding: 1rem 0;
    }

    .menu-button {
    font-weight: var(--heading-font-weight);
    color: var(--blue-800);
    padding: .5rem 1rem;
    &:hover {
       background: var(--blue-200); 
    }
  }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .panel,
    .menu::before,
    summary span { transition: none !important; }
  }
  </style>
  