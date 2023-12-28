import React, {useEffect, useState} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBInputGroup,
} from "mdb-react-ui-kit";
import ChatMini from "../chatMini/ChatMini";
import {CHATS_URL, getData} from "../../Api";
import ChatContent from "../chatContent/ChatContent";


export default function Chat() {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData(CHATS_URL);
                setChats(data);
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <MDBContainer fluid className="py-5" style={{ backgroundColor: "#CDC4F9", minHeight:"100vh"}}>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" style={{minHeight:"75vh"}}>
                                    <div className="p-3">
                                        <MDBInputGroup className="rounded mb-3">
                                            <input
                                                className="form-control rounded"
                                                placeholder="Search"
                                                type="search"
                                            />
                                            <span
                                                className="input-group-text border-0"
                                                id="search-addon"
                                            >
                                                <MDBIcon fas icon="search" />
                                            </span>
                                        </MDBInputGroup>
                                        {
                                            chats.map((chat, index) => (
                                            <ChatMini key={index} chat={chat} />
                                        ))}
                                    </div>
                                </MDBCol>
                                {chats.length > 0 && <ChatContent chat={chats[0]} />}


                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}