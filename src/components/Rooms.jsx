import React from "react";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const Rooms = ({ getRoomMsgs }) => {
    let roomsCol = collection(db, "Rooms");
    const [rooms] = useCollectionData(roomsCol);

    return (
        <div className='rooms'>
            <ul>
                {rooms?.map((room) => (
                    <li key={Math.random()}>
                        <button onClick={() => getRoomMsgs(room.name)}>
                            {room.name}
                        </button>
                    </li>
                ))}
            </ul>{" "}
        </div>
    );
};
