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

// connection.connect(function(err){
// 	if(err) throw err;
// 	console.log("connected to mysql")	
	
// })

app.get('/everything', function (req, res) {
	connection.connect(function(err){
		if(err) throw err;
		console.log("connected to mysql")	
		connection.query("select * from Professor",function (error, result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
		})
	})
	
})


var port = process.env.PORT || 7002

app.listen(port)
console.log('Server running on port ' + port);