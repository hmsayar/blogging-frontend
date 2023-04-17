import React, { useState } from "react"
const LoginContext = React.createContext<any>({} as any)
interface Props {
    children: React.ReactNode
}

interface TAuth {
    accessToken: string;
    userRoles: string[];
    username: string
    login: boolean
}

function LoginContextProvider({ children }: Props) {
    const [auth, setAuth] = useState({})
    function handleLogin(inf: TAuth) {
        setAuth(inf)
    }
    return (
        <LoginContext.Provider value={{ auth, handleLogin }}>
            {children}
        </LoginContext.Provider>

    )
}

export { LoginContextProvider, LoginContext }