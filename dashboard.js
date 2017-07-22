import React from 'react'
import{
	Grid,
	Row,
	Col,
	Button
} from 'react-bootstrap';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SideNavar from './componentes/SideNavar.js'
import {reactLocalStorage} from 'reactjs-localstorage';
import storeUser from './reducers/UsuarioReducer.js'

import store from './reducers/DashReducer.js'
import AddBienes from './componentes/AddBienes.js'

export default class Dashboard extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			side: 'Home'
		};

		store.subscribe( () =>{
			this.setState({
				side: store.getState().side.id
			})

			console.log(store.getState())
		} )

		this.componente = this.componente.bind(this)
	}

	componente (){
		switch( this.state.side ){
			case 'AddBienes':{
				
				return <AddBienes />;
			}
		}
	}

	componentDidMount(){
		storeUser.dispatch({
			type: "LOAD_USER_DATA",
			user: reactLocalStorage.getObject('credentials')
		})
	}

	render(){

		return(
			<div className="container-fluid">
				<Grid className="main-grid">
					<Row>
						<Col xs={3} md={3} lg={3} className="sidebar">
							<SideNavar />
						</Col>
						<Col xs={3} md={9} lg={9} className="main">
							{this.componente()}
						</Col>
					</Row>	
				</Grid>	
			</div>
		)
	}
}

