import { useState } from "react";
import {PageDisplay, Auth, Header, NavBar, SignIn, Sockets} from "./Layout-components"
import Comp from './Game-components.jsx/Comp'
import {PageDisplay, Auth, Header, NavBar, SignIn, Sockets} from "./Layout-components";
import SignUp from "./Layout-components/SignUp";
import AuthDetails from "./Layout-components/AuthDetails";



function App() {
  return (
    <>

  <Header />
  <NavBar />
  <Sockets />
  <SignIn />
  <SignUp />
  <AuthDetails />
  <Auth />
  <PageDisplay />
  </>

  )
}

export default App;
