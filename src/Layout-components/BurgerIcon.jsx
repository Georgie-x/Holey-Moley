import { useState } from "react";



function BurgerIcon({ setIsOpen, isOpen }) {
    const [open, setOpen] = useState(false);

    const handleState = () => {
        setIsOpen(!isOpen);
        setOpen(!open);

    }
    return (
        <div onClick={() => { handleState() }} className="burgerIcon">
            <div className={!open ? "burgerBun" : "burgerBunClicked1"}></div>
            <div className={!open ? "burgerBun" : "burgerBunClicked2"}></div>
            <div className={!open ? "burgerBun" : "burgerBunClicked3"}></div>
        </div>
    )
}

export default BurgerIcon;