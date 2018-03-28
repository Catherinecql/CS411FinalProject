import React, { Component } from 'react'
import { Button,Segment} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import axios from 'axios'
import styles from './Personalized.scss'
import Cookies from 'universal-cookie';

class Personalized extends Component {
	constructor(props){
		super(props)

		this.handleClickDelete = this.handleClickDelete.bind(this)
		this.cookies = new Cookies();
		this.handleLogout = this.handleLogout.bind(this);
		this.baseUrl = 'http://localhost:7002'
	}

	componentWillReceiveProps(nextProps){
        // console.log("componentWillReceiveProps")
        this.handleLogin();
        if(JSON.stringify(nextProps) != JSON.stringify(this.props)){
            if(nextProps.userInfo){
                this.setState({
                    userInfo:nextProps.userInfo
                })
            }else{
                this.setState({
                    userInfo:null
                })
            }
        }
      
    }

	handleClickDelete(){
		const userInfo = this.cookies.get('userInfo')||null
		const username = userInfo?userInfo.username:null;
		let userAuthInfo = {}
		userAuthInfo["username"] = username;

		console.log("delete the account",userAuthInfo)
		let url = this.baseUrl + '/deleteuser'

	    axios.delete(url, {data:userAuthInfo}) 
	        .then((response)=>{
	            console.log(response);
	            this.handleLogout();

	        })
	        .catch( (error) => {
	            // let {errorType} = error.response.data;
	            console.log(error);
	            // if(errorType === 0){
	            //     this.setState({
	            //         usernameError: "Couldn't find your Leam account"
	            //     })
	            // }else if(errorType === 1){
	            //     this.setState({
	            //         passwordError: "Password incorrect"
	            //     })
	            // }
	        });
	}

	handleLogout(){
    	console.log("handleLogout")
        this.cookies.remove('userInfo', { path: '/' });
        this.setState({ userInfo: null });
        this.setState({
            redirectPath:"/"
        })
    }

    render() {
    	const userInfo = this.cookies.get('userInfo')||null
    	if(!userInfo){
    		return(<Redirect to={{pathname:'/', state:{loggedIn: false}}}  push />)
    	}
        return(
            <div className="Personalized">
                <h1>Personalized Page</h1>
                <div>
				    
				    <Segment color='orange'>


				    	<h3>Tell us about yourself</h3>
				    </Segment>
				   
				    <Segment color='blue'>
				    	<h3>Select the required course you have taken
				    	</h3>
				    </Segment>
				    <Segment color='violet'>
				    	<h3>Select the elective course you have taken</h3>
				    </Segment>
				   
				   
				</div>
				<div className="delete">
    				<Button  negative onClick={this.handleClickDelete}>Delete the Account</Button>
  				</div>
            </div>
        )
    }
}

export default Personalized