<script>
    // import NewsCardSection component
    import NewsCardSection from "$lib/components/NewsCardSection.svelte";

    let { data } = $props(); // rune die data doorgeeft tussen page.server.js en page.svelte ("magische property")
    
    // Retrieve news data
    const news = data.news; 
</script>

<svelte:head>
	<title>Home | Overlegplatform Associate Degrees</title>
</svelte:head>

<NewsCardSection news={data.news.slice(0, 3)}/>
