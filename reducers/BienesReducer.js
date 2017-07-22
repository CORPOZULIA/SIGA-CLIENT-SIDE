import {createStore} from 'redux'

const BienesReducer = (state = { codigo: "", bienes : [], grupos: []}, action) => {

	switch(action.type){
		case "NUEVO":
		{
			return {
				state,
				codigo: action.codigo,
				grupos: action.grupos,
				filiales:  action.filiales,
				ubicaciones_fisicas: action.ubicaciones_fisicas
			}
		}
	}

}

const BienesStore = createStore(BienesReducer);
export default BienesStore;