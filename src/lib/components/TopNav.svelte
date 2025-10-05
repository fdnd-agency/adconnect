
<nav>
  <section class='nav-left'>
  </section>

  <section class='nav-right'>
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

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #D1E0F9;
  padding: 1rem;
}

.nav-left {
  margin-left: 5rem;
}

ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #000000;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

a:hover {
  background: #a9c6f7;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 64, 141, 0.2);
}

</style>
