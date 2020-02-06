
let stats_reducer = (state = {
  career_data_overall:[],
  career_length:0 }, action) => {
  switch(action.type) {
    case 'SET_CAREER_DATA_OVERALL':
      return {...state, career_data_overall: action.payload, career_length: action.payload.length};

    default:
        return state
  }
}

export default stats_reducer