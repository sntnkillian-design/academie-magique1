import {useEffect,useState} from 'react';
import AppV12 from './AppV12';
import DfcmV13 from './DfcmV13';
import './v13.css';

type Props={startDfcm?:boolean;onReturn?:()=>void};
export default function AppV13({startDfcm=false,onReturn}:Props){
 const[dfcm,setDfcm]=useState(startDfcm);
 useEffect(()=>{
  if(dfcm)return;
  const intercept=(e:MouseEvent)=>{
   const target=e.target as HTMLElement|null;
   const button=target?.closest('button');
   if(button?.textContent?.includes('Défense contre les forces du Mal')){
    e.preventDefault();e.stopPropagation();setDfcm(true);window.scrollTo({top:0,behavior:'smooth'});
   }
  };
  document.addEventListener('click',intercept,true);
  return()=>document.removeEventListener('click',intercept,true);
 },[dfcm]);
 const leave=()=>{if(onReturn){onReturn();return;}setDfcm(false);setTimeout(()=>window.scrollTo({top:0}),0)};
 return dfcm?<DfcmV13 onExit={leave}/>:<div className="v13-shell"><AppV12/></div>;
}
