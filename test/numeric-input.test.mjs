import test from 'node:test';
import assert from 'node:assert/strict';
import {parseNumericInput as parse} from '../web/numeric-input.mjs';
test('pasted grouped values and decimal commas are parsed',()=>{
 for(const [input,value] of [['1,234,567',1234567],['1,234.56',1234.56],['12,5',12.5],['1.234,56',1234.56],[' 1 234 ',1234],['0',0],['.5',.5]])assert.equal(parse(input),value,input);
});
test('empty and malformed drafts are rejected rather than saved as zero',()=>{
 for(const input of ['', '-', '1,,2','12abc','Infinity'])assert.equal(parse(input),null,input);
});
