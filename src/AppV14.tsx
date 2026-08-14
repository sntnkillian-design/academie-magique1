import {useEffect,useMemo,useState} from 'react';
import AppV13 from './AppV13';
import './v14.css';

type P={first?:string;magic?:string;house?:string;year?:number;points?:number;wandWood?:string;wandCore?:string;patronus?:string;favoriteSubject?:string;options?:string[];completed?:string[];scores?:Record<string,number>};
const fallback:P={first:'Killian',house:'Serdaigle',year:1,points:0,patronus:'Non révélé',favoriteSubject:'Défense contre les forces du Mal',options:[]};
const rooms=[['✦','Tour d’Astronomie','Bientôt'],['🛡','Salle de Défense','Disponible'],['⚗','Salle des Potions','Bientôt'],['⌂','Bibliothèque','Bientôt'],['♜','Grande Salle','Vie scolaire'],['❧','Serres de Botanique','Bientôt']];
const nav=[['⌂','Accueil'],['▤','Matières'],['▦','Agenda'],['✉','Courrier'],['●','Profil'],['♜','Maison'],['▥','Bulletin'],['▥','Bibliothèque'],['⚙','Paramètres']];
function getProfile():P{try{return {...fallback,...JSON.parse(localStorage.getItem('academie-profile')||'{}')}}catch{return fallback}}

export default function AppV14(){
 const[loading,setLoading]=useState(true);const[enter,setEnter]=useState(false);const[p]=useState<P>(getProfile);
 useEffect(()=>{const t=setTimeout(()=>setLoading(false),1500);return()=>clearTimeout(t)},[]);
 const name=p.magic||p.first||'Élève';const completed=p.completed?.length||0;const avg=useMemo(()=>{const a=Object.values(p.scores||{});return a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0},[p.scores]);
 if(enter)return <AppV13/>;
 if(loading)return <div className="v14-loader"><div className="load-moon"/><div className="load-castle"/><div className="load-broom">➳</div><h1>Académie magique</h1><p>Les portes du château s’ouvrent…</p></div>;
 return <div className="v14-app">
  <aside className="v14-side"><div className="v14-brand"><span>♜</span><b>ACADÉMIE<br/>MAGIQUE</b></div><nav>{nav.map(([ico,label],i)=><button key={label} className={i===0?'active':''} onClick={()=>i===1?setEnter(true):undefined}><span>{ico}</span>{label}</button>)}</nav><div className="v14-values">SAGESSE<br/>APPRENTISSAGE<br/>COURAGE</div></aside>
  <div className="v14-main">
   <header className="v14-top"><div/><div><button>✉ <span>Courrier</span><b>3</b></button><button>▦ <span>Agenda</span></button><button className="student">◉ <span>{name}<small>{p.house||'Serdaigle'}</small></span></button></div></header>
   <section className="v14-world"><div className="v14-moon"/><div className="v14-cloud c1"/><div className="v14-cloud c2"/><div className="v14-castle"/><div className="v14-welcome"><span>PREMIÈRE ANNÉE · ACADÉMIE MAGIQUE</span><h1>Bonsoir,<br/><em>{name}.</em></h1><blockquote>« Ce que nous apprenons avec plaisir,<br/>nous ne l’oublions jamais. »</blockquote></div></section>
   <section className="v14-dashboard"><div className="v14-center">
    <div className="v14-cardrow">
     <article><small>PROCHAIN EN AGENDA</small><h3>Vol sur balai</h3><p>14h00 — Terrain de vol</p><button onClick={()=>setEnter(true)}>Voir mon emploi du temps →</button></article>
     <article><small>PROCHAIN COURS</small><h3>Défense contre les forces du Mal</h3><p>Cours 1 — Qu’appelle-t-on les forces du Mal ?</p><button onClick={()=>setEnter(true)}>Reprendre le cours →</button></article>
     <article><small>NOUVEAUX MESSAGES</small><h3>Prof. Remus Lupin</h3><p>« N’oubliez pas : l’observation précède l’action. »</p><button onClick={()=>setEnter(true)}>Lire mes messages →</button></article>
     <article><small>POINTS DE MAISON</small><div className="points"><span>♜</span><strong>{p.points||0}</strong></div><p>{p.house||'Serdaigle'} · classement en cours</p><button onClick={()=>setEnter(true)}>Voir la maison →</button></article>
    </div>
    <section className="v14-map"><header><small>EXPLORER L’ACADÉMIE</small><h2>Le château devient votre carte</h2></header><div className="v14-mapscene"><div className="map-castle"/>{rooms.map(([ico,label,status],i)=><button key={label} className={'room r'+i} onClick={()=>label==='Salle de Défense'&&setEnter(true)}><b>{ico} {label}</b><span>{status}</span></button>)}</div></section>
    <section className="v14-year"><div><small>ANNÉE SCOLAIRE</small><b>Premier trimestre</b></div><div className="yearline"><i/><i/><i/><i/></div><div><small>PROCHAINE PAUSE</small><b>Fin du trimestre dans 32 jours</b></div></section>
   </div>
   <aside className="v14-right">
    <section className="profilecard"><small>MON PROFIL</small><div className="avatar">{name.slice(0,1).toUpperCase()}</div><h2>{name}</h2><p>{p.house||'Serdaigle'} · {p.year||1}re année</p><dl><dt>Niveau</dt><dd>{p.year||1}re année</dd><dt>Baguette</dt><dd>{p.wandWood||'À renseigner'}{p.wandCore?` · ${p.wandCore}`:''}</dd><dt>Patronus</dt><dd>{p.patronus||'Non révélé'}</dd><dt>Matière préférée</dt><dd>{p.favoriteSubject||'À choisir'}</dd><dt>Cours validés</dt><dd>{completed}</dd><dt>Moyenne</dt><dd>{avg}%</dd></dl><button onClick={()=>setEnter(true)}>Voir mon profil complet →</button></section>
    <section className="challengecard"><small>PROCHAINS DÉFIS</small><article><b>🛡 Terminer DCFM — Cours 1</b><p>Qu’est-ce que les forces du Mal ?</p><div><i style={{width:`${Math.max(8,completed*10)}%`}}/></div></article><article><b>▤ Lire le chapitre</b><p>Manuel de défense élémentaire</p></article><article><b>➳ Devoir : Sortilèges</b><p>Répéter Wingardium Leviosa</p></article><button onClick={()=>setEnter(true)}>Voir tous mes défis →</button></section>
   </aside></section>
  </div>
 </div>
}
