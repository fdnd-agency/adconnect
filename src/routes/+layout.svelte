<script>
	import TopNav from '$lib/components/TopNav.svelte';
	import NavPros from '$lib/components/NavPros.svelte';
	let { children } = $props();
</script>
  
  <svelte:head>
	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&display=swap">
  </svelte:head>
  <!-- stylesheet -->
  <link rel="stylesheet" href="/stylesheet.css">

<header>
<TopNav />
</header>

<main>
{@render children?.()}
</main>



  
 


