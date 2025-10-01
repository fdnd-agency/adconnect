<script>
    // import NewsCardSection component
    import NewsCardSection from "$lib/components/NewsCardSection.svelte";

    let { data } = $props(); // rune die data doorgeeft tussen page.server.js en page.svelte ("magische property")
    
    // Retrieve news data
    const news = data.news; 
</script>

<NewsCardSection news={data.news}/>