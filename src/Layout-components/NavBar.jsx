import { useState } from "react"
import { Link } from "react-router-dom"
import BurgerIcon from './BurgerIcon.jsx'
function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isIconOpen, setIsIconOpen] = useState(false);



    const handleState = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsIconOpen(!isIconOpen);
    }

    return (
        <>

            <BurgerIcon setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} isIconOpen={isIconOpen} setIsIconOpen={setIsIconOpen} />
            <div className={isMenuOpen ? "mainNav" : "mainNavToggle"}>
                <nav>
                    <ul>
                        <li><Link className="navLinks" to="" onClick={() => { handleState() }}>Play Game</Link></li>
                        <li>Leaderboard</li>
                        <li>Messages</li>
                        <li>Profile</li>
                    </ul>
                </nav>
            </div>

        </>
    )
}

export default NavBar