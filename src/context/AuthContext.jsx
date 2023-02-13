import { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import React from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({}); /*loggedUser*/

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
