import React, {useEffect, useState} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalDialog,
    MDBModalContent,
    MDBModalTitle,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter, MDBInput,
} from "mdb-react-ui-kit";
import ChatMini from "../chatMini/ChatMini";
import {CHATS_URL, getData, postData, ADD_CHAT_URL, JOIN_CHAT_URL} from "../../Api";
import ChatContent from "../chatContent/ChatContent";
import SockJS from "sockjs-client";
import Stomp from "stompjs";



export default function Chat() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => {
        setBasicModal(!basicModal)
    }

    useEffect(() => {
        const cont = document.getElementById('content');
        if(cont)
            cont.scrollTop = cont.scrollHeight;
    }, [chats]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData(CHATS_URL);
                setChats(data);
                return data;
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        }

        async function setupWebSocket() {
            var data = await fetchData(); // Wait for data to be fetched
            const socket = new SockJS(`http://localhost:8080/websocket?token=${localStorage.getItem('token')}`);
            const client = Stomp.over(socket);
            const headers =  {
                            "Authorization":  "Bearer " + localStorage.getItem("token"),
                        };

            client.connect({}, () => {
                setStompClient(client);
                onConnected(data, client);
            }, onError);
        }

        setupWebSocket();
    }, [])




    function onMessageReceived(payload) {
        var message = JSON.parse(payload.body);
        var chatId = message.chat;

        setChats((prevChats) => {
            const updatedChats = prevChats.map((chat) => {
                console.error(chatId,chat)
                if (chat.id === chatId) {
                    const updatedChat = { ...chat };
                    updatedChat.messages.push(message);
                    console.error(updatedChat)
                    return updatedChat;
                }
                return chat;
            });
            return updatedChats;
        });
        console.log("received "+message)
    }

    function onConnected(data, client) {
        // Subscribe to the Public chat
        if(data)
            data.forEach((chat)=>{
                client.subscribe(`/chat/${chat.id}`, onMessageReceived);
            })
    }
    function onError(error) {
        console.log(error)
    }

    function handleChatSelect(chat) {
        // Handle chat selection here, e.g., set the selectedChat state
        setSelectedChat(chat);
    }

    function addChat(){
        const chatName = document.getElementById("chat_name").value
        const url= ADD_CHAT_URL+ chatName;
        postData(url, {}, true).then(response => {
            console.log(response);

            if (response.ok) {
                return response.json(); // Assuming the response is in JSON format
            } else {
                throw new Error('Failed to add chat');
            }
        }).then(chat => {
            console.log('Chat added:', chat);
            setBasicModal(false);
            setChats(oldChats => [...oldChats, chat])
            stompClient.subscribe(`/chat/${chat.id}`, onMessageReceived);
        }).catch(error => {
            console.error('Error adding chat:', error);
        });
    }

    function joinChat(){
        const chatID = document.getElementById("chat_id").value
        const url= JOIN_CHAT_URL+ chatID;
        postData(url, {}, true).then(response => {
            console.log(response);

            if (response.ok) {
                return response.json(); // Assuming the response is in JSON format
            } else {
                throw new Error('Failed to join chat');
            }
        }).then(chat => {
            console.log('Chat joined :', chat);
            setBasicModal(false);
            setChats(oldChats => [...oldChats, chat])
            stompClient.subscribe(`/chat/${chat.id}`, onMessageReceived);
        }).catch(error => {
            console.error('Error adding chat:', error);
        });
    }
    return (
        <MDBContainer fluid className="py-5" style={{ backgroundColor: "#CDC4F9", minHeight: "100vh" }}>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" style={{ minHeight: "75vh" }}>
                                    <div className="p-3">
                                        {chats && chats.map((chat, index) => (
                                            <ChatMini
                                                key={index}
                                                chat={chat}
                                                onSelect={() => handleChatSelect(chat)}
                                            />
                                        ))}
                                    </div>
                                </MDBCol>
                                {selectedChat && <ChatContent stompClient={stompClient} chat={selectedChat} />}
                            </MDBRow>
                            <button onClick={toggleOpen} type="button" className="btn btn-primary btn-floating">
                                <i className="fas fa-add"></i>
                            </button>
                            <MDBModal open={basicModal} setopen={setBasicModal}  onClose={()=>setBasicModal(false)} tabIndex='-1'>
                                <MDBModalDialog>
                                    <MDBModalContent>
                                        <MDBModalHeader>
                                            <MDBModalTitle>Chat creation</MDBModalTitle>
                                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                                        </MDBModalHeader>
                                        <MDBModalBody>Join chat:</MDBModalBody>
                                        <MDBInput label='Chat ID' id='chat_id' type='text' />
                                        <MDBModalFooter>
                                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                                Close
                                            </MDBBtn>
                                            <MDBBtn onClick={joinChat}>Submit</MDBBtn>
                                        </MDBModalFooter>
                                        <MDBModalBody>New chat:</MDBModalBody>
                                        <MDBInput label='Chat Name' id='chat_name' type='text' />
                                        <MDBModalFooter>
                                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                                Close
                                            </MDBBtn>
                                            <MDBBtn onClick={addChat}>Submit</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModalContent>
                                </MDBModalDialog>
                            </MDBModal>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}