//受信用////////////////////

//http://127.0.0.1:8080/index.htmlにアクセス

var http = require('http');
var fs = require('fs');

var needle;
var time;


var server=http.createServer(function(req, res)
{

var url = req.url;
  console.log(url);
  console.log(req.method)

  if ("/index.html" == url)
  {
    fs.readFile("./index.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  } else if ("/raphael-2.1.4.min.js" == url)
  {
    fs.readFile("./raphael-2.1.4.min.js", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(data);
      //server間動作確認用
      //if(flg == 1){res.write(data.replace("//stt();","stt();"));}
      //else if(flg == 0){res.write(data.replace("//stp();","stp();"));};
      res.end();
    });
  }else if ("/justgage.js" == url)
  {
    fs.readFile("./justgage.js", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(data);
      //server間動作確認用
      //if(flg == 1){res.write(data.replace("//stt();","stt();"));}
      //else if(flg == 0){res.write(data.replace("//stp();","stp();"));};
      res.end();
    });
  }else if ("/common.js" == url)
  {
    fs.readFile("./common.js", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(data);
      //server間動作確認用
      //if(flg == 1){res.write(data.replace("//stt();","stt();"));}
      //else if(flg == 0){res.write(data.replace("//stp();","stp();"));};
      res.end();
    });
  }else if ("/common.css" == url)
  {
    fs.readFile("./common.css", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(data);
      //server間動作確認用
      //if(flg == 1){res.write(data.replace("//stt();","stt();"));}
      //else if(flg == 0){res.write(data.replace("//stp();","stp();"));};
      res.end();
    });
  }


}).listen(8080);




//送信側は相手先のipとportだけわかっていれば良い


const dgram = require('dgram');


//待ち受けport.ここが大事！//
//rx
const PORT_A = 4501;
const HOST_A = '192.168.11.26';
//const HOST_A = '127.0.0.1';


//tx
const PORT_B = 4502;
//const HOST_B = '192.168.11.38';
//const HOST_B = '100.73.0.145';
const HOST_B = '192.168.11.1';


const socket = dgram.createSocket('udp4');

//socket.onでコンソールに表示
socket.on('listening', () => {
    const address = socket.address();
    //socket確立して最初に表示される自分のipとport
    console.log('UDP socket listening on ' + address.address + ":" + address.port);
});

//socket.onでコンソールに表示
socket.on('message', (message, remote) => {

    //console.log(remote.address + ':' + remote.port +' - ' + message );
    console.log(message);
    //console.log("" + message);
    test = Object.assign(message);
    //console.log(remote.address + ':' + remote.port +' - ' + JSON.parse(message).num + " " + JSON.parse(message).time );
    //num = Object.assign(JSON.parse(message).num);
    //time = Object.assign(JSON.parse(message).time);
//bから受信したカウントアップmessageをsendでaにエコーバック
    /* socket.send(message, 0, message.length, PORT_B, HOST_B, (err, bytes) => {
        if (err) throw err;
    }); */
});

//待ち受けポートを指定
socket.bind(PORT_A, HOST_A);



//poling
var socketio = require('socket.io');
var io = socketio.listen(server);
io.sockets.on('connection', function(socket)
{
    socket.on('client_to_server', function(data) {
      //on:受信、emit:送信
        io.sockets.emit('server_to_client',test + "");
    });
});