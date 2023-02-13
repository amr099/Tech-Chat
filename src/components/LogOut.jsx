import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
// import { updateDoc, doc } from "firebase/firestore";
// import { db } from "../firebase-config";

export function LogOut() {
    const Out = async () => {
        signOut(auth);
        // let userRef = await doc(db, "Users", user.email);
        // await updateDoc(userRef, {
        //     status: "offline",
        // });
    };

    return (
        <>
            <button className='dropdown-modal' onClick={Out}>
                SignOut
            </button>
        </>
    );
}
