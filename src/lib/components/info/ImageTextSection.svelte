<script>
    export let image;
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
