import React, { Component } from 'react'
import { Button, Segment, Table, Header, Rating, Label, Icon } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import styles from './FullScheduleAnalysis.scss'
import requiredCourse from "./requiredCourse.js"

class FullScheduleAnalysis extends Component {
	constructor(props) {
        super(props);
        this.state = {  
            login:false,
            coursesLeft:[],
            courses:[],
            professors:[],
            rmp_link:[],
            gpas:[],
            highestGpaProf:[] 
    	};
    	this.baseUrl = 'https://mysterious-meadow-13337.herokuapp.com'
    	this.cookies = new Cookies();
    }

    componentWillMount() {
    	const userInfo = this.cookies.get('userInfo')||null
    	const username = userInfo?userInfo.username:null;

	    let requiredInfoUrl = this.baseUrl + '/gettakenclasses/' + username
	    let left = []
	    axios.get(requiredInfoUrl)
	    	.then((res) => {
	    		let requiredCourseTaken = res.data
	    		let courses = requiredCourseTaken.split(',')
	    		for (let i = 0; i < requiredCourse.length; i++) {
                    let title = requiredCourse[i].title

                    if(title == 'CS242/126') {
                    	if(!courses.includes('CS242') && !courses.includes('CS126')) {
							left.push('CS242')
							left.push('CS126')
                    	}
                    }
                    else if(!courses.includes(title)){
                        left.push(title)
                    }
                    this.setState({
                        coursesLeft:left
                    })
	    			
	    		}
	    		this.createList(left)
	    	})
	    	.catch((error)=>{
	    		console.log(error)
	    	})
    }

    createList(left) {
    	console.log(left.length)
	    for(let i = 0; i < left.length; i++) {
	    	this.handleCourse(left[i])
	    }
    }

    handleCourse(course) {    	
    	var splitted = course.match(/[a-z]+|[^a-z]+/gi)
    	let professorsUrl = this.baseUrl + '/getNextSemProfInfo/' + splitted[0] + '/' + splitted[1] 
    	axios.get(professorsUrl)
    	.then((res) => {
    		let professors = res.data
    		for (let i = 0; i < professors.length; i++) {
    			let prof = professors[i]
    			let name = prof.name_format2
    			let rmp = prof.rmp_link
    			this.handleGPA(splitted[0], splitted[1], name, rmp, course)
    		}
    	})
    }

    handleGPA(department, number, name, rmp, course) {
    	console.log("GPA for "+ name + " is ")
    	let GPAUrl = this.baseUrl + '/getAverageGPA/' + department + '/' + number + '/' + name
    	axios.get(GPAUrl)
    	.then((res) => {
    		let gpa = res.data
    		if (rmp == '') {
    			rmp = '-'
    		}
    		this.setState({ 
                	courses:this.state.courses.concat(course),
        			professors:this.state.professors.concat(name),
        			rmp_link:this.state.rmp_link.concat(rmp),
        			gpas:this.state.gpas.concat(gpa.avg)
			})
    	})
    	.catch((error)=>{
    		if (rmp == '') {
    			rmp = 'http://www.ratemyprofessors.com/teacher/create'
    		}
	    	this.setState({ 
                	courses:this.state.courses.concat(course),
        			professors:this.state.professors.concat(name),
        			rmp_link:this.state.rmp_link.concat(rmp),
        			gpas:this.state.gpas.concat("-")
			})
	    })
    }

    render() {
    	const{coursesLeft, courses, professors,rmp_link,gpas,recommend} = this.state
    	const userInfo = this.cookies.get('userInfo')||null;
    	if(!userInfo){
            return(<Redirect to={{pathname:'/', state:{loggedIn:false}}}  push />)
        }

        const has_rmp = []
        for(var i = 0; i < rmp_link.length ; i++) {
        	if(rmp_link[i] == '-') {
        		has_rmp.push(false);
        	}
        	else {
        		has_rmp.push(true);
        	}
        }

        const max_gpa = {} // coursesLeft 

        for(var i = 0; i < coursesLeft.length ; i++) {
        	max_gpa[coursesLeft[i]] = 0
        }

        for(var i = 0; i < gpas.length ; i++) {
        	if(max_gpa[courses[i]] < gpas[i]) {
        		max_gpa[courses[i]] = gpas[i]
        		console.log('update the highest')
        	}
        }

        const recommended = []
        for(var i = 0; i < gpas.length ; i++) {
        	if(gpas[i] == '-') {
        		recommended.push(false)
        		console.log('false')
        	}
        	else if(max_gpa[courses[i]] > gpas[i]) {
        		recommended.push(false)
        		console.log('false')
        	}
        	else {
        		recommended.push(true)
        		console.log('true')
        	}
        }  

        console.log(max_gpa)

        return(
            <div className="FullScheduleAnalysis">
                <h1>Recommender</h1>
                <div className="TableRec">
			    	<Table celled padded>
			    		<Table.Header>
			      			<Table.Row>
						        <Table.HeaderCell>Course</Table.HeaderCell>
						        <Table.HeaderCell >Professor</Table.HeaderCell>
						        <Table.HeaderCell>ratemyprofessor.com</Table.HeaderCell>
						        <Table.HeaderCell>Average GPA</Table.HeaderCell>
						        <Table.HeaderCell>EZPZ</Table.HeaderCell>
			      		</Table.Row>
			    	</Table.Header>

  					<Table.Body>
          				{courses.map((course, index) => (
                            	<Table.Row>
							        <Table.Cell>
							          <Header as='h4' textAlign='center'>{course}</Header>
							        </Table.Cell>
							        <Table.Cell singleLine>{professors[index]}</Table.Cell>
							        <Table.Cell>
							        	{has_rmp[index] ? (
        									<a href={rmp_link[index]}>{professors[index]} on Rate My Professor</a>
      									) : (
        									<i> - </i>
      									)}
							        </Table.Cell>
							        <Table.Cell>
							          {gpas[index]}
							        </Table.Cell>
							        <Table.Cell>
							        	{recommended[index] ? (
 											<Label as='a' color='green'>
      											<Icon name='thumbs up' />
      												Recommended
    										</Label>) : (
    										<i> </i>
      									)}
							        </Table.Cell>
							      </Table.Row>
						)
          				)}
        			</Table.Body>


 				</Table>
  				</div>
            </div>
        )
    }
}

export default FullScheduleAnalysis