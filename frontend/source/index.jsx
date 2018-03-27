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

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

class APP extends Component{

	render(){
		return(
			<Router>
				<div>
					<Container>
						<Header/> 
						<Route exact path="/EZSection" component={EZSection}/>
						<Route exact path="/FullScheduleAnalysis" component={FullScheduleAnalysis}/>
						<Route exact path="/" component={Home}/>
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
