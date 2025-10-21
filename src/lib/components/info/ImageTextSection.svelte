<script>
    export let image;
    export let alt;
    export let dots;
    export let title;
    export let text;
    export let link = "#";
    export let linkText = "Lees meer";
    export let imagePosition = "left";
    export let background = "blue";
</script>

<section
    class:image-right={imagePosition === 'right'}
    class:image-left={imagePosition === 'left'}
    class:bg-blue={background === 'blue'}
    class:bg-white={background === 'white'}
    >
    <div class="wrapper">
        <img class="visual" src={image} alt="{alt}">

        <div class="content">
            <img src={dots} alt="" width="80" height="80">
            <h2>{title}</h2>
            <p>{text}</p>
            <a class="button-outline-white" href={link}>{linkText}</a>
        </div>
    </div>
</section>

<style>
    section {
        width: 100%;
        padding: 3em 0;
        display: flex;
        justify-content: center;
        box-sizing: border-box;

    }

    /* Background colors */
    .bg-blue { 
        background-color: var(--blue-100); 
    }

    .bg-white { 
        background-color: white; 
    }

    .wrapper {
        display: flex;
        flex-direction: column-reverse;
        gap: 2em;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 90%;
    }


    .visual {
        width: 90%;
        border-radius: 1em;
        object-fit: cover;
    }

</style>
