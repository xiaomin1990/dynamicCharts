'use strict';

var config=require('config');
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;

var host = config.kafka.connectionString || '127.0.0.1:2181';
var client = new Client(host);
var interval=config.interval || 1000;
var argv = {}
var topic = config.kafka.topic || 'test';
var p = argv.p || 0;
var a = argv.a || 0;
var producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', function () {
	console.log('ready')
    setInterval(function(){
        var message = {x:(new Date()).getTime(),y:Math.random()}
        message=JSON.stringify(message);
        producer.send([
            { topic: topic, partition: p, messages: [message], attributes: a }
        ], function (err, result) {
            console.log(err || result);
        });
    },interval);
    
});

producer.on('error', function (err) {
    console.log('error', err)
});
