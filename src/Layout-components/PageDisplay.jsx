import { Route, Routes } from "react-router-dom";

import { Menu, Game, GameLoading, GameResults, GameSetup, HighScores } from "../Page-components"
import { Auth, Header } from '../Layout-components'
import styles from "./PageDisplay.module.css"
import { useState } from "react";


function PageDisplay() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  return (
    <>
      {isHeaderVisible ? <Header /> : null}

      <main>
        <Routes>
          <Route path="/" element={<Auth setIsHeaderVisible={setIsHeaderVisible} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/setup" element={<GameSetup />} />
          <Route path="/lobby" element={<GameLoading />} />
          <Route path="/results" element={<GameResults />} />
          <Route path="/game" element={<Game />} />
          <Route path="/highscores" element={<HighScores />} />
        </Routes>
      </main>
    </>
  );
}

export default PageDisplay;
