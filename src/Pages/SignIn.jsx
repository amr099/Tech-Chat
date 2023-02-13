import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
// import { updateDoc, doc } from "firebase/firestore";
// import { db } from "../firebase-config";

export default function SignIn() {
    const [logError, setLogError] = useState("");
    const navigate = useNavigate();

    const In = async (e) => {
        e.preventDefault();
        let logEmail = e.target[0].value;
        let logPassword = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, logEmail, logPassword);
            // let userRef = await doc(db, "Users", logEmail);
            // await updateDoc(userRef, {
            //     status: "online",
            // });
            navigate("/");
        } catch (e) {
            if (e.message === "Firebase: Error (auth/invalid-email).") {
                setLogError("Invalid Email.");
                console.log(e.message);
            } else if (e.message === "Firebase: Error (auth/wrong-password).") {
                setLogError("Wrong Password.");
                console.log(e.message);
            }
        }
    };

    return (
        <div className='login-container row'>
            <div className='login-form'>
                <h1 className='login-h1'>Welcome</h1>
                <form onSubmit={In}>
                    <div className='input-group'>
                        <label>E-mail</label>
                        <input type='text' className='login-input' />
                    </div>
                    <div className='input-group'>
                        <label>Password</label>
                        <input type='password' className='login-input' />
                    </div>
                    <button className='login-button'> Log In</button>
                </form>
                <h3>
                    Don't have an Email yet ?{" "}
                    <Link to='/register' style={{ textDecoration: "none" }}>
                        Register Now
                    </Link>
                </h3>
                {logError && (
                    <div className='alert alert-danger' role='alert'>
                        {logError}
                    </div>
                )}
            </div>
        </div>
    );
}
