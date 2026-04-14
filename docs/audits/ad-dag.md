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

### Keyboard

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


