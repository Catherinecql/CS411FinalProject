import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Dropdown} from 'semantic-ui-react';
import './Header.scss';


class Header extends Component {
	

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
               		{!userInfo?
                        <span> <span className="menu_text">please</span> <Link className="login_menu menu_item" to="/login"> Login</Link></span>
                    :
                        <span> 
                            <Icon name='user circle' /> 
                            <Dropdown text={username}>
                                <Dropdown.Menu>
                                    <Link to="/userCenter" className="drop_item">User Center</Link>
                                    {permission > 0?
                                        <Link to="/adminCenter" className="drop_item">Admin Center</Link>
                                    :
                                    null
                                    }
                                    <Link to="/" onClick={this.handleLogout} className="drop_item">Logout</Link>
                                </Dropdown.Menu>
                            </Dropdown>    
                        </span> 
                    } 
                </div>
		    </div>

		)
	}
}

export default Header
