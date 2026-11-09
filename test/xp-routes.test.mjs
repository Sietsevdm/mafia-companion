import test from 'node:test';
import assert from 'node:assert/strict';
import {xpRoutes} from '../web/calculations.mjs';
const crime={id:'test',available:true,expectedXp:100,energy:10,supply:2500,waitSeconds:180,xpEnergy:10};
test('XP routes include initial energy wait and omit cooldown after final attempt',()=>{
 const [q]=xpRoutes([crime],{gap:200,energy:0,interval:5});
 assert.equal(q.seconds,230);assert.equal(q.attempts,2);assert.equal(q.ammoCost,5000);
});
test('XP routes overlap regeneration and cooldown instead of adding both',()=>{
 assert.equal(xpRoutes([crime],{gap:200,energy:10,interval:30})[0].seconds,300);
 assert.equal(xpRoutes([crime],{gap:200,energy:20,interval:30})[0].seconds,180);
});
test('XP routes exclude locked crimes and rank by time without mutating quotes',()=>{
 const input=[crime,{...crime,id:'fast',expectedXp:200,xpEnergy:20},{...crime,id:'locked',available:false}];
 const routes=xpRoutes(input,{gap:200,energy:20,interval:30});
 assert.deepEqual(routes.map(q=>q.id),['fast','test']);assert.equal(input[0].id,'test');
 assert.equal(routes[0].sustainedXpHour,2400);
});
test('Reached targets require no attempts, energy, ammo or waiting',()=>{
 const [q]=xpRoutes([crime],{gap:0,energy:0,interval:30});
 assert.equal(q.seconds,0);assert.equal(q.attempts,0);assert.equal(q.energyRequired,0);assert.equal(q.ammoCost,0);
 assert.deepEqual(xpRoutes([],{gap:100,energy:0,interval:30}),[]);
});
