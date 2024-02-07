import Block from './src/blockchain/block';

const { genesis } = Block;

const block1 = Block.mine(genesis);
const block2 = Block.mine(block1);
const block3 = Block.mine(block2);

console.log(genesis.toString());
console.log(block1.toString());
console.log(block2.toString());
console.log(block3.toString());
