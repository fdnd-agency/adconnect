<script>
    import DividerText from "../../molecules/DividerText.svelte";
</script>

<DividerText text="Locatie Ad Dag "/>
<p> Lorem ipsum dolor sit amet consectetur. Ultrices at quis 
    pellentesque at eget ut suspendisse. 
    Rhoncus purus ultrices quis eu lectus interdum 
    egestas iaculis. Pellentesque elementum urna.
</p>
<p> Ad Dag Locatie : Arboretum West 98, 1325 WB Almere </p>
<section aria-hidden="true" tabindex="-1"  loading="lazy">
<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d623779.8517481206!2d4.826726400000002!3d52.35881345000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAeres%20Hogeschool!5e0!3m2!1sen!2snl!4v1761253603041!5m2!1sen!2snl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Locatiekaart van de Ad Dag"></iframe>
</section>

<style>
    p {
        max-width: 800px;
        font-size: 18px;
        padding: 2em;
        margin: 2em auto;
    }

    iframe {
    display: block;
    margin: 2em auto;
    max-width: 90%;
    border-radius: 1em;
    box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
    }

    @media (min-width: 768px) {
        iframe {
            width: 1000px;
            height: 800px; 
    }
    }
</style>