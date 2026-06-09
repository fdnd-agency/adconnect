<script>
    import { RTalentWinner, Rseparator, RCardSection, RCarousel } from "$lib"
    const { data } = $props()


</script>

<section>
    <Rseparator
        dividerText="Voorgaande talent award winnaars"
    />
    <RTalentWinner { data }/>

    <RCardSection
        title="Voorgaande nominaties"
		description="Ontdek de talentvolle studenten die zijn genomineerd voor de AD Talent Award. Jaarlijks dragen hogescholen Associate degree-studenten voor die uitblinken in de praktijk, waarna een jury de
		uiteindelijke winnaars kiest."
    />
    
    <RCarousel
        nominations
        carouselItems={data.nominations}
        dividerText="Voorgaande nominaties"
    />

</section>

<style>
    section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}
</style>