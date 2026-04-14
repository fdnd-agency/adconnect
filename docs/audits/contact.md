# Contact page
[Link naar de pagina op de live dev-site](https://adconnect.dev.fdnd.nl/contact)

- [Responsive](#Responsive)
  - [Summary](#Responsive-improvements-summary)
- [Accessibility](#Accessibility)
  - [Summary](#Accessibility-improvements-summary)
- [Performace](#Performace)
  - [Summary](#Performace-improvements-summary)
- [Progressive enhanced](#Progressive-enhanced)
  - [Summary](#PE-improvements-summary)

***Tested in Brave 1.89.132***

## Responsive

The 'contact gegevens'  card is a bit too small ( at 879px )  
<img width="473" height="726" alt="image" src="https://github.com/user-attachments/assets/085ea98e-5e1f-4b55-840c-d4a63912acd9" />  

centered text, which looks okay on big screens, but not on mobile:  
<img width="608" height="532" alt="image" src="https://github.com/user-attachments/assets/f4bc5168-79cb-4016-b5bd-b491d14be4f2" />  
It might be better to keep it right aligned

like this:  
<img width="2620" height="714" alt="image" src="https://github.com/user-attachments/assets/6460c82b-eff5-464f-b7d1-353c3bdaf10c" />  

instead of this:  
<img width="2664" height="959" alt="image" src="https://github.com/user-attachments/assets/1eaa10ea-39c2-4910-acb7-7657c507ed8b" />  
this change will also keep this top part of the page consistent with the other pages  

I just had an idea:  
Maybe we could make the “Kom naar de Ad-dag” button the highlight color to draw more attention.  
We could also try making it orange only on the homepage, and keep it blue on other pages to avoid distracting users too much.  
<img width="2851" height="570" alt="image" src="https://github.com/user-attachments/assets/7e526461-d357-40bf-8fe3-0894d22b7460" />


Margins and padding are inconsistent across all pages. It might be better to define custom properties for spacing and apply them during the refactoring phase.  
Especially try to avoid negative margins  
<img width="473" height="137" alt="image" src="https://github.com/user-attachments/assets/9457d131-9360-46bb-8074-a1e6edf9add5" />  


### Responsive improvements summary
- at 879px 'contact gegevens' gets cut off
- consider removing centerd text / definitly remove it from mobile versions
- 2 ideas to improve the page, ( not really about responsiveness )

---

## Accessibility

form only checks for empty fields and `@email.com`  

[2026-04-14 18-34-32.webm](https://github.com/user-attachments/assets/c7bf69ef-071c-452a-a478-203e87a5c58b)  

<img width="1721" height="816" alt="image" src="https://github.com/user-attachments/assets/4244bb58-7616-444b-aabf-8660a71f3475" />



### Lighthouse
Lighthouse also gives a 100% accessibility score here

### Keyboard
no issues with tab index, apart from [previously mentions one](https://github.com/fdnd-agency/adconnect/blob/dev/docs/audits/ad-dag.md#keyboard)


### Screen reader

This reads: "banner landmark, banner landmark navigation landmark list with 3 items FAQ's link"  
<img width="502" height="113" alt="image" src="https://github.com/user-attachments/assets/b1ce4f92-4816-4e61-95a7-53abafd74ff5" />  
use aria label to shorten this

the breadcrumb menu could also be shortened with aria labels:  
<img width="348" height="158" alt="image" src="https://github.com/user-attachments/assets/8709ebf8-425e-4e44-b214-f18b4e28ea6c" />
> main landmark breadcrumb navigation landmark home

als ik de lang naar nl verander in inspecter dan worden bepaalde text wel in ned la=uitgelezen en sommige niet (NVDA en windows narrator)  


### Accessibility improvements summary
- form doesn't check for valid input
- shorten banner landmark with aria labels

---

## Performace

### Lighthouse
> mobile + network throttling 3G

The first page I found achieves a 100% performance score. I tested it three times, clearing the cache each time:  
<img width="1160" height="950" alt="image" src="https://github.com/user-attachments/assets/66f49335-2550-4497-9d85-7ddbfc025c61" />

the insights are also the same we have seen on other pages:  
<img width="412" height="361" alt="image" src="https://github.com/user-attachments/assets/d5cb8b92-6d12-4400-9ac0-a72ba6e30d55" />


### PageSpeed insights
This page almost has a perfect score on pagespeed test:  
<img width="926" height="200" alt="image" src="https://github.com/user-attachments/assets/8be37193-b38f-4610-b9f2-f4cc6f37e364" />

The only thing missing is the [meta description](https://developer.chrome.com/docs/lighthouse/seo/meta-description/). The other pages also only need this to achieve 100% SEO
<img width="851" height="270" alt="image" src="https://github.com/user-attachments/assets/40e45c7a-8815-4c03-9065-531afce0aa30" />


### [Waterfall test](https://portal.catchpoint.com/ui/Symphony/InstantTest/Webpage/946086/Details?t=sm)

<img width="1560" height="1179" alt="image" src="https://github.com/user-attachments/assets/cfee3cee-28c2-4b18-8166-67598b552c7c" />  
<img width="934" height="981" alt="image" src="https://github.com/user-attachments/assets/3b6e8ef9-5bff-42f4-b7bc-d8c5af1fb5f1" />  

These are the same as other performance tests:  
<img width="1567" height="365" alt="image" src="https://github.com/user-attachments/assets/5e9708ee-94f6-4c1c-8844-c385d4051849" />  
<img width="1554" height="586" alt="image" src="https://github.com/user-attachments/assets/e61375ff-09f9-480e-a4da-56704b4620f7" />  

This one i haven't seen before:  
<img width="1584" height="365" alt="image" src="https://github.com/user-attachments/assets/f681fd59-557d-4857-9195-2161539f68c8" />


### Performace improvements summary
- The same issues as previously tested sites
- I haven’t seen the DOM size significantly increase compared to the initial delivery. I’ll need to look into what this is and how to improve or fix it.

---

## Progressive enhanced

### Browser

### Device

### PE improvements summary


