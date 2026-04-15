# Talent Award page
[Link naar de pagina op de live dev-site](https://adconnect.dev.fdnd.nl/talent-award)

- [Responsive](#Responsive)
  - [Summary](#Responsive-improvements-summary)
- [Accessibility](#Accessibility)
  - [Summary](#Accessibility-improvements-summary)
- [Performace](#Performace)
  - [Summary](#Performace-improvements-summary)
- [Progressive enhanced](#Progressive-enhanced)
  - [Summary](#PE-improvements-summary)

***Tested in Zen 1.19.8b***

## Responsive
These containers keep growing after text have reach their max width:  
<img width="1198" height="1187" alt="image" src="https://github.com/user-attachments/assets/477f7fda-5e80-4a13-9e5d-88953999d6d7" />  
I would suggest we also place a max limit on the container to prevent too much whitespace:  
<img width="1844" height="1203" alt="image" src="https://github.com/user-attachments/assets/c3b496d5-6341-4263-95ed-e104dad55ead" />  
For example:  
<img width="2035" height="1268" alt="image" src="https://github.com/user-attachments/assets/6f68fe13-11d8-447a-abd4-1554ba76a954" />  

This 3 columns layout happens too early, making the text much harder too read:  
<img width="2178" height="1249" alt="image" src="https://github.com/user-attachments/assets/f434b8cb-0ad2-4750-ba25-32c53d7fff8a" />


### Responsive improvements summary
- max width on 3 articles, for the transition from mobile to tablet
- the same 3 articles change layout too early, when going to the desktop version

---

## Accessibility

This hover doesnt'change cursor to pointer:  
<img width="407" height="392" alt="image" src="https://github.com/user-attachments/assets/a9a27660-1ba5-4ebf-a8ad-7289e6bace36" />
> inside the auto carrousel

### Lighthouse
> lighthouse testing in chrome, zen doesn't support it
Accessibility scores 100 in both light and dark mode

### Keyboard
after this button, tab index goes to something not seen on screen before going to the breadcrumb menu:  
<img width="2866" height="459" alt="image" src="https://github.com/user-attachments/assets/ef6119c1-f8c0-4cc5-9723-06dc13a76e5a" />

### Screen reader
with the screenreader tab index after the 'kom naar de ad-dag' starts auto reading the breadcrumb and continues through the text underneath it.  
when pressing tab again it goed to 'home' the first item inside the breadcrumb list ( it jumps back, if you let the screenreader continue )  
<img width="2597" height="492" alt="image" src="https://github.com/user-attachments/assets/3f7ddf0f-c294-43f7-a297-e57f52681af3" />

this gets read as graphic logo ( when using arrow keys ):  
<img width="510" height="228" alt="image" src="https://github.com/user-attachments/assets/aecaef9e-76fa-4838-bd18-8184658b0196" />  
> it happens for every logo

the lines gets read as seperator:  
<img width="2718" height="118" alt="image" src="https://github.com/user-attachments/assets/ca41d77b-9036-4079-9cd9-99221c0b5e62" />

insode the carrousel the images get read out as 'graphic item.title' (graphic might come from NVDA or zen browser)
<img width="1042" height="206" alt="image" src="https://github.com/user-attachments/assets/db1b9f92-3250-4926-9bc3-cc1ebbf8e7b5" />  
We might get away with this. blind people wont see this issue

the carrousel breaklayout when going through it with a screenreader and arrow keys:  
<img width="2725" height="554" alt="image" src="https://github.com/user-attachments/assets/ce0c3da9-faf3-4159-bbe9-1112d7562dcf" />


### Accessibility improvements summary
- no pointer cursor on hover element (names inside the carrousel)
- tab index goes to the breadcrumb container, but no indicator it is there, then it continues on 'home' link
  - this might be the cause of a problem with the screen reader, then it automatically continues, and jumps back to 'home' link on the next tab
- screen reader
  - read logo's as 'logo' multiple times on the page
  - seperator gets read out aswel ( 4 times )
  - carrousel break page layout when using a screen reader

---

## Performace

### Lighthouse
> lighthouse testing in chrome, zen doesn't support it

### PageSpeed insights

### Waterfall test

### Performace improvements summary

---

## Progressive enhanced

### Browser

### Device

### PE improvements summary


