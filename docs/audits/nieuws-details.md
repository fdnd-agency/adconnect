# Nieuws Details

## Responsive
Like the pages before the button seems to cover the text. 

<br>
<img width="190" height="266" alt="button-covering-text" src="https://github.com/user-attachments/assets/df9267af-15a3-470b-b5b9-5baa42f15e7c" />
</br>

what also seems to happen with articles that have long pages of text,`ul` and `li` is that they're not quite distinguishable from eachother. There isn't a lot of gap between these sections and it looks more like a weird continuation from the text than plus-sides that need to be shown here.

<br>
<img width="533" height="275" alt="weird-li-in-text" src="https://github.com/user-attachments/assets/c0ae49cb-167a-4da9-a191-c99c3f370c24" />
</br>

---

## Accessibility

### Lighthouse
The lighthouse tests seem to be a consistent 100 throughout the pages thus far.
<img width="546" height="234" alt="accessability-test-nieuws-details-desktop" src="https://github.com/user-attachments/assets/0794e562-0f58-4ff1-b5ff-051c80b7d22f" />
<img width="550" height="233" alt="accessability-test-nieuws-details-mobile" src="https://github.com/user-attachments/assets/c74979fe-1162-4abe-9a73-613a87800f18" />

### Keyboard
Keyboard tests also seem to be consistent throughout the website. Everything has a logical way of tabbing through the page. I won't show any more pictures in future audits if everything works as expected and will type: all in order, to signal that all tests have been done.

### 

### Screen reader

---

## Performace

### Lighthouse
Lighthouse test show a 97 score in performance. Again these pages can simply be cranked up to 100 if the optimize image delivery. We simply need to wrap the image around a picture element and use the source tag inside to not only convert it to a webp, but also to an avif.
<img width="538" height="335" alt="performance-score-nieuws-details" src="https://github.com/user-attachments/assets/13e90513-6ef0-4e66-a8b6-3de2a94388dc" />
<img width="531" height="102" alt="performance-image-delivery" src="https://github.com/user-attachments/assets/1d6e0a63-cde3-4119-ac34-7cb5d712e757" />

### PageSpeed insights
Pagespeed Insights shows that the performance score is actually a bit higher than previously tested, but we can get this to a 100 if we take the image and wrap it in a picture element. Overall a good rounded score, that can use some improvement
<img width="1195" height="143" alt="pagespeed_insight_test" src="https://github.com/user-attachments/assets/720e6787-1280-4639-9635-5abff74cba89" />

### Waterfall test
<img width="1835" height="1487" alt="waterfall-test-nieuws-details" src="https://github.com/user-attachments/assets/9308ed19-2501-4ced-a7ac-1d180420b7ee" />

---

## Progressive enhanced

### Devtools and Headings
In headings it is shown that all headings are used correctly. There is only ever 1 `h1` and the subheadings are followed correctly with `h2`'s. With Devtools I do see some duplicates, but these are the the result of having a seperate mobile menu and desktop menu
<img width="1878" height="812" alt="nieuws-details-no-styles" src="https://github.com/user-attachments/assets/331716ff-a8d9-41ca-ab73-93df7f2ec94a" />

### Browser
In the recent versions of the brwosers Edge, Chrome and Firefox this page responds normally.
Older browser test:

### Device
Device test

---

