import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
  let blockchain;
  let blockchainB;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchainB = new Blockchain();
  });

  it('every blockchain has a genesis block', () => {
    const [genesisBlock] = blockchain.blocks;

    expect(genesisBlock).toEqual(Block.genesis);
    expect(blockchain.blocks.length).toEqual(1);
  });

  it('adds a new block', () => {
    const data = 'Sunday-11-February-2024-12:15';
    blockchain.addBlock(data);

    expect(blockchain.blocks.length).toEqual(2);
  });

  it('replace the chain with a valid chain', () => {
    blockchainB.addBlock('block-1');
    blockchain.replace(blockchainB.blocks);

    expect(blockchain.blocks).toEqual(blockchainB.blocks);
  });

  it('does not replace the chain with one with less blocks', () => {
    blockchain.addBlock('block-1');

    expect(() => {
      blockchain.replace(blockchainB.blocks);
    }).toThrowError('Received chain is not longer than current chain');
  });

  it('does not replace the chain with one is not valid', () => {
    blockchainB.addBlock('block-1');
    blockchainB.blocks[1].data = 'block-hacked';

    expect(() => {
      blockchain.replace(blockchainB.blocks);
    }).toThrowError('Received chain is invalid');
  });
});
