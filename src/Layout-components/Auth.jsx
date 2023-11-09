import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import AuthDetails from "./AuthDetails";
import SignUp from "./SignUp";
function Auth() {
    return (
        <div>
            <h1>Auth Component</h1>
            <SignIn />
            <SignUp />
            <AuthDetails />
        </div>
    )
}
export default Auth