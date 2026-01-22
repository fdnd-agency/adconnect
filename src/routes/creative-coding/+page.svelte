<script>
    import { NavPros } from "$lib";
</script>

<svelte:head>
    <title>creative coding | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<section class="body">
    <section class="dream-light"></section>

    <section class="gallery">
        <section
        class="img a large"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Stan-van-Hulten-Franken.png')"
    ></section>
    
    <section
        class="img b small"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Sissi-van-Galen.png')"
    ></section>
    
    <section
        class="img c tall"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Natasja-Meeuwissen.png')"
    ></section>
    
    <section
        class="img d medium"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Yvana-van-de-Pavert.png')"
    ></section>
    
    <section
        class="img e large"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Marin-Kalkhoven.png')"
    ></section>
    
    <section
        class="img f small"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Jerom-Oude-Aarninkhof.png')"
    ></section>
    
    <section
        class="img g tall"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Danique-van-Houte.png')"
    ></section>
    
    <section
        class="img h medium"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Claudia-Scholtens.png')"
    ></section>
    
    <section
        class="img i large"
        style="background-image:url('https://www.deassociatedegree.nl/wp-content/uploads/2025/01/Gert-Jan-Hoogstra.png')"
    ></section>
    
    </section>
</section>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .body {
        background: #f6f1ec;
        overflow-x: hidden;
    }

    .gallery {
        position: relative;
        min-height: 220vh;
        perspective: 1800px;
    }

    .img {
        position: absolute;
        background: center/cover;
        border-radius: 4px;
        opacity: 0.55;
        filter: blur(14px) saturate(130%);
        box-shadow: 0 50px 100px #00000059;
        animation: float 22s ease-in-out infinite;
        transition: 0.4s;
        border-radius: 5px;
    }

    .small {
        width: 180px;
        height: 260px;
    }
    .medium {
        width: 240px;
        height: 360px;
    }
    .large {
        width: 320px;
        height: 480px;
    }
    .tall {
        width: 220px;
        height: 520px;
    }

    .a {
        top: 12%;
        left: 6%;
    }
    .b {
        top: 10%;
        left: 46%;
    }
    .c {
        top: 16%;
        left: 78%;
    }
    .d {
        top: 44%;
        left: 2%;
    }
    .e {
        top: 40%;
        left: 42%;
    }
    .f {
        top: 50%;
        left: 80%;
    }
    .g {
        top: 76%;
        left: 12%;
    }
    .h {
        top: 72%;
        left: 52%;
    }
    .i {
        top: 78%;
        left: 84%;
    }
