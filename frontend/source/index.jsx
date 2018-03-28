import React, { Component } from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import {Container} from 'semantic-ui-react';
import Header from './components/Header/Header.jsx'
import EZSection from './components/EZSection/EZSection.jsx';
import FullScheduleAnalysis from './components/FullScheduleAnalysis/FullScheduleAnalysis.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Personalized from './components/Personalized/Personalized.jsx'
// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

class APP extends Component{
	constructor(props){
		super(props);
		this.loginHandler = this.loginHandler.bind(this);
	}
	loginHandler(userInfo){
        this.setState({
            userInfo:userInfo
        })
    }
	render(){
		// console.log(this.props)
		return(
			<Router>
				<div>
					<Container>
						<Header loginHandler={this.loginHandler}/> 
						<Route exact path="/EZSection" component={EZSection} loginHandler={this.loginHandler} />
						<Route exact path="/FullScheduleAnalysis" component={FullScheduleAnalysis}  loginHandler={this.loginHandler}/>
						<Route exact path="/" component={Home}  />
						<Route exact path="/Login" render={()=><Login loginHandler={this.loginHandler} />}/>
						<Route exact path="/Personalized" component={Personalized} loginHandler={this.loginHandler} />
					</Container>
				</div>
			</Router>
		)
	}
}



render(
    <APP/>,
    document.getElementById('app')
);
