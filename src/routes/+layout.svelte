<script>
  import favicon from '$lib/assets/favicon-adc.svg'
  
  const { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="stylesheet" href="/stylesheet.css"/>

  <!-- Fonts being loaded in -->
  <link rel="preload" as="font" href="/fonts/Archivo.woff2" type="font/woff2" crossorigin="anonymous"/>
  <link rel="preload" as="font" href="/fonts/Archivo.woff" type="font/woff" crossorigin="anonymous"/>

  <link rel="preload" as="font" href="/fonts/Archivo Italic.woff2" type="font/woff2" crossorigin="anonymous"/>
  <link rel="preload" as="font" href="/fonts/Archivo Italic.woff" type="font/woff" crossorigin="anonymous"/>

  <link rel="preload" as="font" href="/fonts/Clash Display Variable.woff2" type="font/woff2" crossorigin="anonymous"/>
  <link rel="preload" as="font" href="/fonts/Clash Display Variable.woff" type="font/woff" crossorigin="anonymous"/>
</svelte:head>

{@render children?.()}
