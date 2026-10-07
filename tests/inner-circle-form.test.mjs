import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
async function run(file,mode='success',interests=['Memory Machine / guest-content capture','BEVCO / beverage placement']){
 const source=fs.readFileSync(new URL(file,root),'utf8');
 const start=source.indexOf('  async function submit('),end=source.indexOf('\n\n  return (',start);
 const code=source.slice(start,end).replace('event:FormEvent<HTMLFormElement>','event');
 const fields=new FormData(); fields.set('full_name','Synthetic QA'); fields.set('email','qa@example.invalid');
 for(const x of interests)fields.append('asset_interest',x);
 const state={loading:null,status:null,resets:0,requests:[]};
 const form={reset(){state.resets++}}; const event={currentTarget:form,preventDefault(){}};
 const context=vm.createContext({FormData:class{constructor(value){assert.equal(value,form);return fields}},setLoading:v=>state.loading=v,setStatus:v=>state.status=v,fetch:async(url,opts)=>{
  state.requests.push({url,body:JSON.parse(opts.body)}); event.currentTarget=null;
  if(mode==='network')throw Error('mock transport failure');
  return {ok:mode!=='rejected',json:async()=>{if(mode==='invalid-json')throw Error('invalid json');return mode==='rejected'?{error:'Validation failed'}:{success:true}}};
 }});
 const submit=vm.runInContext(code+'\nsubmit',context);
 try{await submit(event)}catch(e){state.error=e.message}
 return state;
}
let checks=0;
for(const interests of [[],['Memory Machine / guest-content capture'],['Memory Machine / guest-content capture','BEVCO / beverage placement']]){
 const s=await run('src/app/inner-circle/revenue-review/page.tsx','success',interests);
 assert.deepEqual(s.requests[0].body.form_data.asset_interest,interests);assert.equal(s.error,undefined);assert.equal(s.loading,false);assert.equal(s.status,'success');assert.equal(s.resets,1);
 assert.equal(s.requests[0].body.source,'inner-circle');assert.equal(s.requests[0].body.form_data.request_type,'venue_revenue_review');checks++;
}
for(const mode of ['network','rejected','invalid-json']){
 const s=await run('src/app/inner-circle/revenue-review/page.tsx',mode);assert.equal(s.error,undefined);assert.equal(s.loading,false);assert.equal(s.resets,0);assert.notEqual(s.status,'success');
 if(mode==='rejected')assert.equal(s.status,'Validation failed');else assert.match(s.status,/confirmation before submitting again/);checks++;
}
// Execute the actual same-origin handler with a mocked persistence request.
const route=fs.readFileSync(new URL('src/app/api/forms/submit/route.js',root),'utf8')
 .replace("import { NextResponse } from 'next/server';",'')
 .replace('export async function POST','async function POST');
let stored;
const routeContext=vm.createContext({process:{env:{}},NextResponse:{json:(body,options)=>({body,...options})},fetch:async(url,options)=>{
 stored=JSON.parse(options.body);return {ok:true,json:async()=>null};
},console});
const post=vm.runInContext(route+'\nPOST',routeContext);
const client=await run('src/app/inner-circle/revenue-review/page.tsx');
const result=await post({json:async()=>client.requests[0].body,headers:{get:()=>null}});
assert.equal(result.status,201);assert.equal(result.body.success,true);
assert.deepEqual(stored.form_data.asset_interest,client.requests[0].body.form_data.asset_interest);
assert.equal(stored.brand_key,'inner_circle');assert.equal(stored.workflow_status,'pending');
assert.equal(stored.form_data.request_type,'venue_revenue_review');
assert.equal(stored.form_data.sms_consent,undefined);assert.equal(stored.form_data.email_marketing_consent,undefined);
checks++;
console.log(`${checks} actual-source scenarios passed; mocked persistence, zero external requests`);
