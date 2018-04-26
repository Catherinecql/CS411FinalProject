/** @author Qinglin Chen
**/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Dropdown,Menu} from 'semantic-ui-react';
import './Header.scss';
import Cookies from 'universal-cookie';


class Header extends Component {
	constructor(props) {
        super(props);
        this.state = {
            activeItem: ''
        };
  
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.cookies = new Cookies();
    }
    componentWillMount() {
        // console.log("componentWillMount")
        this.handleLogin();
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

    handleLogin() {
        const userInfo = this.cookies.get('userInfo')||null
        // console.log("handleLogin",userInfo)
        this.setState({ userInfo: userInfo });
    }

    handleLogout(){
    	// console.log("handleLogout")
        this.cookies.remove('userInfo', { path: '/' });
        this.setState({ userInfo: null });
        this.setState({
            redirectPath:"/"
        })
    }

    handleItemClick(e, { name }){
    	this.setState({ activeItem: name })
    }

	render(){
		const { activeItem,userInfo } = this.state
		// console.log(this.props)
		// console.log(userInfo)
        const username = userInfo?userInfo.username:null;
    
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
				          <Link to="/FullScheduleAnalysis">Recommend me</Link>
				        </Menu.Item>

				        <Menu.Item
				          name='Chat'
				          active={activeItem === 'Chat'}
				          onClick={this.handleItemClick}
				        >
				          <Link to="/ChatRoom">ChatRoom</Link>
				        </Menu.Item>
     				 </Menu>
				</div>

				<div className="main_header">
					<img className="logo"src="../../assets/logo.png" alt="EZPZ Way to Easy"/>
                    
                </div>

                <div className="right_menu"><span className="menu_text">Welcome, &nbsp;</span>
               		
                    {!userInfo?
                        <span> <span className="menu_text">please</span> <Link className="login_menu menu_item" to="/login"> Login</Link></span>
                    :
                        <span> 
                            <Icon name='user circle' /> 
                            <Dropdown text={username}>
                                <Dropdown.Menu>
                                    
                                    <Link to="/Personalized" className="drop_item">Personalized</Link>
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
