import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {rankAt,multipliers,crimeQuote,businessQuote,tradeQuote,rankInvestmentLimit} from '../web/calculations.mjs';
const game=resolve(process.argv[2]||'../audit-latest-game');
const load=file=>import(pathToFileURL(resolve(game,file)));
const [{catalog,crimes,ranks,purchasePrice},{progression,prestigeThreshold,passiveMultiplier,rankInvestmentLimit:limit},{operationSupply},{expectedFreightRevenue},{employees},{dailyJobs},{crewMissions},{investmentTerms}]=await Promise.all([
 load('catalog.js'),load('progression.js'),load('logistics.js'),load('freight-inspections.js'),load('city-expansion.js'),load('daily.js'),load('crew-operations.js'),load('investments.js')
]);
const data=JSON.parse(await readFile(new URL('../web/data.json',import.meta.url),'utf8'));
assert.deepEqual(data.crimes,crimes.map(c=>({...c,...operationSupply('crime',c)})));
assert.deepEqual(data.assets,catalog);assert.deepEqual(data.ranks,ranks);assert.deepEqual(data.employees,employees);
assert.deepEqual(data.teams,crewMissions);assert.deepEqual(data.daily,dailyJobs.map(j=>({...j,task:j.description})));
assert.deepEqual(data.investmentTerms,investmentTerms.map(t=>({hours:t.hours,min:t.minBps/100,max:t.maxBps/100})));
let cases=0;
const near=(a,b)=>assert.ok(Math.abs(a-b)<=Math.max(1,Math.abs(b))*1e-12,`${a} != ${b}`);
const levels=[...ranks.map(r=>r.xp),prestigeThreshold(1),prestigeThreshold(5),prestigeThreshold(20)];
for(const xp of levels)for(const supporter of [1,1.07,1.15])for(const sunday of [false,true])for(const married of [false,true]){
 const profile={xp,supporter,sunday,married,respectPoints:150,certifiedOriginals:6,reward:12,cooldown:15,weapon:3,owns:['business','car','home','jet','helicopter','yacht'],server:1};
 const rank=progression(xp),m=multipliers(data.ranks,profile),common=(married?1.05:1)*(supporter*(sunday?1.5:1)),standing=rank.incomeMultiplier*1.05*1.02;
 near(rankAt(ranks,xp).incomeMultiplier,rank.incomeMultiplier);assert.equal(rankAt(ranks,xp).distinctions,rank.distinctions);
 near(m.employee,common);near(m.business,passiveMultiplier(standing)*common);assert.equal(rankInvestmentLimit(rank.rankLevel),limit(rank.rankLevel));
 for(const [i,c]of crimes.entries()){
  const q=crimeQuote(c,i,ranks,profile),p=Math.min(.95,c.chance+rank.crimeChanceBonus),success=Math.floor(c.xp*common*rank.rankCrimeXpMultiplier*rank.crimeXpMultiplier),big=Math.floor(c.xp*3*common*rank.rankCrimeXpMultiplier*rank.crimeXpMultiplier),fail=Math.floor(20*common);
  near(q.expectedXp,.05*big+.95*(p*success+(1-p)*fail));assert.equal(q.ammo,operationSupply('crime',c).ammo);assert.equal(q.available,xp>=c.requiredXp);
  const factor=standing*common*1.12,base=(Math.floor(c.reward*factor)+Math.floor(c.reward*1.4*factor))/2,bonus=(Math.max(1,Math.floor(c.reward*.05*factor))+Math.max(Math.max(1,Math.floor(c.reward*.05*factor)),Math.floor(c.reward*.25*factor)))/2;
  near(q.gross,c.id==='car'?.95*(1-p)*bonus:.95*(p*base+bonus)+.05*3*(base+bonus));cases++;
 }
 for(const a of catalog.filter(a=>a.category==='business'))for(const n of [0,1,9])assert.equal(businessQuote(a,n,1,'stable').cost,purchasePrice(a,n));
}
for(const units of [1,2,3,4,7,100,1000])for(const risk of [0,.04,.5,1]){
 const sale=1500000,q=tradeQuote({sale,cost:1e6,freight:50000,travel:0,risk:risk*100,hours:8,units});near(q.expectedProfit,expectedFreightRevenue(sale,risk,units)-1050000);cases++;
}
console.log(`Verified ${cases} crime/freight scenarios, rank and distinction formulas, business copy prices and every snapshot catalog against the separate game checkout.`);
