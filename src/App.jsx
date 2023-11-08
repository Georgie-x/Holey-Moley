import { useState } from "react";
import {PageDisplay, Auth, Header, NavBar, SignIn, Sockets} from "./Layout-components"
import Comp from './game/Comp'


function App() {
  return (
    <>
  <Header />
  <NavBar />
  <Sockets />
  <SignIn />
  <Auth />
  <PageDisplay />
  <Comp />
  </>
  )
}

export default App;
