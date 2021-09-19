import http from 'http';
import fs from 'fs';
import pump from 'pump';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const server = http.createServer((req, res) => {
  const source = fs.createReadStream(__filename);

  source.on('data', (data) => {
    res.end(data.toString());
  });
});

server.listen(PORT, () => console.log('Connected...'));
