import {createStore} from 'redux'

const UserReducer = (state = { user: "jj" }, action) =>{

	console.log(action.user)
	switch(action.type){

		case "LOAD_USER_DATA": {

			return{
				state,
				nombre_usuario: action.user.user.nombre,
				profile: action.user.user.picture
			}

		}

	}

}

const storeUser = createStore(UserReducer);
export default storeUser;