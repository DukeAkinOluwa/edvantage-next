import { AuthContext } from "@/contexts/BottomNavContext"
import { useContext } from "react"

export default function Login(){

    const { login } = useContext(AuthContext);

    function handleLogin(userData){
        login(userData)
    }
    
    return(
        <div className="button" onClick={() => handleLogin("a")}><p>Login</p></div>
    )
}