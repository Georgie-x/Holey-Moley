
import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import AuthDetails from "./AuthDetails";
import SignUp from "./SignUp";
import styles from "./Auth.module.css"
import { useState } from "react";

function Auth({ setIsHeaderVisible }) {
    const [signUp, setSignUp] = useState(true);

    return (
        <div className={styles.landingpage}>
            <div className={styles.headerbox}>
                <img className={styles.logo} src="src/assets/HMLogo3.png" alt="" />
                {signUp ? <SignIn setIsHeaderVisible={setIsHeaderVisible} /> : <SignUp setIsHeaderVisible={setIsHeaderVisible} />}
                {/* <SignIn />
            <SignUp /> */}

                <h3>OR...</h3>
                <button className={styles.button} onClick={() => { setSignUp(!signUp) }}>{signUp ? "Sign Up" : "Log In"}</button>
            </div>


        </div>
    )
}




export default Auth