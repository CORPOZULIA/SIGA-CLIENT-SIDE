import React from 'react'
import {
Row, 		
Col,
FormControl,
FormGroup,
ControlLabel,
Form,
InputGroup,
Button,
Panel,
Glyphicon
} from 'react-bootstrap'
import FooterApp from "./FooterApp.js"
import $ from "jquery"
import {reactLocalStorage} from 'reactjs-localstorage';

const {BrowserWindow, remote} = require('electron').remote
const PDFWindow = require('electron-pdf-window')




var styles = {
	panel:{
		color: "#000000",
		marginTop: "53px"
	},
	inputs:{
		marginLeft: "150px",
	}
}

export default class LoginViewComponent extends React.Component{

	constructor(props){
		super(props);
		this.validarLogin = this.validarLogin.bind(this)
		this.formulario = this.formulario.bind(this)
		this.closeButton = this.closeButton.bind(this)

		this.state={
			inLogin: false
		}
		
	}

	componentWillMount(){
		this.state = {
			email:"",
			password: ""
		}
	}

	closeButton(){

		if( confirm("¿Seguro que desea salir?") )
		{
			window.close();
		}
	}


	validarLogin(){	
		if(this.state.email.value ==="" || this.state.password.value === ""){
			alert("Usted necesita completar el formulario de login")

		}
		else{
			let data = {
				email: this.state.email.value,
				password: this.state.password.value
			}
			$.post("http://192.168.0.17:8000/index.php/desktopApp/login", data,function(e){
				if(!e.error){
					reactLocalStorage.setObject('credentials', e.credentials);
					alert("Bienvenido "+e.credentials.user.nombre);
					/*const win = new BrowserWindow({ width: 800, height: 600 })
					PDFWindow.addSupport(win)

					 win.loadURL('http://192.168.0.17/constancia.pdf')
					alert(location.host)*/
					location.href = "./dash/dashboard.html";
				}
				else if(e.error == "invalid_credentials")
					alert("USTED HA INGRESADO UNA COMBINACIÓN DE USUARIO Y CLAVE INVALIDOS, VUELVA A INTENTARLO")
			})
		}
		
	}

	formulario(e, nuevo){
		console.log(e)
	}

	render(){
		return(

			<div className="container">
				<Row>
					<Col md={8} sm={12} lg={8} className="col-md-offset-2 loginBox col-lg-offset-2">
						<div id="target">
							<strong>
								Inicio de sessión
							</strong>
							<Button className="btn-exit" onClick={ ()=> this.closeButton() }>
								<Glyphicon glyph="remove" />
							</Button>
						</div>
						<Form horizontal id="loginForm" method="post"
						>
							<div className="form-group">
								<Row>
									<Col xs={12} sm={12} lg={8} lgPush={2}>
										<label>Usuario</label> <Glyphicon glyph="user" /> 
										<input ref={ (input) => { this.state.email = input; } } name="username" placeholder="Tu cuenta de usuario" type="text" className="form-control loginInput" />
									</Col>
								</Row>
								<Row>
									<Col xs={12} sm={12} lg={8} lgPush={2}>
										<label>Clave de usuario</label> <Glyphicon glyph="lock" /> 
										<input ref={ (input) => { this.state.password = input } }  name="password" placeholder="Tu cuenta de usuario" type="password" className="form-control loginInput" />
									</Col>
								</Row>
							</div>

							<div className="container">
								<Row>
									<Col lg={4} md={4} lgPush={2}>
										<Button onClick={() => this.validarLogin() } disabled={this.state.inLogin} bsStyle={'primary'} className="btn-login" block>
											<Glyphicon glyph="log-in" />
										</Button>
									</Col>
								</Row>
							</div>
						</Form>
					
					</Col>
				</Row>

				<FooterApp />
			</div>
		)
	}

}