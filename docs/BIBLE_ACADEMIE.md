# Académie magique — Bible de conception

## Vision
L’application simule une scolarité dans une académie de magie ancienne inspirée de Poudlard. Elle combine cours structurés, progression, exercices, examens, maisons, points, professeurs, compétences et historique scolaire. Ce n’est pas un RPG 3D : **APPRENDRE → PRATIQUER → ÊTRE ÉVALUÉ → PROGRESSER**.

## Canon et invention
1. **CANON** : information explicitement établie dans l’univers Harry Potter.
2. **CANON + RECONSTRUCTION** : information canonique servant de base à un programme pédagogique.
3. **EXTENSION DE CONCEPTION** : contenu inventé pour rendre la scolarité cohérente et jouable.

Une invention ne doit jamais être présentée comme canonique.

## Cursus
Le cursus comporte 8 années. La V1 ouvre les années 1, 2 et 3 ; les années 4 à 8 restent visibles mais verrouillées.

### Matières fondamentales
Sortilèges, Potions, Défense contre les forces du Mal, Métamorphose, Botanique, Astronomie et Histoire de la magie. Le Vol sur balai est réservé à la première année.

À partir de la troisième année, l’élève choisit au moins deux options : Arithmancie, Divination, Soins aux créatures magiques, Étude des runes anciennes et Étude des Moldus. Alchimie et Transplanage sont des enseignements avancés futurs.

## Professeurs de référence
| Matière | Professeur |
|---|---|
| Sortilèges | Filius Flitwick |
| Potions | Severus Rogue |
| Métamorphose | Minerva McGonagall |
| Botanique | Pomona Chourave |
| Astronomie | Aurora Sinistra |
| Histoire de la magie | Cuthbert Binns |
| Vol | Rolanda Bibine |
| Arithmancie | Septima Vector |
| Divination | Sybill Trelawney |
| Soins aux créatures magiques | Rubeus Hagrid |
| Runes anciennes | Bathsheba Babbling |
| Étude des Moldus | Charity Burbage |

### Défense contre les forces du Mal — convention du projet
Années 1–2 : Gilderoy Lockhart ; 3–4 : Remus Lupin ; 5–6 : Dolores Ombrage ; 7–8 : Alastor Maugrey « Fol Œil ». Cette répartition est propre à la simulation, non la chronologie canonique exacte.

## Architecture pédagogique
Chaque matière possède une page-mère, puis une page indépendante par année (jamais toutes les années sur une page). Une année comprend environ 10 séquences et précise contexte, niveau, professeur, compétences, objectifs, programme, progression, exercices et évaluation finale.

Une leçon produit une interaction, une compétence, une note, une conséquence et une progression. La connaissance réelle de l’univers aide le joueur. Les QCM, importants, s’associent à du vrai/faux, réponse courte, ordre, association, procédure, choix de sort, diagnostic, mini-cas, interprétation et stratégie.

Chaque cours suit : introduction professeur, théorie, concept essentiel, exemple, exercice, correction, évaluation, résultat, points et déblocage.

## Validation et points
Validation à **60 %**. Mentions : 90–100 Optimal ; 75–89 Effort exceptionnel ; 60–74 Acceptable ; 40–59 Piètre ; 20–39 Désolant ; 0–19 Troll.

Points de maison : 100 % = +10 ; 80–99 = +7 ; 60–79 = +5 ; échec = 0.

## Identité visuelle
Académie ancienne, château, nuit, pierre, bois, bibliothèque, parchemin, dorures, chandelles, bleu nuit, vert profond, rouge sombre, lumière chaude, vitraux, ciel étoilé et magie discrète. Le rendu est élégant, adulte et immersif. Éviter design enfantin, SaaS générique, gros blocs blancs, couleurs flashy, emojis excessifs et interface trop moderne.

## Mobile first
L’utilisateur principal teste sur smartphone Android : conception d’abord mobile, navigation basse, retours et contexte explicites.
