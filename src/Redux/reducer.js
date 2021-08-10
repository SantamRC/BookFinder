import state from './state'

const reducer=(initialState=state,action)=>{
    return{
        ...initialState,
        name:action.name,
        token:action.token,
        username:action.username
    }
}

export default reducer;