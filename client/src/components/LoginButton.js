import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import logo from '../images/BB4Ksquare.png'
import Button from '@material-ui/core/Button'
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles'
import { InlineWrapper } from '@material-ui/pickers/wrappers/InlineWrapper'

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    const theme = createMuiTheme({
        overrides: {
          // Style sheet name ⚛️
          MuiButton: {
            // Name of the rule
            display: "inline",
            text: {
              // Some CSS
              color: 'black',
              marginLeft: "40%",
            },
          },
        },
      });

    return (
        !isAuthenticated &&(
        <div>
            <h1 className="welcomeloginpage">Building Blocks - Equipment Inventory</h1>
            <div className="loginbutton"><ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" onClick={() => console.log(loginWithRedirect())}>
                    Take me to log in portal
                </Button>
            </ThemeProvider>
            </div>
            <img className="loginimage" src={logo} alt="BB4K Logo" />
            
            
        </div>)
    )
}

export default LoginButton
