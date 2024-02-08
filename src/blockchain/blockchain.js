import Block from './block';

class Blockchain {
  constructor() {
    this.blocks = [Block.genesis];
  }

  addBlock(data) {
    const previusBlock = this.blocks[this.blocks.length - 1];
    const block = Block.mine(previusBlock, data);

    this.blocks.push(block);

    return block;
  }
}

export default Blockchain;
