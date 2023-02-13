import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";
import { LogOut } from "./LogOut";
import CustomModal from "./CustomModal";

export default function Profile({ loggedUserName, users }) {
    const { user } = useContext(AuthContext);

    const [visible, setVisible] = useState(false);

    let changeName = async (e) => {
        e.preventDefault();
        let name = e.target[0].value;
        let userDoc = doc(db, "Users", user.email);
        await updateDoc(userDoc, { name: name });
    };

    let changePic = async (e) => {
        e.preventDefault();
        let pic = e.target[0].files[0];
        let userDoc = doc(db, "Users", user.email);
        const storageRef = ref(storage, "images/" + user.email);
        const uploadTask = uploadBytesResumable(storageRef, pic);

        uploadTask.on(
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                        await updateDoc(userDoc, { picURL: downloadURL });
                    }
                );
            }
        );
    };

    return (
        <>
            <div className='dropdown column'>
                <img
                    src={
                        users?.find((usr) => usr.name === loggedUserName)
                            ?.picURL
                    }
                    className='user-img'
                    alt={loggedUserName}
                    onClick={() => setVisible(!visible)}
                ></img>
                {visible && (
                    <div className='dropdown-items column'>
                        <CustomModal
                            labelName='Profile Picture'
                            buttonName='Change Picture'
                            inputType='file'
                            onSubmitFun={changePic}
                        />
                        <CustomModal
                            labelName='Name'
                            buttonName='Change name'
                            inputType='text'
                            onSubmitFun={changeName}
                        />
                        <LogOut user={user} />
                    </div>
                )}
            </div>
        </>
    );
}
