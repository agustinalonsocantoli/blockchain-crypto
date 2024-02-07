import { add } from 'date-fns';
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
    const startData = new Date();
    const hash = this.hash(timestamp, undefined, startData);

    return new this(timestamp, undefined, hash, startData);
  }

  static mine(previusBlock) {
    const addDateTime = {
      years: 0,
      months: 0,
      weeks: 0,
      days: 2,
      hours: 2,
      minutes: 30,
      seconds: 0,
    };
    const timestamp = Date.now();
    const { hash: previusHash, data: previusData } = previusBlock;
    const data = add(new Date(previusData), addDateTime);
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
