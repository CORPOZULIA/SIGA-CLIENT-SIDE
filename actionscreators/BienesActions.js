
import $ from 'jquery'

import {reactLocalStorage} from 'reactjs-localstorage'

/**
 * ACTIONCREATOR PARA EL MODULO DE BIENES
 * @param  String accion 	ACCIÓN A REALIZAR POR EL STORE
 * @param  String codigo 	CODIGO ANTERIOR DEL ACTIVO
 * @return Object        	RETORNA UNA ACCIÓN
 */
const BienesActions = (accion, codigo="") =>{
	var user = reactLocalStorage.getObject('credentials');
	var datos = {};
	if(accion == "CREAR"){

		$.ajax({
			'url': 'http://192.168.0.17:8000/index.php/desktopApp/bienes?controlador=Nuevo&accion=nuevo_activo&token='+user.token,
			"type": "json",
			"method": "GET",
			 success: (result)=>{
				if(result.error == true)
				{
					if(result.tipo_error == "token_expired")
					{
						location.href = "../index.html";
						alert(result.mensaje)
					}
				}
				else{
					var credentials = reactLocalStorage.getObject('credentials');
					credentials.token = result.token
					datos  = {
						type: "NUEVO",
						codigo: result.codigo,
						grupos: result.grupos,
						filiales: result.filiales,
						ubicaciones_fisicas: result.ubicaciones_fisicas
					}
					
					reactLocalStorage.setObject('credentials', credentials);
				}
			},
			 async: false,
		});

		return datos

	}
}

export default BienesActions;