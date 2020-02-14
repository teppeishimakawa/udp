//送信用//////////////////////
const dgram = require('dgram');
/*
const PORT_A = 4502;
const HOST_A ='192.168.11.22';

const PORT_B = 4501;
const HOST_B ='192.168.11.26';

'153.142.15.213';
*/

//送信側は相手先のipとportだけわかっていれば良い

//ここが大事！//
const PORT_A = 3002;
const HOST_A ='192.168.11.22';

//以下はbind用
const PORT_B = 3003;
const HOST_B ='192.168.11.26';




const socket = dgram.createSocket('udp4');


var json;
//12:04:00からstart
var i=240;
//npmからCSVモジュールをインストール

//csv読み込み用
const fs = require('fs');
const csv = require('csv');
var csvdata1,csvdata2,csvdata3,csvdata4,csvdata5,csvdata6;
var count1,count2,count3,count4,count5,count6;
/*var csvurl=['/data/higashi_car1_gps.csv',
            '/data/higashi_car1_navi.csv',
            '/data/higashi_car2_gps.csv',
            '/data/higashi_car2_navi.csv',
            '/data/higashi_bikeb_gps.csv',
            '/data/higashi_bikeb_navi.csv'];*/


   fs.createReadStream(__dirname + '/data/higashi_car1_gps.csv')
    .pipe(csv.parse(function(err, data) {
        //console.log(data);
        csvdata1 = Object.assign(data);}));

   fs.createReadStream(__dirname + '/data/higashi_car1_navi.csv')
    .pipe(csv.parse(function(err, data) {
        //console.log(data);
        csvdata2 = Object.assign(data);}));

   fs.createReadStream(__dirname + '/data/higashi_car2_gps.csv')
    .pipe(csv.parse(function(err, data) {
        //console.log(data);
        csvdata3 = Object.assign(data);}));

   fs.createReadStream(__dirname + '/data/higashi_car2_navi.csv')
    .pipe(csv.parse(function(err, data) {
        //console.log(data);
        csvdata4 = Object.assign(data);}));

   fs.createReadStream(__dirname + '/data/higashi_bikeb_gps.csv')
    .pipe(csv.parse(function(err, data) {
        //console.log(data);
        csvdata5 = Object.assign(data);}));

   fs.createReadStream(__dirname + '/data/higashi_bikeb_navi.csv')
    .pipe(csv.parse(function(err, data) {
        //console.log(data);
        csvdata6 = Object.assign(data);}));

/*
const PORT_A = 3002;
const HOST_A ='127.0.0.1';

const PORT_B = 3003;
const HOST_B ='127.0.0.1';
*/

setInterval(() => {

var test1="2";
var test2="3";
//utf8:20 -> 文字:" " , utf8:30 -> 文字:"0"
	count1 = String.fromCharCode(0x02) + csvdata1[i][2] + String.fromCharCode(0x03);
    count1 = count1.replace("." , "");

    count2 = String.fromCharCode(0x02) + csvdata2[i][2]+ String.fromCharCode(0x03);
    count2 = count2.replace("." , "");

    count3 = String.fromCharCode(0x02) + csvdata3[i][2]+ String.fromCharCode(0x03);
    count3 = count3.replace("." , "");

    count4 = String.fromCharCode(0x02) + csvdata4[i][2]+ String.fromCharCode(0x03);
    count4 = count4.replace("." , "");

    count5 = String.fromCharCode(0x02) + csvdata5[i][2]+ String.fromCharCode(0x03);
    count5 = count5.replace("." , "");

    count6 = String.fromCharCode(0x02) + csvdata6[i][2]+ String.fromCharCode(0x03);
    count6 = count6.replace("." , "");


    socket.send(count1, 0, count1.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;});

    socket.send(count2, 0, count2.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;});

    socket.send(count3, 0, count3.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;});

    socket.send(count4, 0, count4.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;});

    socket.send(count5, 0, count5.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;});

    socket.send(count6, 0, count6.length, PORT_A, HOST_A, (err, bytes) => {
        if (err) throw err;});


console.log(csvdata1[i][1]);

    i++;
}, 1000);



socket.bind(PORT_B, HOST_B);



