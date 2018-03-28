import React, { Component } from 'react'
import { Button,Container,Grid,Menu,Dropdown } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link,browserHistory,Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom'
import _ from 'lodash'
import styles from './EZSection.scss'


const getOptions = () => _.times(3, () => {
  var name = {

  }
  return { key: name, text: name, value:name }
})

class EZSection extends Component {
	constructor(props){
		super(props);
		this.state = {
			//search bar
			searchbyItem:'',
		}
		this.searchClickHandler = this.searchClickHandler.bind(this);
		this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);

	}

	componentWillMount() {
    	this.setState({
      		isFetching: false,
      		multiple: false,
      		search: true,
      		searchQuery: null,
      		value: "",
      		"options": [
			    {
			      "key": "CS",
			      "text": "CS",
			      "value": "CS"
			    },
			    {
			      "key": "MATH",
			      "text": "MATH",
			      "value": "MATH"
			    }
			],
    	})
  	}

  	handleChange(e, { value }) {
  		this.setState({ value })
  	} 
  	handleSearchChange(e, { searchQuery }){
  		this.setState({ searchQuery })
  	}

	searchClickHandler(event){

		// console.log("searchClickHandler-- event")
		// let entity = this.state.searchEntity;

		// let current_url = this.baseUrl + "search/" + entity;
		
		// axios.get(current_url)
		// 	.then((response)=>{
		// 		console.log(response.data);
		// 		console.log("cluster");
		// 		let cluster = response.data.clusters;
		// 		let hits = response.data.hits.hits;
		// 		let output = [];
		// 		let documentName =[];
		// 		for(let i = 0; i  < cluster.length; i++){
		// 			for(let j = 0; j < hits.length;j++){
		// 				if(hits[j]._id == cluster[i].document[0].id){
		// 					output.push(hits[j])

		// 					//get the post.txt name
		// 					let value = hits[j]._source.name;
		// 					let fileName = value.substr(0,value.indexOf('.')-0);
		// 					let fileUrl = this.baseUrl+ "getPhysicalDoc/" + value
		// 					axios.get(fileUrl)
		// 						.then((response)=>{
		// 							// console.log(response.data)
		// 							let content = response.data
		// 							let curname = content.substr(0,content.indexOf('<')-0)
		// 							documentName.push(curname)
		// 							this.setState({ documentName: documentName })
		// 						})
		// 						.catch(error =>{
		// 							console.log(error)
		// 						})
		// 				}
		// 			}

		// 		}
		// 		// console.log("trstint",documentName[0])
		// 		// console.log("output",output)
				

		// 		this.setState({
		// 			currentEntity:'',
		// 			cluster: response.data.clusters,
		// 			hits: response.data.hits.hits,
		// 			output:output,
		// 			clusterExamples:output,
		// 			// documentName:documentName
					
		// 		})

		// 		if(response.data.hits.total == 0){
		// 			console.log("Get empty result")
		// 			this.setState({
		// 				emptyResult:true
		// 			})
		// 		}

				// console.log(response.data.clusters);
				// console.log("hits");
				// console.log(response.data.hits.hits);
			// })
			// .catch(error=>{
			// 	console.log(error)

	  // 		});
	}

	handleMenuItemClick(e, { name }){
		this.setState({ searchbyItem: name })
	}
    render() {
    	// console.log(this.props.location)
    	const { 
   			searchbyItem,
   			multiple, options, isFetching, search, value
   		} = this.state
    	let searchBar = (
   			<Container className="searchbar">
				<Grid columns='equal'>
		     		

					<Grid.Column width={7}>
						
						<Dropdown text='Course Subject' floating labeled button className='icon'>
						    <Dropdown.Menu>
							    <Dropdown.Item name='entity' active={searchbyItem === 'entity'} onClick={this.handleMenuItemClick} >
							    	CS
							    </Dropdown.Item>
						
						    </Dropdown.Menu>
						</Dropdown>	
						<button className="ui icon button" role="button" onClick={this.searchClickHandler}>
							<i aria-hidden="true" className="search icon"></i>
						</button>
				
					</Grid.Column>

				</Grid>
			</Container>


   		)

    	let dropDown = (

    		<Grid>
        		<Grid.Column width={8}>
	          		<Dropdown
			            fluid
			            selection
			            search={search}
			           	options={options}
			           	multiple={multiple}
			            value={value}
			            placeholder='Select Course'
			            onChange={this.handleChange}
			            onSearchChange={this.handleSearchChange}
			            disabled={isFetching}
			            loading={isFetching}
	          		/>
        		</Grid.Column>
      		</Grid>
    	)

        return(
            <div className="EZSection">
                <h1>EZ Section - Search a Course!</h1>

                <div className = "SearchArea">
                {dropDown}
                </div>
            </div>
        )
    }
}

export default EZSection

// <Grid.Column width={9}>
// 		     			<IntegrationAutosuggest getSearchValue={this.getSearchValue} onEnter={this.searchClickHandler} onUpdateValue={this.handleUpdateValue} searchValue={this.state.searchEntity} />
// 		     		</Grid.Column>
