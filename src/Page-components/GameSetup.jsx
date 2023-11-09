import styles from "./GameSetup.module.css"

function GameSetup() {
  return (
    <>
      <h1>GameSetup</h1>
      <h2>Choose a show</h2>
    </>
  );
}

export default GameSetup;

// multiplayer: if isHost=true shows checkboxes of all the users to invite, OR we can skip this and default invite all

// 1P and multiplayer:
// Have clickable tvshow images 3-6 options? (these could be hardcoded to DB so no api worries)
// Have text input to search for other shows (we could have a table with just show_names to reference)

// Once a show is selected a game_id should be generated in BE using show_name and serial int eg Homeland1

// 1P is immediately directed to :game_id/Game

// host is immediately directed to :game_id/GameLoading and other players are sent invite
