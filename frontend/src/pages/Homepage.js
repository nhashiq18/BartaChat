import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import LoginComponent from "../components/auth/Login";
import RegistrationComponent from "../components/auth/Registration";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import {useHistory} from "react-router-dom";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);
  
  return (
    <Container maxW="xl" centerContent>
      <Box
        bg="#FFF5F5"
        w="500px"
        p={4}
        borderRadius="25px"
        borderWidth="1px"
        marginTop="70px"
        textAlign="center"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work Sans, sans-serif"
          marginBottom="4"
        >
          Buddy:in
        </Text>
        <Center>
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab
                _selected={{
                  borderBottom: "3px solid #3498db",
                }}
              >
                Login
              </Tab>
              <Tab _selected={{ borderBottom: "3px solid #3498db" }}>
                Register
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <LoginComponent />
                  <div style={{ marginTop: "20px" }}>
                    <p
                      style={{
                        color: "#0b3954",
                        marginBottom: "10px",
                        fontSize: "16px",
                      }}
                    >
                      Join Our Community
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <a
                        href="https://www.linkedin.com/your-organization"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin size={24} color="#0b3954" />{" "}
                        {/* Smaller size and new color */}
                      </a>
                      <a
                        href="https://github.com/your-organization"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub size={24} color="#0b3954" />{" "}
                        {/* Smaller size and new color */}
                      </a>
                      <a
                        href="https://twitter.com/your-organization"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter size={24} color="#0b3954" />{" "}
                        {/* Smaller size and new color */}
                      </a>
                      <a
                        href="mailto:youremail@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaEnvelope size={24} color="#0b3954" />
                      </a>
                    </div>
                  </div>
                </Flex>
              </TabPanel>
              <TabPanel>
                <RegistrationComponent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </Container>
  );
};

export default Homepage;
