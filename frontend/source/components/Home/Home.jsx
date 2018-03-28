import React, { Component } from 'react'
import {Header,Menu,Container,Segment,Card,Button,Icon,Input,Form, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import styles from './Home.scss'

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
            oldPasswordError:'',
            newPasswordError:'',
            confirmPasswordError:'',
            successMessage:'',
            submit:false
        }
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChange(event,{name,value}){
        // console.log(event)
        // console.log(event.value);
        console.log("value",value)
        console.log("name",[name])
        this.setState({ [name]: value })
        
    }  
    
    handleSubmit(event){
        event.preventDefault();
        this.handleLogin();
    }


    handleLogin() {
        const{usernameError,passwordError,username,password,confirmPwd,email} = this.state;
        this.setState({
            oldPasswordError: '',
            newPasswordError: '',
            confirmPasswordError:'',
            successMessage:''
        });

        let flag = true;

        if (!username) {
            this.setState({ usernameError: 'Must have username' });
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

            // let url = this.baseUrl+ 'users/login';
            let userAuthInfo = {};
            userAuthInfo["username"] = username;
            userAuthInfo["email"] = email;
            userAuthInfo["password"] = password;
            userAuthInfo["confirmPwd"] = confirmPwd;
            console.log(userAuthInfo)
            // axios.post(url, userAuthInfo) 
            //     .then((response)=>{
            //         //  console.log(response);
            //          let data = response.data.data;
            //          // console.log("data",data)
            //          if(data){
            //             console.log("successfully login with ", data.username);
            //             this.cookies.set('userInfo', data, { path: '/' });
            //             this.props.loginHandler(data);
            //             this.setState({
            //                 login:true
            //             })
            //          }
            //     })
            //     .catch( (error) => {
            //         let {errorType} = error.response.data;
            //         console.log(errorType);
            //         if(errorType === 0){
            //             this.setState({
            //                 usernameError: "Couldn't find your Leam account"
            //             })
            //         }else if(errorType === 1){
            //             this.setState({
            //                 passwordError: "Password incorrect"
            //             })
            //         }
            //     });
        }
    }

    render() {
    	const{username,password,usernameError,passwordError,errorMessage,input,login,confirmPwd,confirmPasswordError,email} = this.state;
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
                {usernameError ?(
                    <div className="ui error message">
                        <div className="content">  
                            <div className="header">Action Forbidden</div>
                            <p>{usernameError}</p>
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

        return(
            <div className="Home">
	            <Segment className="Register">
	                <Form error>
	                    <div className="field">
	                        <Header size='large' className="loginHeader">Register</Header>
	                        {registerInputField}
	                        <Button className = 'btnlogin' onClick={this.handleSubmit} >Register</Button>
	                    </div>
	                </Form>
	            </Segment>
            </div>
        )
    }
}

export default Home
