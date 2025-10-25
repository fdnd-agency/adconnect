<script>
    import Divider from "$lib/components/divider/Divider.svelte";
    import darkcircle from "$lib/assets/dark-circle.svg";
</script>

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

<style>
    section {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5rem 1rem;
        gap: 1rem;
    }

    h2 {
        text-align: center;
        margin-top: 5rem;
        margin-bottom: 1rem;
    }

    p {
        max-width: 500px;
        text-align: left;
    }

    a {
        margin-top: 1.5rem;
        margin-bottom: 2em;
    }

    .circle-left {
        position: absolute;
        width: 20em;
        left: -20%;
        bottom: -20%;
        z-index: 0;
    }
    
    .circle-right {
        position: absolute;
        width: 20em;
        right: -40%;
        top: -1%;
        z-index: 0;
    }

    @media (min-width: 768px) {
        .circle-left {
            width: 25em;
            left: -10%;
            bottom: -20%;
        }

        .circle-right {
            width: 25em;
            right: -10%;
            top: -20%;
        }
    }
    @media (min-width: 1024px) {
        .circle-left {
            left: -1%;
            bottom: -10%;
        }

        .circle-right {
            right: -1%;
            top: -10%;
        }
    }
</style>
