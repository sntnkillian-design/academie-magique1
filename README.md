# Académie magique

Une simulation pédagogique mobile-first de scolarité magique : apprendre, pratiquer, être évalué et progresser. La V1 propose l'admission, le Choixpeau, un tableau de bord persistant, les matières, des parcours annuels et trois leçons interactives complètes.

## Installation et développement

```bash
npm install
npm run dev
```

## Build et Netlify

`npm run build` génère `dist/`. `netlify.toml` configure automatiquement la commande et la redirection SPA.

## Architecture

- `src/data.ts` : cursus, séquences, options et contenus pédagogiques.
- `src/App.tsx` : onboarding, navigation, progression et moteur de cours.
- `src/exercises.tsx` : cinq formats d'exercices réutilisables.
- `src/styles.css` : identité visuelle responsive sans image sous droits.
- `docs/BIBLE_ACADEMIE.md` : référence de conception interne (Notion reste la bible éditoriale).

Les données personnelles et scolaires sont conservées dans `localStorage` pour cette V1.

## Progression future

Enrichir les séquences encore présentées sous forme de programme, développer les cinq options, ajouter les années 4 à 8, renforcer l'accessibilité et migrer vers un backend lorsque plusieurs appareils devront être synchronisés.
