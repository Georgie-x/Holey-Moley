import { useState } from "react"
import { Link } from "react-router-dom"
import BurgerIcon from './BurgerIcon.jsx'
function NavBar() {
    const [isOpen, setIsOpen] = useState(false);






    return (
        <>

            <BurgerIcon setIsOpen={setIsOpen} isOpen={isOpen} />
            <div className={isOpen ? "mainNav" : "mainNavToggle"}>
                <nav>
                    <ul>
                        <li><Link className="navLinks" to="" onClick={() => { setIsOpen(false) }}>Play Game</Link></li>
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