const login=(user,name,token)=>{
    return{
        type: 'LOGIN',
        username:user,
        name:name,
        token:token
    }
}

export default login;