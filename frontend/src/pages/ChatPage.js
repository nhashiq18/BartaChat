import ChatBox from "../components/Chatpage/ChatBox";
import MyChatList from "../components/Chatpage/MyChatList";
import SideBar from "../components/Chatpage/SideBar";
import { ChatState } from "../context/ChatContext";
import React from "react";


const ChatPage = ()=>{
    const {user} = ChatState();

    return(
        <div style={{width: "100%"}}>
            {user && <SideBar />}
            {user && <ChatBox />}
            {user && <MyChatList />}
        </div>
    );
}

export default ChatPage;