<script>
  import NavPros from '$lib/components/header/NavPros.svelte';
  import Hero from "$lib/components/hero/Hero.svelte";
  import BenefitCard from "$lib/components/benefits/BenefitCard.svelte";
  import ImageTextSection from '$lib/components/info/ImageTextSection.svelte';
  import ThemeCard from '$lib/components/theme/ThemeCard.svelte';
  import DividerText from '$lib/components/divider/DividerText.svelte';
  import Divider from '$lib/components/divider/Divider.svelte';
  import LogoSection from '$lib/components/cooperation/LogoSection.svelte';

  import doorstroom from '$lib/assets/doorstroom-ad-dag.jpg';
  import dots from '$lib/assets/dots.svg';

  let { data } = $props(); 

  const themes = data.themes;
  const cooperation = data.cooperation;
</script>

<svelte:head>
  <title>Over Ad's | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
  title="Over Associate Degree's"
  description="Lorem ipsum dolor sit amet consectetur. Urna quis turpis egestas mauris. Nulla bibendum ultricies donec porttitor tempus eleifend nunc.">
  <a slot="primary" href="/dev/hero" class="button-outline-white">Lees meer →</a>
</Hero>

<section class="about-ad-hero">
    <section class="intro">
        <h2>Waarom kiezen voor Associate Degree's?</h2>
        <p>Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum.</p>
    </section>

    <section class="benefits">
        <BenefitCard
            title="Doorstroom mogelijkheid"
            excerpt="Lorem ipsum dolor sit amet consectetur. Eget consectetur nec commodo risus convallis tristique. Facilisis amet rutrum purus diam nulla metus. Pellentesque.">
        </BenefitCard>

        <BenefitCard
            title="Korte studieduur"
            excerpt="Lorem ipsum dolor sit amet consectetur. Eget consectetur nec commodo risus convallis tristique. Facilisis amet rutrum purus diam nulla metus. Pellentesque.">
        </BenefitCard>

        <BenefitCard
            title="Persoonlijk & kleinschalig"
            excerpt="Lorem ipsum dolor sit amet consectetur. Eget consectetur nec commodo risus convallis tristique. Facilisis amet rutrum purus diam nulla metus. Pellentesque.">
        </BenefitCard>
    </section>
</section>

<ImageTextSection
  image={doorstroom}
  dots={dots}
  title="Doorstroom Ad-bachelor"
  text="Lorem ipsum dolor sit amet consectetur. Consequat elementum nec magna mollis. Ultricies at et sed amet eu. Condimentum elit non faucibus purus ut amet integer laoreet nec. A parturient amet ante arcu ut. Adipiscing aliquet libero amet nibh. Varius leo vel id quam faucibus commodo sollicitudin. Massa enim sed libero pharetra. Id aliquam luctus pharetra ac sapien sed id dictum. Facilisi mauris tristique morbi commodo. Diam tellus ut lacus id duis."
  link="/"
  linkText="Kom naar de Ad-dag"
  imagePosition="left"
/>

<section class="logo-section">
    <DividerText text="Partijen waarmee wij samenwerken" />
    <LogoSection {cooperation}/>
    <Divider />
</section>

<section class="themes">
    <div class="intro">
        <h2>Populair binnen Associate degrees</h2>
        <a class="button-outline-white" href="/">Alle thema's bekijken</a>
    </div>
    <section class="themes-section">
        <ThemeCard {themes}/>
    </section>
</section>

<ImageTextSection
  image={doorstroom}
  dots={dots}
  title="Landelijke Ad-overleggen en Ad-profielen"
  text="Lorem ipsum dolor sit amet consectetur. Felis nunc ac mauris arcu tortor urna varius. Mi convallis odio nisi tellus egestas morbi dignissim. Eget consequat augue eget risus. Venenatis mi dignissim facilisi sed. Mauris elit diam nibh aliquet curabitur lacus.
Leo id non id volutpat. Facilisi mus laoreet suspendisse tellus nunc. Eget tincidunt at etiam nibh vitae. Scelerisque sapien velit consectetur dolor."
  link="/meer"
  linkText="Meer over Ad-overleggen"
  imagePosition="right"
  background="white"
/>

