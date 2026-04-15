# Page name
[Link naar de pagina op de live dev-site](https://adconnect.dev.fdnd.nl/werkgevers)  
This is the 'werkgevers' page, but for now it has the work in progress screen

- [Responsive](#Responsive)
  - [Summary](#Responsive-improvements-summary)
- [Accessibility](#Accessibility)
  - [Summary](#Accessibility-improvements-summary)
- [Performace](#Performace)
  - [Summary](#Performace-improvements-summary)
- [Progressive enhanced](#Progressive-enhanced)
  - [Summary](#PE-improvements-summary)
 
***Tested in Chrome 147***


<details>
  <summary>The 404 error page is the same as the “Work in Progress” page, with the only difference being the title.</summary>

  <img width="1764" height="617" alt="image" src="https://github.com/user-attachments/assets/ffd2f0c1-cd9a-422a-8dd8-dbf3113e84e4" />
</details>  

The image alt text does not change; we could update it instead of keeping it the same on the “Work in Progress” page
error 404 version doesnt have the skip link


## Responsive
320px to 1220px the dots at the bottom look out of place  
<img width="492" height="1057" alt="image" src="https://github.com/user-attachments/assets/05cee7eb-721c-472b-9231-1279e2ae634e" />  
this is a list, the items havent got the right color for dark mode:  
<img width="406" height="258" alt="image" src="https://github.com/user-attachments/assets/345aa55d-1d83-4cc0-bd80-70558c9f3cfe" />  
<img width="589" height="407" alt="image" src="https://github.com/user-attachments/assets/e2793102-ff74-48b7-9555-aa4c07c77038" />  
The layout can also be improved, its chaotic on small screens  
the first item doesn't have a dot, making it feel off, every item after the first one has a dot on the left  
it could be better to have 1 column then 2, maybe 3 and then everything on 1 row. ( giving all items the same width )  
instead of wrapping as soon as there is enough space.

### Responsive improvements summary
- list layout can be improved across all/most device widths

---

## Accessibility

the li text doesnt change color in dark mode making them invisible  
<img width="1123" height="368" alt="image" src="https://github.com/user-attachments/assets/62ea0e84-4d0b-48ef-9739-231727e0c3d0" />

hover over the li text has low contrast in light mode:  
<img width="339" height="100" alt="image" src="https://github.com/user-attachments/assets/94b25426-ffb8-44c9-ac9e-47f2bad3ae3f" />  
in darkmode it is good  
<img width="416" height="135" alt="image" src="https://github.com/user-attachments/assets/33e4875e-4b5e-48e4-a18d-2df26e2d303e" />

### Lighthouse
<img width="799" height="429" alt="image" src="https://github.com/user-attachments/assets/5d773e20-a57b-492c-9d39-4016d3024279" />  
... ... ... 


### Keyboard
I found no problems with the tab index ( through the new part of the page )  

### Screen reader
the img says graphic 404 error:  
<img width="728" height="748" alt="image" src="https://github.com/user-attachments/assets/b9d070f7-6c17-43cb-bb8d-572649135d53" />  
we could consider removing this alt and letting the text next to it explain everything

### Accessibility improvements summary
- li text doesnt change color on darkmode making it invisible
- consider adding aria hidden to img

---

## Performace

### Lighthouse

layout shift  
<img width="1036" height="877" alt="image" src="https://github.com/user-attachments/assets/9a5f50dd-ff0f-4bb7-85ec-58a7163ca6cb" />


### PageSpeed insights

<img width="1707" height="1148" alt="image" src="https://github.com/user-attachments/assets/fd0e62b8-56d1-4a29-9af6-39fd9fca8f80" />

<img width="686" height="436" alt="image" src="https://github.com/user-attachments/assets/fea88d29-044b-4385-999c-6aee509b0691" />


### [Waterfall test](https://portal.catchpoint.com/ui/Symphony/InstantTest/Webpage/953078/Details?t=sm)
> pixel 5a 4g

<img width="2538" height="1224" alt="image" src="https://github.com/user-attachments/assets/3488d20c-d768-419a-aec3-6e0e4904fd7f" />  
Pixel 5a is a phone from August 26, 2021 which is probably why first byte was so slow

viewport images are lazily loaded  
<img width="1203" height="290" alt="image" src="https://github.com/user-attachments/assets/3392dae0-6615-4a8e-8fe4-57c30e61ca9c" />

Final HTML (DOM) size is significantly larger than initially delivered HTML  
<img width="1196" height="326" alt="image" src="https://github.com/user-attachments/assets/754ccfc1-5133-41c6-ad34-eb0b3c1c3f10" />

layout shift  
<img width="1170" height="266" alt="image" src="https://github.com/user-attachments/assets/0aaad16e-94b4-47b5-99af-4f7e5b8ff1f1" />

the other issues on this page are about the header and footer which ive already adressed in content and talent award md files

### Performace improvements summary
- fetch priority high on image
- improve image with picture element/ different image formats
- Network dependency tree -> make font more easily dicoverable
- viewport image lazily loaded

---

## Progressive enhanced

### Browser
Edge 88, Firefox 85, Chrome 88, Opera 74 and Safari 15.6
the same background color problem as ad-dag  
no other issues ( not considering the above mentioned ones )

### Device

### PE improvements summary
only background color issue


