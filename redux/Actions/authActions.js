const loginUser = (user) =>{
    console.log('ACtion' , user);
    
    return { 
        type : "LOGIN_USER",
        user
    }
} 
const logoutUser = () =>{
    console.log('LogoutACtion');
    
    return { 
        type : "LOGOUT_USER",
    }
} 


export{
    loginUser,
    logoutUser
}