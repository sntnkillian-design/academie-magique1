export type Subject={
  id:string;
  name:string;
  teacher:string;
  description:string;
  years:number[];
  sequences:Record<number,string[]>;
  featured?:number;
  skills:string[];
  ambience:string;
  symbol:string;
  location:string;
  teacherTone:string;
};

const seq=(items:string[])=>items;

export const subjects:Subject[]=[
  {
    id:'sortileges',name:'Sortilèges',teacher:'Filius Flitwick',symbol:'✦',location:'Salle de Sortilèges',
    description:'Maîtriser le geste, la voix et l’intention magique.',years:[1,2,3],featured:1,
    skills:['Concentration','Précision gestuelle','Incantation','Choix du sort'],
    ambience:'Une salle claire où plumes, coussins et petits objets servent sans cesse de cibles d’entraînement.',
    teacherTone:'Encourageant, précis et exigeant sur la qualité du geste.',
    sequences:{
      1:seq(['La baguette et son rôle','Posture et concentration','Gestes fondamentaux','Incantation et prononciation','Premiers sortilèges simples','Wingardium Leviosa I','Wingardium Leviosa II','Lumière et magie quotidienne','Sortilèges en situation','Examen de première année']),
      2:seq(['Révisions et maîtrise','Sortilèges de mouvement','Enchantements ménagers','Contre-sorts simples','Précision et durée','Duel encadré','Objets enchantés','Combinaisons élémentaires','Mise en situation','Examen de deuxième année']),
      3:seq(['Bilan technique','Portée et puissance','Plusieurs cibles','Attraction et déplacement','Contre-sort et interruption','Enchaîner deux sorts','Objets enchantés','Choix sous contrainte','Atelier de maîtrise','Examen de troisième année'])
    }
  },
  {
    id:'potions',name:'Potions',teacher:'Severus Rogue',symbol:'⚗',location:'Cachots — laboratoire de Potions',
    description:'Transformer avec méthode, mesure et sang-froid.',years:[1,2,3],featured:1,
    skills:['Dosage','Sécurité','Diagnostic','Ordre opératoire'],
    ambience:'Pierre froide, cuivre des chaudrons, bocaux alignés et vapeurs aux couleurs parfois inquiétantes.',
    teacherTone:'Sec, analytique, peu indulgent avec l’imprécision.',
    sequences:{
      1:seq(['Introduction aux Potions','Matériel et chaudron','Sécurité au laboratoire','Préparation des ingrédients','Dosage et mesure','Température et réaction','Potion contre les furoncles','Diagnostic d’erreur','Potion d’Oubli','Examen de première année']),
      2:seq(['Révisions de laboratoire','Ingrédients actifs','Infusions et macérations','Antidotes simples','Textures et viscosité','Conservation','Potion fortifiante','Diagnostic comparé','Laboratoire autonome','Examen de deuxième année']),
      3:seq(['Réactivité des ingrédients','Catalyseurs','Antidotes II','Précision des quantités','Substitutions raisonnées','Contrôle thermique','Projet de formulation','Diagnostic avancé','Laboratoire sous contrainte','Examen de troisième année'])
    }
  },
  {
    id:'dfcm',name:'Défense contre les forces du Mal',teacher:'Remus Lupin',symbol:'◈',location:'Salle de Défense contre les forces du Mal',
    description:'Observer une menace et choisir une défense proportionnée.',years:[1,2,3],featured:3,
    skills:['Sang-froid','Analyse de menace','Défense pratique','Choix tactique'],
    ambience:'Une classe chargée d’objets insolites, de cages, d’armoires et d’exercices pratiques.',
    teacherTone:'Calme, bienveillant et très attaché à la compréhension avant l’action.',
    sequences:{
      1:seq(['Principes de défense','Vigilance','Créatures mineures','Protections simples','Réaction sous pression','Observation','Contre-sort','Scénarios guidés','Révision','Examen de première année']),
      2:seq(['Identifier une menace','Posture défensive','Créatures hostiles','Boucliers et esquive','Réflexes','Analyse comparative','Duel encadré','Scénarios','Parcours','Examen de deuxième année']),
      3:seq(['Introduction à la défense pratique','Épouvantards','Riddikulus','Chaporouges','Kappas','Strangulots','Hinkypunks','Analyse de menace','Parcours pratique','Examen de troisième année'])
    }
  },
  {
    id:'metamorphose',name:'Métamorphose',teacher:'Minerva McGonagall',symbol:'◇',location:'Salle de Métamorphose',
    description:'Comprendre la logique d’une transformation et contrôler chaque étape.',years:[1,2,3],
    skills:['Visualisation','Stabilité','Réversibilité','Rigueur'],
    ambience:'Une salle ordonnée où chaque objet posé sur une table peut devenir le point de départ d’une transformation.',
    teacherTone:'Rigoureuse, directe et attentive à la sécurité.',
    sequences:{
      1:seq(['Principes de transformation','Visualisation','Allumette vers aiguille','Forme et matière','Stabilité','Réversibilité','Petits objets','Erreurs fréquentes','Atelier pratique','Examen']),
      2:seq(['Révision des formes','Masse et proportion','Objets composites','Transformations partielles','Retour à l’état initial','Précision','Petits organismes','Sécurité du vivant','Atelier','Examen']),
      3:seq(['Transformation du vivant','Complexité biologique','Hybrides simples','Réversibilité avancée','Durée','Contrôle des détails','Diagnostic','Transformation sous contrainte','Atelier final','Examen'])
    }
  },
  {
    id:'botanique',name:'Botanique',teacher:'Pomona Chourave',symbol:'❧',location:'Serres de l’Académie',
    description:'Observer, cultiver et manipuler les plantes magiques en sécurité.',years:[1,2,3],
    skills:['Observation','Entretien','Manipulation','Récolte'],
    ambience:'Chaleur humide, terre sombre, verrières ruisselantes et bruissements parfois difficiles à identifier.',
    teacherTone:'Pratique, chaleureuse et très attentive aux gestes.',
    sequences:{
      1:seq(['Sécurité en serre','Outils et rempotage','Plantes sensibles','Signes de croissance','Arrosage magique','Récolte simple','Plantes urticantes','Diagnostic végétal','Entretien autonome','Examen']),
      2:seq(['Cycle des Mandragores','Protection auditive','Rempotage','Croissance et maturité','Champignons magiques','Plantes grimpantes','Récolte d’ingrédients','Maladies végétales','Serre autonome','Examen']),
      3:seq(['Plantes agressives','Cycles complexes','Défenses végétales','Taille et contention','Sol et nutriments','Récolte pour Potions','Plantes nocturnes','Diagnostic avancé','Expédition en serre','Examen'])
    }
  },
  {
    id:'astronomie',name:'Astronomie',teacher:'Aurora Sinistra',symbol:'✧',location:'Tour d’Astronomie',
    description:'Observer le ciel, consigner les cycles et interpréter les mouvements célestes.',years:[1,2,3],
    skills:['Observation','Cartographie','Mesure','Comparaison'],
    ambience:'La tour ouverte sur le ciel nocturne, le froid, le silence et la lumière très faible des instruments.',
    teacherTone:'Posée, méthodique et exigeante sur la qualité des relevés.',
    sequences:{
      1:seq(['Se repérer dans le ciel','Utiliser un télescope','Constellations','Phases lunaires','Planètes visibles','Carnet d’observation','Mesurer un déplacement','Carte céleste','Nuit d’observation','Examen']),
      2:seq(['Révisions du ciel','Cycles planétaires','Positions relatives','Lune et marées','Comètes','Cartographie II','Mesures comparées','Observation longue','Rapport nocturne','Examen']),
      3:seq(['Comparer plusieurs nuits','Variations saisonnières','Orbites','Transits','Étoiles remarquables','Erreurs de mesure','Séries d’observations','Interprétation','Projet de carte céleste','Examen'])
    }
  },
  {
    id:'histoire',name:'Histoire de la magie',teacher:'Cuthbert Binns',symbol:'⌘',location:'Salle d’Histoire de la magie',
    description:'Comprendre les institutions, conflits et sociétés du monde magique.',years:[1,2,3],
    skills:['Chronologie','Lecture de source','Contextualisation','Esprit critique'],
    ambience:'Une salle silencieuse, des piles de chroniques anciennes et une voix professorale qui semble traverser les siècles.',
    teacherTone:'Monocorde mais extraordinairement précis sur les dates et les archives.',
    sequences:{
      1:seq(['Pourquoi étudier l’histoire magique ?','Chronologie fondamentale','Premières communautés','Institutions','Secrets et statuts','Conflits anciens','Figures majeures','Lire une chronique','Révision','Examen']),
      2:seq(['Sources et témoignages','Révoltes gobelines','Pouvoirs locaux','Commerce magique','Créatures et législation','Crises politiques','Propagande','Comparer deux récits','Dossier historique','Examen']),
      3:seq(['Document ou tradition ?','Rumeur et mémoire','Institutions comparées','Guerres et conséquences','Minorités magiques','Évolution du droit','Étude d’archive','Controverse historique','Dissertation guidée','Examen'])
    }
  },
  {
    id:'vol',name:'Vol sur balai',teacher:'Rolanda Bibine',symbol:'↗',location:'Terrain d’entraînement',
    description:'Acquérir équilibre, contrôle et sécurité en vol.',years:[1],
    skills:['Équilibre','Réflexes','Trajectoire','Sécurité'],
    ambience:'Herbe battue par le vent, balais alignés et grandes distances ouvertes autour du terrain.',
    teacherTone:'Énergique, claire et immédiatement attentive aux risques.',
    sequences:{
      1:seq(['Connaître son balai','Décollage','Équilibre','Virages','Altitude','Freinage','Trajectoires','Réaction au vent','Parcours complet','Évaluation finale'])
    }
  }
];

export const options=[
  ['Arithmancie','Septima Vector','Logique, nombres et analyse — jamais une simple divination numérique.'],
  ['Divination','Sybill Trelawney','Interpréter avec prudence : les données peuvent être insuffisantes.'],
  ['Soins aux créatures magiques','Rubeus Hagrid','Observer les comportements, notamment ceux des Hippogriffes.'],
  ['Étude des runes anciennes','Bathsheba Babbling','Déchiffrer méthodiquement les systèmes d’écriture.'],
  ['Étude des Moldus','Charity Burbage','Comprendre technologies, institutions, objets et cultures sans caricature.']
] as const;

export const houses={
  Gryffondor:{values:'Courage · Audace · Initiative',color:'#8e3035',motto:'Agir quand il faut choisir.'},
  Serdaigle:{values:'Intelligence · Curiosité · Créativité',color:'#315d89',motto:'Comprendre avant de conclure.'},
  Poufsouffle:{values:'Loyauté · Travail · Patience',color:'#b8892b',motto:'Construire avec constance.'},
  Serpentard:{values:'Ambition · Stratégie · Détermination',color:'#28634e',motto:'Voir plus loin que l’obstacle.'}
} as const;
