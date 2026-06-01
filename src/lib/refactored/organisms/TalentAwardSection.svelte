<script>
    import { RTalentWinner } from "$lib"
    const { data } = $props()
</script>

<section>
    <RTalentWinner { data }/>
</section>

<style>
    section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
		margin-top: 1rem;
	}
</style>