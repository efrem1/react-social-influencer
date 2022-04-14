import React, {useState} from 'react';
import { AuthContext } from './context';

export function AuthProvider({children,tokens,user}){
    const [_tokens,_setTokens] = useState(tokens);
    const [_user,_setUser] = useState(user);
    const setUser = user=>{
        _setUser(user);
        localStorage.setItem('@user',JSON.stringify(user));
    }
    const setTokens = tokens=>{
        _setTokens(tokens);
        localStorage.setItem('@tokens',JSON.stringify(tokens));
    }

    return(
        <AuthContext.Provider
        value={{
            tokens:_tokens,
            user:_user,
            setUser,
            setTokens
        }}
        >{children}</AuthContext.Provider>
    )
}