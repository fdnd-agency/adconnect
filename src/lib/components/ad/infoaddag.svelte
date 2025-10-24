<script>
    import logomobile from "$lib/assets/logomobile.svg";
    import addag2 from "$lib/assets/addag-2.png";
  </script>
  
  <section class="info-addag">
    <img class="logo" src={logomobile} alt="" />
    <h2>Alles wat je wilt weten over de Ad-dag?</h2>
  
    <section class="faqs">
      <details open>
        <summary>Voor wie is de Ad-dag bedoeld?</summary>
        <p>
          Lorem ipsum dolor sit amet consectetur. Ultrices at quis
          pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
          eu lectus interdum egestas iaculis. Pellentesque elementum urna
        </p>
      </details>
      <details>
        <summary>Wie komen er naar de Ad-dag?</summary>
        <p>
          Lorem ipsum dolor sit amet consectetur. Ultrices at quis
          pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
          eu lectus interdum egestas iaculis. Pellentesque elementum urna.
        </p>
      </details>
      <details>
        <summary>Waarom zou ik naar de Ad-dag gaan?</summary>
        <p>
          Lorem ipsum dolor sit amet consectetur. Ultrices at quis
          pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
          eu lectus interdum egestas iaculis. Pellentesque elementum urna.
        </p>
      </details>
      <details>
        <summary>Wanneer en waar vindt de Ad-dag plaats?</summary>
        <p>
          Lorem ipsum dolor sit amet consectetur. Ultrices at quis
          pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
          eu lectus interdum egestas iaculis. Pellentesque elementum urna.
        </p>
      </details>
    </section>
  
    <img class="addag-2" src={addag2} alt="" width="600" height="300" />
  </section>
  
  <style>
    .info-addag {
      display: flex;
      flex-direction: column;
      background-color: var(--blue-100);
      padding: 3em 5%;
      box-sizing: border-box;
      position: relative;
      box-shadow: 0 0 0 100vmax var(--blue-100);
      clip-path: inset(0 -100vmax);
  
      .logo {
        margin-top: 2em;
        align-self: center;
      }
      h2 {
        text-align: center;
        margin: auto;
        max-width: 350px;
      }
    }
  
    .faqs {
      display: flex;
      flex-direction: column;
      margin-top: 2em;
      align-items: center;
      gap: 1em;
    }
  
    details {
      border: 1px solid var(--neutral-300);
      border-radius: 0.5em;
      padding: 1em;
      width: 80%;
      position: relative;
      z-index: 1;
      background-color: var(--text-white);
      margin-top: 0;
  
      p {
        width: 100%;
      }
  
      @media (min-width: 768px) {
        width: 55vw;
        align-self: center;
      }
      summary {
        list-style: none;
        font-family: var(--font-heading);
        font-weight: var(--heading-font-weight);
        font-size: var(--h4-size);
        line-height: 2em;
        cursor: pointer;
      }
    }
  
    ::details-content {
      transition:
        height 0.5s ease,
        content-visibility 0.5s ease allow-discrete;
      height: 0;
      overflow: clip;
    }
  
    [open]::details-content {
      height: auto;
    }
  
    summary::-webkit-details-marker {
      display: none;
    }
  
    details summary::after {
      content: url("/static/chevron-down-blue.svg");
      transition: transform 0.3s;
    }
  
    details[open] summary::after {
      transform: rotate(180deg);
    }
  
    img {
      margin-top: 5em;
      align-self: center;
    }
  
