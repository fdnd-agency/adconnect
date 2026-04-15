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

## Responsive
320px to 1220px the dots at the bottom look out of place  
<img width="492" height="1057" alt="image" src="https://github.com/user-attachments/assets/05cee7eb-721c-472b-9231-1279e2ae634e" />  
this is a list, the items havent got the right color for dark mode:  
<img width="406" height="258" alt="image" src="https://github.com/user-attachments/assets/345aa55d-1d83-4cc0-bd80-70558c9f3cfe" />  
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
- 

---

## Performace

### Lighthouse

### PageSpeed insights

### Waterfall test

### Performace improvements summary

---

## Progressive enhanced

### Browser

### Device

### PE improvements summary


