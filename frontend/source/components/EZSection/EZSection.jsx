import React, { Component } from 'react'
import { Button,Container,Grid,Menu,Dropdown } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom'
import _ from 'lodash'
import styles from './EZSection.scss'
import axios from 'axios';

const getOptions = () => _.times(3, () => {
  var name = {

  }
  return { key: name, text: name, value:name }
})
const inputParsers = {
  course(input) {
    const info = input.split('/');
    return `${info}`;
  },
};

class EZSection extends Component {
	constructor(props){
		super(props);
		this.state = {
			//search bar
			searchbyItem:'',
		}
		this.handleSubmit = this.handleSubmit.bind(this);

	}

  	handleSubmit(event)
  	{
  		event.preventDefault(); 
  		const form = event.target;
  		const data = new FormData(event.target); 
  		let current_url = "http://localhost:7002/getNextSemProfessors/"
  		for (let courseInfo of data.keys())
  		{
  			const input = form.elements[courseInfo];
  			const parserCourse = input.dataset.parse; 

  			if (parserCourse){ 
  				const parser = inputParsers[parserCourse];
        		const parsedValue = parser(data.get(courseInfo));
        		data.set(courseInfo, parsedValue);
        		current_url = current_url + parsedValue + "/"
  			}
  		}
  		axios.get(current_url)
			.then((response)=>{
				console.log(response.data);
			})
			.catch(error=>{
				console.log(error)

	  		});
  	}

    render() {
        return(
	    	const { 
	   			handleSubmit,
	   		} = this.state

            <form onSubmit={this.handleSubmit}>
	        	<input 
	        	 name ="department" 
	        	 placeholder = "Enter Department" 
	        	 type="text" 
	        	 data-parse = "course"
	        	 />

	        	<input 
	        	 name="Course no." 
	        	 placeholder = "Enter Course no." 
	        	 type="text" 
	        	 data-parse = "course"
	        	 />

	        	<button>EZPZ!</button>
	        </form>
	        // </div>
        )
    }
}

export default EZSection
