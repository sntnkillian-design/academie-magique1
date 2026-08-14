import {useMemo,useState} from 'react';

type Props={question:string;onAnswer:(ok:boolean)=>void;explanation?:string};

function Feedback({ok,explanation}:{ok:boolean;explanation?:string}){
  return <div className={'feedback '+(ok?'good':'bad')}>
    <b>{ok?'Bonne réponse':'À revoir'}</b>
    {explanation&&<p>{explanation}</p>}
  </div>
}

export function MultipleChoice({question,choices,correct,onAnswer,explanation}:Props&{choices:string[];correct:number}){
  const[pick,setPick]=useState<number>();
  const locked=pick!==undefined;
  const choose=(i:number)=>{if(locked)return;setPick(i);onAnswer(i===correct)};
  return <Exercise question={question}>
    <div className="answer-list">{choices.map((c,i)=>{
      const state=locked?(i===correct?'right':pick===i?'wrong':'dim'):'';
      return <button className={'answer '+state} onClick={()=>choose(i)} key={c}>{c}</button>
    })}</div>
    {locked&&<Feedback ok={pick===correct} explanation={explanation}/>} 
  </Exercise>
}

export function TrueFalse(p:Props&{correct:boolean}){
  return <MultipleChoice {...p} choices={['Vrai','Faux']} correct={p.correct?0:1}/>;
}

export function ScenarioChoice(p:Props&{choices:string[];correct:number}){
  return <MultipleChoice {...p}/>;
}

export function Ordering({question,items,correct,onAnswer,explanation}:Props&{items:string[];correct:string[]}){
  const initial=useMemo(()=>[...items].sort(()=>.5-Math.random()),[items]);
  const[order,setOrder]=useState(initial);
  const[result,setResult]=useState<boolean>();
  const move=(i:number,d:number)=>{if(result!==undefined)return;const n=[...order];const j=i+d;if(j<0||j>=n.length)return;[n[i],n[j]]=[n[j],n[i]];setOrder(n)};
  const validate=()=>{if(result!==undefined)return;const ok=order.every((x,i)=>x===correct[i]);setResult(ok);onAnswer(ok)};
  return <Exercise question={question}>
    <div className="order-list">{order.map((x,i)=><div className="order" key={x}><span><b>{i+1}</b>{x}</span><div><button aria-label="Monter" onClick={()=>move(i,-1)}>↑</button><button aria-label="Descendre" onClick={()=>move(i,1)}>↓</button></div></div>)}</div>
    <button className="primary small" onClick={validate} disabled={result!==undefined}>Valider l’ordre</button>
    {result!==undefined&&<Feedback ok={result} explanation={explanation}/>} 
  </Exercise>
}

export function Matching({question,pairs,onAnswer,explanation}:Props&{pairs:[string,string][]}){
  const[values,setValues]=useState<string[]>(pairs.map(()=>''));
  const[result,setResult]=useState<boolean>();
  const rhs=useMemo(()=>[...pairs.map(p=>p[1])].reverse(),[pairs]);
  const validate=()=>{if(result!==undefined)return;const ok=values.every((x,i)=>x===pairs[i][1]);setResult(ok);onAnswer(ok)};
  return <Exercise question={question}>
    <div className="matching-grid">{pairs.map((p,i)=><label className="match" key={p[0]}><span>{p[0]}</span><select disabled={result!==undefined} value={values[i]} onChange={e=>{const n=[...values];n[i]=e.target.value;setValues(n)}}><option value="">Associer…</option>{rhs.map(x=><option key={x}>{x}</option>)}</select></label>)}</div>
    <button className="primary small" onClick={validate} disabled={result!==undefined||values.some(v=>!v)}>Valider les associations</button>
    {result!==undefined&&<Feedback ok={result} explanation={explanation}/>} 
  </Exercise>
}

function Exercise({question,children}:{question:string;children:React.ReactNode}){
  return <section className="exercise"><span className="eyebrow">Exercice pratique</span><h3>{question}</h3>{children}</section>
}
