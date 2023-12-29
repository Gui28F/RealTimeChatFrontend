import {MDBTypography} from "mdb-react-ui-kit";
import React from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function ChatMini(props){
    const { chat } = props;

    var stompClient = null;

    function onMessageReceived(payload) {
        var message = JSON.parse(payload.body);

       console.log("received")
    }

    function onConnected() {
        // Subscribe to the Public chat
        stompClient.subscribe(`/chat/${chat.id}`, onMessageReceived);
        console.log("Subscribed")
    }
    function onError(error) {
      console.log(error)
    }

    /*function send(event) {
        var messageContent = messageInput.value.trim();

        if(messageContent && stompClient) {
            var chatMessage = {
                sender: username,
                content: messageInput.value,
                type: 'CHAT'
            };

            stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
            messageInput.value = '';
        }
        event.preventDefault();
    }*/
    function connect(event) {
        const socket = new SockJS('http://localhost:8080/websocket');
        stompClient = Stomp.over(socket);
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };

        stompClient.connect(headers, onConnected, onError);
    }
    connect()
    return (   <MDBTypography listUnStyled className="mb-0">
        <li className="p-2 border-bottom">
            <a
                href="#!"
                className="d-flex justify-content-between"
            >
                <div className="d-flex flex-row">
                    <div>
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="avatar"
                            className="d-flex align-self-center me-3"
                            width="60"
                        />
                        <span className="badge bg-success badge-dot"></span>
                    </div>
                    <div className="pt-1">
                        <p className="fw-bold mb-0">{chat.name}</p>
                        <p className="small text-muted">
                            {chat.messages.at(chat.messages.length - 1)}
                        </p>
                    </div>
                </div>
                {/*<div className="pt-1">
                    <p className="small text-muted mb-1">Just now</p>
                    <span className="badge bg-danger rounded-pill float-end">
                                                                3
                                                            </span>
                </div>*/}
            </a>
        </li>

    </MDBTypography>)
}