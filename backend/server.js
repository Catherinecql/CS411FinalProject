/** 
@author Jessye Nana Davies
@author Qinglin Chen
**/
'use strict'

var bcrypt = require('bcrypt')

var express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');
   


var app = express();
const http= require('http').Server(app);
const io = require('socket.io')(http);
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
    console.log("input_password", input_password)
    connection.query("select password from User WHERE username = '" + username + "';",function (error, result,fields) {
		if(error) {
			let err_message = "Error: Login";
			res.status(403).send(err_message);
		}
		else if(result.length == 0) {
			let err_message = "Error: Login failed: User not registered.";
			res.status(401).send({
                errorType:0
            });
        }
		else if(bcrypt.compareSync(input_password,result[0].password)){
			console.log(result[0].password);
			console.log(input_password);
			var message = "Logged in";
			res.status(200).send(message);
		}
		else {
			let err_message = "Error: Login failed: Wrong password.";
			res.status(401).send({
				errorType:1
			});
		}
	})
});


// 1. Add a new user
app.post('/adduser', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var hashedPassword = bcrypt.hashSync(password,10);

	var sql = "insert into User(username,password,email,grad_sem,major,courses_taken) values ('" + username + "','" + hashedPassword + "','" + email + "','', '', '')";
	console.log(sql);
	connection.query(sql, function(error,result,fields){
		if(error) {
			var err_message = "Error: ER_DUP_ENTRY: Duplicate entry '" + username + "' for key 'PRIMARY'";
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
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
		else {
			console.log(result)
			res.send(result)
		}
	})
});

// 3. Update major and graduation semester (Save button 1)
app.put('/updatemajgradsem', (req, res) => {
	var username = req.body.username;
	var courses_taken = req.body.courses_taken;
	var major = req.body.major;
	var grad_sem = req.body.grad_sem;
	var sql = "UPDATE User SET major = '" + major + "', grad_sem = '" + grad_sem + "' WHERE username = '" + username + "';";
	connection.query(sql, function(error,result,fields){
		if(error) {
			var err_message = "Error: updatemajgradsem";
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
});

// 3.2 Update courses (Save button 2)
app.put('/updatecourses', (req, res) => {
	var username = req.body.username;
	var courses_taken = req.body.courses_taken;
	var sql = "UPDATE User SET courses_taken = '" + courses_taken + "' WHERE username = '" + username + "';";
	connection.query(sql, function(error,result,fields){
		if(error) {
			var err_message = "Error: updatecourses";
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
});

// 4. Show core classes the user’s has taken
app.get('/gettakenclasses/:username', function (req, res) {
	var username = req.params.username;
	console.log(username);
	connection.query("select courses_taken from User WHERE username = '" + username + "';",function (error, result,fields){
		if(error) {
			var err_message = "Error: gettakenclasses/" + username;
			res.status(403).send(err_message);
		}
		else {
			var result1 = result[0].courses_taken;
			res.send(result1);
		}
	})
});


// 4.2 Show electives the user’s has taken
app.get('/gettakenelectives/:username', function (req, res) {
	var username = req.params.username;
	console.log(username);
	connection.query("select elective_course from takes WHERE username = '" + username + "';",function (error, result,fields){
		if(error) {
			var err_message = "Error:gettakenelectives/" + username;
			res.status(403).send(err_message);
		}
		else if(result.length==0) {
			var err_message = "Error: User not found:" + username;
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
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
		else {
			console.log(result)
			res.send(result)
		}
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
		else {
			console.log(result)
			res.send(result)
		}
	})
});


// 7. Show user information
app.get('/getstudentinfo/:username', function (req, res) {
	var username = req.params.username;
	console.log(username);
	connection.query("select * from User WHERE username = '" + username + "';",function (error, result,fields){
		if(error) {
			var err_message = "Error: getstudentinfo/" + username;
			res.status(403).send(err_message);
		}
		else if(result.length==0) {
			var err_message = "Error: User not found:" + username;
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
		
	})
});



// 8. Get all professors, their GPA and RMP link for a course
app.get('/getAllProfessors/:course_department/:course_number', function (req, res) {
	var course_department = req.params.course_department;
	var course_number = req.params.course_number;

	var sql_select = "select Professor.name_format1, AVG(CourseHistory.gpa) as avg, RMPProfile.rmp_link ";
	var sql_from = "FROM CourseHistory, Professor, RMPProfile ";

	var sql_where = "WHERE CourseHistory.course_department = '"+course_department+"'";
	var sql_where1 = " AND CourseHistory.course_number = '"+course_number+"'";
	var sql_where2 = " AND CourseHistory.professor_name_format2 = Professor.name_format2";
	var sql_where3 = " AND RMPProfile.professor_name_format1 = Professor.name_format1 ";

	var sql_groupby = "GROUP BY CourseHistory.professor_name_format2";

	var sql_query = sql_select + sql_from + sql_where + sql_where1 + sql_where2 + sql_where3 + sql_groupby;

	console.log(sql_query);
	connection.query(sql_query,function (error, result,fields){
		if(error) {
			var err_message = "Error: getAllProfessors/" + course_department + course_number;
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
});


// 9. Get next semester's professors, their GPA and RMP link for a course
app.get('/getNextSemProfessors/:course_department/:course_number', function (req, res) {
	var course_department = req.params.course_department;
	var course_number = req.params.course_number;
	console.log("here")
	//CAST(AVG (opening_amt) AS DECIMAL (12,2)) 
	var sql_select = "select Professor.name_format1, CAST(AVG(CourseHistory2.gpa) AS CHAR(4)) as avg, RMPProfile.rmp_link ";
	var sql_from = "FROM CourseHistory2, Professor, RMPProfile ";

	var sql_where = "WHERE CourseHistory2.course_department = '"+course_department+"'";
	var sql_where1 = " AND CourseHistory2.course_number = '"+course_number+"'";
	var sql_where2 = " AND CourseHistory2.professor_name_format2 = Professor.name_format2";
	var sql_where3 = " AND RMPProfile.professor_name_format1 = Professor.name_format1 ";

	var sql_where5 = "WHERE course_department = '"+course_department+"'";
	var sql_where6 = " AND course_number = '"+course_number+"'";

	var sql_where4 = " AND Professor.netid IN (SELECT netid  FROM Offering " + sql_where5 + sql_where6 + ") ";

	var sql_groupby = " GROUP BY CourseHistory2.professor_name_format2";

	var sql_query = sql_select + sql_from + sql_where + sql_where1 + sql_where2 + sql_where3 + sql_where4 + sql_groupby;

	console.log(sql_query);
	connection.query(sql_query,function (error, result,fields) {
		if(error) {
			var err_message = "Error: getNextSemProfessors/" + course_department + course_number;
			res.status(403).send(err_message);
		} else if(result.length == 0) {
			var err_message = "Error: No records found for past section of this course.";
			res.status(401).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
});


// 10. Get all professors, their GPA and RMP link for a course
app.get('/getMinGPAProfessors/:course_department/:course_number/:minGPA', function (req, res) {
	var course_department = req.params.course_department;
	var course_number = req.params.course_number;
	var minGPA = req.params.minGPA;
	console.log("here")

	var sql_select = "select Professor.name_format1, AVG(Cast(CourseHistory.gpa as Float)) as avg, RMPProfile.rmp_link ";
	var sql_from = "FROM CourseHistory, Professor, RMPProfile ";

	var sql_where = "WHERE CourseHistory.course_department = '"+course_department+"'";
	var sql_where1 = " AND CourseHistory.course_number = '"+course_number+"'";
	var sql_where2 = " AND CourseHistory.professor_name_format2 = Professor.name_format2";
	var sql_where3 = " AND RMPProfile.professor_name_format1 = Professor.name_format1 ";

	var sql_groupby = "GROUP BY CourseHistory.professor_name_format2 ";
	var sql_having = "HAVING AVG(CourseHistory.gpa) >= "+minGPA;

	var sql_query = sql_select + sql_from + sql_where + sql_where1 + sql_where2 + sql_where3 + sql_groupby + sql_having;

	console.log(sql_query);
	connection.query(sql_query,function (error, result,fields){
		if(error) {
			var err_message = "Error: getMinGPAProfessors/" + course_department + course_number;
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
});


// 11. Get the number of times each professor taught the inputted course
app.get('/getProfessorsCount/:course_department/:course_number', function (req, res) {
	var course_department = req.params.course_department;
	var course_number = req.params.course_number;

	var sql_select = "select Professor.name_format1, COUNT(CourseHistory.gpa) as count";
	var sql_from = "FROM CourseHistory, Professor ";

	var sql_where = "WHERE CourseHistory.course_department = '"+course_department+"'";
	var sql_where1 = " AND CourseHistory.course_number = '"+course_number+"'";
	var sql_where2 = " AND CourseHistory.professor_name_format2 = Professor.name_format2 ";
	var sql_groupby = " GROUP BY CourseHistory.professor_name_format2";
	var sql_query = sql_select + sql_from + sql_where + sql_where1 + sql_where2 + sql_groupby;

	console.log(sql_query);
	connection.query(sql_query,function (error, result,fields) {
		if(error) {
			var err_message = "Error: getNextSemProfessors/" + course_department + course_number;
			res.status(403).send(err_message);
		} else if(result.length == 0) {
			var err_message = "Error: No records found for past section of this course.";
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
});


// 12. Get next semester's professors and RMK link for a course
app.get('/getNextSemProfInfo/:course_department/:course_number', function (req, res) {
	var course_department = req.params.course_department;
	var course_number = req.params.course_number;

	var sql_select = "select Professor.name_format2, RMPProfile.rmp_link ";
	var sql_from = "FROM Professor, RMPProfile ";

	var sql_where3 = "WHERE RMPProfile.professor_name_format1 = Professor.name_format1 ";
	var sql_where5 = "WHERE course_department = '"+course_department+"'";
	var sql_where6 = " AND course_number = '"+course_number+"'";

	var sql_where4 = " AND Professor.netid IN (SELECT netid  FROM Offering " + sql_where5 + sql_where6 + ") ";
	var sql_query = sql_select + sql_from + sql_where3 + sql_where4;

	console.log(sql_query);
	connection.query(sql_query,function (error, result,fields) {
		if(error) {
			var err_message = "Error: getNextSemProfessors/" + course_department + course_number;
			res.status(403).send(err_message);
		} else if(result.length == 0) {
			var err_message = "Error: No records found for past section of this course.";
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
});


// Get AVG gpa for a professor and a course 
app.get('/getAverageGPA/:course_department/:course_number/:professor', function (req, res) {
	var course_department = req.params.course_department;
	var course_number = req.params.course_number;
	var professor = req.params.professor;

	var sql_select = "select AVG(CourseHistory.gpa) as avg ";
	var sql_from = "FROM CourseHistory";
	var sql_where = " WHERE CourseHistory.course_department = '"+course_department+"'";
	var sql_where1 = " AND CourseHistory.course_number = '"+course_number+"'";
	var sql_where2 = " AND CourseHistory.professor_name_format2 = '"+professor+"'";
	var sql_groupby = " GROUP BY CourseHistory.professor_name_format2";

	var sql_query = sql_select + sql_from + sql_where + sql_where1 + sql_where2 + sql_groupby;

	console.log(sql_query);
	connection.query(sql_query,function (error, result,fields) {
		if(error) {
			var err_message = "Error: getAverageGPA/" + course_department + course_number;
			res.status(403).send(err_message);
		} else if(result.length == 0) {
			var err_message = "Error: No records found for past section of this course.";
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result[0])
		}
	})
});


// 10. Get courses and professors for a minimum threshold gpa.
app.get('/getMinGPACourses/:course_department/:minGPA', function (req, res) {
	var course_department = req.params.course_department;
	var minGPA = req.params.minGPA;

	var sql_select = "select Professor.name_format1, CourseHistory2.gpa as avg, RMPProfile.rmp_link, CourseHistory2.course_department, CourseHistory2.course_number ";
	var sql_from = "FROM CourseHistory2, Professor, RMPProfile ";

	var sql_where = "WHERE CourseHistory2.course_department = '"+course_department+"'";
	var sql_where2 = " AND CourseHistory2.professor_name_format2 = Professor.name_format2";
	var sql_where3 = " AND RMPProfile.professor_name_format1 = Professor.name_format1 ";
	var sql_having = "HAVING CourseHistory2.gpa >= "+minGPA;
	var sql_query = sql_select + sql_from + sql_where + sql_where2 + sql_where3 + sql_having;

	console.log(sql_query);
	connection.query(sql_query,function (error, result,fields){
		if(error) {
			var err_message = "Error: getMinGPACourses/" + course_department;
			res.status(403).send(err_message);
		}
		else {
			console.log(result)
			res.send(result)
		}
	})
});



var port = process.env.PORT || 7002
io.on('connection', function(socket){
	// console.log('a user connected')
	socket.on('message', function(msg){
	   io.emit('message', msg)
	})
	socket.on('users', function(username){
	   console.log(username)
	   io.emit('users', username)
	})
})

http.listen(port, function(){
  	console.log('Server running on port ' + port);
})


