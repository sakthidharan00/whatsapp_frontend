export const userDetails=null

export const reducer=(state,action)=>{
   
    switch (action.type)
    {
        case "setUser":
            return state=action.user;
             
        default:
            return state;
    }


}

