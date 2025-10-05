<script>
	//importeren
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

<main>
	{@render children?.()}	
</main>
  
<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center
	}
</style>

