import { useContext } from "react";
import { AuthContext } from "./context";

export const useAuth = ()=>{
    const authContext = useContext(AuthContext);
    return authContext;
}