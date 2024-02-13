import Block from '../blockchain/block';

export default (blockchain) => {
  const [genesisBlock, ...blocks] = blockchain;

  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) throw Error('Invalid Genesis block');

  for (let i = 0; i < blocks.length; i += 1) {
    const {
      timestamp, previusHash, hash, data,
    } = blocks[i];
    const previusBlock = blockchain[i];

    if (previusHash !== previusBlock.hash) throw Error('Invalid previous hash');
    if (hash !== Block.hash(timestamp, previusHash, data)) throw Error('Invalid hash');
  }

  return true;
};
