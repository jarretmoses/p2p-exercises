import { createHash } from 'crypto';

const hashFunc = createHash('sha256');

const data = 'Web Rebels 2017';
const expectedHash = 'a25cc4405386d2abaf835b8f57710de683cb99f6e7833c4cd59b6d57f0171877';


const hash = hashFunc.update(data).digest('hex');

console.log('Are the hashes equal?: ', hash === expectedHash);
