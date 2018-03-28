import React, { Component } from 'react'
import { Button,Segment,Grid,Input} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import axios from 'axios'
import styles from './Personalized.scss'
import Cookies from 'universal-cookie';
import requiredCourse from "./requiredCourse.js"

class Personalized extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: '',
			major:'',
			grad_sem:'',
			edit:false,
			editRequired: false,
			active:[],
			requiredCourse:[]

		}
		this.handleClickDelete = this.handleClickDelete.bind(this)
		this.cookies = new Cookies();
		this.handleLogout = this.handleLogout.bind(this);
		this.baseUrl = 'http://localhost:7002'


		this.saveClickHandle = this.saveClickHandle.bind(this);
        this.cancelClickHandle = this.cancelClickHandle.bind(this);
        this.editClickHandle = this.editClickHandle.bind(this);

        this.updateNew = this.updateNew.bind(this);
        this.handleChange = this.handleChange.bind(this);
	}


    componentDidMount(){
        this.updateNew()
    }

    componentWilMount(){
        // console.log("new added" + this.props)
        this.updateNew()
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


    updateNew(){
    	const requiredCourses = _.filter(requiredCourse);
    	this.setState({
    		requiredCourse:requiredCourses
    	})
    	const userInfo = this.cookies.get('userInfo')||null
    	const username = userInfo?userInfo.username:null;

    	let majorInfoUrl = this.baseUrl  + '/getstudentinfo/' + username
    	console.log(majorInfoUrl)
        // console.log("code here")
         axios.get(majorInfoUrl)
	        .then((res) =>{
	            console.log(res)
	        })
	        .catch( (error) =>{
	        	console.log(error)
	        })



            // const pendingAccounts = res.data;
            // const addLabels = _.filter(addLabel);
            // let activeArr = [];
            // let profileLabels = [];

        //     pendingAccounts.map((element,i) =>{
        //         // console.log(i);
        //         // console.log(element.labels)
        //         // this.state.addProfileLabels.push(element.labels);
        //         profileLabels.push(element.labels);
        //         let arr=[]
        //         for (let j = 0; j < addLabels.length; j++){
        //             // console.log(j)
        //             // console.log(addLabels[j].title) 
        //             // console.log(element.labels.includes(addLabels[j].title));
        //             if(element.labels){
        //                 let labelname = addLabels[j].title;
        //                 // console.log(labelname)
        //                 // console.log(JSON.parse(element.labels))
        //                 // console.log(element.labels.labelname)
        //                 if(element.labels.labelname){
        //                     arr.push(true);
        //                 }else{
        //                     arr.push(false);
        //                 }
        //             }  
        //             // console.log(arr) 
        //         }
        //         // console.log(arr);
        //         // this.state.active.push(arr);
        //         activeArr.push(arr);
        //     })
        //     this.setState({
        //         major: res.data,
        //         addLabels: _.filter(addLabel),
        //         active: activeArr,
        //         addProfileLabels: profileLabels
        //     })

        // })
    }

	handleClickDelete(){
		const userInfo = this.cookies.get('userInfo')||null
		const username = userInfo?userInfo.username:null;
		let userAuthInfo = {}
		userAuthInfo["username"] = username;

		console.log("delete the account",userAuthInfo)
		let url = this.baseUrl + '/deleteuser'

	    axios.delete(url, {data:userAuthInfo}) 
	        .then((response)=>{
	            console.log(response);
	            this.handleLogout();

	        })
	        .catch( (error) => {
	            // let {errorType} = error.response.data;
	            console.log(error);
	            // if(errorType === 0){
	            //     this.setState({
	            //         usernameError: "Couldn't find your Leam account"
	            //     })
	            // }else if(errorType === 1){
	            //     this.setState({
	            //         passwordError: "Password incorrect"
	            //     })
	            // }
	        });
	}

	handleChange(event,{name,value}){
        // console.log(event)
        // console.log(event.value);
        console.log("value",value)
        console.log("name",[name])
        this.setState({ [name]: value })
        
    }  

	handleLogout(){
    	console.log("handleLogout")
        this.cookies.remove('userInfo', { path: '/' });
        this.setState({ userInfo: null });
        this.setState({
            redirectPath:"/"
        })
    }

	saveClickHandle(){
		const{major,grad_sem} = this.state
         const userInfo = this.cookies.get('userInfo')||null;
         // console.log(userInfo)
         // let username  = userInfo.username;

         // const {username,email} = this.state;
         let url = this.baseUrl+ '/updatemajgradsem ';
         // console.log(url)
         let newUserInfo = {}
         newUserInfo["username"] =  userInfo.username;
         newUserInfo["major"] = major;
         newUserInfo["grad_sem"] = grad_sem;
         // console.log(data)
            axios.put(url,newUserInfo)
                .then((res)=>{
                    console.log(res)
                    // let data = res.data.data
                    // if(data){
                    //     console.log("debugging")
                    //     this.cookies.remove('userInfo', { path: '/' });
                    //     this.cookies.set('userInfo', res.data.data, { path: '/' });
                    //     this.props.loginHandler(data);

                    // }
                   
                    this.setState({
                        edit:false
                    })
                    
                    // // setTimeout(this.closeModal(),1000)
                    // // this.closeModal()
                })
                .catch((err)=>{
                    console.log(err)
                    // this.setState({
                    //     confirmPasswordError: err
                    // })
                })


    }

    cancelClickHandle(){
        const {edit} = this.state;
        this.setState({
            edit:false
        })
    }
    editClickHandle(e,value){
    	
    	if(value.value == 1){
    		// console.log("edit basic info")
    		this.setState({
            	edit:true
       	 	})
    	}else{
    		// console.log("edit requried courses")
    		this.setState({
            	editRequired:true
       	 	})
    	}
        
    }

    render() {
    	const{edit,
    		  editRequired,
    		  major,
    		  grad_sem,
    		  requiredCourse} = this.state
    	const userInfo = this.cookies.get('userInfo')||null
    	if(!userInfo){
    		return(<Redirect to={{pathname:'/', state:{loggedIn: false}}}  push />)
    	}

    	const editDisplay = edit? "":"none";
        const editHide = edit? "none":"";

        const editDisplayRequired = editRequired? "":"none";
        const editHideRequired = editRequired? "none":"";


        console.log(requiredCourse);

        // requiredCourse.map((label,j)=>{
        // 	console.log(label)
        // }
        // )


    	let basicUserInfo  = (
    		<div>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column className="userColumn">
                            <div className="major row">
                                      <span className="title">Major:&nbsp;</span>
                                      <span className="text" style={{display:editHide}}></span>
                                      <Input name="major" value={major} style={{display:editDisplay}} onChange={this.handleChange}></Input>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="userColumn">
                  
                            <div className="grad_sem row">
                                  <span className="title">grad_sem:&nbsp; </span>
                                  <span className="text" style={{display:editHide}}></span>
                                  <Input name="grad_sem" value={grad_sem} style={{display:editDisplay}} onChange={this.handleChange}></Input>
                            </div>

        
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                    <div className="buttons">
                        <Button negative style={{display:editDisplay}} onClick={this.cancelClickHandle}>Cancel</Button>
                        <Button positive style={{display:editDisplay}} onClick={this.saveClickHandle}>Save</Button>
                        <Button primary  value = '1' style={{display:editHide}} onClick={this.editClickHandle}>Edit</Button>
                    </div>
            </div>    
      

    	)

    	let requiredCourseInfo = (
    		<div>
    			<div className="content">
                    <div className="header">
                            {requiredCourse.map((label,j) =>
                                <Button key={j} className="labelbutton" value ={j}  
                                		// active={this.state.active[i][j]} 
                                		// onClick={this.LabelClickHandler.bind(this,i,j)
                                		color = "orange"
                                    // color={this.state.active[i][j] ? "orange" : null}
                                    >
                                {label.title}
                                </Button>
                            )}
                    </div>
                 </div>
                 <div className="buttons">
                    <Button negative style={{display:editDisplayRequired}} onClick={this.cancelClickHandle}>Cancel</Button>
                    <Button positive style={{display:editDisplayRequired}} onClick={this.saveClickHandle}>Save</Button>
                    <Button primary  value = '2' style={{display:editHideRequired}} onClick={this.editClickHandle}>Edit</Button>
                </div>
    		</div>
    	)

        return(
            <div className="Personalized">
                <h1>Personalized Page</h1>
                <div>
				    
				    <Segment color='orange'>


				    	<h3>Tell us about yourself</h3>
				    	{basicUserInfo}
				    </Segment>
				   
				    <Segment color='blue'>
				    	<h3>Select the required course you have taken</h3>
				    	{requiredCourseInfo}
				    </Segment>

				    <Segment color='violet'>
				    	<h3>Select the elective course you have taken</h3>
				    </Segment>
				   
				   
				</div>
				<div className="delete">
    				<Button  negative onClick={this.handleClickDelete}>Delete the Account</Button>
  				</div>
            </div>
        )
    }
}

export default Personalized