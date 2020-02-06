
let initialState={
  view: ''
}

let generic_reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SET_VIEW': 
    	return {...state, view: action.payload}
    	
    default:
    	return state
  } 
}

export default generic_reducer