const reducer = (state = {}, action) =>{
    switch(action.type) {
        case "LOGIN_USER": {
            console.log('LoginReducer' , action.user);
            
            return {...state, user: action.user}
        }
        case 'LOGOUT_USER' : {
            console.log('LogoutReducer' , action.user);
            return {...state , user : null}
        }
        default: {
            return state;
        }
    }
}

export default reducer;