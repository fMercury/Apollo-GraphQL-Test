'use strict';
let request = require('request')
let NodeCache = require("node-cache");
let myCache = new NodeCache();

const clientsURL = 'http://www.mocky.io/v2/5808862710000087232b75ac';

exports.getClients = function getClients(callback) {
    let myURL = clientsURL
    let value = myCache.get(myURL);
    if (value != undefined) {
        return callback(value);
    }
    if (value == undefined) {
        request({ url: myURL, json: true }, (error, response, body) => {
            if (error && response.statusCode === 500) {
                console.error(err.stack);
                return callback(undefined);
            }
            if (!error && response.statusCode === 200) {
                myCache.set(myURL, body.clients, 100000000)
                console.log(body.clients[0])
                return callback(body.clients);
            }
        })
    }
}

