<script>
  import logo from '$lib/assets/logo.svg';
</script>

<nav>
  <img src={logo} alt="Logo" />
    <ul>
      <li><a href="/over-ad">Over Associate degree's</a></li>
      <li><a href="/documenten">Documenten</a></li>
      <li><a href="/talentaward">TalentAward</a></li>
      <li><a href="/nieuws">Nieuws</a></li>
      <li><a class='button-outline-white' href="/ad-dag">Kom naar Ad-dag</a></li>
      </ul>
</nav>
   
<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100%;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ul {
  list-style: none;
  display: flex;
  gap: 3rem;
  margin: 0;
  padding: 0 1.5rem 0 1.5rem;
}

img {
  height: 50px;
  margin-left: 60px;  
  margin-top: 10px;  
}

.button-outline-white {
  padding: 1.2rem 2rem;
  color: var( --neutral-200);
  font-weight: var(--ad-dag-font-weight);

  &:hover {
    color: var(--primary-blue);
    background-color:white;
  }
}

a {
  font-weight: var(--heading-font-weight);
  color: var(--blue-800);
  padding: 0.5rem 1rem;

  &:hover {
    background-color: var(--blue-200);
  }
}
  
</style>
 
