import './App.css';
import { useState } from "react";
import { PageDisplay, Auth, Header, NavBar, SignIn, Sockets } from "./Layout-components";
import SignUp from "./Layout-components/SignUp";
import AuthDetails from "./Layout-components/AuthDetails";
import { Launcher } from './Game-components';
import { UserContext, UserProvider } from './Users/UserContext'


function App() {
  return (
    <>
   <UserProvider >
      <PageDisplay />
      {/* <Launcher /> */}
      {/* <NavBar />
      <Sockets />

      <Auth />
      <PageDisplay /> */}

    </UserProvider  >
    </>
  )
}

export default App;
