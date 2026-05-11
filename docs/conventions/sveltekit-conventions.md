## [Svelte kit conventions](https://docs.fdnd.nl/conventies.html#sveltekit-conventies)

### General rules for Sveltekit
- Use Sveltekit 5 and run your components in `runes mode`. If you're running an older version or using older syntax you'll see `legacy mode` on the top of the page.
- Always fetch data that you need from the `+page.server.js` and keep the client side scripting in a seperate Javascript file. 

### Routes and Component structure
A route or page component is made up out of several other components. The only manipulation there is on these kind of pages is that some data is parsed through.

```javascript
  <script>
    import { HeroSlider, SlideCards, Agenda, HomeCampus, HomePartners } from '$lib/index.js'
  
    let { data } = $props()

    const { hero, slides, campus, agenda, partners } = data
  </script>
```
```html
  <HeroSlider {hero} />
  <SlideCards {slides} />
  <HomeCampus {campus} />
  <Agenda {agenda} />
  <HomePartners {partners} />
```

### Components
General rules for making components work:
- For components you use object destructuring like in the Javascript code conventions. 
- Give only the required data to the component
- Don't nest a component too deep (three levels deep MAX)
- Use valuable names (look at the naming conventions)
- Avoid `:global` css

```
<script>
  import Semesters from "$lib/organisms/Semesters.svelte"
  import Program from "$lib/molecules/Program.svelte"
  
  let { data } = $props()
  const { title, subtitle, content, semesters } = data
</script>

<Program {title} {content} />
<Semesters {semesters} {subtitle} />
```

### Important types of documents

#### +page.svelte
The main way of creating Sveltekit projects. A simple page is used to craft a basic template for components, but also where multiple components come together to form a larger component or an entire page. This page is the foundation for interactivity and where client-side javascript, HTML and CSS reside.

#### +page.server.js
For this new type of document you make calls to the server. These types of documents are used for API calls, but also for authentication if you use accounts/securities on your website. This is where the ServerSide Javascript resides.

#### +page.js
This type of document is where the client-side Javascript resides. This is where loading states, view-transition calls and furth UX Javascript should belong.

#### +layout.svelte
A overall layout with 

#### +layout.svelte.js
