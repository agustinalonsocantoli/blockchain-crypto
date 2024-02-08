import { format } from 'date-fns';
import Block from './block';

describe('Block', () => {
  let timestamp;
  let previusBlock;
  let hash;
  let data;

  beforeEach(() => {
    timestamp = new Date(2024, 0, 1);
    previusBlock = Block.genesis;
    hash = Block.hash(timestamp, previusBlock.hash, format(new Date(), 'EEEE-dd-MMMM-uuuu-HH:mm'));
    data = new Date(2024, 0, 1);
  });

  it('create an instance with parameters', () => {
    const block = new Block(timestamp, previusBlock.hash, hash, data);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previusHash).toEqual(previusBlock.hash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  it('use static mine()', () => {
    const block = Block.mine(previusBlock, data);

    expect(block.hash.length).toEqual(64);
    expect(block.previusHash).toEqual(previusBlock.hash);
    expect(data).toEqual(data);
  });

  it('use static hash()', () => {
    hash = Block.hash(timestamp, previusBlock.hash, data);
    const hashOutput = 'f2c0eadcb1c6bbe56579143b1c2fbc4306ae985cab10a1226b37d5e347c03be2';

    expect(hash).toEqual(hashOutput);
  });

  it('use toString()', () => {
    const block = Block.mine(previusBlock, data);

    expect(typeof block.toString()).toEqual('string');
  });
});
