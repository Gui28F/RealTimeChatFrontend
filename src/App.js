import logo from './logo.svg';
import './App.css';
import Login from "./components/login/Login";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    let navigate = useNavigate();
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    const verifyToken = () => {
        let isTokenValid = false;
        const token = localStorage.getItem('token');
        if (token == null) {
            navigate("/login")
            return;
        }

        let decodedToken = parseJwt(token);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
        } else {
            console.log("Valid token");
            isTokenValid = true;
        }

        if (!isTokenValid) {
            // If token is not valid, redirect to login page
            setToken(null);
            navigate("/login")
        }
    };

    useEffect(() => {
        // Run token verification on initial render
        verifyToken();
    }, [token]);

    return (
        <>
            <Routes>
                <Route path="/teste" element={<p>AAAAAAAAAAAA</p>} />
                <Route path="/chats" element={<Chat/>} />
                < Route path = "/" element = {<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default App;
