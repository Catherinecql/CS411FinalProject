'use strict'

var express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

var app = express();

var connection = mysql.createConnection({
	host:'192.17.90.133',
	user:'databusters_admin',
	password:'databusters',
	database:'databusters_db'
	//port:'3306'
})

connection.connect(function(err){
	if(err) throw err;
	console.log("connected to mysql")
	
	connection.query("select * from Professor",function (err, result,fields){
		if(err) throw err;
		console.log(result)
	})
	
})
var port = process.env.PORT || 7002

app.listen(port)
console.log('Server running on port ' + port);