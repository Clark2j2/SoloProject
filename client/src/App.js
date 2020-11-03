import React from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton'
import {Router} from '@reach/router'
import HomePage from './components/HomePage';
import {useAuth0} from '@auth0/auth0-react';
import Home from './components/HomePage'
import AddForm from './components/AddForm'
import DetailPage from './components/DetailPage';
import UpdatePage from './components/UpdatePage';


function App() {

  const {isLoading} = useAuth0();

  if(isLoading) return <div>Loading...</div>
    
  return (<div>
    <>
      <LoginButton />
      {/* <LogoutButton /> */}
      {/* <HomePage /> */}
    </>
    <Router>
      <Home path="/" />
      <AddForm path="/add/" />
      <DetailPage path="/edit/:id" />
      <UpdatePage path="/update/:id" />
    </Router>
    </div>
  );
}

export default App;
