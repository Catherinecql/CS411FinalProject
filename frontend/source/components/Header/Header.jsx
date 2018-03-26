import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Dropdown} from 'semantic-ui-react';
import './Header.scss';


class Header extends Component {
	constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        };
        // this.handleLogout = this.handleLogout.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
        // this.cookies = new Cookies();

    }

	render(){

		return(
			<div className = "Header">
				<div  className="left_menu">
					 <Link className="home_menu menu_item" to="/">Home</Link>
				</div>
				<div className="main_header">
                    EZPZ Way to Easy
                </div>
                <div className="right_menu"><span className="menu_text">Welcome, &nbsp;</span>
               		
                        <span> <span className="menu_text">please</span> <Link className="login_menu menu_item" to="/login"> Login</Link></span>
                   
                        <span> 
                            <Icon name='user circle' /> 
                            
                        </span> 
                    } 
                </div>
		    </div>

		)
	}
}

export default Header
