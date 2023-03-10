import { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import registerImg from "../imgs/register.jpg";

export default function Register() {
    const [regError, setRegError] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const usersCol = collection(db, "Users");
    const [users, uloading, error, snapshot] = useCollectionData(usersCol);

    const register = async (e) => {
        setloading(true);
        e.preventDefault();
        let regName = e.target[0].value;
        let regEmail = e.target[1].value;
        let regPassword = e.target[2].value;
        let regPic = e.target[3].files[0];

        if (regName === "") {
            let alert = "Username field is Empty.";
            setRegError(alert);
            console.log(alert);
            return;
        }

        if (users?.find((e) => e.name === regEmail)) {
            let alert = "Username is already exists.";
            setRegError(alert);
            console.log(alert);
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, regEmail, regPassword);
            // ========================================================================

            /** @type {any} */
            const metadata = {
                contentType: "image/jpeg",
            };

            const storageRef = ref(storage, "images/" + regName);
            const uploadTask = uploadBytesResumable(
                storageRef,
                regPic,
                metadata
            );
            let progress;
            await uploadTask.on(
                "state_changed",
                (snapshot) => {
                    progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case "storage/unauthorized":
                            setSubmitState({
                                ...submitState,
                                loading: false,
                                error: e.message,
                            });
                            break;
                        case "storage/canceled":
                            setSubmitState({
                                ...submitState,
                                loading: false,
                                error: e.message,
                            });
                            break;
                        case "storage/unknown":
                            break;
                    }
                },
                () => {
                    if (progress === 100) {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                await setDoc(doc(db, "Users", regEmail), {
                                    id: regEmail,
                                    name: regName,
                                    status: "online",
                                    picURL: downloadURL,
                                });
                            }
                        );
                        navigate("/signin");
                        setloading(false);
                    }
                }
            );

            // ===============================================================================
        } catch (e) {
            console.log(e.message);
            if (e.message === "Firebase: Error (auth/email-already-in-use).") {
                setRegError("Email is already exists.");
                setloading(false);
                return;
            }

            if (e.message === "Firebase: Error (auth/invalid-email).") {
                setRegError("Email is Invalid.");
                setloading(false);
                return;
            }
            if (
                e.message ===
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
            ) {
                setRegError("Password should be at least 6 characters.");
                setloading(false);
                return;
            }
        }
    };
    return (
        <div className='row register-container'>
            <div className='column register-form'>
                <form onSubmit={register}>
                    <h1 className='register-h1'>Sign Up</h1>
                    <div className='input-group'>
                        <label>Name</label>
                        <input type='text' className='register-input' />
                    </div>
                    <div className='input-group'>
                        <label>E-mail</label>
                        <input type='text' className='register-input' />
                    </div>

                    <div className='input-group'>
                        <label>Password</label>
                        <input type='password' className='register-input' />
                    </div>

                    <input type='file' className='file-input' />
                    {loading ? (
                        <button className='register-button' disabaled>
                            Loading ...
                        </button>
                    ) : (
                        <button className='register-button'>
                            <i className='bi bi-arrow-right'></i>
                        </button>
                    )}
                </form>
                <h3>
                    Already have an email{" "}
                    <Link to='/signin' style={{ textDecoration: "none" }}>
                        Log In
                    </Link>
                </h3>
                {regError && <div className='alert'>{regError}</div>}
            </div>
            <div>
                <img src={registerImg} className='reg-img' alt=''></img>
            </div>
        </div>
    );
}
