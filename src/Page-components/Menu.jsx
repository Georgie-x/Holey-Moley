import styles from "./Menu.module.css"
import { Link } from "react-router-dom"

function Menu() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={(e) => e.target.classList.toggle(styles.buttonclicked)}>One Player</button>
            <button className={styles.button} onClick={(e) => e.target.classList.toggle(styles.buttonclicked)}>Two Player</button>
          </div>
          <h3>Pick a show!</h3>
          <div className={styles.showcardcont}>
            <div className={styles.showcards}><Link to="/setup">
              <img src="src/assets/friends.png" alt="friends showcard" />
            </Link></div>
            <div className={styles.showcards}><Link><img src="src/assets/got.png" alt="game of thrones showcard" /></Link></div>
            <div className={styles.showcards}><Link><img src="src/assets/homeland.png" alt="homeland showcard" /></Link></div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Menu;








//   join should only appear if there is an invite, button can jiggle and have focus if so, redirects to lobby (:game_id/gameLoading)
//   host should redirect to GameSetup, state set to isHost=true
//   start should redirect to GameSetup

//   could have other buttons like highScores here, but maybe that's handled in Nav? Needs CSS decoration later.
