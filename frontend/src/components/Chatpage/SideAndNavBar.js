import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Tooltip,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
  AvatarBadge,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { EmailIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons"; // Import the SearchIcon
import { useHistory } from "react-router-dom";
import Profile from "../profile/Profile";
import { ChatState } from "../../context/ChatContext";
import { useDisclosure } from "@chakra-ui/hooks";
import { Spinner } from "@chakra-ui/spinner";
import ChatLoading from "./ChatLoading";
import UserListItem from "../userExt/UserListItem"

const SideAndNavBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#3E54E7" // Background color
        color="white"
        py={2}
        px={4}
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Add a subtle shadow
      >
        <div>
          <Menu>
            <MenuButton as={Button} bg="#3E54E7" color="white">
              <Avatar size="sm" name={user.name} src={user.profilePhoto}>
                <AvatarBadge bg="#67CB48" boxSize={2} borderWidth={0} />
              </Avatar>
            </MenuButton>
            <MenuList color="black">
              {" "}
              {/* Text color set to black */}
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton p={1}>
              <EmailIcon fontSize="2xl" />
            </MenuButton>
          </Menu>
        </div>

        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily="Work Sans, sans-serif"
        >
          Buddyin
        </Text>

        <div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={onOpen}
          >
            <InputGroup size="md">
              <Input
                placeholder="Search User"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                bg="white"
                color="black" // Text color set to black
                maxWidth="150px" // Adjust the width here
              />
              <InputRightElement width="3.5rem">
                <Button
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "transparent" }}
                >
                  <SearchIcon
                    color="purple.500" // Purple color
                    _hover={{ transform: "scale(1.1)" }} // Add animation on hover
                  />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </div>
      </Box>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideAndNavBar;
