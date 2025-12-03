<script>
  import { page } from '$app/state';
</script>

<nav>
  <section class="nav-left">
    <ul>
      <li>
        <a href="/" class="pro {!page.url.pathname.includes('/studenten') && !page.url.pathname.includes('/werkgevers') ? 'active' : ''}">
          Professionals
        </a>
      </li>
      <li>
        <a href="/studenten" class="stu {page.url.pathname.includes('/studenten') ? 'active' : ''}">
          Studenten
        </a>
      </li>
      <li>
        <a href="/werkgevers" class="stu {page.url.pathname.includes('/werkgevers') ? 'active' : ''}">
          Werkgevers
        </a>
      </li>
    </ul>
  </section>

  <section class="nav-right">
    <ul>
      <li><a class={page.url.pathname === "/nominaties" ? "active" : "menu-button"} href="/nominaties">Nominaties</a></li>
      <li><a class={page.url.pathname === "/over-ons" ? "active" : "menu-button"} href="/over-ons">Over ons</a></li>
      <li><a class={page.url.pathname === "/contact" ? "active" : "menu-button"} href="/contact">Contact</a></li>
    </ul>
  </section>
</nav>

<style>
  :global(body) {
    margin: 0;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(header) {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--blue-150);
    padding: 1rem 5%;
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

  .nav-left ul {
    display: flex;
    gap: 1rem;  
    
    /* Active link in menu */
    a {
      color: var(--primary-text);

      &:hover {
        padding-bottom: 1rem;
      }

      &.active {
        background-color: var(--background);
        padding: .5rem .8rem 2rem .8rem;
        color: #000;
      }
    }
  }

  .nav-right ul {
    display: none;

    @media (min-width: 1024px) {
      width: 100%;
      display: flex;
      gap: 2rem;
      justify-content: flex-end;
    }

    a {
      position: relative;
      text-decoration: none;
      color: #000;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 2px;
        background: currentColor;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }

      &.active::after {
        width: 100%;
      }
    }
  }
</style>
