import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Dropdown,Menu} from 'semantic-ui-react';
import './Header.scss';


class Header extends Component {
	constructor(props) {
        super(props);
        this.state = {
            activeItem: ''
        };
        // this.handleLogout = this.handleLogout.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
        // this.cookies = new Cookies();
        this.handleItemClick = this.handleItemClick.bind(this);

    }

    handleItemClick(e, { name }){
    	this.setState({ activeItem: name })
    }

	render(){
		const { activeItem } = this.state

    
		return(
			<div className = "Header">
				<div  className="left_menu">
					<Menu>
				        <Menu.Item
				          name='EZ Section'
				          active={activeItem === 'EZ Section'}
				          onClick={this.handleItemClick}
				        >
          					<Link to="/EZSection">EZ Section</Link>
	        			</Menu.Item>

				        <Menu.Item
				          name='Full Schedule Analysis'
				          active={activeItem === 'Full Schedule Analysis '}
				          onClick={this.handleItemClick}
				        >
				          <Link to="/FullScheduleAnalysis">Full Schedule Analysis</Link>
				        </Menu.Item>

				        <Menu.Item
				          name='Chat'
				          active={activeItem === 'Chat'}
				          onClick={this.handleItemClick}
				        >
				          Chat
				        </Menu.Item>
     				 </Menu>
				</div>

				<div className="main_header">
					<img className="logo"src="../../assets/logo.png" alt="EZPZ Way to Easy"/>
                    
                </div>

                <div className="right_menu"><span className="menu_text">Welcome, &nbsp;</span>
               		
                        <span> <span className="menu_text">please</span> <Link className="login_menu menu_item" to="/login"> Login</Link></span>
                </div>
		    </div>

		)
	}
}

export default Header
