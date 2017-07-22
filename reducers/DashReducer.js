
import { createStore } from 'redux'

const Dash = (state = { side: '', clicks: 0 }, action) =>{

	switch( action.type ){
		case 'LOAD_SIDE' : {
			return {
				state,
				side: action.side,
				clicks: state.clicks+1
			}
		}
	}

}

const store =  createStore(Dash, { side: '', clicks: 0 })
export default store;