/** 
@author Qinglin Chen
**/
import React, { Component } from 'react'
import {Header,Menu,Container,Segment,Card,Button,Icon,Input,Form, Message,Grid} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import axios from 'axios';
import styles from './Home.scss'
import Cookies from 'universal-cookie';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state={
            edit:false,
            oldPwd:'',
            password:'',
            confirmPwd:'',
            username:'',
            email:'',
            open:false,
            emailError:'',
            usernameError: '',
            oldPasswordError:'',
            newPasswordError:'',
            confirmPasswordError:'',
            successMessage:'',
            submit:false,
            register:false
        }
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		// this.baseUrl = 'http://localhost:7002'
        this.baseUrl = 'https://mysterious-meadow-13337.herokuapp.com';
        this.cookies = new Cookies();
	}

	handleChange(event,{name,value}){
        // console.log(event)
        // console.log(event.value);
        // console.log("value",value)
        // console.log("name",[name])
        this.setState({ [name]: value })
        
    }  
    
    handleSubmit(event){
        event.preventDefault();
        this.handleLogin();
    }


    handleLogin() {
        const{usernameError,passwordError,username,password,confirmPwd,email} = this.state;
        this.setState({
        	usernameError:'',
            passwordError: '', 
            emailError: '',
            confirmPasswordError:'',
            successMessage:''
        });

        let flag = true;

        if (!username) {
            this.setState({ usernameError: 'Must have username' });
            flag = false;
        }
        if (!email) {
            this.setState({ emailError: 'Must have Email' });
            flag = false;
        }
        if (!password) {
            this.setState({ passwordError: 'Must have password' });
            flag = false;
        }

        if(!confirmPwd){
            this.setState({confirmPasswordError:'Must retype password'});
             flag = false;
        }

        if (flag) {

            let url = this.baseUrl+ '/adduser';
            let userAuthInfo = {};
            userAuthInfo["username"] = username;
            userAuthInfo["email"] = email+'@illinois.edu';
            userAuthInfo["password"] = password;
            // userAuthInfo["confirmPwd"] = confirmPwd;
            // console.log(userAuthInfo)
            axios.post(url, userAuthInfo) 
                .then((response)=>{
                     console.log(response);
                        this.setState({
                            register:true
                        })
                     // }
                })
                .catch( (error) => {
                    // let {errorType} = error.response.data;
                    console.log(error);
                });
        }
    }

    render() {
    	const{username,
    		  password,
    		  usernameError,
    		  emailError,
    		  passwordError,
    		  errorMessage,
    		  input,
    		  login,
    		  confirmPwd,
    		  confirmPasswordError,
    		  email,
    		  register
        } = this.state;
        const userInfo = this.cookies.get('userInfo')||null;
    	let registerInputField =(
            <div>
                <Input  className="inputLogin"  
                        type="text" 
                        placeholder='Username' 
                        name='username' 
                        value={username} 
                        onChange={this.handleChange} />
                {usernameError ?(
                    <div className="ui error message">
                        <div className="content">  
                            <div className="header">Action Forbidden</div>
                            <p>{usernameError}</p>
                        </div>
                    </div>)
                :null}
                <Input  className="inputLogin"  
                        type="text" 
                        placeholder='email' 
                        name='email' 
                        value={email} 
                        label={{ basic: true, content: '@illinois.edu' }}
    					labelPosition='right'
                        onChange={this.handleChange} />
                {emailError ?(
                    <div className="ui error message">
                        <div className="content">  
                            <div className="header">Action Forbidden</div>
                            <p>{emailError}</p>
                        </div>
                    </div>)
                :null}
                <Input  className="inputLogin"  
                        type="password"  
                        placeholder='Password' 
                        name='password' 
                        value={password} 
                        onChange={this.handleChange} />
                {passwordError ?(
                    <div className="ui error message">
                        <div className="content">  
                            <div className="header">Action Forbidden</div>
                            <p>{passwordError}</p>
                        </div>
                    </div>)
                :null}
                <Input 
                		className="inputLogin"
                        type="password"  
                        placeholder='Confirm New Password' 
                        name='confirmPwd' 
                        value={confirmPwd} 
                        onChange={this.handleChange} />
                    	{confirmPasswordError ?(
                        <Message error
                            header='Action Forbidden'
                            content={confirmPasswordError}
                        />)
                    :null}
            </div>
        )

    	if(register){
            return(<Redirect to={{pathname:'/Login'}}  push />)
        }else if(userInfo){
            return(<Redirect to={{pathname:'/EZSection'}} push />)
        }

        return(
            <div className="Home">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <img className="logo"src="../../assets/gpa.gif" alt="how to boost your gpa"/>
                        </Grid.Column>
                        <Grid.Column className="Register" width={8}>
                            <Segment>
                                <Form error>
                                    <div className="field">
                                        <Header size='large' className="loginHeader">Register</Header>
                                            {registerInputField}
                                        <Button className = 'btnlogin' onClick={this.handleSubmit} >Register</Button>
                                    </div>
                                </Form>
                            </Segment>
                      </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            </div>
        )
    }
}

export default Home
