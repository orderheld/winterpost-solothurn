const { chromium } = require('playwright');
const T = {
 fr:{date:'DÈS LE 27 NOVEMBRE',script:"Ton rendez-vous d'hiver",sub:'avec vin chaud & plaisirs',band:'TOUS LES JOURS DE 11H00 À 22H00',foot:'POSTPLATZ · SOLEURE'},
 it:{date:'DAL 27 NOVEMBRE',script:"Il tuo ritrovo d'inverno",sub:'con vin brulé & delizie',band:'TUTTI I GIORNI DALLE 11:00 ALLE 22:00',foot:'POSTPLATZ · SOLETTA'},
 en:{date:'FROM 27 NOVEMBER',script:'Your Winter Meeting Place',sub:'with mulled wine & treats',band:'DAILY FROM 11:00 TO 22:00',foot:'POSTPLATZ · SOLOTHURN'},
};
(async()=>{
 const b=await chromium.launch({args:['--allow-file-access-from-files']});
 const p=await b.newPage({viewport:{width:1290,height:1601}});
 for(const [l,t] of Object.entries(T)){
  await p.goto('file://'+__dirname+'/poster.html?d='+encodeURIComponent(JSON.stringify(t)));
  await p.waitForFunction(()=>document.title==='ready');
  await p.screenshot({path:`${__dirname}/../public/images/poster-${l}.jpg`,type:'jpeg',quality:86});
 }
 await b.close();
})();
