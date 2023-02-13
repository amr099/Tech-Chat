import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState } from "react";
import { useRef } from "react";

export default function Form({ loggedUserName, selectedRoom }) {
    const [message, setMessage] = useState("");
    const inputRef = useRef(null);

    let addMessages = async (selectedRoom) => {
        let newMessage = {
            message: message,
            user: loggedUserName,
            time: new Date().toLocaleString(),
        };
        inputRef.current.value = "";
        try {
            let room = await doc(db, "Rooms", selectedRoom);

            await updateDoc(room, {
                messages: arrayUnion(newMessage),
                lastUpdated: new Date().toLocaleString(),
            });
        } catch (e) {
            console.log(e.message);
            console.log("error while adding message.");
        }
    };
    return (
        <>
            <div className='form row between'>
                <input
                    type='text'
                    className='form-input'
                    placeholder='your message'
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addMessages(selectedRoom);
                        }
                    }}
                    ref={inputRef}
                />
                <button
                    className='form-button'
                    onClick={() => addMessages(selectedRoom)}
                >
                    <i className='bi bi-send-fill'></i>
                </button>
            </div>
        </>
    );
}
