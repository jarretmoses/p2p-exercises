import fs from 'fs';
import pump from 'pump';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const source = fs.createReadStream(__filename);
const dest = fs.createWriteStream('./reader-output.txt');

pump(source, dest);
