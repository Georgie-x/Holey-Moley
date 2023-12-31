import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./SignUp.module.css"
import { useNavigate } from "react-router-dom";

function SignUp({ setIsHeaderVisible }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();


    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsHeaderVisible(true);
                console.log(userCredential);

                navigate('menu');

                //post request to users table with email and username (not password because handled with firebase)

            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.signincontainer}>
            <form onSubmit={signUp}>
                <h2>Create Account</h2>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>


                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;