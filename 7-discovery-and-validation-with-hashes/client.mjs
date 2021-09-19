import net from 'net';
import fs from 'fs';
import { dirname } from 'path';
import pump from 'pump';
import DC from 'discovery-channel';
import hasher from 'hash-of-stream';

const channel = DC({ dht: false });
const channelId = process.argv[2];

const __dirname = dirname(import.meta.url);

channel.join(channelId);

channel.once('peer', (id, { port }) => {
  const socket = net.connect(port);

  const fileName = `file-${Date.now()}.js`;
  const fileStream = fs.createWriteStream(fileName);

  pump(socket, fileStream, (err) => {
    if (err) throw err
    const readFileStream = fs.createReadStream(fileName);

    hasher(readFileStream, (hash) => {
      console.log('Do hashes match?: ', hash === channelId);

      channel.destroy();
    });
  });
});
