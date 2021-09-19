import fs from 'fs';
import pump from 'pump';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createHash } from 'crypto';

const hashFunc = createHash('sha256');
const __filename = fileURLToPath(import.meta.url);

const source = fs.createReadStream(__filename);

source.on('data', (stream) => {
  const data = String(stream);

  console.log(hashFunc.update(data).digest('hex'));
})
