/*
 * Exporting Email and Database Config
 * Team pclubGU
 * The MIT License
 */
module.exports.db = {
        host: process.env.RDB_HOST || 'localhost',
        port: process.env.RDB_PORT || 28015,
        db: process.env.RDB_DB || 'ghost',
        pool: {
                min: 5,
                max: 100,
                log: true,
                idleTimeoutMillis: 60000,
                reapIntervalMillis: 30000
        }
}

module.exports.emailconfig = {
        uname: "akhilhector",
        pwd: "eatsleepcode123!@#",
        org: "www.gusaccarnival.org", 
}
