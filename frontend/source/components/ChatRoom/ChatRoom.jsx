import React from 'react'
import {Icon, Dropdown,Menu,Segment,Input,Label} from 'semantic-ui-react';
import SocketIOClient from 'socket.io-client'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import styles from './ChatRoom.scss'
import Cookies from 'universal-cookie';

class ChatRoom extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			value: '',
			msg: [],
			users:[],
		}
		// this.socket = SocketIOClient('https://mysterious-meadow-13337.herokuapp.com')
		this.socket = SocketIOClient('http://localhost:7002')
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.cookies = new Cookies();

		this.socket.on('message', (o) => {
			this.setState({msg: this.state.msg.concat(o)})
		})

		this.socket.on('users', (o) => {
			let user = this.state.users
			user.push(o)
			this.setState({users: user})
		})
	}

	handleChange(e){
		this.setState({
			value: e.target.value
		})
	}
	handleSubmit(e){
		const userInfo = this.cookies.get('userInfo')||null
		this.socket.emit('users',userInfo.username)
		this.socket.emit('message',this.state.value)
		this.setState({value: ''})
		e.preventDefault()
	}
	render() {
		const userInfo = this.cookies.get('userInfo')||null
    	if(!userInfo){
    		return(<Redirect to={{pathname:'/', state:{loggedIn: false}}}  push />)
    	}
    	const username = userInfo.username
    	console.log(this.state.msg)
    	console.log("join",this.state.users)
		return(
			<div className="ChatRoom">
				<Segment className="room">
					<div id="messages">
						{
							this.state.msg.map((output,j) => {
								return(
									<div key={j}>
										{ username == this.state.users[j] ?
											(<div className="self">
												<div> {this.state.users[j]}</div>
												<Label pointing='right'>{output}</Label>
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
					</div>
					<Input id="m" autoComplete="off" value={this.state.value} onChange={this.handleChange} ></Input>
				    <button onClick={this.handleSubmit}>Send </button>
		    	</Segment>
		    </div>
		)
	}
}
export default ChatRoom