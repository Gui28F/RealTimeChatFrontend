import {MDBCol, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import React, {useEffect, useLayoutEffect, useRef} from "react";
import SimpleDateTime  from 'react-simple-timestamp-to-date';

function stringToColor(str) {
    // Simple hash function
    const hash = str
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360; // Use the hash to determine the hue (0-360)
    return `hsl(${hue}, 70%, 50%)`;
}
export default function ChatContent(props){
    const {stompClient, chat} = props
    const chatContentRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat content when component is mounted
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [chat.messages]);

    function send(event) {
        var messageContent = document.getElementById("exampleFormControlInput2");
        if(messageContent && messageContent.value !== '' && stompClient) {
            var chatMessage = {
                senderId: localStorage.getItem('userId'),
                msg: messageContent.value,
            };
            stompClient.send(`/app/chat.send/${chat.id}`, {}, JSON.stringify(chatMessage));
            messageContent.value = '';
        }
        event.preventDefault();
    }


    const iconStyle = {
        position: "relative",
        width: "45px",
        height: "45px",
        borderRadius: "100%",
        top: "0.5rem",

        textAlign: "center",
        alignContent: "center",
        color: "white",
        padding: "3px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
    return (
        <>
        <MDBCol id={"content"}
            md="6"
            lg="7"
            xl="8"
            style={{ maxHeight: "75.3vh", overflow: "scroll", borderColor:"blue !important"}}
            ref={chatContentRef}
        >{
            chat && chat.messages.map((msg, index)=> {
                const backgroundColor = stringToColor(msg.user.id);
                if (msg.user.id !== localStorage.getItem('userId')) {
                    return (<div key={index} className="d-flex flex-row justify-content-start">
                        <div
                            style={{ ...iconStyle, backgroundColor }}
                        >
                            {msg.user.id[0].toUpperCase()}
                        </div>
                        <div>
                            <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{backgroundColor: "#f5f6f7"}}
                            >
                                {msg.content}
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{msg.timestamp}</SimpleDateTime>
                            </p>
                        </div>
                    </div>)
                } else {
                    return (<div key={index} className="d-flex flex-row justify-content-end">
                        <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                {msg.content}
                            </p>
                            <p className="small me-3 mb-3 rounded-3 text-muted">
                                <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{msg.timestamp}</SimpleDateTime>
                            </p>
                        </div>

                        <div
                            style={{ ...iconStyle, backgroundColor }}
                        >
                            {msg.user.id[0].toUpperCase()}
                        </div>
                    </div>);
                }
            })
        }

    </MDBCol>
            <MDBCol
                md="6"
                lg="7"
                xl="8"
                className="text-muted d-flex justify-content-end align-items-center ms-auto text-end"
               >
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    alt="avatar 3"
                    style={{ width: "40px", height: "100%" }}
                />
                <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput2"
                    placeholder="Type message"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            send(e);
                        }
                    }}
                />
                <a className="ms-1 text-muted" href="#!">
                    <MDBIcon fas icon="paperclip" />
                </a>
                <a className="ms-3 text-muted" href="#!">
                    <MDBIcon fas icon="smile" />
                </a>
                <a className="ms-3" href="#!" onClick={send}>
                    <MDBIcon fas icon="paper-plane" />
                </a>
            </MDBCol>
        </>);
}
