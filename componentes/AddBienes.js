import React from 'react';
import ReactDOM from 'react-dom'
import {
	Grid,
	Row,
	Col,
	Button

} from 'react-bootstrap'
import BienesActions from '../actionscreators/BienesActions.js'
import BienesStore from '../reducers/BienesReducer.js'

import NumberFormat from 'react-number-format'

export default class AddBienes extends React.Component{

	constructor(props){
		super(props);
		this.state ={
			codigo: "--",
			grupos: "",
			inputs: {
				documento_id : 1,
				costo_inicial_activo: 0
			}
		}

		this.renderGrupos = this.renderGrupos.bind(this)

		BienesStore.subscribe(()=>{
			this.setState({
				inputs:{ codigo: BienesStore.getState().codigo },
				grupos: BienesStore.getState().grupos,
				filiales: BienesStore.getState().filiales,
				ubicaciones_fisicas: BienesStore.getState().ubicaciones_fisicas
			})
		})
	}

	componentWillMount(){
		BienesStore.dispatch(BienesActions("CREAR"))
	}

	renderGrupos(state){
		var grups
		if(state.grupos.length > 0){
			grups = state.grupos.map((grupo, indice) =>{
				return( 
					<option value={grupo.id} key={grupo.codigo_grupo}>
						{grupo.nombre_grupo+" ("+grupo.codigo_grupo+")"}
					</option>
				)
			})

		}

		return grups
	}

	change(e, value=""){
		if(value == "")
			this.state.inputs[e.target.name] = e.target.value
		else
		this.state.inputs[e.target.name] = value.value

		console.log(this.state.inputs)
	}

	calcularDepreciacion(e){
		
		if(typeof this.state.inputs.costo_inicial_activo == 'undefined' 
			|| this.state.inputs.costo_inicial_activo == 0){

			alert("USTED NO HA INDICADO UN COSTO AL ACTIVO")
			e.target.value = ""
		}
		else{
			
		}
	}

	render(){
		return(
			<form id="AddBienesForm" method="post" action="#">
				<Grid>
					<Row>
						<Col lg={3} md={3}>
							<label for="codigo_bien">Codigo</label>
							<div className="input-group">
								<input className="form-control" disabled value={this.state.inputs.codigo} />
							</div>
						</Col>
						<Col lg={3} md={3}>
							<label for="nombre_articulo">Nombre del activo</label>
							<input type="text" onChange={ (input)=>{ this.change(input) } } placeholder="Agrega la descripción del activo" className="form-control" name="nombre_activo" />
						</Col>
						<Col lg={2} md={2}>
							<label for="grupo_id">Serial activo</label>
							<input  onChange={ (e)=>{this.change(e)} } name="serial_activo" placeholder="Serial del activo"  className="form-control" />
						</Col>	
					</Row>
					<br />
					<Row>
						<Col lg={4} md={4}>
							<label for="grupo_id">Grupo de activo</label>
							<select onChange={ (e) =>{ this.change(e) } } className="form-control" name="grupo_id">
								<option value="--">SELECCIONE UNA OPCIÓN</option>
								{this.renderGrupos(this.state)}
							</select>
						</Col>
						<Col lg={4} md={4}>
							<label for="grupo_id">Filial de ubicación</label>
							<select onChange={ (e) =>{ this.change(e) } } className="form-control" name="filiales_id">
								<option value="--">SELECCIONE UNA OPCIÓN</option>
								{this.state.filiales.map( (filial, indice)=> <option value={filial.id}>{filial.nombre_filial}</option> )}
							</select>
						</Col>

					</Row>	
					<Row>					
						<Col lg={2} md={2}>
							<label for="grupo_id">¿El activo deprecia?</label>
							<select onChange={ (e)=>{this.change(e)} } name="deprecia_activo" className="form-control">
								<option value="--">Seleccione una opcion</option>
								<option value="SI">SI</option>
								<option value="NO">NO</option>
							</select>
						</Col>						
						<Col lg={2} md={2}>
							<label for="grupo_id">Ubic. Fisica</label>
							<select onChange={ (e)=>{this.change(e)} } name="ubic_fisica_id" className="form-control">
								<option value="--">Seleccione una opcion</option>
								{this.state.ubicaciones_fisicas.map( (ub, ind)=><option value={ub.id}>{ub.nombre_ubic_fisica}</option> )}
							</select>
						</Col>

						<Col lg={2} md={2}>
							<label for="grupo_id">Fecha de compra</label>
							<input type="date" onChange={(e)=>{this.change(e)}} name="fecha_compra" className="form-control" / >
						</Col>
					</Row>



					<Row>
						<Col lg={3} md={3}>
							<label for="grupo_id">Costo inicial</label>
							<NumberFormat onChange={ (e, values)=>{this.change(e, values)} } name="costo_inicial_activo" value={0.00} className="form-control" thousandSeparator={true} prefix={'Bs. '} />
						</Col>
						<Col lg={3} md={3}>
							<label for="grupo_id">Tiempo de depreciación (MESES)</label>
							<input  type="number" name="tiempo_deprec_activo" className="form-control" onChange={ (e)=>{this.calcularDepreciacion(e)} } />
						</Col>

					</Row>	
				</Grid>	
			</form>
		)
	}

}