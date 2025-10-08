<script>
  import { page } from '$app/stores';
</script>

<nav>
  <section class="nav-left">
    <ul>
      <li>
        <a href="/" class="pro {currentPath === '/' ? 'active' : ''}">
          Professionals
        </a>
      </li>
      <li>
        <a href="/students" class="stu {currentPath === '/students' ? 'active' : ''}">
          Studenten
        </a>
      </li>
    </ul>
  </section>

  <section class="nav-right">
    <ul>
      <li><a href="/nominaties">Nominaties</a></li>
      <li><a href="/over-ons">Over ons</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </section>
</nav>

<style>
  :global(body) {
    margin: 0;
  }

  /* MOBILE FIRST */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--blue-150);
    padding: 1rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-left ul {
    display: flex;
    gap: 1rem;
  }

  .nav-right ul {
    display: none;
  }

  a {
    text-decoration: none;
    color: #000;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  a:hover {
    background: #a9c6f7;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 64, 141, 0.2);
  }

  .pro:hover,
  .stu:hover {
    padding-bottom: 1rem;
  }
  /* DESKTOP */
  @media (min-width: 700px) {
    .nav-left {
      margin-left: 5rem;
    }

    .nav-right ul {
      display: flex;
      gap: 1rem;
    }
  }
</style>
