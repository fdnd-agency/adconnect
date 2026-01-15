<script>
  import { page } from '$app/state';
</script>

<header>
  <nav>
    <section class="nav-right">
      <ul>
        <li><a class={page.url.pathname === "/over-ons" ? "active" : "menu-button"} href="/over-ons">Over ons</a></li>
        <li><a class={page.url.pathname === "/contact" ? "active" : "menu-button"} href="/contact">Contact</a></li>
      </ul>
    </section>
  </nav>
</header>

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

  header {
    width: 100%;
    display: flex;
    position: sticky;
    top: 0;
    justify-content: center;
    z-index: 99;
    background-color: var(--blue-150);
    padding: 1rem 5%;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 1400px;
    justify-content: flex-end
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }


  .nav-right ul {
      width: 100%;
      display: flex;
      gap: 2rem;
      justify-content: flex-end;


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
