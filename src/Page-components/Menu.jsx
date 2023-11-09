function Menu() {
    return (
      <>
        <h1>Menu</h1>
        <button>Join Multiplayer</button>
        <button>Host Multiplayer</button>
        <button>Start Single Player</button>
      </>
    );
  }
  
  export default Menu;
  
  
  
  
  
  
  

//   join should only appear if there is an invite, button can jiggle and have focus if so, redirects to lobby (:game_id/gameLoading)
//   host should redirect to GameSetup, state set to isHost=true
//   start should redirect to GameSetup

//   could have other buttons like highScores here, but maybe that's handled in Nav? Needs CSS decoration later.
  