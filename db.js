/*
 * Database Model and Other Operations
 * Team pclubGU
 * The MIT License
 */
var m = require('rethinkdb'),
    dbconf = require('./config').db,
    useConnPooling = false,
    connPool = null;

function connection(callback) {
        if(useConnPooling) {
                console.log("[LOGINFO] Starting a Pooled connection");
                connPool.acquire(function(err, conn) {
                        if(err) {
                                callback(err);
                        }
                        else {
                                console.log("[LOGINFO] Pooled a connection %s", conn._id);
                        }
                });
        }

        else {
                r.connect({
                        host: dbconf.host,
                        port: dbconf.port
                }, function(err, conn) {
                        if(err) {
                                console.log("[LOGERR] Couldnot connect to the port %s", dbconf['host'], dbconf['port']);
                                callback(err);
                        }
                        else {
                                conn.use(dbconf.db);
                                console.log("[LOGINFO] Connected");
                                callback(null, conn);
                        }
                });
        }
}

function free(conn) {
        console.log("[LOGINFO] Releasing the connection %s", conn._id);
        if(useConnPooling) {
                connPool.release(conn);
        }
        else {
                conn.close();
        }
}

function md5(str) {
        return crypto.createHash('md5').update(str).digest('hex');
}

function gensalt() {
        crypto.randomBytes('256', function(err, buf) {
                if(err) throw err;
                return buf;
        });
}

function saltandhash(pass, callback) {
        var salt = gensalt();
        callback(salt, md5(pass + salt));
}

function validate(pass, passwithhash, callback) {
        var salt = passwithhash.substr(0, 10);
        var newhash = salt + md5(pass + salt);
        callback(null, passwithhash == newhash);
}

if(typeof dbconf.pool == 'object') {
        var g = require('generic-pool'),
            pool = g.Pool({
                    name: 'rethinkdb'),
                    min: dbconf.pool.min || 5,
                    max: dbconf.pool.max || 100,
                    log: dbconf.pool.log || true,
                    idleTimeoutMillis: dbconf.pool.idleTimeoutMillis || 60000,
                    reapIntervalMillis: dbconf.pool.reapIntervalMillis || 30000,
                    create: function(callback) {
                            r.connect({
                                    host: dbconf.host,
                                    port: dbconf.port
                            }, function(err,conn) {
                                    if(err) {
                                            var msg = "Connection failed !");
                                            console.log("[LOGERR] Couldn't connect to the rethinkdb pool");
                                            callback(new Error(msg));
                                    }
                                    else {
                                            var id = Math.floor(Math.random()*10000);
                                            conn.use(dbconf.db);
                                            console.log("[LOGINFO] connected to the database %s", dbconf.db);
                                            callback(null, conn);
                                    }
                            });
                    },
                    destroy: function(conn) {
                            console.log("[LOGINFO] connection has been closed");
                            conn.close(conn);
                    }
            })
}

module.exports.alogin = function(user, pass, callback) {
        connection(function(err, conn) {
                if(err) {
                        console.log("[LOGERR] %s:%s", err.name, err.msg);
                        return callback(null);
                }
                
                r.table("mainacc").filter({user: user}).run(conn, function(err, data) {
                        if(err) {
                                console.log("[LOGERR] Couldnot login %s:%s", err.name, err.msg);
                                return callback(null);
                        }
                        if(!data.hasNext()) {
                                console.log("[LOGERR] User %s not available", user);
                                release(conn);
                                return callback(null);
                        }
                        
                        data.next(function(err, res) {
                                if(err) {
                                        console.log("[OGERR] %s:%s", err.name, err.msg);
                                        callback(null);
                                }
                                else {
                                        if(data.pass === pass) {
                                                callback(res);
                                        }
                                        else {
                                                console.log("[LOGERR] User %s's password doesn't match", user);
                                                callback(null);
                                        }
                                }
                                release(conn);
                        });
                });
        });
}

module.exports.login = function(user, pass, callback) {
        connection(function(err, conn) {
                if(err) {
                        console.log("[LOGERR] %s:%s", err.name, err.msg);
                        callback(null);
                        return;
                }
                
                r.table("mainacc").filter({user: user}).limit(1).run(conn, function(err, data) {
                        if(err) {
                                console.log("[LOGERR] %s:%s", err.name, err.msg);
                                callback(null);
                        }
                        else {
                                if(data.hasNext()) {
                                        data.next(function(err, val) {
                                                if(err) {
                                                        console.log("[LOGERR] %s:%s", err.name, err.msg);
                                                        release(conn);
                                                }
                                                else {
                                                        validate(pass, val.pass, function(err, res) {
                                                                if(res) {
                                                                        callback(null, val);
                                                                }
                                                                else {
                                                                        callback("invalid password");
                                                                }
                                                                release(conn);
                                                        });
                                                }
                                        });
                                }
                                else {
                                        console.log("[LOGINFO] User %s not found, %s", err.name, err.msg);
                                        callback("user not found");
                                        release(conn);
                                }
                        }
                });
        });
}

module.exports.getData = function(callback) {
        connection(function(err, conn) {
                if(err) {
                        return callback(err);
                }
                
                r.table("accounts").run(conn, function(err, data) {
                        if(err) {
                                release(conn);
                                return callback(err);
                        }
                        
                        data.toArray(function(err, res) {
                                if(err) {
                                        callback(err);
                                }
                                else {
                                        callback(null, res);
                                }
                                release(conn);
                        });
                });
        });
}

module.exports.accAdd = function(callback) {
        console.log("somethig");
}

module.exports.accInfo = function(callback) {
        console.log("something");
}

module.exports.accUpdate = function(callback) {
        console.log("something");
}

module.exports.accDelete = function(callback) {
        console.log("something");
}


