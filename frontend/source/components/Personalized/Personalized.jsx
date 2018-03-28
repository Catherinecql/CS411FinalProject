import React, { Component } from 'react'
import { Button,Segment,Grid,Input,Label} from 'semantic-ui-react'
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
			pendingMajor:'',
			pendingGrad_sem:'',
			edit:false,
			editRequired: false,
			editElective:false,
			addElective:'',
			active:[],
			requiredCourse:[],
			electiveCourse:[]

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
    	// console.log(majorInfoUrl)
        // console.log("code here")
        axios.get(majorInfoUrl)
	        .then((res) =>{
	            // console.log(res.data[0])
	            let data = res.data[0]
	            let major = data.major
	            let grad_sem = data.grad_sem
	            this.setState({
	            	major: major,
	            	grad_sem: grad_sem,
	            	pendingGrad_sem:grad_sem,
	            	pendingMajor:major

	            })
	        })
	        .catch( (error) =>{
	        	console.log(error)
	        })

	    let requriedInfoUrl = this.baseUrl + '/gettakenclasses/' + username
	    console.log(requriedInfoUrl)
	    axios.get(requriedInfoUrl)
	    	.then((res) => {
	    		let requriedCourseTaken = res.data[0].courses_taken
	    		console.log(requriedCourseTaken)


	    	})
	    	.catch((error)=>{
	    		console.log(error)
	    	})


	    let electiveInfoUrl = this.baseUrl + '/gettakenelectives/' + username;
	    axios.get(electiveInfoUrl)
	    	.then((res) => {

	    		let electiveCourseTaken = [];
	    		let electives = res.data
	    		electives.map((element,i)=>{
	    			// console.log("element",element)
	    			electiveCourseTaken.push(element.elective_course)
	    		})
	    		// console.log(res.data)
	    		this.setState({
	    			electiveCourse:electiveCourseTaken
	    		})

	    	})
	    	.catch((error)=>{
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
	            // console.log(response);
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

	saveClickHandle(e,value){
		console.log(value.value)
		if(value.value == 1){
			const{major,grad_sem,pendingGrad_sem,pendingMajor} = this.state
	     	const userInfo = this.cookies.get('userInfo')||null;

		    let url = this.baseUrl+ '/updatemajgradsem ';
		    let newUserInfo = {}
		    newUserInfo["username"] =  userInfo.username;
		    newUserInfo["major"] = pendingMajor;
		    newUserInfo["grad_sem"] = pendingGrad_sem;
	        axios.put(url,newUserInfo)
	            .then((res)=>{
	                this.setState({
	                    edit:false,
	                    major:pendingMajor,
	                    grad_sem:pendingGrad_sem
	                })
	            })
	            .catch((err)=>{
	                console.log(err)
	            })
	    }


    }

    cancelClickHandle(e,value){
        const {edit} = this.state;
        
        if(value.value == 1){
    		// console.log("edit basic info")
    		this.setState({
            	edit:false
       	 	})
    	}else if (value.value == 2){
    		// console.log("edit requried courses")
    		this.setState({
            	editRequired:false
       	 	})
    	}else{
    		this.setState({
            	editElective:false
       	 	})
    	}
    }
    editClickHandle(e,value){
    	
    	if(value.value == 1){
    		// console.log("edit basic info")
    		this.setState({
            	edit:true
       	 	})
    	}else if (value.value == 2){
    		// console.log("edit requried courses")
    		this.setState({
            	editRequired:true
       	 	})
    	}else{
    		this.setState({
            	editElective:true
       	 	})
    	}
        
    }

    render() {
    	const{edit,
    		  editRequired,
    		  editElective,
    		  major,
    		  grad_sem,
    		  requiredCourse,
    		  electiveCourse,
    		  addElective,
    		  pendingGrad_sem,
    		  pendingMajor} = this.state
    	const userInfo = this.cookies.get('userInfo')||null
    	if(!userInfo){
    		return(<Redirect to={{pathname:'/', state:{loggedIn: false}}}  push />)
    	}

    	const editDisplay = edit? "":"none";
        const editHide = edit? "none":"";

        const editDisplayRequired = editRequired? "":"none";
        const editHideRequired = editRequired? "none":"";

        const editDisplayElective = editElective? "":"none";
        const editHideElective = editElective? "none":"";

        // console.log("elective:",electiveCourse);

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
                                      <span className="text" style={{display:editHide}}>{major}</span>
                                      <Input name="pendingMajor" value={pendingMajor} style={{display:editDisplay}} onChange={this.handleChange}></Input>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="userColumn">
                  
                            <div className="grad_sem row">
                                  <span className="title">grad_sem:&nbsp; </span>
                                  <span className="text" style={{display:editHide}}>{grad_sem}</span>
                                  <Input name="pendingGrad_sem" value={pendingGrad_sem} style={{display:editDisplay}} onChange={this.handleChange}></Input>
                            </div>

        
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                    <div className="buttons">
                        <Button negative value = '1' style={{display:editDisplay}} onClick={this.cancelClickHandle}>Cancel</Button>
                        <Button positive value = '1' style={{display:editDisplay}} onClick={this.saveClickHandle}>Save</Button>
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
                                		color = "teal"
                                		disabled={!editRequired}
                                    // color={this.state.active[i][j] ? "orange" : null}
                                    >
                                {label.title}
                                </Button>
                            )}
                    </div>
                 </div>
                 <div className="buttons">
                    <Button negative value = '2'style={{display:editDisplayRequired}} onClick={this.cancelClickHandle}>Cancel</Button>
                    <Button positive value = '2' style={{display:editDisplayRequired}} onClick={this.saveClickHandle}>Save</Button>
                    <Button primary  value = '2' style={{display:editHideRequired}} onClick={this.editClickHandle}>Edit</Button>
                </div>
    		</div>
    	)

    	let electiveCourseInfo = (
    		<div>
    			<div className="content">
                    <div className="header">
                            {electiveCourse.map((label,j) =>
                                <Button key={j} className="labelbutton" value ={j}  
                                		// active={this.state.active[i][j]} 
                                		// onClick={this.LabelClickHandler.bind(this,i,j)
                                		color = "purple"
                                		disabled={!editRequired}
                                		
                                    // color={this.state.active[i][j] ? "orange" : null}
                                    >
                                {label}
                                </Button>
                            )}
                    </div>
                 </div>
                 <div className="buttons">
                     
                     <Button primary  value = '3' style={{display:editHideElective}} onClick={this.editClickHandle}>Edit</Button>
                </div>
                <div className="buttons">
                	<div className="grad_sem row">
                        <Button positive value = '3' style={{display:editDisplayElective}} onClick={this.saveClickHandle}>AddCourse</Button>        	
                        <span className="text" style={{display:editHideElective}}>{addElective}</span>
                        <Input name="addElective" value={addElective} style={{display:editDisplayElective}} onChange={this.handleChange}></Input>
                    </div>
                    
                </div>
                <div className="buttons">
                	<Button negative value = '3'style={{display:editDisplayElective}} onClick={this.cancelClickHandle}>Cancel</Button>
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
				    	{electiveCourseInfo}
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