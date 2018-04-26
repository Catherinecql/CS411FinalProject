/** @author Qinglin Chen
**/
import React from 'react'
import {Container,Divider,Icon, Dropdown,Menu,Segment,Input,Label,Button} from 'semantic-ui-react';
import SocketIOClient from 'socket.io-client'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import styles from './ChatRoom.scss'
import Cookies from 'universal-cookie';
import StayScrolled from 'react-stay-scrolled';

class ChatRoom extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			value: '',
			msg: [],
			users:[],
		}
		this.socket = SocketIOClient('https://mysterious-meadow-13337.herokuapp.com')
		// this.socket = SocketIOClient('http://localhost:7002')
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.cookies = new Cookies();
		this.handleKeyPress = this.handleKeyPress.bind(this)

		this.socket.on('message', (o) => {
			this.setState({msg: this.state.msg.concat(o)})
		})

		this.socket.on('users', (o) => {
			let user = this.state.users
			user.push(o)
			this.setState({users: user})
		})
	}
	componentDidUpdate(){
		// console.log("componentWillMount")
		var elmnt = document.getElementById(this.state.msg.length-1);
		// console.log("elemt",elmnt)
		if(elmnt)
			// elmnt.scrollTop = elmnt.scrollHeight;
    		elmnt.scrollIntoView({block: "end"});
	}

	handleChange(e){
		this.setState({
			value: e.target.value
		})
	}
	handleSubmit(e){
		console.log(e)
		const userInfo = this.cookies.get('userInfo')||null
		this.socket.emit('users',userInfo.username)
		this.socket.emit('message',this.state.value)
		this.setState({value: ''})
		// let elmnt = document.getElementById(this.state.msg.length-1);
		// console.log(elmnt)
		// elmnt.scrollIntoView();
		// e.psreventDefault()
	}
	
	//keyboard event listener
	handleKeyPress(event){
		if(event.key == 'Enter'){
			this.handleSubmit();
	
		}
	}
	render() {
		const userInfo = this.cookies.get('userInfo')||null
    	if(!userInfo){
    		return(<Redirect to={{pathname:'/', state:{loggedIn: false}}}  push />)
    	}
    	const username = userInfo.username
    	
    
    	// console.log("join",this.state.users)
		return(
			<div className="ChatRoom">
				<h1 className = "ChatTitle"> Chat to get advice! </h1>
				<Segment className="room">
						<StayScrolled className="messages">
							{
								this.state.msg.map((output,j) => {
									return(
										<div id={j} className="msg" key={j}>
											{ username == this.state.users[j] ?
												(<div className="self">
													<div> {this.state.users[j]}</div>
													<Label color='teal' pointing='right'>{output}</Label>
												</div>)
											:
												(<div className="other">
													<div> {this.state.users[j]}</div>
													<Label pointing='left'>{output}</Label>
												</div>)
											}
										</div>
									)
								})
							}
						</StayScrolled>

					<div className="inputsection"> 
						<Input className="msginput" id="m" 
						       autoComplete="off" 
						       placeholder="type a message here"
						       value={this.state.value} 
						       onChange={this.handleChange}
						       onKeyDown={this.handleKeyPress}  >
						      
						</Input> 
						<Button onClick={this.handleSubmit}>Send </Button>
							    
				    </div>
		    	</Segment>
		    </div>
		)
	}
}
export default ChatRoom