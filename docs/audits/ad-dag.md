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

De header neemt een groot stuk van het scherm in beslag:  
<img width="712" height="349" alt="image" src="https://github.com/user-attachments/assets/f0dd53f0-f8fc-482f-adff-703306d44b17" />  
Misschien de header laten inklappen of uit beeld laten verdwijnen wanneer er naar beneden wordt gescrold, en weer terug laten komen wanneer er omhoog wordt gescrold

Programma section is onduidelijk op 320px breed.  
het is moeilijk te de tekst te lezen.   
<img width="394" height="550" alt="image" src="https://github.com/user-attachments/assets/18e9781c-885e-4b57-b401-8944e10acabc" />  
het is nu een `p` met `br` on de tekst op te splitsen,  
het zou beter zijn om stukjes tekst in `span`'s te plaatsen, dan heb je meer controle over hoe de tekst om kleinere schermen te zien is

Email adress die buiten beeld gaat,  
en scroll to top button die boven tekst staat:  
<img width="320" height="558" alt="image" src="https://github.com/user-attachments/assets/c36f476f-98ee-4256-b447-41422c337b2d" />  
- de pagina onderaan verder door laten gaan zodat er plaats is voor de scroll to top buttom

breakpoint 768px  
'wat is de landelijke ad-dag' section heeft weinig ruimte voor de tekst, de gap tussen tekst en image ernaast is 4em, de section erboven heeft 2em.  
deze kan ook tot 3em gemaakt worden (dan ziet het er al een stuk beter eruit)
<img width="1213" height="1271" alt="image" src="https://github.com/user-attachments/assets/ad6d5e17-d8ee-49ba-ba0d-4cbf490580ce" />

op 768px breed gaat de img boven `planning` buiten beeld, veroorzaakr horizontale scrollbar  
(vanaf 1030px goed in beeld)
<img width="1243" height="1087" alt="image" src="https://github.com/user-attachments/assets/097e12bf-cfbc-4f7d-bf01-61f33f5356f8" />



### Responsive improvements summary
- Header neemt teveel ruimte om kleine devices (320px)
- onder h2 programma is er een `p` met wrapping text die moeilijk leesbaar is op 320px ( beter leesbaar vanaf 407px breed)
- email adres die buiten beeld gaat op 320px
- 'wat is de landelijke ad-dag' section heeft bij breakpoint 768px weinig ruimte voor de tekst/paragraaf
- op 768px is de image boven de `planning` section buiten beeld

---

## Accessibility

### Lighthouse
h2 voor `programma` & `workshops` hebben te weinig contrast:  
<img width="599" height="870" alt="Screenshot 2026-04-14 094805" src="https://github.com/user-attachments/assets/b6afc59f-6f77-40a0-8795-66543ce8afc7" />  
<img width="1974" height="754" alt="Screenshot 2026-04-14 095227" src="https://github.com/user-attachments/assets/72d24453-4dbb-499d-970d-3579d46c7a08" />  
Als ik kijk naar de andere headings zie ik dat ze wit zijn, volgens mij moesten deze ook wit zijn op de dark mode.  
Ik denk dat deze 2 vergeten waren toen de darkmode werk gemaakt.


### Keyboard
tab index gaat van de `bekijk workshops` kaart, naar de scroll to top button en daarna naar de footer:  
[2026-04-14 09-59-56.webm](https://github.com/user-attachments/assets/accfc8a3-de28-4f67-a692-d6330e27b02e)  
het zou beter zijn als de scroll to top als laatste element is die tab focus krijgt

### Screen reader
lang staat op en, maar de tekst is in nederlands  
<img width="698" height="162" alt="image" src="https://github.com/user-attachments/assets/38fb6e68-e2b9-4dd1-aaed-591a7c71300e" />



### HTML
de main komt 2 keer voor in de DOM  
<img width="696" height="407" alt="Screenshot 2026-04-14 095622" src="https://github.com/user-attachments/assets/6c34ad68-176c-4ca7-af83-02a2c6d23e8a" />


### Accessibility improvements summary
- weinig conrast op h2 voor `programma` & `workshops`
- tab index heeft verkeerde vologorde na de `bekijk workshops` link
- HTML heeft 2 keer een main element

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


