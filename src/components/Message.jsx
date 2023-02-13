export default function Message({ messages, loggedUserName, users }) {
    return (
        <div id='window' className='msgs-container column'>
            {messages.map((message) => (
                <div
                    key={Math.random()}
                    className='row msg'
                    style={
                        loggedUserName === message.user
                            ? { flexDirection: "row-reverse" }
                            : { flexDirection: "row" }
                    }
                >
                    <img
                        src={
                            users?.find((usr) => usr.name === message.user)
                                ?.picURL
                        }
                        style={
                            loggedUserName === message.user
                                ? { display: "none" }
                                : { display: "inline" }
                        }
                        className='msg-img'
                        alt=''
                    ></img>

                    <div className='column'>
                        <strong
                            className='msg-username'
                            style={
                                loggedUserName === message.user
                                    ? { display: "none" }
                                    : { display: "inline" }
                            }
                        >
                            {message.user}
                        </strong>
                        <span className='msg-time'>{message.time}</span>
                        <p
                            className='msg-p'
                            style={
                                loggedUserName === message.user
                                    ? { borderRadius: "40px 40px 0px 40px" }
                                    : { borderRadius: "0px 40px 40px 40px" }
                            }
                        >
                            {message.message}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
