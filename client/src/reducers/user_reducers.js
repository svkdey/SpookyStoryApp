export default function(state={},action){
    switch(action.type){
       case 'USER_LOGIN':
           return {...state,loginUser:action.payload}
        case 'USER_Register':
              return {...state,registerUser:action.payload}
        case 'USER_AUTH':
            // console.log(action.payload)
            return {
                ...state,
                login: action.payload
            }
        default:
            return state;
    }
}