import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { ChatState } from "../../context/ChatContext";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";


import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
  } from "@chakra-ui/menu";
import Profile from "../profile/Profile";

const SideBar = ()=>{

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {user} = ChatState();
    return(
        <>
           <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.profilePhoto}
              />
            </MenuButton>
            <MenuList>
             
                <Profile user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
                </Profile>
             
              <MenuDivider />
              <MenuItem >Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

        </>
    )
}
export default SideBar;