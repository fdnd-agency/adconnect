<script>
    import Bird from "$lib/assets/vector-bird.jpg"
    import BirdTwo from "$lib/assets/bird-send-succesful.jpg"
    import NoBird from "$lib/assets/over-ad-hero.jpeg"
    import NoBirdTwo from "$lib/assets/addag-2.png"
</script>

<section>
    <label for="imageOne">
        <input type="radio" id="imageOne" name="imageExisting">
        <figure>
            <picture>
                <source>
                <img 
                    src={Bird} 
                    alt="a bird"
                    height="175"
                    width="145"
                >
            </picture>
        </figure>
    </label>

    <label for="imageTwo">
        <input type="radio" id="imageTwo" name="imageExisting">
        <figure>
            <picture>
                <source>
                <img 
                    src={BirdTwo} 
                    alt="a bird"
                    height="175"
                    width="145"
                >
            </picture>
        </figure>
    </label>

    <label for="imageThree">
        <input type="radio" id="imageThree" name="imageExisting">
        <figure>
            <picture>
                <source>
                <img 
                    src={NoBird} 
                    alt="a bird"
                    height="175"
                    width="145"
                >
            </picture>
        </figure>
    </label>

    <label for="imageFour">
        <input type="radio" id="imageFour" name="imageExisting">
        <figure>
            <picture>
                <source>
                <img 
                    src={NoBirdTwo} 
                    alt="a bird"
                    height="175"
                    width="145"
                >
            </picture>
        </figure>
    </label>

</section>

<input type="submit" value="voeg toe">

<style>
    section {
        display: flex;
        gap: 1.4em;
    }

    label {
        cursor: pointer;
    }

    input[name="imageExisting"] {
        appearance: none;
    }

    input[name="imageExisting"]:checked ~ figure {
        border: 5px dotted var(--primary-orange);
        width: fit-content;
    }

    input[type="submit"] {
        color: var(--text-white);
        background-color: var(--background);
        border: 2px solid var(--primary-orange);
        border-radius: var(--button-outline-radius);
        transition: 0.3s;

        height: 5em;
        width: 12em;

        align-self: center;
    }

    input[type="submit"]:hover {
        border: 2px solid var(--orange-900);
        background-color:  var(--orange-900);
    }
</style>