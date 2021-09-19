import net from 'net';
import fs from 'fs';
import pump from 'pump';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const PORT = 3001;

const server = net.createServer(socket => {
  const stream = fs.createReadStream(__filename);

  pump(stream, socket);
});

server.listen(PORT, () => console.log('Connected...'));
