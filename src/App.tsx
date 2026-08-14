import {useEffect,useMemo,useState} from 'react';
import {
  ArrowLeft,BookOpen,Castle,ChartNoAxesColumn,ChevronRight,Clock3,Feather,
  Home,Lock,Mail,Map,RotateCcw,ScrollText,Sparkles,Star,Trophy,UserRound
} from 'lucide-react';
import {houses,options,subjects,type Subject} from './data';
import {Matching,MultipleChoice,Ordering,ScenarioChoice,TrueFalse} from './exercises';

type HouseName=keyof typeof houses;
type Profile={
  first:string;last:string;age:string;magic:string;house:HouseName;sorted:boolean;
  points:number;completed:string[];scores:Record<string,number>;history:string[];
  lastCourse?:string;lastLessonId?:string;year:number;
};
type PageName='home'|'subjects'|'subject'|'year'|'lesson'|'progress'|'profile';
type Page={name:PageName;subject?:Subject;year?:number;lesson?:number};

const empty:Profile={first:'',last:'',age:'',magic:'',house:'Gryffondor',sorted:false,points:0,completed:[],scores:{},history:[],year:1};
const STORAGE='academie-profile';

const sortingQuestions=[
 ['Une porte interdite s’entrouvre…','J’entre pour protéger les autres','J’étudie ses runes avant d’agir','J’attends et j’observe patiemment','Je cherche ce que cette porte peut m’apprendre'],
 ['On vous confie un projet difficile.','Je prends la tête','Je cherche une solution originale','Je travaille sans relâche','Je définis une stratégie ambitieuse'],
 ['Une dispute éclate.','Je m’interpose','Je vérifie les faits','J’écoute chacun','Je cherche le meilleur compromis possible'],
 ['Quel compliment préférez-vous ?','Brave','Brillant','Fiable','Déterminé'],
 ['Dans une bibliothèque, vous cherchez…','Un récit héroïque','Un savoir inconnu','Un manuel utile à tous','Un secret oublié'],
 ['Face à l’échec…','Je recommence aussitôt','J’analyse ce qui n’a pas fonctionné','Je persévère patiemment','Je change de stratégie'],
 ['Votre force est…','L’audace','La curiosité','La constance','L’ambition'],
 ['Un camarade triche.','Je le confronte','Je cherche pourquoi il en est arrivé là','Je lui propose de réviser','Je garde l’information en tête'],
 ['Choisissez un chemin.','Le pont battu par le vent','L’escalier couvert d’énigmes','Le sentier long mais sûr','Le passage secret'],
 ['La magie doit surtout servir à…','Défendre','Comprendre','Soutenir','Accomplir']
];

const mention=(n:number)=>n>=90?'Optimal':n>=75?'Effort exceptionnel':n>=60?'Acceptable':n>=40?'Piètre':n>=20?'Désolant':'Troll';
const teacherFor=(s:Subject,year:number)=>s.id==='dfcm'?(year<=2?'Gilderoy Lockhart':year<=4?'Remus Lupin':year<=6?'Dolores Ombrage':'Alastor Maugrey « Fol Œil »'):s.teacher;
const lessonId=(s:Subject,year:number,index:number)=>`${s.id}-${year}-${index}`;
const featuredIndex=(s:Subject,year:number)=>s.id==='sortileges'&&year===1?5:s.id==='potions'&&year===1?6:s.id==='dfcm'&&year===3?1:0;
const scorePoints=(score:number)=>score===100?10:score>=80?7:score>=60?5:0;

function readProfile():Profile{
  try{
    const raw=JSON.parse(localStorage.getItem(STORAGE)||'null');
    if(!raw)return empty;
    return {...empty,...raw,sorted:raw.sorted??Boolean(raw.first),year:raw.year||1};
  }catch{return empty}
}

export default function App(){
  const[profile,setProfile]=useState<Profile>(readProfile);
  const[stage,setStage]=useState<'arrival'|'letter'|'create'|'sorting'|'app'>(()=>profile.first&&profile.sorted?'app':'arrival');
  const[page,setPage]=useState<Page>({name:'home'});
  useEffect(()=>{if(profile.first)localStorage.setItem(STORAGE,JSON.stringify(profile))},[profile]);

  if(stage==='arrival')return <Arrival next={()=>setStage('letter')}/>;
  if(stage==='letter')return <Letter next={()=>setStage('create')}/>;
  if(stage==='create')return <Create profile={profile} set={setProfile} next={()=>setStage('sorting')}/>;
  if(stage==='sorting')return <Sorting name={profile.magic||profile.first} done={house=>{const p={...profile,house,sorted:true};setProfile(p);localStorage.setItem(STORAGE,JSON.stringify(p));setStage('app')}}/>;

  const go=(p:Page)=>{setPage(p);window.scrollTo({top:0,behavior:'smooth'})};
  const reset=()=>{localStorage.removeItem(STORAGE);setProfile(empty);setPage({name:'home'});setStage('arrival')};
  return <div className="app" style={{'--house':houses[profile.house].color} as React.CSSProperties}>
    <header className="top">
      <button className="brand" onClick={()=>go({name:'home'})}><Sparkles/> <span>Académie magique</span></button>
      <button className="house-pill" onClick={()=>go({name:'profile'})}><span className="house-dot"/>{profile.house}<b>{profile.points}</b></button>
    </header>
    <main>
      {page.name!=='home'&&<button className="back" onClick={()=>{
        if(page.name==='lesson')go({name:'year',subject:page.subject,year:page.year});
        else if(page.name==='year')go({name:'subject',subject:page.subject});
        else go({name:'home'});
      }}><ArrowLeft/> Retour</button>}
      {page.name==='home'&&<Dashboard p={profile} go={go}/>} 
      {page.name==='subjects'&&<Subjects p={profile} go={go}/>} 
      {page.name==='subject'&&page.subject&&<SubjectView s={page.subject} p={profile} go={go}/>} 
      {page.name==='year'&&page.subject&&<YearView s={page.subject} year={page.year!} p={profile} go={go}/>} 
      {page.name==='lesson'&&page.subject&&<Lesson s={page.subject} year={page.year!} index={page.lesson??0} p={profile} save={setProfile} go={go}/>} 
      {page.name==='progress'&&<Progress p={profile}/>} 
      {page.name==='profile'&&<HousePage p={profile} reset={reset}/>} 
    </main>
    <nav className="bottom-nav">
      <NavButton active={page.name==='home'} icon={<Home/>} label="Accueil" onClick={()=>go({name:'home'})}/>
      <NavButton active={['subjects','subject','year','lesson'].includes(page.name)} icon={<BookOpen/>} label="Matières" onClick={()=>go({name:'subjects'})}/>
      <NavButton active={page.name==='progress'} icon={<ChartNoAxesColumn/>} label="Progression" onClick={()=>go({name:'progress'})}/>
      <NavButton active={page.name==='profile'} icon={<UserRound/>} label="Profil" onClick={()=>go({name:'profile'})}/>
    </nav>
  </div>
}

function NavButton({active,icon,label,onClick}:{active:boolean;icon:React.ReactNode;label:string;onClick:()=>void}){
  return <button className={active?'active':''} onClick={onClick}>{icon}<span>{label}</span></button>
}

function Arrival({next}:{next:()=>void}){
  return <div className="portal arrival">
    <div className="sky"><i/><i/><i/><i/></div><div className="moon"/>
    <div className="castle-scene" aria-hidden="true"><span className="tower t1"/><span className="tower t2"/><span className="tower t3"/><span className="keep"/><span className="hill"/><span className="window w1"/><span className="window w2"/><span className="window w3"/></div>
    <section className="arrival-copy">
      <p className="eyebrow">Une invitation vous attend</p>
      <h1>Académie <i>magique</i></h1>
      <p className="lead">Quelque part derrière les grilles, les chandelles sont déjà allumées. Votre place vous attend.</p>
      <button className="primary" onClick={next}><Mail/> Recevoir ma lettre</button>
      <small>Année scolaire · Première admission</small>
    </section>
  </div>
}

function Letter({next}:{next:()=>void}){
  const[opened,setOpened]=useState(false);
  return <div className="portal letter-stage">
    {!opened?<button className="envelope" onClick={()=>setOpened(true)} aria-label="Ouvrir la lettre"><span className="envelope-flap"/><span className="wax">A</span><p>À l’attention du futur élève</p><small>Toucher pour ouvrir</small></button>:
    <div className="letter-wrap"><article className="letter"><ScrollText/><p>Chère future élève, cher futur élève,</p><h2>Vous êtes attendu·e à l’Académie magique.</h2><p>Après examen attentif de votre dossier, nous avons le plaisir de vous annoncer qu’une place vous est réservée. Présentez-vous à la Grande Salle, où votre maison et votre cursus vous seront attribués.</p><p>Une baguette, un esprit attentif et une certaine disposition à l’étrange seront recommandés.</p><p className="signature">La Direction</p></article><button className="primary" onClick={next}>Préparer mon arrivée <ChevronRight/></button></div>}
  </div>
}

function Create({profile,set,next}:{profile:Profile;set:(p:Profile)=>void;next:()=>void}){
  return <div className="portal create-stage"><div className="panel admission-panel"><p className="eyebrow">Dossier d’admission</p><h2>Inscription de l’élève</h2><p className="muted">Ces informations restent enregistrées sur cet appareil.</p>{[['first','Prénom'],['last','Nom'],['age','Âge'],['magic','Nom magique (facultatif)']].map(([k,l])=><label key={k}>{l}<input type={k==='age'?'number':'text'} value={profile[k as keyof Profile] as string} onChange={e=>set({...profile,[k]:e.target.value})}/></label>)}<button disabled={!profile.first||!profile.last||!profile.age} className="primary full" onClick={next}>Entrer dans la Grande Salle <ChevronRight/></button></div></div>
}

function Sorting({name,done}:{name:string;done:(h:HouseName)=>void}){
  const[i,setI]=useState(0);const[score,setScore]=useState([0,0,0,0]);const[reveal,setReveal]=useState<HouseName>();
  const keys=Object.keys(houses) as HouseName[];
  const answer=(n:number)=>{const s=[...score];s[n]++;setScore(s);if(i===9){const h=keys[s.indexOf(Math.max(...s))];setReveal(h);setTimeout(()=>done(h),2800)}else setI(i+1)};
  if(reveal)return <div className="portal sorting reveal" style={{'--house':houses[reveal].color} as React.CSSProperties}><div className="sorting-hat"><span>⌁</span></div><p className="eyebrow">Le choix est fait</p><h1>{reveal}</h1><p>{houses[reveal].values}</p><blockquote>« {houses[reveal].motto} »</blockquote></div>;
  return <div className="portal sorting"><div className="sorting-hat"><span>⌁</span></div><p className="eyebrow">Le Choixpeau réfléchit · {i+1}/10</p><h2>{name?`${name}, ${sortingQuestions[i][0].charAt(0).toLowerCase()+sortingQuestions[i][0].slice(1)}`:sortingQuestions[i][0]}</h2><div className="sorting-progress"><i style={{width:`${(i+1)*10}%`}}/></div><div className="choices">{sortingQuestions[i].slice(1).map((x,n)=><button onClick={()=>answer(n)} key={x}><span>{String.fromCharCode(65+n)}</span>{x}</button>)}</div></div>
}

function Dashboard({p,go}:{p:Profile;go:(x:Page)=>void}){
  const scores=Object.values(p.scores),avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;
  const progress=Math.min(100,Math.round(p.completed.length/(subjects.filter(s=>s.years.includes(1)).length*10)*100));
  const lastSubject=p.lastLessonId?subjects.find(s=>p.lastLessonId!.startsWith(s.id)):subjects[0];
  const announcements=['Les serres resteront ouvertes après le dîner pour les élèves de Botanique.','Le professeur Flitwick rappelle que la précision vaut mieux que la puissance.','Un nouveau relevé du ciel est affiché au pied de la Tour d’Astronomie.'];
  return <>
    <section className="dashboard-hero"><div><p className="eyebrow">Tableau de bord · {p.year}re année</p><h1>Bonsoir, {p.magic||p.first}.</h1><p>La journée n’est pas terminée. Un cours, une annonce et quelques points de maison vous attendent encore.</p></div><div className="house-medallion" style={{'--house':houses[p.house].color} as React.CSSProperties}><span>{p.house.slice(0,1)}</span><small>{p.house}</small></div></section>
    <section className="stats"><b>{p.points}<small>Points de maison</small></b><b>{avg}%<small>Moyenne</small></b><b>{p.completed.length}<small>Cours terminés</small></b></section>
    <section className="resume immersive-card"><div className="resume-icon"><Feather/></div><div><span className="eyebrow">À poursuivre</span><h2>{p.lastCourse||'La baguette et son rôle'}</h2><p>{p.lastCourse?'Votre dernier travail est enregistré. Reprenez là où vous vous êtes arrêté.':'Votre premier cours vous attend dans la salle de Sortilèges.'}</p></div><button className="primary" onClick={()=>go({name:'lesson',subject:lastSubject||subjects[0],year:1,lesson:p.lastLessonId?Number(p.lastLessonId.split('-').at(-1)):0})}>Entrer en cours <ChevronRight/></button></section>
    <div className="dashboard-grid">
      <button className="dashboard-card library" onClick={()=>go({name:'subjects'})}><BookOpen/><span className="eyebrow">Cursus</span><h3>Mes matières</h3><p>Explorez les salles, professeurs et programmes.</p><b>Voir le cursus →</b></button>
      <button className="dashboard-card progress-card" onClick={()=>go({name:'progress'})}><ChartNoAxesColumn/><span className="eyebrow">Dossier scolaire</span><h3>{progress}% accompli</h3><p>Notes, mentions et historique de progression.</p><div className="mini-progress"><i style={{width:`${progress}%`}}/></div></button>
      <button className="dashboard-card house-card" onClick={()=>go({name:'profile'})}><Trophy/><span className="eyebrow">Maison</span><h3>{p.house}</h3><p>{houses[p.house].values}</p><b>{p.points} points</b></button>
    </div>
    <section className="notice-board"><div className="section-heading"><div><span className="eyebrow">Vie de l’Académie</span><h2>Panneau d’affichage</h2></div><Clock3/></div>{announcements.map((a,i)=><article key={a}><span>{i+1}</span><p>{a}</p></article>)}</section>
  </>
}

function Subjects({p,go}:{p:Profile;go:(x:Page)=>void}){
  return <><PageTitle kicker="Le cursus" title="Matières" text="Chaque discipline possède sa salle, son professeur et sa progression. Entrez dans une matière pour consulter les années disponibles."/><div className="subject-grid">{subjects.map(s=>{
    const done=p.completed.filter(x=>x.startsWith(s.id+'-')).length;
    return <button className={'subject subject-'+s.id} onClick={()=>go({name:'subject',subject:s})} key={s.id}><div className="subject-symbol">{s.symbol}</div><div className="subject-body"><span className="subject-location"><Map/> {s.location}</span><h3>{s.name}</h3><em>{s.teacher}</em><p>{s.description}</p><div className="subject-foot"><small>Années {s.years.join(' · ')}</small><span>{done} validé{done>1?'s':''}</span></div></div></button>})}</div><PageTitle kicker="À partir de la troisième année" title="Options" text="Le choix d’au moins deux options ouvre des voies plus spécialisées."/><div className="option-grid">{options.map(o=><article key={o[0]}><span className="option-glyph">✧</span><h3>{o[0]}</h3><em>{o[1]}</em><p>{o[2]}</p><small>Disponible en troisième année</small></article>)}</div></>
}

function SubjectView({s,p,go}:{s:Subject;p:Profile;go:(x:Page)=>void}){
  const total=p.completed.filter(x=>x.startsWith(s.id+'-')).length;
  return <><section className={'subject-hero subject-'+s.id}><div className="subject-symbol large">{s.symbol}</div><div><span className="eyebrow">{s.location}</span><h1>{s.name}</h1><p>{s.description}</p><p className="teacher-line"><b>{s.teacher}</b> · {s.teacherTone}</p></div></section><div className="subject-meta"><article><span className="eyebrow">Atmosphère</span><p>{s.ambience}</p></article><article><span className="eyebrow">Compétences</span><div className="tags">{s.skills.map(x=><span key={x}>{x}</span>)}</div></article></div><div className="section-heading"><div><span className="eyebrow">Progression</span><h2>Parcours par année</h2></div><small>{total} séquence{total>1?'s':''} validée{total>1?'s':''}</small></div>{Array.from({length:8},(_,i)=>i+1).map(y=>{const available=y<=3&&s.years.includes(y);return <button key={y} disabled={!available} className="year" onClick={()=>go({name:'year',subject:s,year:y})}><span className="year-number">{y}</span><div><b>{y===1?'Première':y===2?'Deuxième':y===3?'Troisième':`${y}e`} année</b><small>{y>3?'Programme en préparation':available?`${s.sequences[y].length} séquences · ${teacherFor(s,y)}`:'Non enseignée'}</small></div>{available?<ChevronRight/>:<Lock/>}</button>})}</>
}

function YearView({s,year,p,go}:{s:Subject;year:number;p:Profile;go:(x:Page)=>void}){
  const seqs=s.sequences[year];const featured=featuredIndex(s,year);
  const done=seqs.filter((_,i)=>p.completed.includes(lessonId(s,year,i))).length;
  return <><PageTitle kicker={`${s.name} · ${teacherFor(s,year)}`} title={year===1?'Première année':year===2?'Deuxième année':'Troisième année'} text={`${done}/${seqs.length} séquences validées. Les cours se débloquent progressivement ; la leçon vedette reste accessible pour découvrir le moteur pédagogique.`}/><div className="year-progress"><i style={{width:`${(done/seqs.length)*100}%`}}/></div><div className="sequence-list">{seqs.map((title,i)=>{
    const id=lessonId(s,year,i),complete=p.completed.includes(id),open=i===0||complete||p.completed.includes(lessonId(s,year,i-1))||i===featured;
    return <button key={id} className={'sequence '+(complete?'complete ':'')+(i===featured?'featured':'')} disabled={!open} onClick={()=>go({name:'lesson',subject:s,year,lesson:i})}><span className="sequence-index">{complete?'✓':open?String(i+1).padStart(2,'0'):<Lock/>}</span><div><small>{i===featured?'Leçon vedette':complete?'Validée':open?'Disponible':'Verrouillée'}</small><h3>{title}</h3><p>{complete?`${p.scores[id]} % · ${mention(p.scores[id])}`:open?'Entrer dans la salle':'Validez la séquence précédente'}</p></div><ChevronRight/></button>})}</div></>
}

function Lesson({s,year,index,p,save,go}:{s:Subject;year:number;index:number;p:Profile;save:(x:Profile)=>void;go:(x:Page)=>void}){
  const title=s.sequences[year][index];
  const isFeatured=(s.id==='sortileges'&&year===1&&index===5)||(s.id==='potions'&&year===1&&index===6)||(s.id==='dfcm'&&year===3&&index===1);
  return isFeatured?<FeaturedLesson s={s} year={year} index={index} p={p} save={save} go={go}/>:<GenericLesson s={s} year={year} index={index} title={title} p={p} save={save} go={go}/>;
}

function saveResult(s:Subject,year:number,index:number,title:string,score:number,p:Profile,save:(x:Profile)=>void){
  const id=lessonId(s,year,index),already=p.completed.includes(id),points=already?0:scorePoints(score),best=Math.max(p.scores[id]||0,score);
  save({...p,points:p.points+points,completed:[...new Set([...p.completed,id])],scores:{...p.scores,[id]:best},lastCourse:title,lastLessonId:id,history:[...p.history,`${title} · ${score}%${points?` · +${points} points`:''}`]});
}

function GenericLesson({s,year,index,title,p,save,go}:{s:Subject;year:number;index:number;title:string;p:Profile;save:(x:Profile)=>void;go:(x:Page)=>void}){
  const[step,setStep]=useState(0);const[result,setResult]=useState<boolean>();
  const finish=()=>{const score=result===false?60:result===true?100:75;saveResult(s,year,index,title,score,p,save);setStep(3)};
  return <><LessonHeader s={s} year={year} title={title} step={step} total={4}/>{step===0&&<LessonPart title={`Ouverture du cours — ${teacherFor(s,year)}`}><TeacherPortrait s={s} year={year}/><blockquote>« Aujourd’hui, nous allons travailler {title.toLowerCase()}. Ce qui compte n’est pas seulement d’obtenir un résultat, mais de comprendre pourquoi il est correct. »</blockquote><p>{s.description} Cette séquence introduit une compétence précise du programme de {year===1?'première':year===2?'deuxième':'troisième'} année.</p><Concept text={`${s.skills[0]} · ${s.skills[1]} — observez la situation avant toute action.`}/></LessonPart>}{step===1&&<LessonPart title="Comprendre avant d’agir"><p>{s.ambience} Le professeur vous demande d’identifier les indices utiles, de distinguer ce que vous savez de ce que vous supposez, puis de choisir une méthode sûre.</p><TrueFalse question="Une bonne pratique magique consiste à comprendre la situation avant d’agir." correct={true} onAnswer={ok=>setResult(ok)} explanation="La maîtrise repose sur l’observation, la méthode et le contrôle — pas uniquement sur la puissance."/></LessonPart>}{step===2&&<LessonPart title="Mise en situation"><ScenarioChoice question="Quelle attitude correspond le mieux à ce cours ?" choices={['Agir immédiatement sans observer','Identifier le problème, choisir une méthode, puis vérifier le résultat','Répéter une formule au hasard','Éviter toute tentative']} correct={1} onAnswer={ok=>setResult(prev=>prev===false?false:ok)} explanation="La démarche attendue combine diagnostic, action proportionnée et vérification."/></LessonPart>}{step===3&&<Result score={Math.max(p.scores[lessonId(s,year,index)]||0,result===false?60:100)} points={p.completed.includes(lessonId(s,year,index))?0:scorePoints(result===false?60:100)} go={()=>go({name:'year',subject:s,year})}/>} {step<3&&<button className="primary next" onClick={()=>step===2?finish():setStep(step+1)} disabled={step>0&&result===undefined}>{step===2?'Terminer la séquence':'Continuer'} <ChevronRight/></button>}</>
}

function FeaturedLesson({s,year,index,p,save,go}:{s:Subject;year:number;index:number;p:Profile;save:(x:Profile)=>void;go:(x:Page)=>void}){
  const[step,setStep]=useState(0),[hits,setHits]=useState<boolean[]>([]);const kind=s.id;
  const title=kind==='sortileges'?'Wingardium Leviosa':kind==='potions'?'Potion contre les furoncles':'Épouvantards et Riddikulus';
  const answer=(ok:boolean)=>setHits(h=>[...h,ok]);
  const score=Math.round((hits.filter(Boolean).length/4)*100);
  const finish=()=>{saveResult(s,year,index,title,score,p,save);setStep(5)};
  return <><LessonHeader s={s} year={year} title={title} step={step} total={6}/>
    {step===0&&<LessonPart title={`Introduction — ${teacherFor(s,year)}`}><TeacherPortrait s={s} year={year}/><blockquote>{kind==='potions'?'« La précision sépare la potion du poison. Observez avant d’agir. »':kind==='dfcm'?'« Ce qui vous effraie perd de sa force dès que vous savez le regarder autrement. »':'« Souplesse du poignet, netteté de l’esprit — et n’oubliez pas la prononciation. »'}</blockquote><p>{kind==='sortileges'?'Le charme de lévitation permet de soulever un objet sans le toucher. Il exige l’accord du geste, de la prononciation et de l’intention.':kind==='potions'?'Cette préparation soigne les furoncles, mais son équilibre est fragile. Ordre, dosage et température sont indissociables.':'Un épouvantard prend la forme de la peur la plus forte de la personne qui lui fait face. Riddikulus ne nie pas cette peur : il en modifie la représentation.'}</p><Concept text={kind==='sortileges'?'Mouvement souple, petit coup sec, intention stable et prononciation nette.':kind==='potions'?'Orties séchées, crocs de serpent broyés, limaces cornues, puis épines de porc-épic une fois le chaudron retiré du feu.':'Identifier la forme, imaginer une transformation comique précise, garder sa concentration puis prononcer Riddikulus.'}/></LessonPart>}
    {step===1&&<LessonPart title="Théorie et observation"><p>{kind==='sortileges'?'Une crispation produit un mouvement brutal. L’erreur typique consiste à fouetter le poignet ou à déformer l’incantation.':kind==='potions'?'Les crocs doivent être finement broyés et la chaleur stable. Une erreur d’ordre peut rendre la potion dangereuse.':'Face à un épouvantard, le premier travail est mental : identifier la peur sans la laisser dicter la réaction.'}</p><Matching question="Associez chaque notion à son rôle." pairs={kind==='potions'?[['Température','Contrôle de la réaction'],['Dosage','Équilibre des ingrédients']]:kind==='sortileges'?[['Intention','Direction de l’effet'],['Prononciation','Stabilité du charme']]:[['Observation','Identifier la menace'],['Humour','Désamorcer la peur']]} onAnswer={answer} explanation="Chaque élément a une fonction distincte ; la réussite vient de leur combinaison."/></LessonPart>}
    {step===2&&<LessonPart title="Mise en pratique"><Ordering question={kind==='potions'?'Remettez la préparation dans l’ordre.':kind==='sortileges'?'Ordonnez l’exécution du charme.':'Ordonnez la riposte.'} items={kind==='potions'?['Ajouter les orties','Incorporer les crocs broyés','Ajouter les limaces cornues','Retirer du feu puis ajouter les épines']:kind==='sortileges'?['Adopter une posture stable','Visualiser le mouvement','Prononcer l’incantation','Accompagner le geste']:['Identifier la forme prise','Choisir une image comique','Se concentrer sur cette image','Prononcer Riddikulus']} correct={kind==='potions'?['Ajouter les orties','Incorporer les crocs broyés','Ajouter les limaces cornues','Retirer du feu puis ajouter les épines']:kind==='sortileges'?['Adopter une posture stable','Visualiser le mouvement','Prononcer l’incantation','Accompagner le geste']:['Identifier la forme prise','Choisir une image comique','Se concentrer sur cette image','Prononcer Riddikulus']} onAnswer={answer} explanation="L’ordre fait partie intégrante de la technique : sauter une étape fragilise le résultat."/></LessonPart>}
    {step===3&&<LessonPart title="Diagnostic"><MultipleChoice question={kind==='potions'?'Le chaudron est encore sur le feu. Que faites-vous avant les épines de porc-épic ?':kind==='sortileges'?'Une plume tremble sans décoller. Quelle correction est la plus pertinente ?':'L’élève panique devant la forme prise par l’épouvantard. Quelle priorité ?'} choices={kind==='potions'?['Augmenter la flamme','Retirer le chaudron du feu','Ajouter plus de crocs','Remuer plus vite','Ajouter les épines immédiatement']:kind==='sortileges'?['Crier plus fort','Reprendre posture, intention et prononciation','Changer de baguette immédiatement','Multiplier les gestes','Abandonner']:['Attaquer au hasard','Identifier la peur et construire l’image comique','Fermer les yeux','Quitter la salle','Changer d’incantation']} correct={1} onAnswer={answer} explanation="Le bon diagnostic cible la cause du problème plutôt que d’ajouter de la puissance."/></LessonPart>}
    {step===4&&<LessonPart title="Situation finale"><ScenarioChoice question="Quelle réponse montre la meilleure maîtrise ?" choices={kind==='potions'?['Suivre mécaniquement la recette sans observer','Adapter son geste en surveillant couleur, chaleur et ordre','Ajouter davantage d’ingrédients en cas de doute','Se fier uniquement au temps écoulé','Ignorer les changements de texture']:kind==='sortileges'?['Multiplier les mouvements','Coordonner intention, geste et incantation en contrôlant la puissance','Viser ailleurs pour compenser','Réciter très vite','Forcer le poignet']:['Chercher à détruire la créature','Transformer mentalement la peur et exécuter Riddikulus avec contrôle','Attendre sans observer','Utiliser n’importe quel sort offensif','Se concentrer uniquement sur l’incantation']} correct={1} onAnswer={answer} explanation="La maîtrise associe compréhension, technique et contrôle de la situation."/></LessonPart>}
    {step===5&&<Result score={score} points={p.completed.includes(lessonId(s,year,index))?0:scorePoints(score)} go={()=>go({name:'year',subject:s,year})}/>} 
    {step<5&&<button className="primary next" onClick={()=>step===4?finish():setStep(step+1)} disabled={step>0&&hits.length<step}>Continuer <ChevronRight/></button>}
  </>
}

function LessonHeader({s,year,title,step,total}:{s:Subject;year:number;title:string;step:number;total:number}){
  return <div className="lesson-head"><div><span className="eyebrow">{s.name} · {year===1?'Première':year===2?'Deuxième':'Troisième'} année</span><h1>{title}</h1><small>{teacherFor(s,year)} · {s.location}</small></div><div className="progress"><i style={{width:`${((step+1)/total)*100}%`}}/></div></div>
}

function TeacherPortrait({s,year}:{s:Subject;year:number}){
  const teacher=teacherFor(s,year);return <div className={'teacher-card subject-'+s.id}><div className="teacher-avatar"><span>{teacher.split(' ').map(x=>x[0]).slice(0,2).join('')}</span></div><div><small>Votre professeur</small><h3>{teacher}</h3><p>{s.teacherTone}</p></div></div>
}
function LessonPart({title,children}:{title:string;children:React.ReactNode}){return <section className="lesson"><span className="eyebrow">Cours</span><h2>{title}</h2>{children}</section>}
function Concept({text}:{text:string}){return <div className="concept"><span>À retenir</span><p>{text}</p></div>}
function Result({score,points,go}:{score:number;points:number;go:()=>void}){return <section className="result"><Star/><span className="eyebrow">Évaluation terminée</span><h1>{score}%</h1><h2>{mention(score)}</h2><p>{score>=60?'Séquence validée. Votre progression a été enregistrée.':'La séquence est enregistrée mais mérite une nouvelle tentative.'}</p><b>{points?`+${points} points de maison`:'Résultat mis à jour'}</b><button className="primary" onClick={go}>Retour au programme</button></section>}

function Progress({p}:{p:Profile}){
  const rows=subjects.map(s=>{const vals=Object.entries(p.scores).filter(([k])=>k.startsWith(s.id+'-')).map(([,v])=>v);const avg=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):null;return {s,avg,count:vals.length}});
  const all=Object.values(p.scores),general=all.length?Math.round(all.reduce((a,b)=>a+b,0)/all.length):0;
  return <><PageTitle kicker="Dossier scolaire" title="Progression" text="Vos résultats, mentions et travaux récents sont consignés ici."/><div className="progress-summary"><article><b>{general}%</b><span>Moyenne générale</span></article><article><b>{p.completed.length}</b><span>Séquences validées</span></article><article><b>{p.points}</b><span>Points de maison</span></article></div><section className="report"><div className="report-title"><ScrollText/><div><small>Académie magique</small><h2>Bulletin provisoire</h2></div></div>{rows.map(({s,avg,count})=><div className="report-row" key={s.id}><div><b>{s.name}</b><small>{teacherFor(s,1)} · {count} devoir{count>1?'s':''}</small></div><strong>{avg===null?'—':`${avg}%`}</strong><div><b>{avg===null?'En attente':mention(avg)}</b><small>{avg===null?'Aucun devoir rendu.':avg>=90?'Maîtrise remarquable et travail très sûr.':avg>=75?'Ensemble solide ; poursuivez avec la même rigueur.':avg>=60?'Acquis satisfaisants, encore perfectibles.':'Revoir les bases avant la prochaine évaluation.'}</small></div></div>)}</section><section className="history-section"><span className="eyebrow">Journal scolaire</span><h2>Historique récent</h2>{p.history.length?p.history.slice(-8).reverse().map((x,i)=><div className="history" key={i}><Clock3/><span>{x}</span></div>):<p className="muted">Aucune évaluation pour le moment.</p>}</section></>
}

function HousePage({p,reset}:{p:Profile;reset:()=>void}){
  const ranks=useMemo(()=>[
    {name:p.house,points:p.points,me:true},
    ...((Object.keys(houses) as HouseName[]).filter(h=>h!==p.house).map((h,i)=>({name:h,points:18+i*7,me:false})))
  ].sort((a,b)=>b.points-a.points),[p.house,p.points]);
  return <><section className="house" style={{'--house':houses[p.house].color} as React.CSSProperties}><div className="house-crest"><span>{p.house[0]}</span></div><p className="eyebrow">Votre maison</p><h1>{p.house}</h1><p>{houses[p.house].values}</p><blockquote>« {houses[p.house].motto} »</blockquote><b>{p.points} points</b></section><section className="rank-section"><span className="eyebrow">Coupe des maisons</span><h2>Classement actuel</h2>{ranks.map((r,i)=><div className={'rank '+(r.me?'me':'')} key={r.name}><b>{i+1}</b><span>{r.name}{r.me&&<small>Votre maison</small>}</span><strong>{r.points} pts</strong></div>)}</section><section className="profile-sheet"><span className="eyebrow">Dossier personnel</span><h2>{p.first} {p.last}</h2><p>Nom d’usage : <b>{p.magic||'—'}</b></p><p>Année : <b>Première année</b></p><p>Maison : <b>{p.house}</b></p><button className="danger" onClick={()=>{if(confirm('Réinitialiser toute votre scolarité sur cet appareil ?'))reset()}}><RotateCcw/> Réinitialiser ma progression</button></section></>
}

function PageTitle({kicker,title,text}:{kicker:string;title:string;text:string}){return <section className="page-title"><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{text}</p></section>}
