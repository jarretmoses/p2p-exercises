import net from 'net';
import fs from 'fs';
import { dirname } from 'path';
import pump from 'pump';
import DC from 'discovery-channel';

const channel = DC({ dht: false });
const channelId = process.argv[2];

const __dirname = dirname(import.meta.url);

channel.join(channelId);

channel.once('peer', (id, { port }) => {
  const socket = net.connect(port);

  const fileName = `file-${Date.now()}.txt`;
  const fileStream = fs.createWriteStream(fileName);

  pump(socket, fileStream, (err) => {
    if (err) throw err

    channel.destroy();
  });
})
