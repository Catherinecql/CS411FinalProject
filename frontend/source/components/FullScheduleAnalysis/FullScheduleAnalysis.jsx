import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import styles from './FullScheduleAnalysis.scss'

class FullScheduleAnalysis extends Component {
	constructor(props) {
        super(props);
        this.state = {  
            login:false,     
    	};
    	this.cookies = new Cookies();
    }

    render() {
    	const userInfo = this.cookies.get('userInfo')||null;
    	if(!userInfo){
            return(<Redirect to={{pathname:'/', state:{loggedIn: false}}}  push />)
        }
        return(
            <div className="FullScheduleAnalysis">
                <h1>Recommender</h1>
            </div>
        )
    }
}

export default FullScheduleAnalysis