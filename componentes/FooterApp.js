import React, { Component } from 'react'
import {Row, Col} from "react-bootstrap"

const styles = {
	footerStyle:{
		a:{
			color: "#fff",
			textDecoration: "none"
		}
	}
}

export default class FooterApp extends Component{
	constructor(props){
		super(props)
	}


	render(){

		return(
			<div className="footer">
			 <div className="container">
				<hr className="divider" />
					<div className="container">
						<Row>
							<Col lg={10} md={10}>
								<strong>
									<a href="#" style={styles.footerStyle.a}>Software desarrollador por la gerencia de informática y sistemas</a>
									<a href="#" style={styles.footerStyle.a} className="pull-right">  Terminos de uso </a>
								</strong>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		)

	}
}