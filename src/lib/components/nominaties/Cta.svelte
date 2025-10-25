<script>
    import Divider from '$lib/components/divider/Divider.svelte';
    import Divider from "$lib/components/divider/Divider.svelte";
    import darkcircle from "$lib/assets/dark-circle.svg";
</script>

<Divider />
<h2> Nomineer nu </h2>
<p>
    Lorem ipsum dolor sit amet consectetur. Semper semper neque 
    diam ac facilisi orci. Amet ultrices et et sagittis. Pharetra 
    sit elit rhoncus leo nisi facilisis sed purus et. Pellentesque
     praesent nisl sed egestas sapien. Odio pellentesque morbi purus
      erat tempor. Non sed tristique malesuada phasellus dolor.
       Malesuada orci phasellus a amet lectus nisi massa massa.
</p>
<a href="/nominaties" class="button-outline-primary">Nomineer</a>

<Divider />
<section>
    <article>
        <img class="circle-left" src={darkcircle} alt="" />
        <h2>Nomineer nu</h2>
        <p>
            Lorem ipsum dolor sit amet consectetur. Semper semper neque diam ac
            facilisi orci. Amet ultrices et et sagittis. Pharetra sit elit
            rhoncus leo nisi facilisis sed purus et. Pellentesque praesent nisl
            sed egestas sapien. Odio pellentesque morbi purus erat tempor. Non
            sed tristique malesuada phasellus dolor. Malesuada orci phasellus a
            amet lectus nisi massa massa.
        </p>
    </article>

    <a href="#" class="button-outline-blue">Nomineer</a>
    <img class="circle-right" src={darkcircle} alt="" />
</section>
