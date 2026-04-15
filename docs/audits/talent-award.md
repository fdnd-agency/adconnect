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

Summary elements must have discernible: this one only has spans, to create a hamburger menu button:  
<img width="1432" height="662" alt="image" src="https://github.com/user-attachments/assets/8237771d-b834-49f3-a628-0016ac6e400b" />  
<img width="575" height="166" alt="image" src="https://github.com/user-attachments/assets/43175d89-9593-4e7b-8b36-ead35376d656" />


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
> Brave + mobile + network throttling 3G  
<img width="1190" height="960" alt="image" src="https://github.com/user-attachments/assets/538963e5-6276-463a-9420-179e78aa621f" />

the insights are the same we have seen on the other pages:  
<img width="1136" height="509" alt="image" src="https://github.com/user-attachments/assets/addbf3b2-43ce-42b3-afea-80da0d0877fa" />

### PageSpeed insights
mobile:  
<img width="1640" height="1349" alt="image" src="https://github.com/user-attachments/assets/c5b48bfd-8388-4c10-9e8d-9d5df6d39d64" />

Desktop:  
<img width="1629" height="1274" alt="image" src="https://github.com/user-attachments/assets/be91c82d-79b0-4432-8236-e8dc130ce393" />

Insights:  
<img width="698" height="519" alt="image" src="https://github.com/user-attachments/assets/b6c8a14b-b184-44d6-b1e0-3f7f3ac85c1e" />

desktop performance is verry good, iets only mobile that needs improving:  


### [Waterfall test](https://portal.catchpoint.com/ui/Symphony/InstantTest/Webpage/952270/Details?t=sm)
> tested on Iphone 12 4G  
<img width="2302" height="1309" alt="image" src="https://github.com/user-attachments/assets/d703338f-bf53-4896-93ae-45395e20afa1" />

slow first byte on moble 3G / 4G  
<img width="1407" height="846" alt="image" src="https://github.com/user-attachments/assets/3f21170d-ae06-4653-996e-2e69be88002d" />

This CSS file is important, we'll leave this be:  
<img width="1430" height="1270" alt="image" src="https://github.com/user-attachments/assets/ed997a3d-3f62-43db-8cf2-151b171b2c12" />

images within the viewport that are being lazily loaded  
<img width="1452" height="738" alt="image" src="https://github.com/user-attachments/assets/323372f6-a9eb-4602-8573-9bc41cf26c02" />

posible layout shift at: `/_app/immutable/assets/ad-talent-awards.Ddt_57AT.jpg`  
<img width="1426" height="813" alt="image" src="https://github.com/user-attachments/assets/5028cd07-b6c4-4279-8ae1-58ae51e410f4" />

Final HTML (DOM) size is significantly larger than initially delivered HTML -> ( again )
<img width="1412" height="530" alt="image" src="https://github.com/user-attachments/assets/6a4a7433-210e-4022-848a-d09998d52fd3" />


### Performace improvements summary
- slow first byte on moble 3G / 4G
- images within the viewport that are being lazily loaded
- Final HTML (DOM) size is significantly larger than initially delivered HTML -> ( again )
- posible layout shift on an image

---

## Progressive enhanced

### Browser

### Device

### PE improvements summary


