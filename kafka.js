'use strict';

var config=require('config');
var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var HighLevelConsumer = kafka.HighLevelConsumer;
var Offset = kafka.Offset;
var Client = kafka.Client;
var argv = {};
var topic = config.kafka.topic || 'test';
var host = config.kafka.connectionString || '127.0.0.1:2181';
var client = new Client(host);

var topics = [
        {topic: topic, partition: 1},
        {topic: topic, partition: 0}
    ],
    options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024*1024 };


var consumer = new HighLevelConsumer(client, topics, options);

var offset = new Offset(client);

//consumer.setOffset('test', 0, 0);

consumer.on('error', function (err) {
    console.log('error', err);
});

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/

exports.consumer=consumer;