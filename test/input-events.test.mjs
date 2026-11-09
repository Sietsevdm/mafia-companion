import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {parseNumericInput} from '../web/numeric-input.mjs';
test('typing leaves the draft untouched; committing saves a parsed number and defers rendering',()=>{
 const source=readFileSync(new URL('../web/app.mjs',import.meta.url),'utf8');
 const handlers={},tasks=[],state={planner:{target:100}};
 let renders=0,saves=0;
 const context={document:{addEventListener:(name,fn)=>handlers[name]=fn},state,defaults:{planner:{target:100}},parseNumericInput,normalize(){},save(){saves++},render(){renders++},setTimeout:fn=>tasks.push(fn)};
 vm.runInNewContext(source.slice(source.indexOf("document.addEventListener('change'"),source.indexOf('function openProfile')),context);
 const field={dataset:{group:'planner',key:'target'},type:'text',value:'1,234,567',hasAttribute:name=>name==='data-numeric',setCustomValidity(){},reportValidity(){}};
 handlers.input({target:field});
 assert.equal(state.planner.target,100);assert.equal(tasks.length,0);assert.equal(renders,0);
 handlers.change({target:field});
 assert.equal(state.planner.target,1234567);assert.equal(saves,1);assert.equal(renders,0);
 tasks[0]();assert.equal(renders,1);
 field.value='';handlers.change({target:field});assert.equal(state.planner.target,1234567);
});
