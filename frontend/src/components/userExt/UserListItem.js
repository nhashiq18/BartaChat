import { Avatar } from "@chakra-ui/avatar";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatContext";


const UserListItem = ({user,  handleFunction }) => {

  return (
    <Flex
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#6B46C1",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.profiePhoto}
      />
      <Box>
        <Text>{user.name}</Text>
      </Box>
    </Flex>
  );
};

export default UserListItem;