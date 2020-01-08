//送信用//////////////////////


//csv読み込み用
const fs = require('fs');
const csv = require('csv');
var csvdata;

fs.createReadStream(__dirname + '/higashi.csv')
  .pipe(csv.parse(function(err, data) {

        console.log(data);
        csvdata = Object.assign(data);

  }));
//







const dgram = require('dgram');

const PORT_A = 3002;
const HOST_A ='127.0.0.1';

const PORT_B = 3003;
const HOST_B ='127.0.0.1';


const socket = dgram.createSocket('udp4');

var count;
var json;
var i=0;

setInterval(() => {

	count = csvdata[i][10];
    count2 = csvdata[i][8];
    i++
	//count = 15 + Math.floor(Math.random()*5*10)/10;
    json={"num":count,"time":count2};
    json= JSON.stringify(json);
    const data = Buffer.from(String(json));
    socket.send(data, 0, data.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;
    });
}, 1000);

//socket.onでコンソールに表示
socket.on('message', (message, remote) => {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});

socket.bind(PORT_B, HOST_B);



