# Publicaties
[Link naar de pagina op de live dev-site](https://adconnect.dev.fdnd.nl/publicaties)

- [Responsive](#Responsive)
  - [Summary](#Responsive-improvements-summary)
- [Accessibility](#Accessibility)
  - [Summary](#Accessibility-improvements-summary)
- [Performace](#Performace)
  - [Summary](#Performace-improvements-summary)
- [Progressive enhanced](#Progressive-enhanced)
  - [Summary](#PE-improvements-summary)
 
***Tested in Firefox v149***

## Responsive

Small improvement: prevent this state:  
<img width="620" height="181" alt="image" src="https://github.com/user-attachments/assets/d31e1a21-adee-4298-a427-a14c345c5d97" />  
keep this state, untill there is enough room for 1 line:  
<img width="572" height="136" alt="image" src="https://github.com/user-attachments/assets/1af64d51-ecc9-4d09-87c2-2475dec32bfa" />

keep these buttons the same size, may be also centered:  
<img width="418" height="444" alt="image" src="https://github.com/user-attachments/assets/c3fcde82-3167-468e-820b-a50aa4a8a495" />

These cards could become longer, in order to display more description text  
<img width="505" height="651" alt="image" src="https://github.com/user-attachments/assets/418bca18-b1e4-4b6b-9348-1d4b41c96068" />  
> this is on 320px

### Responsive improvements summary
> Responsiveness on this page is very good. The only points I have are improvements for better user experience, with no issues like horizontal scrollbars or broken layouts.

- Prevent text from wrapping too early (filter section)
- Ensure filter buttons have consistent sizing
- Extend the “publicaties” cards to allow more space for description text

---

## Accessibility

Maybe give the selected filter a highlight color so it’s clearer which filter is currently active:  
<img width="1146" height="214" alt="image" src="https://github.com/user-attachments/assets/d10b7379-f46d-476c-846c-ad87f0242876" />  
<img width="1168" height="245" alt="image" src="https://github.com/user-attachments/assets/f9a0c9e9-ef75-4d7d-ae0e-ac1778e6deae" />  

the filters scroll to top when clicked:  

[2026-04-14 14-11-58.webm](https://github.com/user-attachments/assets/ed148ab9-9601-4ee1-8563-ef190d57ca20)


### Lighthouse
lighthouse test show 100% for mobile as wel as desktop:  
<img width="686" height="430" alt="image" src="https://github.com/user-attachments/assets/f6380f6c-2b2b-4203-b13e-f00a10db9b6d" />


### Keyboard
tab index works great, a small improvement could be:  
placing the outline on the whole card, and using [focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-within):  
<img width="861" height="685" alt="image" src="https://github.com/user-attachments/assets/975f217a-bd79-4d37-b991-d46e0f4d0f38" />

### Screen reader
- NVDA doesn't work on firefox
- windows narrator: on firefox before every `p` element get read, screen reader announces: 'text'. only after the next arrow key klik does the text get read ( chrome doesn't have this )


### Accessibility improvements summary
- give current active filter the highlight color
- prevent scroll to top on filters
- 2 issues with screen reader on firefox, not sure if we can fix those

---

## Performace

### Lighthouse
> mobile + network throttling regular 3G  
<img width="1290" height="1328" alt="image" src="https://github.com/user-attachments/assets/f85b2fe0-96af-4732-83ee-01602eb8969f" />
This matches performance lighthouse test on [ad-dag](https://github.com/fdnd-agency/adconnect/blob/dev/docs/audits/ad-dag.md#performace)
( ad-dag was done in chrome, this one in firefox )

<img width="661" height="395" alt="image" src="https://github.com/user-attachments/assets/ce7797dd-d43a-4e35-a6cd-f6d58907e99c" />

[Network dependency tree](https://developer.chrome.com/docs/performance/insights/network-dependency-tree?utm_source=lighthouse&utm_medium=lr)  
[Improve image delivery](https://developer.chrome.com/docs/performance/insights/image-delivery?utm_source=lighthouse&utm_medium=lr)  
[Render blocking requests](https://developer.chrome.com/docs/performance/insights/render-blocking?utm_source=lighthouse&utm_medium=lr)  

Improvements are also the same:
- Static images could be further optimized (picture element)
- preload to the font file


### PageSpeed insights
Mobile:  
<img width="1293" height="1102" alt="image" src="https://github.com/user-attachments/assets/398bfd1a-fd0a-48f3-918f-b83878e1a40a" />

Desktop:  
<img width="1277" height="1101" alt="image" src="https://github.com/user-attachments/assets/e4d103a6-34c8-42e6-bf7f-65a17555c1c7" />

The same insights here:  
<img width="534" height="342" alt="image" src="https://github.com/user-attachments/assets/c0984695-92dd-4942-89bd-9f3b8845ece4" />


### catchpoint - Waterfall test
<img width="1285" height="1167" alt="image" src="https://github.com/user-attachments/assets/fa8c2017-01dd-4523-bb18-3526b9c8cc00" />

<img width="1751" height="1064" alt="image" src="https://github.com/user-attachments/assets/4b3b6e90-dbe0-4025-9b71-bf4e5a28e9a3" />



### Performace improvements summary
Test results match those of the [AD-dag page](https://github.com/fdnd-agency/adconnect/blob/dev/docs/audits/ad-dag.md). If the improvements there are implemented, these issues will also be resolved

---

## Progressive enhanced

### Browser

### Device

### PE improvements summary


