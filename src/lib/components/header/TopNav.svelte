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
