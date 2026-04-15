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

<details>
<summary>image</summary>

<img width="2310" height="849" alt="image" src="https://github.com/user-attachments/assets/4814915f-0974-42c1-b409-65761b8c89cb" />

</details>

this breadcrumb menu is not interactive

<details>
<summary>image</summary>

<img width="458" height="159" alt="image" src="https://github.com/user-attachments/assets/29b360f0-035f-42d6-ad43-9b1a53609b18" />

</details>

the `nieuws` menu item doesnt match the page title `Nieuwsartikelen`

<details>
<summary>image</summary>

<img width="1073" height="726" alt="image" src="https://github.com/user-attachments/assets/691790c4-227f-4d40-83d0-6757ea3ce193" />

</details>

and the url is `/news`

open menu has centered text  
and the current page has underline going from corner to corner

<details>
<summary>image</summary>

<img width="1599" height="1563" alt="image" src="https://github.com/user-attachments/assets/88b127f2-888d-42ed-95cc-ea0ccc4017eb" />

</details>

I believe there are 2 types of loading animations
- one is a spinning circle with the word loading -> when clicking menu items
- the second is a square that is spinning -> on page reload

[2026-04-15 14-29-29.webm](https://github.com/user-attachments/assets/a71b8bf6-97b9-4507-9a7a-c9304f0bf4cd)

on the form pages the `+` button is still there

<details>
<summary>image</summary>

<img width="1439" height="922" alt="image" src="https://github.com/user-attachments/assets/9363d4b1-442f-4453-a6ed-11db9e9a028d" />

</details>

instead of only having the `meer` button clickable we can make the whole card clickable

<details>
<summary>image</summary>

<img width="1137" height="506" alt="image" src="https://github.com/user-attachments/assets/d0bac697-1771-4c53-b81a-e7b12d758419" />

</details>

maybe change this to a dropdown menu instead of a pop up


### UI/UX summary
- there are quite a few elements that need to be improved especially for UX

## Responsive
We can collapse the menu a bit earlier, this will leave more for the cards:

<details>
<summary>image</summary>

<img width="1608" height="1489" alt="image" src="https://github.com/user-attachments/assets/4e3d8288-62e6-499a-94a0-709a50266daa" />

</details>

Header is a bit big, we place the menu on the same line as the title:

<details>
<summary>image</summary>

<img width="1117" height="367" alt="image" src="https://github.com/user-attachments/assets/931a5ed8-ca68-4deb-b214-c24252b2be1a" />

</details>

on 320px, we can change this to 1 column

<details>
<summary>image</summary>

<img width="458" height="1235" alt="image" src="https://github.com/user-attachments/assets/e82614fd-0ec8-42e4-b111-5ba01b9ecfcb" />

</details>

between 320px and 1325px the font size is smaller than 16px

on 320px, this needs a different layout

<details>
<summary>image</summary>

<img width="481" height="723" alt="image" src="https://github.com/user-attachments/assets/86f375fe-168c-4871-9dc1-6749e80e0ab2" />

</details>

on the login page maybe move the welcome back text outof the menu sidebar

<details>
<summary>image</summary>

<img width="2372" height="1291" alt="image" src="https://github.com/user-attachments/assets/52461065-235c-45b7-bd7e-5282dc7242a4" />

</details>

Add a label/text outside of tyhe input fields to tell which field is password and email.  
the placeholder text has low contrast making it hard to differentiate:

<details>
<summary>image</summary>

<img width="807" height="662" alt="image" src="https://github.com/user-attachments/assets/210f2efc-f1de-4edb-bcb2-955edef4d562" />

</details>


### Responsive improvements summary
- the page is responsive but for smaller devices it must be improved

---

## Accessibility

log out button isn't easy to find  
- it could be change into a dropdown menu instead of floating underneath the email address
- or add it to the bottom part of the menu on the left side, voor mobile it already is insode the open menu screen

<details>
<summary>image</summary>

<img width="601" height="243" alt="image" src="https://github.com/user-attachments/assets/7a7c6f89-eee1-4694-91c5-0acd731fc9d4" />

</details>

the breadcrumb menu has low contrast

<details>
<summary>image</summary>

<img width="458" height="159" alt="image" src="https://github.com/user-attachments/assets/29b360f0-035f-42d6-ad43-9b1a53609b18" />

</details>

hover state of log out button

<details>
<summary>image</summary>

<img width="504" height="195" alt="image" src="https://github.com/user-attachments/assets/884c7c3c-8c65-4fbc-81b6-04dcbe876df1" />

</details>

this button also has a bad hover state

<details>
<summary>image</summary>

<img width="626" height="105" alt="image" src="https://github.com/user-attachments/assets/88e8acb2-ce95-4b81-8a51-cde5aef4ae25" />

</details>

these `+` buttons doesn't have enough feedforward to describe that the button will do

<details>
<summary>image</summary>

<img width="1792" height="596" alt="image" src="https://github.com/user-attachments/assets/45a9b528-cfcf-49e7-a5b6-85abae410f58" />

</details>

the selected filter color can be changed to the highlight color

<details>
<summary>image</summary>

<img width="1032" height="132" alt="image" src="https://github.com/user-attachments/assets/2da87212-789b-4196-886c-bb649d6544ec" />

</details>

<details>
<summary>image</summary>

<img width="1007" height="148" alt="image" src="https://github.com/user-attachments/assets/3b41d357-92f7-4162-8e13-b73af26cc38a" />

</details>


### Lighthouse
light house test has 96%, only issue being low contrast on breadcrumb menu  
tested on every page inside the admin route  
only dashboard did not have this issue, dashboard got 100%

### Keyboard
These hover states are hard to notice

<details>
<summary>image</summary>

<img width="567" height="312" alt="image" src="https://github.com/user-attachments/assets/3396dafd-7fbd-4a70-b12d-fc8ec1fd812e" />

</details>

<details>
<summary>image</summary>

<img width="597" height="221" alt="image" src="https://github.com/user-attachments/assets/a33a02f6-a7ee-41f4-a81d-fa6e82d073b6" />

</details>


### Screen reader
this is called log in link

<details>
<summary>image</summary>

<img width="541" height="235" alt="image" src="https://github.com/user-attachments/assets/ab24b861-5432-47e3-becf-fd6f3783a822" />

</details>

this get read out as plus not saying which form will be opend

<details>
<summary>image</summary>

<img width="281" height="215" alt="image" src="https://github.com/user-attachments/assets/3778ab2d-8223-4553-8b31-d281bfde8bc4" />

</details>

in this section the user hears plus link multiple times

only the `meer` button gets read out, not saying anything about what the user will get to interact with

<details>
<summary>image</summary>

<img width="1181" height="335" alt="image" src="https://github.com/user-attachments/assets/ccc8a897-7d1a-40c6-8b34-cd623ffb7651" />

</details>

these titles have a long read out text ( land mark issue again )

<details>
<summary>image</summary>

<img width="470" height="137" alt="image" src="https://github.com/user-attachments/assets/270c2e15-2c54-4d39-aa2c-3e4a989b9e50" />

</details>

screenreader says `gepubliceerd` first and then the title

<details>
<summary>image</summary>

<img width="645" height="130" alt="image" src="https://github.com/user-attachments/assets/5453794a-5cba-4930-816e-b410c7ef6de2" />

</details>

this one aswel:

<details>
<summary>image</summary>

<img width="629" height="130" alt="image" src="https://github.com/user-attachments/assets/13f6ec0e-2390-4d4e-a9e6-af52e0faf891" />

</details>

or we could also read out gepubliceerd to the end of the title in 1 go instead of waiting for the next arrow down click

reading this button out everythime gets annoying, we shoulc consider removing it from pages that don't need it, when you are already on that page

<details>
<summary>image</summary>

<img width="420" height="155" alt="image" src="https://github.com/user-attachments/assets/c41fe631-83ee-4ff7-a054-e6ac23ac0917" />

</details>


### Accessibility improvements summary
- screenrader and keyboard works pretty good, but has some point to improve UX


---

## Performace

### Lighthouse
Theme page: performance is pretty good  
these being the only new issues,

<details>
<summary>image</summary>

<img width="1234" height="1024" alt="image" src="https://github.com/user-attachments/assets/ffd1f83a-a526-4468-acfb-1c906ce3fb01" />

</details>

<details>
<summary>image</summary>

<img width="620" height="273" alt="image" src="https://github.com/user-attachments/assets/e02b92c9-5993-49af-9e21-fcf4b2b4fc10" />

</details>

dashboard page: save as the above one

<details>
<summary>image</summary>

<img width="1220" height="1025" alt="image" src="https://github.com/user-attachments/assets/06633ab0-1448-4267-a7a3-e907e0837133" />

</details>

<details>
<summary>image</summary>

<img width="1199" height="602" alt="image" src="https://github.com/user-attachments/assets/ef945ea3-be8a-4f4f-b239-c306300e2571" />

</details>

issues we've seen before

<details>
<summary>image</summary>

<img width="461" height="353" alt="image" src="https://github.com/user-attachments/assets/9132f04c-8caa-4ef2-bc23-025bd7204b52" />

</details>


### PageSpeed insights
you need to log in for the admin page, this tested the login page because of that  

Login page:

<details>
<summary>image</summary>

<img width="1445" height="1271" alt="image" src="https://github.com/user-attachments/assets/70487567-359c-4d33-8dab-fb618e8cb7cb" />

</details>


### Waterfall test
[login page catchpoint test](https://portal.catchpoint.com/ui/Symphony/InstantTest/Webpage/954380/Details?t=wf)

<details>
<summary>image</summary>

<img width="1412" height="220" alt="image" src="https://github.com/user-attachments/assets/6efe888f-b07a-4060-a803-05a221feb949" />

</details>

<details>
<summary>image</summary>

<img width="1072" height="288" alt="image" src="https://github.com/user-attachments/assets/731a765e-086c-4842-81bc-37ae6cdcbcbb" />

</details>

### Performace improvements summary
- could not use pagespeed and catchpoint test for the admin pages

---

## Progressive enhanced

### Browser
Edge 88, Firefox 85, Chrome 88, Opera 74 and Safari 15.6
background color issue -> ad-dag page

other pages only have this problem

<details>
<summary>image</summary>

<img width="767" height="119" alt="image" src="https://github.com/user-attachments/assets/8de7de7f-8180-45bc-8029-9682fcb7889a" />

</details>

no border making the low contrast placeholder hard to see

all browsers have a layout shift on the login page

---

safari 15.6, Edge 88, opera 74 & chrome 88
dashboars layout is broken

<details>
<summary>image</summary>

<img width="1916" height="1237" alt="image" src="https://github.com/user-attachments/assets/c1c76110-5ac8-4330-b63e-76eb92247b34" />

</details>

<details>
<summary>image</summary>

<img width="1608" height="1250" alt="image" src="https://github.com/user-attachments/assets/c33865fa-c67b-4362-8f69-9f4b86dfa7a7" />

</details>

because of the subgrid

<details>
<summary>image</summary>

<img width="442" height="186" alt="image" src="https://github.com/user-attachments/assets/e5f0a3a8-8a29-425b-a138-961f357bdf5d" />

</details>

---

Edge 88, Opera 74 & chrome 88  
was stuck in loading screen, but i could still tab through the page

<details>
<summary>image</summary>

<img width="1822" height="1095" alt="image" src="https://github.com/user-attachments/assets/f107dd48-d8ac-4967-9866-4aae3c563183" />

</details>

using the url I can go to other pages, but not by pressing the links inside the menu

<details>
<summary>image</summary>

<img width="1102" height="972" alt="image" src="https://github.com/user-attachments/assets/103875d5-c60a-4879-a46b-7779001f75c3" />

</details>

> only safari does not have this problem
---

Firefox 85  
supports subgrids, but no background color is also not wordking

<details>
<summary>image</summary>

<img width="2063" height="1176" alt="image" src="https://github.com/user-attachments/assets/9ea00fe1-797e-4dea-ba50-61f3d257b80c" />

</details>


### Device

### PE improvements summary
