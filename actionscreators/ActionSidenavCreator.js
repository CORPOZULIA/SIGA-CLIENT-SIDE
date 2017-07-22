import $ from 'jquery'

const ActionSidenavCreator = (id, parent) => {

	if(parent == null || parent !="user"){
		return {
			type: "LOAD_SIDE",
			side: id
		}
	}
}

export default ActionSidenavCreator;