const Block = require('./block');

let block = new Block('1', '2', '3', '4');

console.log(block.toString());
console.log(Block.mineBlock(Block.genesis(),'abcd').toString());