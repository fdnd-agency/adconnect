<script>
    import logo from '$lib/assets/logo.svg';
  </script>
  
  <nav>
    <img src={logo} alt="Logo" />
      <ul>
        <li><a href="student/over-ad">Over Associate degree's</a></li>
        <li><a href="student/talentaward">TalentAward</a></li>
        <li><a href="student/nieuws">Nieuws</a></li>
        <li><a class='ad-dag' href="/student/ad-dag">kom naar Ad-dag</a></li>
        </ul>
  </nav>
     
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    ul {
      list-style: none;
      display: flex;
      gap: 1rem;
      margin: 0;
      padding: 0;
    }
  
    .ad-dag {
      background-color: #00408D;
      padding: 1rem 1.5rem;
      color: white;
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
  img {
    height: 50px;
    margin-left: 60px;  
    margin-top: 10px;  
  }
  </style>