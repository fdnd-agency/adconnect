# Over Ad details

## Responsive
For a better experience with the image I would make it a full width image. Further the same expected speonsiveness issues with the button going over the selected text.
<br>
<img width="231" height="132" alt="Screenshot 2026-04-15 140435" src="https://github.com/user-attachments/assets/c99bfc45-22ff-409d-af8a-87defc9d5f1e" />
</br>

---

## Accessibility

### Lighthouse
In a lighthouse test and a test with headings I discovered that there is a subheading of `h3` after an `h1` and that is not so very accessable. We need to change these headings to `h2` or place a matching `h2` above it.
<br>
<img width="411" height="356" alt="wrong headings" src="https://github.com/user-attachments/assets/b9cc0adb-85c0-4183-890a-fa8338c2dca1" />
<img width="408" height="235" alt="lighthouse-score-over-ad-details" src="https://github.com/user-attachments/assets/ac742521-8717-43e9-be63-32ccacc632a5" />
<img width="538" height="192" alt="wrong-heading-lighthouse" src="https://github.com/user-attachments/assets/0d2a90e5-cd7b-4b53-90d7-b16a546612b6" />
</br>
### Keyboard
In order
### Screen reader
change langauge from EN to NL

---

## Performace

### Lighthouse
In the lighthouse test I discovered that the first image doesn't have a set height, but further testing showed that the font that is loaded in also takes some time in the lcp. All together this performance has the lowest score as of now. We need to optimize image delivery, image height and width and find a way to let the font be loaded either directly or more efficiently.
<img width="471" height="343" alt="performance-lighthouse-test-over-ad-details" src="https://github.com/user-attachments/assets/1cdd7211-5593-4cdf-9bd9-fb948e854f4a" />
<img width="529" height="349" alt="image-not-explicit-width" src="https://github.com/user-attachments/assets/5d72dc62-9f6c-4bd6-911b-c800dfa0737b" />
<img width="541" height="730" alt="image-delivery" src="https://github.com/user-attachments/assets/d763ab66-0954-4815-85a9-e4d0b6c06a35" />

### PageSpeed insights
<img width="564" height="150" alt="lighthouse-test-over-ad-details" src="https://github.com/user-attachments/assets/3b69ec0f-cba3-4c71-8181-ab9fd7dae7be" />
<img width="331" height="95" alt="lcp-over-ad-details" src="https://github.com/user-attachments/assets/bdd6eee1-1459-4aac-91b8-cadeb069616b" />
### Waterfall test
<img width="1835" height="1570" alt="waterfall-over-ad-details" src="https://github.com/user-attachments/assets/3cb56892-e512-48cf-b0b4-225cc031979b" />

---

## Progressive enhanced

### Browser
In order, but shows same issues with color scheme like the 'over-ons' page
### Device
still to be tested

---
