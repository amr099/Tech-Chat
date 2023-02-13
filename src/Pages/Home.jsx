import Message from "../components/Message.jsx";
import Form from "../components/Form.jsx";
import { useState, useEffect, useContext } from "react";
import {
    collection,
    onSnapshot,
    getDoc,
    doc,
    setDoc,
    arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AuthContext } from "../context/AuthContext";
import CustomModal from "../components/CustomModal";
// import { Users } from "./Users";
import { Rooms } from "../components/Rooms";
import Profile from "../components/Profile";

export default function Home() {
    const { user } = useContext(AuthContext);

    let usersCol = collection(db, "Users");
    const [users] = useCollectionData(usersCol);

    const [loggedUserName, setLoggedUserName] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("Room 1");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setLoggedUserName(users?.find((usr) => usr.id === user.email).name);
        console.log("username effect");
    }, [users, user.email]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "Rooms", selectedRoom), () => {
            getRoomMsgs(selectedRoom);
            console.log("realtime effect");
        });

        return () => {
            unsub();
        };
    }, [selectedRoom]);

    useEffect(() => {
        let win = document.getElementById("window");
        win.scrollTop = win.scrollHeight;
    }, [messages]);

    async function getRoomMsgs(room) {
        try {
            setSelectedRoom(room);
            const roomMsgs = await getDoc(doc(db, "Rooms", room));
            setMessages(roomMsgs.data().messages);
        } catch (e) {
            console.log(e);
        }
    }

    const createRoom = async (e) => {
        e.preventDefault();
        let roomName = e.target[0].value;
        try {
            const newRoom = await doc(db, "Rooms", roomName);
            await setDoc(newRoom, {
                creator: loggedUserName,
                messages: arrayUnion({
                    message: `${loggedUserName} has created ${roomName} Room successfully!`,
                    time: new Date().toLocaleString(),
                    user: loggedUserName,
                }),
                lastUpdated: new Date().toLocaleString(),
                name: roomName,
            });
        } catch (e) {
            console.log(e.message);
            console.log("error while adding message.");
        }
    };
    return (
        <>
            <div className='container column'>
                <div className='nav row between'>
                    <figure>
                        <h1> TechChat </h1>
                    </figure>
                    <Profile loggedUserName={loggedUserName} users={users} />
                </div>

                <div className='row between'>
                    <div className='column rooms-container'>
                        <CustomModal
                            loggedUserName={loggedUserName}
                            labelName='New Room'
                            buttonName='Create New Room'
                            inputType='text'
                            onSubmitFun={createRoom}
                        />
                        <Rooms getRoomMsgs={getRoomMsgs} />
                    </div>

                    <div className='column window'>
                        <Message
                            loggedUserName={loggedUserName}
                            users={users}
                            messages={messages}
                        />
                        <Form
                            loggedUserName={loggedUserName}
                            selectedRoom={selectedRoom}
                        ></Form>
                    </div>

                    {/* <div className='users'>
                        <Users users={users}/>
                    </div> */}
                </div>
            </div>
        </>
    );
}
