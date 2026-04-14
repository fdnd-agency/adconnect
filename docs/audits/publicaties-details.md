# Publicaties details page
[Link naar de pagina op de live dev-site](https://adconnect.dev.fdnd.nl/publicaties/beschrijving-niveau-5-associate-degree-2022)  
There are more detail pages, all of them have this layout)

- [Responsive](#Responsive)
  - [Summary](#Responsive-improvements-summary)
- [Accessibility](#Accessibility)
  - [Summary](#Accessibility-improvements-summary)
- [Performace](#Performace)
  - [Summary](#Performace-improvements-summary)
- [Progressive enhanced](#Progressive-enhanced)
  - [Summary](#PE-improvements-summary)
 
***Tested in edge v147***

## Responsive

On 320px, the previewer appears zoomed out.
The user can zoom in and use the previewer, but it would be better if it filled the screen by default.  
<img width="320" height="980" alt="image" src="https://github.com/user-attachments/assets/9464d142-12ae-422d-9775-b87a50c6a994" />
> This is not always consistent, I believe the browser remembers the previous zoom level

Instead of sending the user to another page, we could enlarge the previewer so it’s fully usable directly on the page

Here we can give the previewer the full width of the page, instead of keeping is small:  
<img width="795" height="1324" alt="image" src="https://github.com/user-attachments/assets/016ab668-9da2-43c6-8fd9-c9a21745b6c2" />

### Responsive improvements summary
- make the pdf previewer bigger
  - remove link to another page

---

## Accessibility

- When a link in the mobile menu is clicked, the user is taken to the next page but the menu remains open
- When the mobile menu is open, after youre done tabbing throught the menu, you continue tabbing through the page
<img width="388" height="1511" alt="image" src="https://github.com/user-attachments/assets/6d1f7def-c1be-41d3-8742-f2e7b8b93a9b" />

On the “publicaties” page, you can currently only click the “meer info” link to go to the details page, this should be changed so the entire card is clickable:  
<img width="359" height="606" alt="image" src="https://github.com/user-attachments/assets/8ca27d82-ee34-4e6d-b812-13be9bcad63b" />


When using the skip link, there are two tab stops from the breadcrumb menu that remain off-screen

[2026-04-14 16-03-14.webm](https://github.com/user-attachments/assets/3684f31e-0549-455c-acb3-d765732c165b)


### Lighthouse
Here as well, the Lighthouse test scores 100% on accessibility

### Keyboard
The tab order goes through the links inside the PDF viewer:

[2026-04-14 16-12-24.webm](https://github.com/user-attachments/assets/b8d74b4c-b80c-4ff0-9be1-e71cf9868924)

### Screen reader
This image alt text contains the same text as the adjacent title (plus “graphic”), causing the user to hear the same information twice  
<img width="2339" height="646" alt="image" src="https://github.com/user-attachments/assets/b98b326b-1334-4306-bf51-4e4937367433" />

The screen reader also navigates through the PDF, but it reads additional elements such as logo-related content and page numbers, which can be distracting

### Accessibility improvements summary
- mobile menu stays open after clicking a link
- mobile menu stays open after going through it with tab index, ( continue through the page behind it )
- tab index goed through the links inside of the pdf viewer
- consider removing img alt if it repeats the previously said title

---

## Performace

### Lighthouse
Performance is also verry high on this page:  
<img width="976" height="803" alt="image" src="https://github.com/user-attachments/assets/701d3ee7-61d6-4155-8145-f0d3712a740e" />

the only differences i see this time is:  
- [Document request latency](https://developer.chrome.com/docs/performance/insights/document-latency?utm_source=lighthouse&utm_medium=devtools)
- [3rd parties](https://developer.chrome.com/docs/performance/insights/third-parties?utm_source=lighthouse&utm_medium=devtools)
- [Page prevented back/forward cache restoration](https://developer.chrome.com/docs/lighthouse/performance/bf-cache/?utm_source=lighthouse&utm_medium=devtools)

<img width="666" height="900" alt="image" src="https://github.com/user-attachments/assets/fbaf3652-2e2c-4eec-836f-c0c29d924829" />  
<img width="903" height="511" alt="image" src="https://github.com/user-attachments/assets/1095bdd2-5942-4bcd-a781-91d3a7ccf72e" />  


### PageSpeed insights
this test failed 2 times on edge and once on chrome,
I'll try this test again another time

### Waterfall test

<img width="1392" height="1355" alt="image" src="https://github.com/user-attachments/assets/00b35e44-c530-41ca-abb4-b9fdbe799ebc" />

<img width="1397" height="884" alt="image" src="https://github.com/user-attachments/assets/3a1698d7-8dee-463d-b978-465ab89dc85c" />


### Performace improvements summary
- improve server response time
- the other points are the same as prevoius test ( ad-dag & publicaties pages )

---

## Progressive enhanced

### Browser

### Device

### PE improvements summary


