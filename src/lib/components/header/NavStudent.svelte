<script>
    import logo from '$lib/assets/logo.svg';
    import logomobile from '$lib/assets/logomobile.svg';
  </script>
  
  <nav>
    <img class="logo logo--mobile" src={logomobile} alt="Logo" />
    <img class="logo logo--desktop" src={logo} alt="Logo" />
  
    <details class="menu">
      <summary>
        <span></span>
        <span></span>
        <span></span>
      </summary>
      <ul class="panel">
        <li><a href="student/over-ad">Over Associate degree's</a></li>
        <li><a href="student/talentaward">TalentAward</a></li>
        <li><a href="student/nieuws">Nieuws</a></li>
        <li><a href="/student/ad-dag">kom naar Ad-dag</a></li>
        <li><a href="nominaties">Nominanties</a></li>
        <li><a href="over-ons">over ons</a></li>
        <li><a href="/contact">contact</a></li>
      </ul>
    </details>
  
    <ul class="desktop-nav">
      <li><a class='menu-button' href="/over-ad">Over Associate degree's</a></li>
      <li><a class='menu-button' href="/talentaward">TalentAward</a></li>
      <li><a class='menu-button' href="/nieuws">Nieuws</a></li>
      <li><a class='button-outline-white' href="/ad-dag">Kom naar Ad-dag</a></li>
    </ul>
  </nav>
  
