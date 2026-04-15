# Page name
[Link naar de pagina op de live dev-site](https://adconnect.dev.fdnd.nl/admin)

- [Responsive](#Responsive)
  - [Summary](#Responsive-improvements-summary)
- [Accessibility](#Accessibility)
  - [Summary](#Accessibility-improvements-summary)
- [Performace](#Performace)
  - [Summary](#Performace-improvements-summary)
- [Progressive enhanced](#Progressive-enhanced)
  - [Summary](#PE-improvements-summary)

***Tested in Chrome 147***

## Ui/UX

the amount of documents per theme could be combined with the bigger ones bellow.  
<img width="2310" height="849" alt="image" src="https://github.com/user-attachments/assets/4814915f-0974-42c1-b409-65761b8c89cb" />  

this breadcrumb menu is not interactive  
<img width="458" height="159" alt="image" src="https://github.com/user-attachments/assets/29b360f0-035f-42d6-ad43-9b1a53609b18" />  

the `nieuws` menu item doesnt match the page title `Nieuwsartikelen`  
<img width="1073" height="726" alt="image" src="https://github.com/user-attachments/assets/691790c4-227f-4d40-83d0-6757ea3ce193" />  

open menu has centered text  
and the current page has underline going from corner to corner  
<img width="1599" height="1563" alt="image" src="https://github.com/user-attachments/assets/88b127f2-888d-42ed-95cc-ea0ccc4017eb" />  

I believe there are 2 types of loading animations
- one is a spinning circle with the word loading -> when clicking menu items
- the second is a square that is spinning -> on page reload

[2026-04-15 14-29-29.webm](https://github.com/user-attachments/assets/a71b8bf6-97b9-4507-9a7a-c9304f0bf4cd)

on the form pages the `+` button is still there  
<img width="1439" height="922" alt="image" src="https://github.com/user-attachments/assets/9363d4b1-442f-4453-a6ed-11db9e9a028d" />

instead of only having the `meer` button clickable we can make the whole card clickable  
<img width="1137" height="506" alt="image" src="https://github.com/user-attachments/assets/d0bac697-1771-4c53-b81a-e7b12d758419" />  
maybe change this to a dropdown menu instead of a pop up  



## Responsive
We can collapse the menu a bit earlier, this will leave more for the cards:  
<img width="1608" height="1489" alt="image" src="https://github.com/user-attachments/assets/4e3d8288-62e6-499a-94a0-709a50266daa" />  

Header is a bit big, we place the menu on the same line as the title:  
<img width="1117" height="367" alt="image" src="https://github.com/user-attachments/assets/931a5ed8-ca68-4deb-b214-c24252b2be1a" />  

on 320px, we can change this to 1 column  
<img width="458" height="1235" alt="image" src="https://github.com/user-attachments/assets/e82614fd-0ec8-42e4-b111-5ba01b9ecfcb" />  

between 320px and 1325px the font size is smaller than 16px  

on 320px, this needs a different layout  
<img width="481" height="723" alt="image" src="https://github.com/user-attachments/assets/86f375fe-168c-4871-9dc1-6749e80e0ab2" />  



### Responsive improvements summary

---

## Accessibility

log out button isn't easy to find  
- it could be change into a dropdown menu instead of floating underneath the email address
- or add it to the bottom part of the menu on the left side, voor mobile it already is insode the open menu screen
<img width="601" height="243" alt="image" src="https://github.com/user-attachments/assets/7a7c6f89-eee1-4694-91c5-0acd731fc9d4" />

hover state of log out button  
<img width="504" height="195" alt="image" src="https://github.com/user-attachments/assets/884c7c3c-8c65-4fbc-81b6-04dcbe876df1" />

this button also has a bad hover state  
<img width="626" height="105" alt="image" src="https://github.com/user-attachments/assets/88e8acb2-ce95-4b81-8a51-cde5aef4ae25" />



these `+` buttons doesn't have enough feedforward to describe that the button will do  
<img width="1792" height="596" alt="image" src="https://github.com/user-attachments/assets/45a9b528-cfcf-49e7-a5b6-85abae410f58" />  

the selected filter color can be changed to the highlight color  
<img width="1032" height="132" alt="image" src="https://github.com/user-attachments/assets/2da87212-789b-4196-886c-bb649d6544ec" />  
<img width="1007" height="148" alt="image" src="https://github.com/user-attachments/assets/3b41d357-92f7-4162-8e13-b73af26cc38a" />  



### Lighthouse

### Keyboard
These hover states are hard to notice  
<img width="567" height="312" alt="image" src="https://github.com/user-attachments/assets/3396dafd-7fbd-4a70-b12d-fc8ec1fd812e" />  
<img width="597" height="221" alt="image" src="https://github.com/user-attachments/assets/a33a02f6-a7ee-41f4-a81d-fa6e82d073b6" />  


### Screen reader

### Accessibility improvements summary

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


