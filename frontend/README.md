api documentation

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

3. Update courses, major, and graduation semester (Save button)
	Put http://localhost:7002/updateuser
	request: {
		"username" : "bob75",
		"courses_taken"  : "CS210, CS374",
		"major": "Computer Science",
		"grad_sem": "SP19"
	}

4. Show classes the user’s has taken
	Get http://localhost:7002/gettakenclasses/bob75
	res: [
    	{
        	"courses_taken": "CS210, CS374"
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