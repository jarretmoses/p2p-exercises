import net from 'net';
import fs from 'fs';
import pump from 'pump';
import DC from 'discovery-channel';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import hasher from 'hash-of-stream';

const channel = DC({ dht: false });

const __filename = fileURLToPath(import.meta.url);

const server = net.createServer(socket => {
  const stream = fs.createReadStream(__filename);
  pump(stream, socket);
});

server.listen(() => {
  const stream = fs.createReadStream(__filename);
  const { port } = server.address();

  hasher(stream, (channelIdHash) => {
    channel.join(channelIdHash, port, () => {
      console.log('Channel open id: ', channelIdHash);
    });
  });
});
