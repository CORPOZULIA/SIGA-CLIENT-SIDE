import React from 'react'
import{
	Grid,
	Row,
	Col,
	Button
} from 'react-bootstrap';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import { createStore } from 'redux'
import store from '../reducers/DashReducer.js'
import storeUser from '../reducers/UsuarioReducer.js'
import {reactLocalStorage} from 'reactjs-localstorage'
import $ from 'jquery'
import ActionSidenavCreator from '../actionscreators/ActionSidenavCreator.js'

String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class SideNavar extends React.Component{


	constructor(props){
		super(props)
		this.changeView = this.changeView.bind(this)
		this.state = {
			nombre_usuario: "ss",
			profile: ""
		}

		storeUser.subscribe( ()=>{
			this.setState({
				nombre_usuario: storeUser.getState().nombre_usuario,
				profile: storeUser.getState().profile
			})
		} );

	}

	changeView(id, parent){

		if(id == "logout"){
			reactLocalStorage.setObject('credentials', {});
			alert("GRACIAS POR USAR EL SISTEMA, HASTA LUEGO");
			window.location.href = '../index.html'
		}
		store.dispatch(ActionSidenavCreator({id: id.capitalize(), parent: parent}))
		console.log(id.capitalize())
	}

	render(){
		return(
			<div style={{background: '#2c3e50', color: '#FFF', width: 220}}> 
				<SideNav onItemSelection={ (id, parent) => this.changeView(id, parent) }  highlightColor='#fff' highlightBgColor='#00bcd4' defaultSelected='dashboard'>       
					<div style={{ background: "#313131" }}>
						<Grid>
							<Row>
								<Col xs={12} sm={12} md={12} lg={12} style={{ align: "center" }}>
									<img src={"http://192.168.0.17:8000/imagenes/"+this.state.profile} alt="..." className="profile img-circle img-responsive" />
								</Col>	
							</Row>
						</Grid>
					</div>
					<Nav id="user">
						<NavText>{this.state.nombre_usuario}</NavText>
						<Nav id="logout">
							<NavText>Salir</NavText>
						</Nav>
					</Nav>
					<Nav id='home'>
						<NavText> Dashboard </NavText>
					</Nav>
					<Nav id="">
						<NavText> Bienes </NavText>
						<Nav id='AddBienes'>
							<NavText> Agregar bienes </NavText>
						</Nav>
					</Nav>
				</SideNav>
			</div>
		)
	}

}