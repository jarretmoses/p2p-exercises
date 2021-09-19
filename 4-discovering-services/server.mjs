import net from 'net';
import fs from 'fs';
import pump from 'pump';
import DC from 'discovery-channel';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const channel = DC({ dht: false });

const __filename = fileURLToPath(import.meta.url);

const server = net.createServer(socket => {
  const stream = fs.createReadStream(__filename);
  pump(stream, socket);
});

server.listen(() => {
  const { port } = server.address();
  const channelId = process.argv[2];


  channel.join(channelId, port, () => {
    console.log('Channel open on port: ', port);
  });
});
