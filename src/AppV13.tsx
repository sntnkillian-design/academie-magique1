import {useEffect,useState} from 'react';
import AppV12 from './AppV12';
import DfcmV13 from './DfcmV13';
import './v13.css';

export default function AppV13(){
 const[dfcm,setDfcm]=useState(false);
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
 return dfcm?<DfcmV13 onExit={()=>{setDfcm(false);setTimeout(()=>window.scrollTo({top:0}),0)}}/>:<div className="v13-shell"><AppV12/></div>;
}
