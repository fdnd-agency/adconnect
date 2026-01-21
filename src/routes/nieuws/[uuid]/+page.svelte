<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	// Import images
	import { Nieuwshero } from "$lib";

	// Import components
	import { NavPros, Hero } from "$lib";

	// Haal data op uit page.server.js via props
	let { data } = $props();
</script>
		/>
	{/each}
</section>

<style>
