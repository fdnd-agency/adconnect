# Nieuws
[https://adconnect.dev.fdnd.nl/nieuws](https://adconnect.dev.fdnd.nl/nieuws)

- [Responsive](#Responsive)
  - [Summary](#Responsive-improvements-summary)
- [Accessibility](#Accessibility)
  - [Summary](#Accessibility-improvements-summary)
- [Performace](#Performace)
  - [Summary](#Performace-improvements-summary)
- [Progressive enhanced](#Progressive-enhanced)
  - [Summary](#PE-improvements-summary)

## Responsive
With the responsiveness tests I did it looked quite well on the surface, but what it revealed to me when I started to scale the window that some texts aren't that well adjusted to certain screen sizes.

Because I am a fond user of dark-mode I tested this page with the standards that should come with the `18px` of text size. Regretfully they missed the mark by just one pixel difference, but because strictness is key, we need to up the 17 to an 18. This is to show the text better because white text on a blackbackground needs to be a bit bigger and vertically stacked sentences should be more apart.
<br>
<img width="290" height="103" alt="17-px-size-text" src="https://github.com/user-attachments/assets/7657f3c5-5b77-4c9d-8c29-c1668533a906" />
</br>

<br>
<img width="175" height="294" alt="Screenshot 2026-04-14 111257" src="https://github.com/user-attachments/assets/cfbbf946-03bc-40fb-92a9-0c353ccd6de6" />

</br>

The button to skip right back to the hero is quite a good function, but starting on smaller screens from `320px` til `799px` it starts to obscure the texts are have been generated.
<br>
<img width="188" height="194" alt="Screenshot 2026-04-14 111219" src="https://github.com/user-attachments/assets/e484ac5b-a114-49b0-9c4a-b62d3c054f3c" />
</br>

### Responsive improvements summary
Simple change from 17 pixels to 18 pixels is a good one and see if we can make the anchor tag, if there is another solution for it.
---

## Accessibility

### Lighthouse
A simple lighthouse test usually is a bit deceptive as it takes your pc and internet speed into the count, so take these results with a pinch of salt. Both desktop and mobile score a perfect 100 across the tests. So I have no more to add on that front as of now.
<img width="351" height="254" alt="nieuws-accessability-lighthouse-test-desktop" src="https://github.com/user-attachments/assets/4fcd8f08-908d-4361-b3b9-cf0824cec74e" />
<img width="351" height="254" alt="nieuws-accessability-lighthouse-test-mobile" src="https://github.com/user-attachments/assets/50369a8b-a27e-48bd-a2b5-4568979b0ce1" />

### Keyboard
As I did the tabtest I was pleasantly surprised to find a button that lets you skip to the content. I also tested the color-contrast that the focus:state has upon the background and it passed the test for non-text, that is quite good to see

<img width="115" height="106" alt="hero-back-to-button" src="https://github.com/user-attachments/assets/4e49ee68-00e0-46a1-bb13-bcf10cde85a1" />
<img width="234" height="89" alt="GA-NAAR-INHOUD-TAB" src="https://github.com/user-attachments/assets/44288017-7810-430b-b704-f0ad921c5c04" />
<img width="326" height="126" alt="adconnect-logo-link-tab" src="https://github.com/user-attachments/assets/32547c92-d60e-4916-933f-47449f4e0391" />
<img width="369" height="214" alt="Screenshot 2026-04-14 095754" src="https://github.com/user-attachments/assets/a9070471-0c9f-482a-a335-e57ca02ab872" />
<img width="358" height="312" alt="themas-tab-test" src="https://github.com/user-attachments/assets/095e45ad-2fca-4fb2-8186-35cef9bc6aa6" />

### Screen reader
For the screenreader test there is an error that stands on the top of the page. The language of the page has been set to English while all the text on the website is in Dutch. The tag should be replaced with NL instead of EN. To make sure the text is read correctly and not confuse the reader even more.
<br>
<img width="245" height="11" alt="language-EN" src="https://github.com/user-attachments/assets/b1e1f294-d7c6-4c89-af9d-1e3e11b62daf" />
</br>

### Accessibility improvements summary
To improve the accessability of this website we need to change the language of the site from EN to NL. that will help the screenreader read in the correct language.
---

## Performace

### Lighthouse
Lighthouse test gave me these results back:
<br>
<img width="450" height="607" alt="nieuws-lighthouse-test-performance-desktop" src="https://github.com/user-attachments/assets/7ab10368-d787-492a-bcca-77b421f2f5ae" />
<img width="450" height="641" alt="nieuws-lighthouse-test-performance-mobile" src="https://github.com/user-attachments/assets/e7c03894-fc46-407f-b990-7cf8050a5995" />
</br>
The fix for the 94/95 score I will put on the pagespeed insight test.
### PageSpeed insights
With the pagespeed insight website I tested the nieuws page and it was all completely green, but there are still some additions to be made on this page. A good addition is wrapping the `img` tag in a `picture` element and add a `source` to that so it can also be viewed as an AVIF file. This might help with the LCP of 2.9 seconds. Note that his is only on the mobile version of the webpage.
<img width="1199" height="146" alt="pagespeedinsight-test" src="https://github.com/user-attachments/assets/684e9d5c-2a59-49cc-a415-bdd608b5285d" />
</br>
<br>
<img width="1175" height="643" alt="image-delivery" src="https://github.com/user-attachments/assets/c6461d6b-8413-4102-9680-a1f42aabff47" />
</br>
### Waterfall test
<br>
![export_04142026131123](https://github.com/user-attachments/assets/54cb856d-fb00-4639-bfe1-d71708b4216f)
</br>
### Performace improvements summary
Wrap images in a `picture` element and use `source` so the image is converted into avif so that image delivery will be optimized for the user. 
---

## Progressive enhanced

### Browser
On the browser: Firefox, Google Chrome and Mircosoft edge the webpage looks the exact same to me. I could not see any changes in style. A subtask of this browser test is the usage of no stylesheets. I saw that when a browser doesn't use any styles from the stylesheet the standard image has no set value so it takes in a lot of the page if stylesheets are disabled. What should be done about this is set a width and a height for this image.
<br>
<img width="1752" height="806" alt="image-covering-page" src="https://github.com/user-attachments/assets/3127d60f-c6f0-4253-b611-7263e9753a36" />
</br>

### Device
T.B.D

### PE improvements summary


