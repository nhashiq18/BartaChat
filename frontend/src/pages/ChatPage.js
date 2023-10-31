import React, { useEffect, useState } from "react";
import axios from "axios";
import chats from "../../../backend/data/data";

const ChatPage = ()=>{
    const [chats, setChats] = useState([]);

    const fetchChats = async ()=>{
        const chatData = await axios.get("/api/chat");

        setChats(chatData);
    }

    useEffect(()=>{
        fetchChats();
    },[])

    return(
        <div>
            {chats.map((chat)=>(
                <div key={chat._id}>{chat.chatName}</div>
            ))}
        </div>
    );
}

export default ChatPage;