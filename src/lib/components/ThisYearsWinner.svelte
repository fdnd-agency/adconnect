
<script>
  import Winner from '$lib/assets/winner.png';
</script>

<section class="winner">
    <section class='info'>
  <h2> Dit Jaars Winaar</h2>
    <p> Lorem ipsum dolor sit amet consectetur. Semper semper neque diam ac facilisi orci.
        Amet ultrices et et sagittis. Pharetra sit elit rhoncus leo nisi facilisis sed purus et.
        Pellentesque praesent nisl sed egestas sapien. Odio pellentesque morbi purus erat tempor.
        Non sed tristique malesuada phasellus dolor. Malesuada orci phasellus a amet lectus nisi 
        massa massa.
    </p>
    
  </section>
  <section class='visual'>
    
    <img src={Winner} alt="Ad Talent Award Winner" width="290" height="300" />
    <section class='winner-detail'>
      <h5> Naam Winaar </h5>
      <a href="#school" style='color: var(--primary-orange);'> Link school</a>
      <a href="#learn-more" class="button-outline-white" id="learn-more">Lees meer</a>
   </section>

  </section>
</section>

<style>
.winner {
  text-align: left;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: var(--blue-100);

h2 {
  text-align: center;
  margin-bottom: 1em;
  margin-top: 1em;

}

p {
        max-width: 500px;
        margin: 0 auto;
        text-align: left;
    }
}

.winner img {
  display: block;
  align-self: center;
  max-width: 100%;
  margin: 3em auto 0;
  height: auto;
  border-radius: 15px;
}

.winner-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;


   a { 
   margin-bottom: 2em;

  }
}
</style>