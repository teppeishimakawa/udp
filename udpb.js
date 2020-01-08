//送信用

const dgram = require('dgram');

const PORT_A = 3002;
const HOST_A ='127.0.0.1';

const PORT_B = 3003;
const HOST_B ='127.0.0.1';


const socket = dgram.createSocket('udp4');

var count;
var json;

setInterval(() => {
	count = 15 + Math.floor(Math.random()*5*10)/10;
    json={"time":new Date(),"value":count};
    json= JSON.stringify(json);
    const data = Buffer.from(String(json));
    socket.send(data, 0, data.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;
    });
}, 500);

//socket.onでコンソールに表示
socket.on('message', (message, remote) => {
    console.log(remote.address + ':' + remote.port +' - ' + message);
});

socket.bind(PORT_B, HOST_B);



