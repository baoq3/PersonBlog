var mysql = require("mysql");
var globalConfig = require("./config");
function createConnection(){
    return mysql.createConnection({
        host:globalConfig["host"],
        port:globalConfig["mysql_port"],
        user:globalConfig["mysql_user"],
        password:globalConfig["mysql_password"],
        database:globalConfig["mysql_database"]
    });
};

module.exports.createConnection = createConnection;


