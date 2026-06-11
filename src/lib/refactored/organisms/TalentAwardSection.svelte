<script>
    import { TalentWinner, Separator, CardSection, Carousel } from "$lib"
    const { data } = $props()


</script>

<section>
    <Separator
        dividerText="Voorgaande talent award winnaars"
    />
    <TalentWinner { data }/>

    <CardSection
        title="Voorgaande nominaties"
		description="Ontdek de talentvolle studenten die zijn genomineerd voor de AD Talent Award. Jaarlijks dragen hogescholen Associate degree-studenten voor die uitblinken in de praktijk, waarna een jury de
		uiteindelijke winnaars kiest."
        centered
    />
    
    <Carousel
        nominations
        carouselItems={data.nominations}
        cooperations={data.cooperations}
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