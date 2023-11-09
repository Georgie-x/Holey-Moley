import { Route, Routes } from "react-router-dom";
import { Menu, Game, GameLoading, GameResults, GameSetup, HighScores } from "../Page-components"

function PageDisplay() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/lobby" element={<GameLoading />} />
        <Route path="/results" element={<GameResults />} />
        <Route path="/game" element={<Game />} />
        <Route path="/highscores" element={<HighScores />} />
      </Routes>
    </main>
  );
}

export default PageDisplay;
