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
});

connection.connect(function(err) {
	if (err) throw err;
});


// 1. Add a new user
app.post('/adduser', (req, res) => {
		var username = req.body.username;
		var password = req.body.password;
		var email = req.body.email;
		var sql = "insert into User(username,password,email,grad_sem,major,courses_taken) values ('" + username + "','" + password + "','" + email + "','', '', '')";
		console.log(sql);
		connection.query(sql, function(error,result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
	})
});

// 2. Delete a user
app.delete('/deleteuser', (req, res) => {
		var username = req.body.username;
		var sql = "delete from User WHERE username = '" + username + "';";
		console.log(sql);
		connection.query(sql, function(error,result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
	})
});

// 3. Update courses, major, and graduation semester (Save button)
app.put('/updateuser', (req, res) => {
		var username = req.body.username;
		var courses_taken = req.body.courses_taken;
		var major = req.body.major;
		var grad_sem = req.body.grad_sem;
		var sql = "UPDATE User SET courses_taken = '" + courses_taken + "', major = '" + major + "', grad_sem = '" + grad_sem + "' WHERE username = '" + username + "';";
		connection.query(sql, function(error,result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
	})
});


// 4. Show classes the user’s has taken
app.get('/gettakenclasses/:username', function (req, res) {
		var username = req.params.username;
		console.log(username);
		connection.query("select courses_taken from User WHERE username = '" + username + "';",function (error, result,fields){
			if(error) throw error;
			console.log(result)
			res.send(result)
	})
});


var port = process.env.PORT || 7002

app.listen(port)
console.log('Server running on port ' + port);