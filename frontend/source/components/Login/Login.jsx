import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import {Header,Menu,Container,Segment,Card,Button,Icon,Input,Form, Message} from 'semantic-ui-react';
import './Login.scss';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            errorMessage: false,
            usernameError: '',
            passwordError: '',
            confirmPasswordError: '',
            username: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false,   
            login:false,     
        };

        // this.baseUrl = 'http://104.236.255.229:5171/';
        this.baseUrl = 'http://localhost:7002/';
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.cookies = new Cookies();

    }

    validateForm() {
        return this.state.password.length > 0;
    }

    handleChangeUsername(event){
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event){
        this.setState({ password: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        this.handleLogin();
    }


    handleLogin() {
        const{usernameError,passwordError,username,password} = this.state;
        this.setState({
            usernameError: '',
            passwordError: '',
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

        if (flag) {
            let url = this.baseUrl+ 'login';
            let userAuthInfo = {};
            userAuthInfo["username"] = username;
            userAuthInfo["password"] = password;
            // console.log("userAuthInfo: ", userAuthInfo)
            axios.post(url, userAuthInfo) 
                .then((response)=>{
                     console.log(response);
                     let data = response.data;
                     if(data){
                        console.log(data)


                        console.log("successfully login with ", userAuthInfo.username);
                        this.cookies.set('userInfo', userAuthInfo, { path: '/' });
                        this.props.loginHandler(data);
                        this.setState({
                            login:true
                        })
                     }
                })
                .catch( (error) => {
                    let {errorType} = error.response.data;
                    console.log(errorType);
                    if(errorType === 0){
                        this.setState({
                            usernameError: "The username does not exist!"
                        })
                    }else if(errorType === 1){
                        this.setState({
                            passwordError: "Password incorrect!"
                        })
                    }
                });

        }
    }


    render(){
        const{usernameError,passwordError,errorMessage,input,login} = this.state;

        let loginInputField =(
            <div>
                <input  className="inputLogin"  
                        type="text" 
                        placeholder='Username/Email' 
                        onChange={this.handleChangeUsername} />
                {usernameError ?(
                    <div className="ui error message">
                        <div className="content">  
                            <div className="header">Action Forbidden</div>
                            <p>{usernameError}</p>
                        </div>
                    </div>)
                :null}
                <input  className="inputLogin"  
                        type="password"  
                        placeholder='Password' 
                        onChange={this.handleChangePassword} />
                {passwordError ?(
                    <div className="ui error message">
                        <div className="content">  
                            <div className="header">Action Forbidden</div>
                            <p>{passwordError}</p>
                        </div>
                    </div>)
                :null}
            </div>
        )

        if(login){
            return(<Redirect to={{pathname:'/Ezsection', state:{loggedIn: true}}}  push />)
        }

        return(
            <Segment className="Login">
                <Form error>
                    <div className="field">
                        <Header size='large' className="loginHeader">Login</Header>
                        {loginInputField}
                        <Button className = 'btnlogin' onClick={this.handleSubmit}>Login</Button>
                    </div>
                    
                    <div  className="field loginText">Forgot
                        <span className="addBold"> Username </span>
                        or
                        <span className="addBold"> Password </span>
                        ?
                    </div>
                    <div  className="field loginText"> Don't have an account?
                        <span className="addBold"> <Link to="/">Register</Link> </span>

                    </div>

                </Form>
            </Segment>
        )
    }
}


export default Login;