import {MDBCol, MDBIcon} from "mdb-react-ui-kit";
import React, {useLayoutEffect, useRef} from "react";

function stringToColor(str) {
    // Simple hash function
    const hash = str
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360; // Use the hash to determine the hue (0-360)
    return `hsl(${hue}, 70%, 50%)`;
}
export default function ChatContent(props){
    const {chat} = props
    console.log(chat)
    const chatContentRef = useRef(null);

    useLayoutEffect(() => {
        // Scroll to the bottom of the chat content when component is mounted
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, []);
    const backgroundColor = stringToColor("teste");
    return (
        <>
        <MDBCol
            md="6"
            lg="7"
            xl="8"
            style={{ maxHeight: "75.3vh", overflow: "scroll", borderColor:"blue !important"}}
            ref={chatContentRef}
        >{
            chat.messages.map((msg)=>{
                if(true) {
                    return (<div className="d-flex flex-row justify-content-start">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                            alt="avatar 1"
                            style={{width: "45px", height: "100%"}}
                        />
                        <div>
                            <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{backgroundColor: "#f5f6f7"}}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                12:00 PM | Aug 13
                            </p>
                        </div>
                    </div>)
                }else {
                    return (<div className="d-flex flex-row justify-content-end">
                        <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                            <p className="small me-3 mb-3 rounded-3 text-muted">
                                12:00 PM | Aug 13
                            </p>
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "45px",
                                height: "45px",
                                borderRadius: "100%",
                                top: "0.5rem",

                                textAlign: "center",
                                alignContent: "center",
                                backgroundColor,
                                color: "white",
                                padding: "3px",
                                fontSize: "14px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {"T"}
                        </div>
                    </div>);
                }
            })
        }

    </MDBCol>
            <div   className="text-muted d-flex justify-content-end align-items-center pe-3 pt-3 mt-2"
                   style={{ width: "100%",
                   paddingLeft:"51.6%"}}>
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
                />
                <a className="ms-1 text-muted" href="#!">
                    <MDBIcon fas icon="paperclip" />
                </a>
                <a className="ms-3 text-muted" href="#!">
                    <MDBIcon fas icon="smile" />
                </a>
                <a className="ms-3" href="#!">
                    <MDBIcon fas icon="paper-plane" />
                </a>
            </div>
        </>);
}
