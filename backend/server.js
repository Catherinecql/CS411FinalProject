'use strict'

var express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

var app = express();

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var connection = mysql.createConnection({
	host:'192.17.90.133',
	user:'databusters_admin',
	password:'databusters',
	database:'databusters_db'
});

connection.connect(function(err) {
	if (err) throw err;
});


// 0. Verify password
app.post('/login', (req, res) => {
    var username = req.body.username;
    var input_password = req.body.password?req.body.password:"";
    connection.query("select password from User WHERE username = '" + username + "';",function (error, result,fields) {
		if(error) {
			var err_message = "Error: Login";
			res.status(403).send(err_message);
		}
		if(result.length == 0) {
			var err_message = "Error: Login failed: User not registered.";
			res.status(403).send(err_message);
		}
		else if(result[0].password == input_password) {
			var message = "Logged in";
			res.status(200).send(message);
		}
		else {
			var err_message = "Error: Login failed: Wrong password.";
			res.status(403).send(err_message);
		}
	})
});

// 1. Add a new user
app.post('/adduser', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var sql = "insert into User(username,password,email,grad_sem,major,courses_taken) values ('" + username + "','" + password + "','" + email + "','', '', '')";
	console.log(sql);
	connection.query(sql, function(error,result,fields){
		if(error) {
			var err_message = "Error: ER_DUP_ENTRY: Duplicate entry '" + username + "' for key 'PRIMARY'";
			res.status(403).send(err_message);
		}
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
		if(error) {
			var err_message = "Error: deleteuser";
			res.status(403).send(err_message);
		}
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
		if(error) {
			var err_message = "Error: updateuser";
			res.status(403).send(err_message);
		}
		console.log(result)
		res.send(result)
	})
});


// 4. Show classes the user’s has taken
app.get('/gettakenclasses/:username', function (req, res) {
	var username = req.params.username;
	console.log(username);
	connection.query("select courses_taken from User WHERE username = '" + username + "';",function (error, result,fields){
		if(error) {
			var err_message = "Error: gettakenclasses/" + username;
			res.status(403).send(err_message);
		}
		console.log(result)
		res.send(result)
	})
});


// 5. Add a new elective
app.post('/addelective', (req, res) => {
	var username = req.body.username;
	var elective_course = req.body.elective_course;
	var sql = "insert into takes(username,elective_course) values ('" + username + "','" + elective_course + "')";
	console.log(sql);
	connection.query(sql, function(error,result,fields){
		if(error){
			var err_message = "Error: ER_DUP_ENTRY: Duplicate entries '" + username + "' and '" + elective_course + "' for key 'PRIMARY'";
			res.status(403).send(err_message);
		}
		console.log(result)
		res.send(result)
	})
});


// 6. Delete an elective
app.delete('/deleteelective', (req, res) => {
	var elective_course = req.body.elective_course;
	var username = req.body.username;
	var sql = "delete from takes WHERE username = '" + username + "' AND elective_course = '" + elective_course + "';";
	console.log(sql);
	connection.query(sql, function(error,result,fields){
		if(error) {
			var err_message = "Error: deleteelective";
			res.status(403).send(err_message);
		}
		console.log(result)
		res.send(result)
	})
});






var port = process.env.PORT || 7002

app.listen(port)
console.log('Server running on port ' + port);