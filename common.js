var socket = io.connect();

var needle_rx;

var test=null;

setInterval(function()
{
socket.emit("client_to_server", "poling");
socket.on("server_to_client", function(data)
  {
    //console.log(data);
    needle_rx = Object.assign(data);

  });

},1000);




    var g = new JustGage
    ({
    id: "gauge",
    value:0,
    min: 15,
    max: 25,
    title: "Speed",
    label: "KM",
    //startAnimationTime: 1000,
    startAnimationType: "bounce",
    decimals: 1,
    pointer: true,
    gaugeWidthScale: 0.3,
    //levelColors:["#a9d70b", "#f9c802", "#ff0000"],
    customSectors: [{
        color: '#ff0000',
        lo: 21,
        hi: 25,
    }, {
        color: '#ff7f50',
        lo: 19,
        hi: 21,
    }, {
        color: '#ffd700',
        lo: 17,
        hi: 19,
    }, {
        color: '#66cdaa',
        lo: 15,
        hi: 17,
    }],
    });


    setInterval(() => {
  g.refresh(needle_rx);
  console.log(needle_rx);
}, 1000)

