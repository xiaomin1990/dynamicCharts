var env = GLOBAL.env = {};

var lingo = require('lingo');

var ENV_PREFIX='chartEnv_'

Object.keys(process.env).forEach(function(key) {
  if (key.indexOf(ENV_PREFIX) !== 0) {
    return;
  }
  env[lingo.camelcase(key.replace(ENV_PREFIX, '').toLowerCase().replace(/_/g, ' '))] = process.env[key];
});

var mergeObject = function(obj1, obj2) {
  Object.keys(obj2).forEach(function(key) {
    obj1[key] = obj2[key];
  });
};

mergeObject(GLOBAL,{});

GLOBAL.ChartsConsumer=require('./kafka').consumer;

