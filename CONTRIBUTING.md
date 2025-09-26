# Afspraken over samenwerking
## Afspraken binnen het team
- Elke ma, wo, vr houden we een standup
- Communiceren via Teams
- Voortgang bijhouden in projectboard (eigen issues sluiten)
- Houd je aan de afgesproken werkwijze (zie onder de teamcanvas).
- Laat weten als je ergens tegenaan loopt

## Afspraken met opdrachtgever
- Productowner: Erwin de Beer
- Communicatie hoofdzakelijk per mail en zo nodig via teams
- Feedback mag tussen de sprintreview door gecommuniceerd worden

### Komende sprint reviews
- 9 oktober: Sprintreview (15:30 - 16:00)
-	30 oktober: Sprintreview   
-	27 november: Sprintreview   
-	18 december: Sprintreview  

## Teamcanvas
<img width="982" height="690" alt="Image" src="https://github.com/user-attachments/assets/b6a47b12-243f-43c9-a4ae-047b1689f128" />

## Werkwijze
- Je werkt aan de hand van de issues in feature branches
- Merge eerst de development branch naar jouw werk, voordat je commit
- Merge naar de development branch NIET naar de main
- Maak een PR voor je werk
  - Assign alle teamleden
  - Verwerk feedback én tag teamlid
  - Als minimaal 1 teamlid goedkeuring heeft gegeven dan kan je werk naar de `development branch` gemerged worden (zorg dat je de meest recente versie van de `development branch` op jouw branch hebt staan)

### PR Template
### Wat is er veranderd? 
- Link naar issues (gebruik een `#`)
- Uitleg wat je gedaan hebt 
- Waar wil je feedback op

### Visuals 
- Afbeeldingen/schermopname

## Onze Git Flow 
We houden de Git Flow van [FDND agency](https://docs.fdnd.nl/conventies.html#branching-strategy) aan.

<img width="536" height="643" alt="image" src="https://github.com/user-attachments/assets/522ae521-4c91-4c00-93aa-bf11d44c5ff6" />

## FDND conventies
We houden de code conventies van FDND agencie aan. Hieronder de belangrijkste conventies genoemd.
[zie FDND website](https://docs.fdnd.nl/conventies.html)

### Code conventies
- Hanteer consistente naamgeving
- Volg best practices voor HTML-structuur en semantiek.
- Gebruik CSS-nesting, pseudo-private custom properties en zorg voor een dynamisch kleurenpalet.
- Gebruik template literals, object destructuring en kies bewust tussen const, let en var.
- Volg richtlijnen voor data, routes, componentstructuur en CSS binnen SvelteKit-projecten.

### Design conventies
- Zorg voor gebruiksvriendelijke en toegankelijke ontwerpen.
- Werk samen in design systemen en valideer ontwerpen zowel in Figma als in de browser.
- Gebruik variabelen, stijlen en organiseer je Figma-bestanden effectief.
