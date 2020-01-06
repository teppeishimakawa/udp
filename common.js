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

},500);




    var g = new JustGage
    ({
    id: "gauge",
    value:0,
    min: 0,
    max: 25,
    title: "Speed",
    label: "KM",
    //startAnimationTime: 1000,
    startAnimationType: "bounce",
    decimals: 1,
    pointer: true,
    gaugeWidthScale: 0.3,
    customSectors: [{
        color: '#ff0000',
        lo: 50,
        hi: 100,
    }, {
        color: '#00ff00',
        lo: 0,
        hi: 50,
    }],
    });


    setInterval(() => {
  g.refresh(needle_rx);
}, 500)

