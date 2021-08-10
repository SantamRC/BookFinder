import state from './state'

const reducer=(initialState=state,action)=>{
    switch (action.type) {
      case "LOGIN":
        return {
          ...initialState,
          name: action.name,
          username: action.username,
          token: action.token,
        };
      default:
        return initialState;
    }
}

export default reducer;