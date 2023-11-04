import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text, Flex, ChatIcon } from "@chakra-ui/layout";
import { AiOutlineMessage } from "react-icons/ai";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "../profile/Profile";
import UpdateGroupChatModal from "../Chatpage/UpdateGroupChatModal";
import { ChatState } from "../../context/ChatContext";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName}
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            
            bg="#E9D8FD"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/*message*/}
          </Box>
        </>
      ) : (
        <Flex alignItems="center" justifyContent="center" h="100%">
        <Box textAlign="center">
          <AiOutlineMessage size={100} color="teal" /> {/* Adjust the size and color */}
          <Text fontSize="3xl" fontFamily="Work sans" textAlign="center" fontStyle={"italic"}>
            Select any user or group to start a conversation
          </Text>
        </Box>
      </Flex>
      )}
    </>
  );
};

export default SingleChat;
