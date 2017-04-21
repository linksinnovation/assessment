'use strict';

require('es6-promise').polyfill();
var path = require('path');
var args = require('minimist')(process.argv.slice(2));

var allowedEnvs = ['dev', 'dist'];

var env;
if (args.env) {
    env = args.env;
} else {
    env = 'dev';
}

var configs = {
    dist: require(path.join(__dirname, 'cfg/dist')),
    dev: require(path.join(__dirname, 'cfg/dev'))
};

function getValidEnv(env) {
    var isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
    return isValid ? env : 'dev';
}

function buildConfig(env) {
    var usedEnv = getValidEnv(env);
    return configs[usedEnv];
}

module.exports = buildConfig(env);
