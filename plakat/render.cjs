const { chromium } = require('playwright');
const T = {
 // DE: Original bleibt, nur das Band wird ersetzt (keine täglichen Öffnungszeiten)
 de:{bg:'/tmp/winterpost-plakat-clean-de.png',date:'',script:'',sub:'',band:'TÄGLICH BIS 3. JANUAR 2027',foot:''},
 fr:{date:'DÈS LE 27 NOVEMBRE',script:"Ton rendez-vous d'hiver",sub:'avec vin chaud & plaisirs',band:'TOUS LES JOURS JUSQU’AU 3 JANVIER 2027',foot:'POSTPLATZ · SOLEURE'},
 it:{date:'DAL 27 NOVEMBRE',script:"Il tuo ritrovo d'inverno",sub:'con vin brulé & delizie',band:'TUTTI I GIORNI FINO AL 3 GENNAIO 2027',foot:'POSTPLATZ · SOLETTA'},
 en:{date:'FROM 27 NOVEMBER',script:'Your Winter Meeting Place',sub:'with mulled wine & treats',band:'DAILY UNTIL 3 JANUARY 2027',foot:'POSTPLATZ · SOLOTHURN'},
};
(async()=>{
 const b=await chromium.launch({args:['--allow-file-access-from-files']});
 const p=await b.newPage({viewport:{width:1290,height:1601}});
 for(const [l,t] of Object.entries(T)){
  await p.goto('file://'+__dirname+'/poster.html?d='+encodeURIComponent(JSON.stringify(t)));
  await p.waitForFunction(()=>document.title==='ready');
  await p.screenshot({path:`${__dirname}/../public/images/${l==='de'?'poster':'poster-'+l}.jpg`,type:'jpeg',quality:86});
 }
 await b.close();
})();
