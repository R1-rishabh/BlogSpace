import { createContext } from "react";
import { useState } from "react";
const AuthContext = createContext();

function AuthProvider({children}) {
    const [isLoggedIn , setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );
    const [user,setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    return (
        <AuthContext.Provider value={{isLoggedIn , setIsLoggedIn ,user , setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider};
export default AuthContext;