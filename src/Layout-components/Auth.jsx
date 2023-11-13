
import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import AuthDetails from "./AuthDetails";
import SignUp from "./SignUp";
import styles from "./Auth.module.css"
import { useState } from "react";

function Auth() {
    const [signUp, setSignUp] = useState(true);
    return (
        <div className={styles.landingpage}>
            <div className={styles.headerbox}>
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
                {signUp ? <SignIn /> : <SignUp />}
                {/* <SignIn />
            <SignUp /> */}

                <h3>OR...</h3>
                <button className={styles.button} onClick={() => { setSignUp(!signUp) }}>{signUp ? "Sign Up" : "Log In"}</button>
            </div>


        </div>
    )
}




export default Auth