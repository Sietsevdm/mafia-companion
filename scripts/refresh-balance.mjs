import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';

// Run against a separate, trusted game checkout. Never modifies the game files.
const game=resolve(process.argv[2]||'../audit-latest-game');
const load=file=>import(pathToFileURL(resolve(game,file)));
const [{catalog,crimes,ranks},{employees},{crewMissions},{dailyJobs},{investmentTerms},{operationSupply,AMMO_PRICE}]=await Promise.all([
  load('catalog.js'),load('city-expansion.js'),load('crew-operations.js'),load('daily.js'),load('investments.js'),load('logistics.js')
]);
const target=new URL('../web/data.json',import.meta.url);
const old=JSON.parse(await readFile(target,'utf8'));
const revision=execFileSync('git',['rev-parse','HEAD'],{cwd:game,encoding:'utf8'}).trim();
const data={...old,revision,checked:process.argv[3]||new Date().toISOString().slice(0,10),gameVersion:JSON.parse(await readFile(resolve(game,'package.json'),'utf8')).version,
  crimes:crimes.map(c=>({...c,...operationSupply('crime',c)})),ranks,assets:catalog,employees,teams:crewMissions,
  daily:dailyJobs.map(j=>({...j,task:j.description})),investmentTerms:investmentTerms.map(t=>({hours:t.hours,min:t.minBps/100,max:t.maxBps/100})),ammoPrice:AMMO_PRICE};
await writeFile(target,JSON.stringify(data,null,2)+'\n');
console.log(`Refreshed ${crimes.length} crimes, ${catalog.length} assets, ${employees.length} employees, ${ranks.length} ranks, ${crewMissions.length} team missions and ${dailyJobs.length} daily objectives at ${revision}.`);
