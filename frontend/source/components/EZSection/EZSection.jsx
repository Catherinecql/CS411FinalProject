import React, { Component } from 'react'
import { Button,Container,Grid,Menu,Dropdown,Input,Segment,Form} from 'semantic-ui-react'
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
			submittedCourse:''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	handleChange(event,{name,value}){
        // console.log(event)
        // console.log(event.value);
        // console.log("value",value)
        // console.log("name",[name])
        this.setState({ [name]: value })
        
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
  	// 	const form = event.target;
  	// 	const data = new FormData(event.target); 
  	// 	let current_url = "http://localhost:7002/getNextSemProfessors/"//"https://mysterious-meadow-13337.herokuapp.com/getNextSemProfessors/"
  	// 	for (let courseInfo of data.keys())
  	// 	{
  	// 		const input = form.elements[courseInfo];
  	// 		const parserCourse = input.dataset.parse; 

  	// 		if (parserCourse)
  	// 		{ 
  	// 			const parser = inputParsers[parserCourse];
   //      		const parsedValue = parser(data.get(courseInfo));
   //      		data.set(courseInfo, parsedValue);
   //      		current_url = current_url + parsedValue + "/"
  	// 		}
  	// 	}
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

    render() {
    	const { sectionInfo, error,department,Course_NO,submittedCourse,submittedDepartment} =this.state
    	// console.log("testing",sectionInfo)
    	// console.log(error)
        return(
	     	<div className = "EZSection">

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

		    </div>

        )
    }
}

export default EZSection
