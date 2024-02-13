import Blockchain from '../blockchain/blockchain';
import validate from './validate';

describe('validate', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('validates a valid chain', () => {
    blockchain.addBlock('block-1');
    blockchain.addBlock('block-2');

    expect(validate(blockchain.blocks)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    blockchain.blocks[0].data = 'bad data';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid Genesis block');
  });

  it('invalidates a chain with a corrupt previousHash within a block', () => {
    blockchain.addBlock('block-1');
    blockchain.blocks[1].previusHash = 'evil-previusHash';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid previous hash');
  });

  it('invalidates a chain with a corrupt hash within a block', () => {
    blockchain.addBlock('block-1');
    blockchain.blocks[1].hash = 'evil-hash';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid hash');
  });
});
