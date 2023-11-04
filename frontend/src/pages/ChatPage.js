import MyChatList from "../components/Chatpage/MyChatList";
import SideBar from "../components/Chatpage/SideAndNavBar";
import { ChatState } from "../context/ChatContext";
import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import Chatbox from "../components/Chatpage/ChatBox";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box
        display="flex"
        width="100%"
        height="100vh"
       
      >
        {user && (
          <MyChatList
            fetchAgain={fetchAgain}
            style={{ flex: "1", border: "none" }} // Remove the border
          />
        )}
        {user && (
          <Chatbox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            style={{ flex: "1", border: "none" }} // Remove the border
          />
        )}
      </Box>
    </div>
  );
}

export default ChatPage;
