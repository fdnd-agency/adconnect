# ad-dag
[Link naar de pagina op de live dev-site](https://adconnect.dev.fdnd.nl/ad-dag)

- [Responsive](#Responsive)
  - [Summary](#Responsive-improvements-summary)
- [Accessibility](#Accessibility)
  - [Summary](#Accessibility-improvements-summary)
- [Performace](#Performace)
  - [Summary](#Performace-improvements-summary)
- [Progressive enhanced](#Progressive-enhanced)
  - [Summary](#PE-improvements-summary)
 
***Tested in chrome v147***

## Responsive

The header takes up a large portion of the screen:  
<img width="712" height="349" alt="image" src="https://github.com/user-attachments/assets/f0dd53f0-f8fc-482f-adff-703306d44b17" />  
You could make the header collapse or hide when scrolling down, and reappear when scrolling up  
maybe move the "FAQ's", "over ons" and "contact" to the footer. this way the sticky header stakes a bit less space.  
These are also topics users would expect to be in the footer.

The `programma` section is unclear at 320px width.
The text is difficult to read.  
<img width="394" height="550" alt="image" src="https://github.com/user-attachments/assets/18e9781c-885e-4b57-b401-8944e10acabc" />  
It’s currently a `p` with `br` tags to split the text.  
It would be better to wrap parts of the text in span elements, giving you more control over how it displays on smaller screens.  

The email address goes out of view,  
and the “scroll to top” button overlaps the text:  
<img width="320" height="558" alt="image" src="https://github.com/user-attachments/assets/c36f476f-98ee-4256-b447-41422c337b2d" />  

Breakpoint: 768px
The “Wat is de landelijke Ad-dag” section has small space for the text. The gap between the text and the image is 4em, while the section above uses 2em, for the same layout.  
This gap could be reduced to 2em aswel, which already improves the readability significantly
<img width="1213" height="1271" alt="image" src="https://github.com/user-attachments/assets/ad6d5e17-d8ee-49ba-ba0d-4cbf490580ce" />

At 768px width, the image above “planning” overflows the viewport, causing a horizontal scrollbar.
From 1030px and up, it displays correctly.
<img width="1243" height="1087" alt="image" src="https://github.com/user-attachments/assets/097e12bf-cfbc-4f7d-bf01-61f33f5356f8" />



### Responsive improvements summary
- The header takes up too much space on small devices (320px)
- Under the “Programma” h2, there is a `p` with wrapped text that is hard to read at 320px (it becomes more readable from 407px width)
- The email address goes out of view at 320px
- The “Wat is de landelijke Ad-dag” section has limited space for the text/paragraph at the 768px breakpoint
- At 768px, the image above the “planning” section overflows the viewport

---

## Accessibility

### Lighthouse
h2 for `programma` & `workshops` has low contrast:  
<img width="599" height="870" alt="Screenshot 2026-04-14 094805" src="https://github.com/user-attachments/assets/b6afc59f-6f77-40a0-8795-66543ce8afc7" />  
<img width="1974" height="754" alt="Screenshot 2026-04-14 095227" src="https://github.com/user-attachments/assets/72d24453-4dbb-499d-970d-3579d46c7a08" />  
When I look at the other headings, I see they are white. I think these were also supposed to be white in dark mode.  
It seems these two were missed when dark mode was implemented


### Keyboard
tab index goes from `bekijk workshops` card, to the scroll to top button first and then to the footer:  

[2026-04-14 09-59-56.webm](https://github.com/user-attachments/assets/accfc8a3-de28-4f67-a692-d6330e27b02e)  

It would be better if the scroll-to-top button is the last element to receive tab focus.  

In the footer, the first focus is currently on the logo, which links back to the homepage. It would be better to navigate through the entire footer first, and only then reach the “back to home” link, followed by the “scroll to top” button.

### Screen reader
lang is `en`, but text is in dutch  
<img width="698" height="162" alt="image" src="https://github.com/user-attachments/assets/38fb6e68-e2b9-4dd1-aaed-591a7c71300e" />


Maybe wrap every “ad-dag” text in a span with an aria-label set to “aa dee dag”, so it is announced more clearly by screen readers
<img width="1176" height="243" alt="Schermafbeelding 2026-04-14 103411" src="https://github.com/user-attachments/assets/9c5b42c8-65d3-4386-88ae-06e02c6b5b5b" />

This logo is being read out as “logo” by the screen reader:  
<img width="944" height="230" alt="Schermafbeelding 2026-04-14 103548" src="https://github.com/user-attachments/assets/ec2f8154-146a-4bdc-bde6-7550ab1ffe80" />  
This actually doesn’t need to be announced by screen readers


The times are being read out digit by digit by the screen reader:  
<img width="813" height="261" alt="Schermafbeelding 2026-04-14 103621" src="https://github.com/user-attachments/assets/1e617dde-56c2-45e3-8f3c-709a3422baaa" />  
These are probably read correctly when they are wrapped in a <time> element


When navigating the site using the arrow keys, you land on this line, which is then read out by the screen reader:  
<img width="2352" height="179" alt="Schermafbeelding 2026-04-14 103709" src="https://github.com/user-attachments/assets/b59d28fa-edd2-415c-b891-43758d943d7e" />


This logo is being announced twice by the screen reader:  
<img width="999" height="212" alt="Schermafbeelding 2026-04-14 103747" src="https://github.com/user-attachments/assets/efbcea58-9f20-4c80-bda0-8b66ede098f3" />


### HTML
The `main` element appears twice in the DOM  
<img width="696" height="407" alt="Screenshot 2026-04-14 095622" src="https://github.com/user-attachments/assets/6c34ad68-176c-4ca7-af83-02a2c6d23e8a" />


### Accessibility improvements summary
- big sticky header, especially on mobile
- Low contrast on the “Programma” & “Workshops” H2 headings
- Tab order is incorrect after the “Bekijk workshops” link
- The HTML contains two <main> elements
- Screen reader issues:
  - lang is set to en in the HTML
  - aria label for better announcing ad-dag
  - Logos in the “Programma” and “Workshops” sections are being read out
  - Times are read digit by digit
  - A decorative element is being announced when navigating with arrow keys
  - The “Back to home page” logo/link is being announced twice in a row

---

## Performace


### Lighthouse
> Incognito + mobile + network throttling 3G

<img width="1137" height="1264" alt="image" src="https://github.com/user-attachments/assets/d4949eaf-ab87-4eed-9839-1a17669e2d3e" />  
[Improve image delivery](https://developer.chrome.com/docs/performance/insights/image-delivery?utm_source=lighthouse&utm_medium=devtools)
- Static images could be further optimized. Some are currently PNG or WebP, adding AVIF variants could further improve download performance and reduce image sizes (inside picture elements)
- or use svelte enhanced img for static images

[network dependency tree](https://developer.chrome.com/docs/performance/insights/network-dependency-tree?utm_source=lighthouse&utm_medium=devtools)
- Maybe add preload to the font file

Image elements do not have explicit width and height

tested other throttling modes aswell:  
> Incognito + mobile + network throttling slow 4G -> 98  
> Incognito + mobile + network throttling fast 4G -> 98  
> Incognito + mobile + no throttling fast 4G -> 99  

issues are the same as network throttling 3G


### PageSpeed insights
mobile  
<img width="1554" height="1210" alt="image" src="https://github.com/user-attachments/assets/b8e25ba4-7ffa-4d17-b233-2166c72a50d4" />

desktop  
<img width="1531" height="1213" alt="image" src="https://github.com/user-attachments/assets/ef789aa2-86e8-423c-84ba-a45cd179ce33" />

- Improve image delivery -> also only on static images
- Network dependency tree -> also for the fonts
- posible layout shift
  <img width="1450" height="715" alt="image" src="https://github.com/user-attachments/assets/632470fd-3651-4f9e-bd0b-6e5dee119a89" />
- this image has width but no height
  <img width="1465" height="434" alt="image" src="https://github.com/user-attachments/assets/23cae9c1-a0ab-4c6a-94d1-a8d06be8b33b" />


### Waterfall test

Webpage test  
<img width="1869" height="266" alt="image" src="https://github.com/user-attachments/assets/15e5e3c8-381b-40f3-a8f6-b46797aec8e6" />

waterfall diagram  
<img width="1236" height="1288" alt="image" src="https://github.com/user-attachments/assets/7a4009e6-62f2-456b-acd8-adbd52ba343e" />

optimizations  
<img width="834" height="905" alt="image" src="https://github.com/user-attachments/assets/0b49fa16-7295-442f-a67e-30fe6a8f92b4" />


### Performace improvements summary
- [Improve image delivery](https://developer.chrome.com/docs/performance/insights/image-delivery?utm_source=lighthouse&utm_medium=devtools) -> also only on static images
- [Network dependency tree](https://developer.chrome.com/docs/performance/insights/network-dependency-tree?utm_source=lighthouse&utm_medium=devtools) -> for the font files
- posible layout shift ( see image above )
- an image has width but no height ( see image above )

---

## Progressive enhanced

### Browser
**edge v88**  
background color uses light-dark [color-scheme](https://caniuse.com/wf-light-dark)  which is supported from edge 2024 versions and onward.  
for this I recomend pseudo private custom properties as fallback
<img width="2454" height="716" alt="image" src="https://github.com/user-attachments/assets/1b2f38f2-a37f-410c-9519-fe2c6d18d0b9" />

same issues here:  
- header
  <img width="978" height="206" alt="image" src="https://github.com/user-attachments/assets/06b755aa-064b-4e31-8a24-ef21c944a6b0" />  
- programma & workshop cards
  <img width="1646" height="664" alt="image" src="https://github.com/user-attachments/assets/ac1c3fed-f109-45f9-b025-56cdfc908f89" />  
- footer
  <img width="1710" height="949" alt="image" src="https://github.com/user-attachments/assets/a2eb8ae3-d50e-47fc-83a8-46c472da861c" />

**firefox 85**, **chrome 88**, **safari 15.6** and **opera 74** have the exact same issues


### Device

### PE improvements summary
- fallbacks for `color-scheme: light dark;`


