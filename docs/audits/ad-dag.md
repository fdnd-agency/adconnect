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

## Responsive

The header takes up a large portion of the screen:  
<img width="712" height="349" alt="image" src="https://github.com/user-attachments/assets/f0dd53f0-f8fc-482f-adff-703306d44b17" />  
You could make the header collapse or hide when scrolling down, and reappear when scrolling up

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


The breadcrumb is unclear for screen readers. It’s not obvious that the user is navigating a breadcrumb menu.  
Additionally, “AD-dag” is announced twice by the screen reader in a row. Without visual context, the user cannot tell what the difference is between the two items  
<img width="1176" height="243" alt="Schermafbeelding 2026-04-14 103411" src="https://github.com/user-attachments/assets/9c5b42c8-65d3-4386-88ae-06e02c6b5b5b" />
> Maybe wrap every “ad-dag” text in a span with an aria-label set to “aa dee dag”, so it is announced more clearly by screen readers

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
- Low contrast on the “Programma” & “Workshops” H2 headings
- Tab order is incorrect after the “Bekijk workshops” link
- The HTML contains two <main> elements
- Screen reader issues:
  - lang is set to en in the HTML
  - The breadcrumb is not clearly announced as a breadcrumb navigation
  - Logos in the “Programma” and “Workshops” sections are being read out
  - Times are read digit by digit
  - A decorative element is being announced when navigating with arrow keys
  - The “Back to home page” logo/link is being announced twice in a row

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


