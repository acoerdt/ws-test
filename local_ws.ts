import { WebSocketServer } from 'ws';
import axios from 'axios';
import { createReadStream } from 'fs';
import * as FormData from 'form-data';

const wss = new WebSocketServer({
  port: 5353,
});

wss.on('connection', ws => {
  console.log('connected');

  ws.on('message', async rawData => {
    const { event, data } = JSON.parse(rawData.toString());

    switch (event) {
      case 'scan':
        // scan here
        const formData = new FormData();
        // read scanned image
        formData.append('file', createReadStream('img.png'));
        formData.append('id', data.clientId);

        axios.post('http://localhost:3000', formData, {
          headers: formData.getHeaders(),
        });
        break;

      default:
        break;
    }
  });

  ws.on('close', function(close) {
    console.log('close');
  });
});
