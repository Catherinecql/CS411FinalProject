api documentation

0. Login
	Post http://localhost:7002/login
	request: {
		"username" : "bob75",
		"password": "bobpassword"
	}
error codes:
401: Login failed: User not registered.
403: Login failed: Wrong password.

1. Add a new user
	Post http://http://localhost:7002/adduser
	request: {
		"username" : "bob75",
		"password": "bobpassword",
		"email":"bob75@illinois.edu"
	}

2. Delete a user
	Delete http://localhost:7002/deleteuser
	request: {
		"username" : "bob75"
	}

3. Update major and graduation semester (Save button 1)
	Put http://localhost:7002/updatemajgradsem
	request: {
		"username" : "bob75",
		"major": "Computer Science",
		"grad_sem": "SP19"
	}

3.2 Update courses (Save button 2)
	Put http://localhost:7002/updatecourses
	request: {
		"username" : "bob75",
		"courses_taken"  : "CS210, CS374"
	}


4. Show core classes the user’s has taken
	Get http://localhost:7002/gettakenclasses/bob75
	res: [CS210, CS374, CS173]

4. Show electives the user’s has taken
	Get http://localhost:7002/gettakenelectives/bob75
	res: [
    {
        "elective_course": "CS411"
    },
    {
        "elective_course": "CS412"
    }
	]

5. Add an elective
	Post http://http://localhost:7002/addelective
	request: {
		"username" : "bob75",
		"elective_course": "CS411"
	}

6. Delete an elective
	Delete http://localhost:7002/deleteelective
	request: {
		"username" : "bob75",
		"elective_course": "CS411"
	}


7. Show user information
	GET http://localhost:7002/getstudentinfo/bob75
	result: [
	    {
	        "username": "bob75",
	        "password": "bobpassword",
	        "email": "bob75@illinois.edu",
	        "grad_sem": "SP19",
	        "major": "ECE",
	        "courses_taken": "CS225"
	    }
	]


8. Get all professors, their GPA and RMP link for a course

12. Get next semester's professors and RMK link for a course
	GET http://localhost:7002/getNextSemProfInfo/CS/374
	result: [
    {
        "name_format2": "Chekuri, Chandra S",
        "rmp_link": ""
    },
    {
        "name_format2": "Kindratenko, Volodymyr",
        "rmp_link": "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=1550607"
    }
]

13. Get AVG gpa for a professor and a course 
	GET http://localhost:7002/getAverageGPA/CS/210/Cunningham, Ryan M
	result: [
	    {
	        "AVG(CourseHistory.gpa)": 3
	    }
	]

14. Get 
	GET http://localhost:7002/getMinGPACourses/CS/3
	result: [
    {
        "name_format1": "Leonard B. Pitt",
        "avg": "3,8",
        "rmp_link": "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=215034",
        "course_department": "CS",
        "course_number": 100
    },
    {
        "name_format1": "Albert Harris",
        "avg": "3,54",
        "rmp_link": "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=2326451",
        "course_department": "CS",
        "course_number": 105
    }
   	]

