<script>
    import logomobile from "$lib/assets/logomobile.svg";
  </script>
  
  <section class="schedule" style="text-align: center;">
    <div style="display: inline-block; max-width: 400px;">
      <h2>Planning</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at
        eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum
        egestas iaculis. Pellentesque elementum urna.
      </p>
    </div>
  
    <section class="cards">
      <article class="card">
        <div class="wrapper-text">
          <img class="logo" src={logomobile} alt="Logo" />
          <h2>Programma</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur. Ultrices at quis
          pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
          eu lectus interdum egestas iaculis. Pellentesque elementum urna.
        </p>
        <a class="button-outline-blue">Bekijk Programma </a>
      </article>
  
      <article class="card">
        <div class="wrapper-text">
          <img class="logo" src={logomobile} alt="Logo" />
          <h2>Workshops</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur. Ultrices at quis
          pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
          eu lectus interdum egestas iaculis. Pellentesque elementum urna.
        </p>
        <a class="button-outline-blue">Bekijk Workshops </a>
      </article>
    </section>
  </section>
  
  <style>
    .schedule {
      background-color: var(--primary-blue);
      color: var(--text-white);
      padding: 2em;
      margin: auto;
      text-align: center;
      box-shadow: 0 0 0 100vmax var(--primary-blue);
      clip-path: inset(0 -100vmax);
  
      h2 {
        margin-top: 1em;
        color: var(--text-white);
        margin-bottom: 1em;
      }
  
      p {
        text-align: left;
      }
    }
  
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
      grid-template-rows: repeat(4, auto);
      margin-top: 3em;
      gap: 1em;
      margin-bottom: 2em;
  
      article {
        border: 1px solid #cccccc;
        border-radius: 1em;
        padding: 2em;
        transition: 0.2s ease-in-out;
        display: flex;
        flex-direction: column;
        gap: 1em;
        background-color: var(--text-white);
  
        p {
          max-width: 500px;
        }
  
        &:hover {
          border: 1px solid #00408d;
          box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
          translate: 0 -1%;
          transition: 0.2s ease-in-out;
        }
      }
  
      h2 {
        color: var(--primary-blue);
      }
    }
  
    .card{
      display: grid;
      grid-template-rows: subgrid;
      grid-row: span 4;
      border: 1px solid var(--text-white);
      background-color: var(--text-white);
      color: var(--primary-blue);
      border-radius: 24px;
      padding: 2em;
  
      .logo {
        margin: 0;
        text-align: left;
        float: left;
      }
      h2 {
        margin-top: 0;
        margin-bottom: 0.5em;
        right: 1em;
        position: relative;
      }
    }
  
    a {
      margin-top: 1em;
      align-self: center;
    }
  </style>
  