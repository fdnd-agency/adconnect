<script>
    import { onMount } from "svelte";
    import { NavPros } from "$lib";

    let cursor;

    onMount(() => {
        window.addEventListener("mousemove", (e) => {
            if (!cursor) return;

            cursor.style.left = e.clientX - 140 + "px";
            cursor.style.top = e.clientY - 140 + "px";
        });
    });
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

    <section class="cursor" bind:this={cursor}></section>
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

    .dream-light {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 2;
        filter: blur(120px);
        background: radial-gradient(
                circle at 25% 30%,
                #ffb4ff59,
                transparent 40%
            ),
            radial-gradient(circle at 75% 60%, #78a0ff59, transparent 45%),
            radial-gradient(circle at 50% 85%, #ffd2e659, transparent 50%);
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

    .cursor {
        position: fixed;
        width: 280px;
        height: 280px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 30;
        mask: radial-gradient(circle, #000 42%, transparent 68%);
        backdrop-filter: saturate(130%) contrast(120%);
        box-shadow:
            0 0 60px #ffb4ff40,
            0 0 120px #78a0ff40;
    }
</style>
