<script>
  import { page } from '$app/stores';
</script>

<nav>
  <!-- Navigation left -->
  <section class="nav-left">
    <ul>
      <!-- Active link professionals -->
      <li>
        <a href="/" class="pro {currentPath === '/' ? 'active' : ''}">
          Professionals
        </a>
      </li>
      <!-- Active link students -->
      <li>
        <a href="/students" class="stu {currentPath === '/students' ? 'active' : ''}">
          Studenten
        </a>
      </li>
    </ul>
  </section>

  <!-- Navigation right -->
  <section class="nav-right">
    <ul>
      <li><a class={$page.url.pathname === "/nominaties" ? "active" : "menu-button"} href="/nominaties">Nominaties</a></li>
      <li><a class={$page.url.pathname === "/over-ons" ? "active" : "menu-button"} href="/over-ons">Over ons</a></li>
      <li><a class={$page.url.pathname === "/contact" ? "active" : "menu-button"} href="/contact">Contact</a></li>
    </ul>
  </section>
</nav>

<style>
  :global(body) {
    margin: 0;
  }

  :global(header) {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
  }

  /* MOBILE*/
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--blue-150);
    padding: 1rem;
    position: relative;
    z-index: 99;
    position: sticky;
    top: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Navigation left */
  .nav-left ul {
    display: flex;
    gap: 2rem;
  }

  /* Navigation right */
  .nav-right ul {
    display: none;
  }

  .pro:hover,
  .stu:hover {
    padding-bottom: 1rem;
  }

  .pro.active,
  .stu.active {
    background-color: var(--background);
    padding: .5rem .8rem 2rem .8rem;
    color: #000;
  }

  .pro, .stu {
    color: #000;
  }

  /* DESKTOP */
  @media (min-width: 1024px) {
    .nav-left {
      margin-left: 5%;
    }

    .nav-right {
      width: 100%;
    }

    .nav-right ul {
      display: flex;
      gap: 2rem;
      margin-right: 5%;
      justify-content: flex-end;
    }

   /* Hover animatie & active state */
   .menu-button {
      position: relative;
      text-decoration: none;
      color: #000;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .menu-button::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0;        /* start bij 0 voor normale links */
      height: 2px;
      background: currentColor;
      transition: width 0.3s ease;
    }

    .menu-button:hover::after {
      width: 100%;
    }

    .menu-button.active::after {
      width: 100%;
    }
  }
</style>
