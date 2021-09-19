import net from 'net';
import fs from 'fs';

import { dirname } from 'path';
import pump from 'pump';

const __dirname = dirname(import.meta.url);
const PORT = 3001;

const stream = net.connect(PORT, 'localhost');

stream.on('data', (data) => {
  console.log('DATA:::', data.toString())
});
