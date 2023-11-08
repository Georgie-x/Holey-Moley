import { useState } from "react";
<<<<<<< HEAD
import {PageDisplay, Auth, Header, NavBar, SignIn, Sockets} from "./Layout-components"
import Comp from './game/Comp'
=======
<<<<<<< HEAD
import { PageDisplay, Auth, Header, NavBar, SignIn, Sockets } from "./Layout-components"
=======
import {PageDisplay, Auth, Header, NavBar, SignIn, Sockets} from "./Layout-components";
import SignUp from "./Layout-components/SignUp";
import AuthDetails from "./Layout-components/AuthDetails";
>>>>>>> master
>>>>>>> b643851132d4d2c10405ace6156e0a12f34a2f0b


function App() {
  return (
    <>
<<<<<<< HEAD
      <Header />
      <PageDisplay />
      {/* <NavBar />
      <Sockets />
      <SignIn />
      <Auth />
      <PageDisplay /> */}
    </>
=======
  <Header />
  <NavBar />
  <Sockets />
  <SignIn />
  <SignUp />
  <AuthDetails />
  <Auth />
  <PageDisplay />
  <Comp />
  </>
>>>>>>> master
  )
}

export default App;
