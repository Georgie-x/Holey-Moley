import NavBar from './NavBar.jsx'
import styles from "./Header.module.css"

function Header() {

    return (
        <>
            <h1 className={styles.mainHeader}>
                <span className={styles.h}>h</span>
                <span className={styles.o}>o</span>
                <span className={styles.l}>l</span>
                <span className={styles.e}>e</span>
                <span className={styles.y}>y</span>
                <span className={styles.m}>m</span>
                <span className={styles.o}>o</span>
                <span className={styles.l}>l</span>
                <span className={styles.e}>e</span>
                <span className={styles.y}>y</span>

            </h1>
            <NavBar />
        </>

    )
}

export default Header