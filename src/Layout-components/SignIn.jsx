import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./SignIn.module.css"
import { UserContext, UserProvider } from "../Users/UserContext";


function SignIn({ setIsHeaderVisible }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(UserContext);
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsHeaderVisible(true);
                //make a request to backend users database flitering with email to  get username
                setUser(() => {
                    const username=email.split('@')[0];
                    return username;
                })

                setEmail('');
                setPassword('');
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.signincontainer}>
            <form onSubmit={signIn}>
                <h2>Log In</h2>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label id="password" htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default SignIn;