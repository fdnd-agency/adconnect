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

    .img:hover {
        filter: none;
        opacity: 1;
        transform: translateZ(420px) scale(1.08);
        z-index: 20;
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
        transform: translateZ(-420px) rotateY(28deg);
    }
    .b {
        top: 10%;
        left: 46%;
        transform: translateZ(260px);
    }
    .c {
        top: 16%;
        left: 78%;
        transform: translateZ(-380px) rotateY(-32deg);
    }
    .d {
        top: 44%;
        left: 2%;
        transform: translateZ(-240px) rotateY(38deg);
    }
    .e {
        top: 40%;
        left: 42%;
        transform: translateZ(340px);
    }
    .f {
        top: 50%;
        left: 80%;
        transform: translateZ(-300px) rotateY(-28deg);
    }
    .g {
        top: 76%;
        left: 12%;
        transform: translateZ(-380px) rotateY(34deg);
    }
    .h {
        top: 72%;
        left: 52%;
        transform: translateZ(280px);
    }
    .i {
        top: 78%;
        left: 84%;
        transform: translateZ(-460px) rotateY(-38deg);
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-36px) rotate(1.6deg) scale(1.03);
        }
    }

