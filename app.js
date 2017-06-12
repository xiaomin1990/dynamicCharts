require('./env');
var config=require('config');
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var port=config.port || 8001;

app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {

  ChartsConsumer.on('message', function (message) {
      console.log('message', message);
      consumerHandler(socket,message);

  });
});


function consumerHandler(socket,message){
    if(message &&  typeof(message)==='object'){
         let topic=message.topic;
         if(topic && topic=="test"){
            let _value=JSONParse(message.value);
            if(_value){
               socket.emit('message', { v: _value });
             }
         }
    }else{
       console.log('message format error','message:',message);
    }
}

function JSONParse(str){
    if(typeof(str)=="object"){
        return str;
    }
    if(!str){
        return {};
    }
    console.log('str,',str);
    try
    {
      return JSON.parse(str);
    }catch(err){
      console.log('JSONParse error');
    }
}