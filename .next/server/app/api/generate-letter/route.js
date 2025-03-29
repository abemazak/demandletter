"use strict";(()=>{var e={};e.id=623,e.ids=[623],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7790:e=>{e.exports=require("assert")},4770:e=>{e.exports=require("crypto")},7702:e=>{e.exports=require("events")},8962:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},9801:e=>{e.exports=require("os")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},4175:e=>{e.exports=require("tty")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},1568:e=>{e.exports=require("zlib")},8898:(e,t,i)=>{i.r(t),i.d(t,{originalPathname:()=>f,patchFetch:()=>x,requestAsyncStorage:()=>u,routeModule:()=>m,serverHooks:()=>y,staticGenerationAsyncStorage:()=>g});var a={};i.r(a),i.d(a,{POST:()=>p});var r=i(9303),o=i(8716),n=i(670),s=i(7070);let l=[{caseType:"auto_accident",injuryType:"whiplash",jurisdiction:"California",insuranceCarrier:"State Farm",medicalExpenses:15e3,lostWages:5e3,nonEconomicDamages:3e4,totalSettlement:5e4,timeToSettlement:180,litigated:!1,yearSettled:2023,keyFactors:["clear liability","complete treatment","good documentation"]},{caseType:"auto_accident",injuryType:"back_injury",jurisdiction:"Texas",insuranceCarrier:"Allstate",medicalExpenses:35e3,lostWages:12e3,nonEconomicDamages:75e3,totalSettlement:122e3,timeToSettlement:270,litigated:!0,yearSettled:2023,keyFactors:["disputed liability","surgery required","permanent impairment"]},{caseType:"slip_and_fall",injuryType:"fracture",jurisdiction:"New York",insuranceCarrier:"Travelers",medicalExpenses:28e3,lostWages:8500,nonEconomicDamages:42e3,totalSettlement:78500,timeToSettlement:210,litigated:!1,yearSettled:2022,keyFactors:["shared liability","full recovery","commercial property"]},{caseType:"auto_accident",injuryType:"tbi",jurisdiction:"Florida",insuranceCarrier:"Progressive",medicalExpenses:95e3,lostWages:45e3,nonEconomicDamages:35e4,totalSettlement:49e4,timeToSettlement:420,litigated:!0,yearSettled:2023,keyFactors:["clear liability","objective findings","expert testimony","life care plan"]},{caseType:"medical_malpractice",injuryType:"surgical_error",jurisdiction:"Illinois",insuranceCarrier:"The Doctors Company",medicalExpenses:125e3,lostWages:6e4,nonEconomicDamages:5e5,totalSettlement:685e3,timeToSettlement:540,litigated:!0,yearSettled:2022,keyFactors:["clear standard of care violation","permanent injury","multiple experts"]},{caseType:"product_liability",injuryType:"burn",jurisdiction:"Pennsylvania",insuranceCarrier:"CNA",medicalExpenses:75e3,lostWages:25e3,nonEconomicDamages:2e5,totalSettlement:3e5,timeToSettlement:365,litigated:!0,yearSettled:2023,keyFactors:["design defect","scarring","recalled product"]},{caseType:"auto_accident",injuryType:"soft_tissue",jurisdiction:"Georgia",insuranceCarrier:"GEICO",medicalExpenses:8500,lostWages:3e3,nonEconomicDamages:12e3,totalSettlement:23500,timeToSettlement:150,litigated:!1,yearSettled:2023,keyFactors:["minor impact","full recovery","gap in treatment"]},{caseType:"premises_liability",injuryType:"back_injury",jurisdiction:"Ohio",insuranceCarrier:"Liberty Mutual",medicalExpenses:42e3,lostWages:18e3,nonEconomicDamages:65e3,totalSettlement:125e3,timeToSettlement:300,litigated:!1,yearSettled:2022,keyFactors:["hazardous condition","prior complaints","aggravation of pre-existing condition"]}];var d=i(728),c=i(8370);async function p(e){try{var t;let i;let a=await e.json();console.log("Received form data:",JSON.stringify({hasPreExisting:a.hasPreExisting,preExistingType:a.preExistingType,preExistingConditions:a.preExistingConditions?.substring(0,30)+"...",preExistingDocumentation:a.preExistingDocumentation?.substring(0,30)+"...",hasParsedDocuments:!!a.documentData},null,2));let{clientName:r,accidentDate:o,accidentLocation:n,injuryDescription:p,medicalTreatment:m,medicalBills:u,lostWages:g,painSuffering:y,insuranceCompany:f,demandAmount:x,caseType:h="auto_accident",injuryType:v="soft_tissue",jurisdiction:b="",includeVisuals:w=!1,hasPreExisting:E=!1,preExistingConditions:S="",preExistingType:T="",preExistingDocumentation:$="",liabilityStrength:k="clear_fault",calculateOnly:P=!1,documentData:D=null}=a,M=!0===E||"true"===E;console.log("hasPreExisting after processing:",M);let j=parseFloat(u)||0,_=parseFloat(g)||0,A=parseFloat(x)||0,C=x?A:function(e,t,i,a,r,o,n=!1){let s=l.filter(i=>i.caseType===e&&i.injuryType===t&&(!r||i.jurisdiction===r)&&(!o||i.insuranceCarrier===o));if(0===s.length)return(i+a)*(({soft_tissue:1.5,whiplash:2,back_injury:3,fracture:3.5,tbi:5,surgical_error:4,burn:3.5})[t]||2);let d=s.reduce((e,t)=>e+t.totalSettlement/(t.medicalExpenses+t.lostWages),0)/s.length;return 500*Math.ceil((i+a)*(n?.85*d:d)/500)}(h,v,j,_,b,f,M);if(P)return s.NextResponse.json({success:!0,suggestedDemandAmount:C});let L=l.filter(e=>e.caseType===h&&e.injuryType===v).slice(0,3),I={"State Farm":["Likely to make low initial offers","Often disputes causation of injuries","May delay settlement until close to trial"],Allstate:["Known for 'deny, delay, defend' strategy","Often challenges medical necessity of treatment","May use computer software to evaluate claims"],GEICO:["Quick to offer settlements on clear liability cases","Often disputes soft tissue injury values","May respond well to detailed medical documentation"],Progressive:["Often makes quick, low offers hoping for acceptance","May contact claimants directly to negotiate","More likely to settle before litigation"],"Liberty Mutual":["Typically begins with offers below market value","Often disputes the need for future treatment","More likely to negotiate reasonably with firm deadlines"],Travelers:["Generally professional in claim handling","May focus on gaps in treatment or pre-existing conditions","More likely to settle cases with strong liability evidence"]}[f]||["Evaluate initial offers carefully","Document all communications","Be prepared for standard delay tactics"],O=b?({California:["Pure comparative negligence state","Two-year statute of limitations","No cap on non-economic damages for most cases"],Texas:["Modified comparative fault (51% bar)","Two-year statute of limitations","Caps on punitive damages"],Florida:["Pure comparative negligence state","Four-year statute of limitations","PIP state requiring serious injury threshold for pain and suffering"],"New York":["Pure comparative negligence state","Three-year statute of limitations","No-fault state with serious injury threshold"],Illinois:["Modified comparative fault (51% bar)","Two-year statute of limitations","No caps on damages"]})[b]||["Research specific statutes of limitations","Verify comparative negligence standards","Check for caps on non-economic damages"]:[],N=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),F="";if(w){let e;let t=[{date:o,event:"Date of Accident",details:"Injury occurred at "+n},{date:new Date(new Date(o).getTime()+1728e5).toLocaleDateString(),event:"Initial Medical Treatment",details:"First medical evaluation"},{date:new Date(new Date(o).getTime()+2592e6).toLocaleDateString(),event:"Ongoing Treatment",details:m},{date:N,event:"Demand Letter Sent",details:"Formal demand for compensation"}],i=function(e){let t=[...e].sort((e,t)=>new Date(e.date).getTime()-new Date(t.date).getTime()),i=`
    <div style="font-family: Arial, sans-serif; margin: 20px 0; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 15px;">CASE TIMELINE</h3>
      <div style="position: relative; padding-left: 30px;">
  `;return t.forEach((e,a)=>{i+=`
      <div style="margin-bottom: 20px; position: relative;">
        <div style="position: absolute; left: -30px; width: 20px; height: 20px; background-color: #3498db; border-radius: 50%; top: 0;"></div>
        ${a<t.length-1?'<div style="position: absolute; left: -20px; top: 20px; bottom: 0; width: 2px; background-color: #3498db;"></div>':""}
        <div style="font-weight: bold;">${e.date}</div>
        <div style="font-weight: bold; margin: 5px 0;">${e.event}</div>
        ${e.details?`<div style="font-size: 0.9em; color: #555;">${e.details}</div>`:""}
      </div>
    `}),i+=`
      </div>
    </div>
  `}(t),a=function(e){let t=`
    <div style="font-family: Arial, sans-serif; margin: 20px 0; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 15px;">INJURY SEVERITY ASSESSMENT</h3>
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
  `;for(let i=1;i<=10;i++){let a=e.find(e=>e.level===i),r=a?a.color:"#e0e0e0",o=a?"border: 2px solid #333;":"";t+=`
      <div style="flex: 1; text-align: center; position: relative;">
        <div style="height: 20px; background-color: ${r}; margin: 0 1px; ${o}"></div>
        <div style="position: absolute; top: 25px; left: 50%; transform: translateX(-50%); font-size: 12px;">${i}</div>
      </div>
    `}return t+="</div>",e.forEach(e=>{t+=`
      <div style="margin-top: 10px; display: flex; align-items: center;">
        <div style="width: 20px; height: 20px; background-color: ${e.color}; margin-right: 10px;"></div>
        <div><strong>Level ${e.level}:</strong> ${e.description}</div>
      </div>
    `}),t+="</div>"}([{level:3,description:"Mild injury with minimal treatment",color:"#2ecc71"},{level:5,description:"Moderate injury requiring ongoing care",color:"#f39c12"},{level:8,description:"Severe injury with potential long-term effects",color:"#e74c3c"}]),r=parseFloat(y)||2*j,s=function(e,t,i){let a=e+t+i,r=(e/a*100).toFixed(1),o=(t/a*100).toFixed(1),n=(i/a*100).toFixed(1);return`
    <div style="font-family: Arial, sans-serif; margin: 20px 0; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 15px;">DAMAGES BREAKDOWN</h3>
      <div style="display: flex; height: 30px; margin-bottom: 15px; overflow: hidden; border-radius: 4px;">
        <div style="background-color: #3498db; width: ${r}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 5px;">Medical</div>
        <div style="background-color: #2ecc71; width: ${o}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 5px;">Lost Wages</div>
        <div style="background-color: #e74c3c; width: ${n}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 5px;">Pain & Suffering</div>
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="flex: 1;"><strong>Medical Expenses:</strong> $${e.toLocaleString()}</div>
        <div style="flex: 1; text-align: right;">${r}%</div>
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="flex: 1;"><strong>Lost Wages:</strong> $${t.toLocaleString()}</div>
        <div style="flex: 1; text-align: right;">${o}%</div>
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="flex: 1;"><strong>Pain & Suffering:</strong> $${i.toLocaleString()}</div>
        <div style="flex: 1; text-align: right;">${n}%</div>
      </div>
      <div style="display: flex; margin-top: 15px; border-top: 1px solid #ccc; padding-top: 10px;">
        <div style="flex: 1;"><strong>TOTAL DAMAGES:</strong> $${a.toLocaleString()}</div>
        <div style="flex: 1; text-align: right;">100%</div>
      </div>
    </div>
  `}(j,_,r),l=(e=`
    <div style="font-family: Arial, sans-serif; margin: 20px 0; border: 1px solid #ccc; padding: 20px; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 15px;">COMPARABLE SETTLEMENTS</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Case Type</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Injury</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Medical Expenses</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Settlement</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Multiplier</th>
          </tr>
        </thead>
        <tbody>
  `,L.forEach(t=>{let i=(t.totalSettlement/t.medicalExpenses).toFixed(2);e+=`
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${t.caseType.replace("_"," ")}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${t.injuryType.replace("_"," ")}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${t.medicalExpenses.toLocaleString()}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${t.totalSettlement.toLocaleString()}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${i}x</td>
      </tr>
    `}),e+=`
        </tbody>
      </table>
    </div>
  `);F=`
${i}

${a}

${s}

${l}
      `}let q=(t=[{title:"Medical Records",description:"Complete records from treating physicians"},{title:"Medical Bills",description:"Itemized billing statements totaling $"+j.toLocaleString()},{title:"Wage Loss Documentation",description:"Employer verification of lost income"},{title:"Photographic Evidence",description:"Images of injuries and accident scene"}],i=`
SUPPORTING DOCUMENTATION

The following documents are enclosed with this demand letter to substantiate our claims:

`,t.forEach((e,t)=>{i+=`${t+1}. ${e.title} - ${e.description}
`}),i),R=`Generate a professional demand letter for a ${h} case.

Client: ${r}
Insurance Company: ${f}
Date of Accident: ${o}
Location: ${n}
Jurisdiction: ${b}

Injury Description: ${p}
Medical Treatment: ${m}
Medical Bills: $${j.toLocaleString()}
Lost Wages: $${_.toLocaleString()}
Pre-existing Conditions: ${M?"Yes - "+S:"None"}

Demand Amount: $${C.toLocaleString()}

Make it persuasive, well-structured, professional, and appropriate for the jurisdiction (${b}).
Include proper formatting with date, address blocks, subject line, salutation, and signature block.
`;D&&(R+=`

The following documents have been uploaded and analyzed:
`,Object.entries(D).forEach(([e,t])=>{t.error||(R+=`- ${e} (${t.docType})
`)}),R+=`
Reference these documents appropriately in the demand letter to strengthen the case.`),O&&O.length>0&&(R+=`

Jurisdiction-specific considerations for ${b}:
`,O.forEach(e=>{R+=`- ${e}
`})),I&&I.length>0&&(R+=`

Consider these known tactics for ${f}:
`,I.forEach(e=>{R+=`- ${e}
`}));let U=(await c.ZP.analyzeData({formData:{clientName:r,accidentDate:o,accidentLocation:n,injuryDescription:p,medicalTreatment:m,medicalBillsNum:j,lostWagesNum:_,painSuffering:y,insuranceCompany:f,suggestedDemandAmount:C,caseType:h,injuryType:v,jurisdiction:b,hasPreExisting:M,preExistingConditions:S,preExistingType:T,preExistingDocumentation:$,liabilityStrength:k,jurisdictionInfo:O,carrierTactics:I,similarCases:L,documentData:D},analysisType:"custom",customPrompt:R})).result;w&&(U+=`

${F}`),U.includes("SUPPORTING DOCUMENTATION")||(U+=`

SUPPORTING DOCUMENTATION

${q}`),U&&(U=U.replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(/  /g,"&nbsp;&nbsp;"),console.log("Letter content length:",U.length));let z=await d._.handyLaw.create({data:{clientName:r,insuranceCompany:f,accidentDate:o,accidentLocation:n,injuryDescription:p,medicalTreatment:m,medicalBills:j,lostWages:_,painSuffering:y,demandAmount:C,caseType:h,injuryType:v,jurisdiction:b,includeVisuals:w,hasPreExisting:M,...M?{preExistingConditions:S,preExistingType:T,preExistingDocumentation:$}:{},liabilityStrength:k,letterContent:U,hasUploadedDocuments:!!D}});return s.NextResponse.json({success:!0,letterId:z.id,letter:U,letterContent:U,suggestedDemandAmount:C})}catch(e){return console.error("Error in generate-letter API:",e),s.NextResponse.json({success:!1,error:e instanceof Error?e.message:"Unknown error"},{status:500})}}let m=new r.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/generate-letter/route",pathname:"/api/generate-letter",filename:"route",bundlePath:"app/api/generate-letter/route"},resolvedPagePath:"C:\\Users\\abema\\OneDrive\\Desktop\\demandletter\\src\\app\\api\\generate-letter\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:u,staticGenerationAsyncStorage:g,serverHooks:y}=m,f="/api/generate-letter/route";function x(){return(0,n.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:g})}},728:(e,t,i)=>{i.d(t,{_:()=>o});let a=require("@prisma/client"),r=!1;try{r=!0}catch(e){console.warn("Error checking Prisma status:",e)}let o=r?{handyLaw:{create:async e=>{console.log("Mock Prisma: Creating HandyLaw entry",e);let{preExistingConditions:t="",preExistingType:i="",preExistingDocumentation:a="",hasUploadedDocuments:r=!1,...o}=e.data;return{id:Math.floor(1e3*Math.random()),...o,preExistingConditions:t,preExistingType:i,preExistingDocumentation:a,hasUploadedDocuments:r,createdAt:new Date,updatedAt:new Date}},findMany:async()=>(console.log("Mock Prisma: Finding HandyLaw entries"),[])},settlementData:{create:async e=>(console.log("Mock Prisma: Creating SettlementData entry",e),{id:Math.floor(1e3*Math.random()),...e.data}),findMany:async()=>(console.log("Mock Prisma: Finding SettlementData entries"),[])},HistoricalLetter:{create:async e=>(console.log("Mock Prisma: Creating HistoricalLetter entry",e),{id:Math.floor(1e3*Math.random()).toString(),...e.data,createdAt:new Date,updatedAt:new Date}),findMany:async()=>(console.log("Mock Prisma: Finding HistoricalLetter entries"),[])},$disconnect:async()=>{console.log("Mock Prisma: Disconnecting")},cleanup:async()=>(console.log("Mock Prisma: Cleanup function called"),!0)}:global.prisma||new a.PrismaClient},8370:(e,t,i)=>{i.d(t,{ZP:()=>n});var a=i(9712);let r={deepseek:{apiUrl:process.env.DEEPSEEK_API_URL||"https://api.deepseek.com/v1",models:{chat:"deepseek-chat",coder:"deepseek-coder"},defaultParams:{temperature:.5,max_tokens:1e3,top_p:.95,frequency_penalty:0,presence_penalty:0}},localStorage:{keys:{analysisHistory:"deepseek_analysis_history",userPreferences:"deepseek_user_preferences"},maxHistoryItems:10}};class o{constructor(){this.apiKey=process.env.DEEPSEEK_API_KEY||"",this.apiUrl=process.env.DEEPSEEK_API_URL||r.deepseek.apiUrl,this.models=r.deepseek.models,this.defaultParams=r.deepseek.defaultParams,this.apiKey||console.warn("DeepSeek API key not found in environment variables")}getHeaders(){return{Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json"}}async analyzeData(e){try{let t="";switch(e.analysisType){case"sentiment":t=`Analyze the sentiment of the following form data: ${JSON.stringify(e.formData)}`;break;case"classification":t=`Classify the following form data into appropriate categories: ${JSON.stringify(e.formData)}`;break;case"summary":t=`Provide a summary of the following form data: ${JSON.stringify(e.formData)}`;break;case"custom":t=e.customPrompt||"";break;default:throw Error("Invalid analysis type")}e.dataset&&(t+=`

Reference this dataset for analysis: ${JSON.stringify(e.dataset)}`);let i=await a.Z.post(`${this.apiUrl}/chat/completions`,{model:this.models.chat,messages:[{role:"system",content:"You are an AI assistant analyzing form data."},{role:"user",content:t}],temperature:this.defaultParams.temperature,max_tokens:this.defaultParams.max_tokens,top_p:this.defaultParams.top_p,frequency_penalty:this.defaultParams.frequency_penalty,presence_penalty:this.defaultParams.presence_penalty},{headers:this.getHeaders()});return{result:i.data.choices[0].message.content,metadata:{model:i.data.model,usage:i.data.usage}}}catch(e){throw console.error("Error analyzing data with DeepSeek API:",e.message),Error(`DeepSeek API error: ${e.message}`)}}}let n=new o}};var t=require("../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),a=t.X(0,[276,972,712],()=>i(8898));module.exports=a})();