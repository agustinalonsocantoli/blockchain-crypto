import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('every blockchain has a genesis block', () => {
    const [genesisBlock] = blockchain.blocks;

    expect(genesisBlock).toEqual(Block.genesis);
    expect(blockchain.blocks.length).toEqual(1);
  });

  it('adds a new block', () => {
    const data = 'Sunday-11-February-2024-12:15';
    blockchain.addBlock(data);

    expect(blockchain.blocks[blockchain.blocks.length - 1].data).toEqual(data);
    expect(blockchain.blocks.length).toEqual(2);
  });
});
