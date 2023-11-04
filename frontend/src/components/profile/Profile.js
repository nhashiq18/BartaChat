import { PhoneIcon, EmailIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Stack,
  Box,
} from "@chakra-ui/react";

const Profile = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isImageOpen, onOpen: onImageOpen, onClose: onImageClose } =
    useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          bg="purple.500"
          color="white"
          borderRadius="full"
          size="sm"
          _hover={{
            bg: "purple.600",
          }}
        />
      )}
      <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          borderRadius="md"
          bgColor="white"
          fontFamily="Arial, sans-serif"
          color="gray.800"
        >
          <ModalHeader borderBottom="1px solid #E2E8F0" p={4}>
            <Text fontSize="2xl" fontWeight="bold">
              {user.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton p={0} m={0} />
          <ModalBody p={4}>
            <Box
              mx="auto"
              borderRadius="full"
              overflow="hidden"
              boxSize="120px"
              borderWidth="2px"
              borderColor="purple.500"
              boxShadow="0 0 6px rgba(0, 0, 0, 0.2)"
              onClick={onImageOpen}
              cursor="pointer"
            >
              <Image
                src={user.profilePhoto}
                alt={user.name}
                boxSize="100%"
                objectFit="cover"
              />
            </Box>
            <Stack spacing={4} mt={4} textAlign="center">
              <Text fontSize="lg" fontWeight="bold">
                <PhoneIcon mr={2} />
                {user.phone}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                <EmailIcon mr={2} />
                {user.email}
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter borderTop="1px solid #E2E8F0" p={4}>
            <Button
              onClick={onClose}
              colorScheme="purple"
              _hover={{
                bg: "purple.600",
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Image Lightbox */}
      <Modal
        size="xl"
        onClose={onImageClose}
        isOpen={isImageOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0}>
            <Image
              src={user.profilePhoto}
              alt={user.name}
              boxSize="100%"
              objectFit="contain"
              onClick={onImageClose}
              cursor="pointer"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
