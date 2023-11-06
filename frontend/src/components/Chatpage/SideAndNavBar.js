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
import { EmailIcon, ChevronDownIcon, SearchIcon, AtSignIcon, CheckCircleIcon, ViewIcon} from "@chakra-ui/icons"; // Import the SearchIcon
import { useHistory } from "react-router-dom";
import Profile from "../profile/Profile";
import { ChatState } from "../../context/ChatContext";
import { useDisclosure } from "@chakra-ui/hooks";
import { Spinner } from "@chakra-ui/spinner";
import ChatLoading from "./ChatLoading";
import UserListItem from "../userExt/UserListItem"
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge";
import { getSender } from "../config/ChatLogics";
import { BellIcon } from "@chakra-ui/icons";

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
  const [isHovered, setIsHovered] = useState(false);
  const badgeStyle = {
    backgroundColor: "#ff5722", // Change the badge background color
    color: "white", // Change the badge text color
    fontSize: "12px", // Adjust the font size
    padding: "4px 8px", // Adjust padding for the badge
  };

  const handleSearchIconClick = () => {
    if (search.trim() !== "") {
      handleSearch();
    }
  };

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
        bg="#6B46C1" // Background color
        color="white"
        py={2}
        px={4}
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Add a subtle shadow
      >
        <div>
          <Menu>
            <MenuButton as={Button} bg="" color="white">
              <Avatar size="sm" name={user.name} src={user.profilePhoto}>
                <AvatarBadge bg="green" boxSize={2} borderWidth={0} />
              </Avatar>
            </MenuButton>
            <MenuList color="black">
              <Profile user={user}>
                <MenuItem>
                  <ViewIcon mr={2} />{" "}
                  {/* Replace UserIcon with a suitable icon */}
                  My Profile
                </MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={logoutHandler} color="red">
                <CheckCircleIcon mr={2} /> {/* Use LogOutIcon from Chakra UI */}
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
  <MenuButton p={1}>
    <NotificationBadge
      count={notification.length}
      effect={Effect.SCALE}
      style={badgeStyle} // Apply custom styles to the badge
    />
    <BellIcon fontSize="2xl" m={1} />
  </MenuButton>
  <MenuList pl={2} bg="lightgray" color="black">
    {!notification.length && "No New Messages"}
    {notification.map((notif) => (
      <MenuItem
        key={notif._id}
        onClick={() => {
          setSelectedChat(notif.chat);
          setNotification(notification.filter((n) => n !== notif));
        }}
      >
        {notif.chat.isGroupChat
          ? `New Message in ${notif.chat.chatName}`
          : `New Message from ${getSender(user, notif.chat.users)}`}
      </MenuItem>
    ))}
  </MenuList>
</Menu>
        </div>

        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily="Work Sans, sans-serif"
        >
          BartaChat
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
      <DrawerHeader borderBottomWidth="1px" py={4}>
          <Box display="flex" alignItems="center">
            <AtSignIcon
              color="blue.500" // Icon color
              boxSize={6}
              _hover={{ transform: "rotate(20deg)" }} // Add a rotation animation on hover
            />
            <Text ml={2} color="blue.500" fontFamily="Work Sans, sans-serif" fontSize="2xl">
              Search Users
            </Text>
          </Box>
        </DrawerHeader>
        <DrawerBody>
          <InputGroup size="md" mb={4}>
            <Input
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              pr={isHovered ? "2.5rem" : "0.75rem"}
              _hover={{ pr: "2.5rem" }}
            />
            <InputRightElement>
              <Button
                colorScheme="purple"
                onClick={handleSearch}
                opacity={isHovered ? 1 : 0}
                _groupHover={{ opacity: 1 }}
              >
                <SearchIcon
                  color="white"
                  _hover={{ transform: "scale(1.1)" }}
                />
              </Button>
            </InputRightElement>
          </InputGroup>
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
          {loadingChat && (
            <Spinner
              ml="auto"
              mt={4}
              color="blue.500"
            />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  );
};

export default SideAndNavBar;
