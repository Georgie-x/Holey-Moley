import { useState } from "react";
import styles from "./BurgerIcon.module.css"


function BurgerIcon({ isMenuOpen, setIsMenuOpen, isIconOpen, setIsIconOpen }) {


    const handleState = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsIconOpen(!isIconOpen);

    }
    return (
        <div onClick={() => { handleState() }} className={styles.burgerIcon}>
            <div className={!isIconOpen ? styles.burgerBun : styles.burgerBunClicked1}></div>
            <div className={!isIconOpen ? styles.burgerBun : styles.burgerBunClicked2}></div>
            <div className={!isIconOpen ? styles.burgerBun : styles.burgerBunClicked3}></div>
        </div>
    )
}

export default BurgerIcon;