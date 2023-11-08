import { useState } from "react";



function BurgerIcon({ isMenuOpen, setIsMenuOpen, isIconOpen, setIsIconOpen }) {


    const handleState = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsIconOpen(!isIconOpen);

    }
    return (
        <div onClick={() => { handleState() }} className="burgerIcon">
            <div className={!isIconOpen ? "burgerBun" : "burgerBunClicked1"}></div>
            <div className={!isIconOpen ? "burgerBun" : "burgerBunClicked2"}></div>
            <div className={!isIconOpen ? "burgerBun" : "burgerBunClicked3"}></div>
        </div>
    )
}

export default BurgerIcon;