import {useState} from 'react';
import AppV13 from './AppV13';
import './v14.css';

const rooms=[
 ['Tour d’Astronomie','Accessible prochainement'],['Salle de Défense','Cours disponible'],['Salle des Potions','Accessible prochainement'],['Bibliothèque','Accessible prochainement'],['Grande Salle','Vie de l’Académie'],['Serres de Botanique','Accessible prochainement']
];

export default function AppV14(){
 const[enter,setEnter]=useState(false);
 if(enter)return <AppV13/>;
 return <main className="v14-home">
  <section className="v14-hero">
   <div className="v14-sky"/><div className="v14-moon"/>
   <div className="v14-copy"><span className="v14-kicker">ACADÉMIE MAGIQUE · PREMIÈRE ANNÉE</span><h1>Bonsoir,<br/><em>Killian.</em></h1><p>Les lumières du château sont allumées. Votre prochain cours vous attend.</p><button onClick={()=>setEnter(true)}>Entrer dans l’Académie</button></div>
   <div className="v14-castle" aria-label="Silhouette nocturne de l’Académie"><i/><i/><i/><i/><i/><i/><i/></div>
  </section>
  <section className="v14-cards">
   <article><small>PROCHAIN COURS</small><h2>Défense contre les forces du Mal</h2><p>Remus Lupin · Cours 1</p><button onClick={()=>setEnter(true)}>Reprendre le cours →</button></article>
   <article><small>VOTRE DOSSIER</small><h2>Serdaigle · 1re année</h2><p>Profil, progression, résultats et appréciations.</p><button onClick={()=>setEnter(true)}>Voir mon profil →</button></article>
  </section>
  <section className="v14-map"><header><small>EXPLORER L’ACADÉMIE</small><h2>Le château s’ouvre avec votre progression</h2></header><div className="v14-mapscene">{rooms.map(([name,status],i)=><button key={name} className={'room r'+i} onClick={()=>name==='Salle de Défense'&&setEnter(true)}><b>{name}</b><span>{status}</span></button>)}</div></section>
 </main>
}
