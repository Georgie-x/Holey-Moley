import { useState } from "react";
import { PageDisplay, Auth, Header, NavBar, SignIn, Sockets } from "./Layout-components";
import SignUp from "./Layout-components/SignUp";
import AuthDetails from "./Layout-components/AuthDetails";


function App() {
  return (
    <>
      <Header />
      <PageDisplay />
      {/* <NavBar />
      <Sockets />

      <Auth />
      <PageDisplay /> */}
    </>
  )
}

export default App;
