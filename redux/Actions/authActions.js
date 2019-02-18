const loginUser = (user) =>{
    console.log('ACTIION' , user);
    
    return { 
        type : "LOGIN_USER",
        user
    }
} 

export default loginUser