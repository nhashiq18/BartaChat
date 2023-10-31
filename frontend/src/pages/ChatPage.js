import React, { useEffect, useState } from "react";
import axios from "axios";


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
            hello
        </div>
    );
}

export default ChatPage;