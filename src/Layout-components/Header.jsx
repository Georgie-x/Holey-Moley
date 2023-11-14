import NavBar from './NavBar.jsx'
import styles from "./Header.module.css"

function Header() {

    return (
        <>
            <div className={styles.container}>
                <img className={styles.logo} src="src/assets/HMLogo3.png" alt="holey moley logo" />
                <div className={styles.rightnav}>
                    <NavBar />
                </div>
            </div>
        </>

    )
}

export default Header