var redis = require('redis');
var rclient = redis.createClient();

function set(key, value, callback) {
    rclient.set(key, value, function(err, res) {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    });
}

function get(key, callback) {
    rclient.get(key, function(err, res) {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    });
}

function expire(key, seconds) {
    rclient.expire(key, seconds);
}

function quit() {
    rclient.quit();
}

module.exports = {
    get: get,
    set: set,
    expire: expire,
    quit: quit,
    redisPrint: redis.print
}
