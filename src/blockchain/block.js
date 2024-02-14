import { format } from 'date-fns';
import { SHA256 } from 'crypto-js';

class Block {
  constructor(timestamp, previusHash, hash, data) {
    this.timestamp = timestamp;
    this.previusHash = previusHash;
    this.hash = hash;
    this.data = data;
  }

  static get genesis() {
    const timestamp = (new Date(2024, 0, 1)).getTime();
    const startData = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    const hash = this.hash(timestamp, undefined, startData);

    return new this(timestamp, undefined, hash, startData);
  }

  static mine(previusBlock, data) {
    const { hash: previusHash } = previusBlock;
    const timestamp = Date.now();
    const hash = Block.hash(timestamp, previusHash, data);

    return new this(timestamp, previusHash, hash, data);
  }

  static hash(timestamp, previusHash, data) {
    return SHA256(`${timestamp}${previusHash}${data}`).toString();
  }

  toString() {
    const {
      timestamp,
      previusHash,
      hash,
      data,
    } = this;

    return `Block - 
      timestamp:           ${timestamp}
      previusHash:         ${previusHash}
      hash:                ${hash}
      data:                ${data}`;
  }
}

export default Block;
