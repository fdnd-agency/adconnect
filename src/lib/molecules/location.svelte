<script>
  import DividerText from './DividerText.svelte'

  import { locationImage } from '$lib'
</script>

<DividerText text="Locatie Ad Dag" />

<p>
  Addag is een programma dat meestal wordt aangeboden op en van Aeres scholen. Voor meer informatie over deelname of planning kun je contact met ons
  opnemen
</p>

<enhanced:img class="location-img" src={locationImage} alt="" width="600" height="300" />

<style>
  p {
    max-width: 800px;
    font-size: 18px;
    padding: 2em;
    margin: 2em auto;
  }

  .location-img {
    display: block;
    margin: auto;
    width: 90%;
    height: auto;
    border-radius: 33px 33px 0 0;
  }

  @media (min-width: 768px) {
    .location-img {
      width: 60%;
    }
  }
</style>
