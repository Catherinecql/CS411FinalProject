import React from 'react'

import SocketIOClient from 'socket.io-client'

class ChatRoom extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			value: '',
			msg: []
		}
		this.socket = SocketIOClient('http://localhost:7002')
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	

	this.socket.on('message', (o) => {
			this.setState({msg: this.state.msg.concat(o)})
		})
	}

	handleChange(e){
		this.setState({
			value: e.target.value
		})
	}
	handleSubmit(e){
		console.log(this.state.value)
		this.socket.emit('message', this.state.value)
		this.setState({value: ''})
		e.preventDefault()
	}
	render() {
		return(
			<div>
				<ul id="messages">
					{
						this.state.msg.map((o) => {
							return(<li>{o}</li>)
						})
					}
				</ul>
			      <input id="m" autoComplete="off" value={this.state.value} onChange={this.handleChange} />
			      <button onClick={this.handleSubmit}>Send </button>
		    </div>
		)
	}
}
export default ChatRoom