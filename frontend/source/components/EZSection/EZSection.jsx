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
			searchbyItem:''
		}
		this.handleSubmit = this.handleSubmit.bind(this);

	}

  	handleSubmit(event)
  	{
  		event.preventDefault(); 
  		this.setState
  		(
  			{
  				sectionInfo : '',
  				error : ''
  			}
  		)
  		const form = event.target;
  		const data = new FormData(event.target); 
  		let current_url = "http://localhost:7002/getNextSemProfessors/"//"https://mysterious-meadow-13337.herokuapp.com/getNextSemProfessors/"
  		for (let courseInfo of data.keys())
  		{
  			const input = form.elements[courseInfo];
  			const parserCourse = input.dataset.parse; 

  			if (parserCourse)
  			{ 
  				const parser = inputParsers[parserCourse];
        		const parsedValue = parser(data.get(courseInfo));
        		data.set(courseInfo, parsedValue);
        		current_url = current_url + parsedValue + "/"
  			}
  		}
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
    	const { sectionInfo, error} =this.state
    	console.log("testing",sectionInfo)
    	console.log(error)
        return(
	     	<div className = "EZSection">

	            <Form onSubmit={this.handleSubmit}>
		        	<Form.Group> 
		        		<Form.Input
			        	 name ="department" 
			        	 placeholder = "Enter Department" 
			        	 type="text" 
			        	 data-parse = "course"
			        	 />

			        	<Form.Input 
			        	 name = "Course no." 
			        	 placeholder = "Enter Course no." 
			        	 type="text" 
			        	 data-parse = "course"
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
