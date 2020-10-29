import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated &&(<div>
            <h1 className="welcomeloginpage">Click Log In to continue!</h1>
        <button onClick={() => console.log(loginWithRedirect())}>
            Log In
        </button>
        </div>)
    )
}

export default LoginButton
