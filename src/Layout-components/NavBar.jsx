import { useState } from "react"
import { Link } from "react-router-dom"
import BurgerIcon from './BurgerIcon.jsx'
import styles from "./NavBar.module.css"
import AuthDetails from "./AuthDetails.jsx"

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isIconOpen, setIsIconOpen] = useState(false);



    const handleState = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsIconOpen(!isIconOpen);
    }

    return (
        <>
            <AuthDetails />
            <BurgerIcon setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} isIconOpen={isIconOpen} setIsIconOpen={setIsIconOpen} />
            <div className={isMenuOpen ? styles.mainNav : styles.mainNavToggle}>
                <nav>
                    <ul>
                        <li><Link className={styles.navLinks} to="/menu" onClick={() => { handleState() }}>Play Game</Link></li>
                        <li><Link className={styles.navLinks} to="/highscores" onClick={() => {
                            handleState()
                        }}>High Scores</Link></li>
                        <li>Messages</li>
                        <li>Profile</li>
                    </ul>
                </nav>
            </div>

        </>
    )
}

export default NavBar