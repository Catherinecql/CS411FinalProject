'use strict'

var express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

var app = express();
app.use(bodyParser.json())

var connection = mysql.createConnection({
	host:'192.17.90.133',
	user:'databusters_admin',
	password:'databusters',
	database:'databusters_db'
	//port:'3306'
});

connection.connect(function(err) {
	if (err) throw err;
});



app.get('/everything', function (req, res) {
		console.log("connected to mysql")	
		connection.query("select * from Professor",function (error, result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
	})
	
});

app.get('/courses', function (req, res) {
		console.log("connected to mysql")	
		connection.query("select * from Professor",function (error, result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
	})
	
});


app.post('/addCourseToUser', (req, res) => {
		console.log("connected to mysql");
		var sql = "insert into takes(username,courses) values ('" + req.body.username + "','" + req.body.title + "')";
		console.log(sql);
		connection.query(sql, function(error,result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
	})
});

app.post('/changeCoursesOfUser', (req, res) => {
		var courses = req.body.courses; // array of courses
		var username = req.body.username;
		var sql = "UPDATE takes SET courses = '" + courses + "' WHERE username = '" + username + "';";
		console.log(sql);
		connection.query(sql, function(error,result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
	})
});

var port = process.env.PORT || 7002

app.listen(port)
console.log('Server running on port ' + port);