import { AnswerInput, ClueDisplay, GameTimer, Launcher, Mole, PictureMask, Picture } from "../Game-components/index.jsx"
import styles from "./Game.module.css"

function Game() {
    return (
        <div>

            <div className={styles.gamecontainer}>
                <div className={styles.gameborder}>
                    <Launcher />
                </div>
            </div>
        </div>
    )
}

export default Game