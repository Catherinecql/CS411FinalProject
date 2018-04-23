import React, { Component } from 'react'
import { Button,Container,Grid,Menu,Dropdown,Input,Segment,Form,Select} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom'
import _ from 'lodash'
import styles from './EZSection.scss'
import axios from 'axios';

const getOptions = () => _.times(3, () => 
{
  var name = 
  {

  }
  return { key: name, text: name, value:name }
})

const inputParsers = 
{
  course(input) 
  {
    const info = input.split('/');
    return `${info}`;
  },
};

const options = [
  { key: 'course_no', text: 'Sort by Course NO', value: 'course_no' },
  { key: 'gpa', text: 'Sort by Course GPA   ', value: 'gpa' }
]

class EZSection extends Component 
{
	constructor(props){
		super(props);
		this.state = {
			sectionInfo   : '',
			error: '',
			searchbyItem:'',
			department: '',
			Course_NO:'',
			submittedDepartment:'',
			submittedCourse:'',
			gpa:'',
			gpaerror:'',
			gpaInfo:'',
			select:'gpa'
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitgpa = this.handleSubmitgpa.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		// this.base_url = 'http://localhost:7002'
		this.base_url = 'https://mysterious-meadow-13337.herokuapp.com'

	}

	handleChange(event,{name,value}){
        // console.log(event)
        // console.log(event.value);
        // console.log("value",value)
        // console.log("name",[name])
        this.setState({ [name]: value })
        
    }  

    handleSelectChange(event,{value}){
        // console.log(event)
        // console.log(event.value);
        console.log("value",value)
        // console.log("name",[name])
        let mode = value
        let output = this.state.gpaInfo
			if(mode == 'gpa'){
				output.sort(function(a,b){
					if (a.avg > b.avg) {
						return -1;
					} else if (a.avg < b.avg) {
						return 1;
					}else{
						return 0
					}

				})
			}else{
				output.sort(function(a,b){
					if (a.course_number > b.course_number) {
						return -1;
					} else if (a.course_number < b.course_number) {
						return 1;
					}else{
						return 0
					}

				})
			}

        this.setState(
        	{ select: value,
        		gpaInfo :output
         	}
        )
    } 

  	handleSubmit(event)
  	{
  		const{department,Course_NO} = this.state
  		event.preventDefault(); 
  		this.setState
  		(
  			{
  				sectionInfo : '',
  				error : ''
  			}
  		)

  		console.log("department",department)
  		console.log("Course_NO",Course_NO)
  		const input = department+Course_NO
  		console.log("input",input)
  		// let base_url = "https://localhost:7002/"
  		let base_url = "https://mysterious-meadow-13337.herokuapp.com/getNextSemProfessors/"
  		let current_url = base_url + department + '/' + Course_NO
  		//"https://mysterious-meadow-13337.herokuapp.com/getNextSemProfessors/"
  		
  		axios.get(current_url)
			.then((response) =>
				{
					console.log(response.data[0]);
					//new add:
					this.setState
					(
						{
							sectionInfo: response.data[0]
						}
					)
				}
			)
			.catch(error=>{
				console.log(error)
				this.setState
				(
					{
						error : "Sorry! There are no records found :("
					}
				)

	  		});

  	}

  	handleSubmitgpa(event){
  		const{gpa,gpaerror,gpaInfo} = this.state
  		event.preventDefault(); 
  		this.setState
  		(
  			{
  				gpaerror: '',
  				gpaInfo : ''
  			}
  		)

  		console.log("gpa",gpa)
  		let current_url = this.base_url + '/getMinGPACourses/CS/' + gpa
  		console.log(current_url)
  	// 	//"https://mysterious-meadow-13337.herokuapp.com/getNextSemProfessors/"
  		axios.get(current_url)
			.then((response) =>
				{
					console.log(response.data);
					let mode = this.state.select
					let output = response.data
					if(mode == 'gpa'){
						output.sort(function(a,b){
							if (a.avg > b.avg) {
								return -1;
							} else if (a.avg < b.avg) {
								return 1;
							}else{
								return 0
							}

						})
					}else{
						output.sort(function(a,b){
							if (a.course_number > b.course_number) {
								return -1;
							} else if (a.course_number < b.course_number) {
								return 1;
							}else{
								return 0
							}

						})
					}
					console.log("testing",output)
					//new add:
					this.setState
					(
						{
							gpaInfo: output
						}
					)
				}
			)
			.catch(error=>{
				console.log(error)
				this.setState
				(
					{
						gpaerror : "Sorry! There are no records found :("
					}
				)

	  		});
	  	
	  	//sort the score

  	}

    render() {
    	const { sectionInfo, error,department,Course_NO,submittedCourse,submittedDepartment,gpa,gpaerror,gpaInfo} =this.state
    	// console.log("testing",sectionInfo)
    	// console.log(error)
        return(
	     	<div className = "EZSection">
	     		<Segment className="section" color='blue'>
		            <Form onSubmit={this.handleSubmit}>
			        	<Form.Group> 
			        		<Form.Input
					        	 name = 'department' 
					        	 value = {department}
					        	 placeholder = "Enter Department" 
					        	 type="text" 
					        	 onChange = {this.handleChange}
				        	 />

				        	<Form.Input 
					        	 name = 'Course_NO'
					        	 value = {Course_NO}
					        	 placeholder = "Enter Course no." 
					        	 type="text" 
					        	 onChange = {this.handleChange}
				        	/>

			        		<Form.Button content = "EZPZ!"/>
			        	</Form.Group>
			        </Form>

			        { sectionInfo ? 
				        <Segment>
				        	<div> Professor         : {sectionInfo.name_format1} </div>
				        	<div> Average GPA       : {sectionInfo.avg}</div> 
				        	<div> </div>
				        	<div> Rate My Professor :  
				        		<a href = {sectionInfo.rmp_link}> Click Here!</a>
				        	</div>
				        </Segment>
				       : 
				       <Segment>
				       	<div> {error} </div>
				       </Segment> 
			    	}
			    </Segment>
			    <Segment  color='purple'>
			      	<Input type='text'
			      		   name = 'gpa' 
			      		   value = {gpa} 
			      		   placeholder = "Enter Minimum GPA" 
			      		   onChange = {this.handleChange}/>
			    
					<Select compact options={options} defaultValue='gpa' onChange = {this.handleSelectChange} />
					<Button onClick={this.handleSubmitgpa}> EZPZ</Button>
  					
			        <div className="gpasection">
			        { gpaInfo ? 
			        	(gpaInfo.map((course,j) =>
			        		<Segment  key={j}>
			        			<h2> Average GPA       : {course.avg}</h2>
			        			<div> Course Department : {course.course_department} </div>
			        			<div> Course NO         : {course.course_number} </div>
					        
					        	<div> </div>
					        	<div> Rate My Professor :  
					        		<a href = {course.rmp_link}> Click Here!</a>
					        	</div>
				        	</Segment>  
                        ))
				       : 
				       <Segment>
				       	<div> {gpaerror} </div>
				       </Segment> 
			    	}
			    	</div>
			    </Segment>
		    </div>

        )
    }
}

export default EZSection
