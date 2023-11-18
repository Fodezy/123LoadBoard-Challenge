//connect to the mysql database

export default function dbconnect(host, user, password) {
    var mysql = require('mysql');

    var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: 'SquashNoFriends',
    });

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
    
    return con;
}
