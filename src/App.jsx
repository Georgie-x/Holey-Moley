import './App.css';
import { useState } from "react";
import { PageDisplay, Auth, Header, NavBar, SignIn, Sockets } from "./Layout-components";
import SignUp from "./Layout-components/SignUp";
import AuthDetails from "./Layout-components/AuthDetails";
import { Launcher } from './Game-components.jsx';


function App() {
  return (
    <>
      <Header />
      <PageDisplay />
      <Launcher />
      {/* <NavBar />
      <Sockets />

      <Auth />
      <PageDisplay /> */}
    </>
  )
}

export default App;
