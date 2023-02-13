import React from "react";

export const Users = ({ users }) => {
    return (
        <>
            <ul>
                {users?.map((user) => (
                    <>
                        <li key={Math.random()}>
                            <div className='row'>
                                {user.name}{" "}
                                <div
                                    className='status'
                                    style={
                                        user.status === "online"
                                            ? { backgroundColor: "green" }
                                            : { backgroundColor: "red" }
                                    }
                                ></div>
                            </div>
                        </li>
                    </>
                ))}
            </ul>
        </>
    );
};
