import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const RegistrationComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = () => {
    // Your registration logic here
  };

  const postDetails = (file) => {
    // Your function logic here
  };

  return (
    <VStack spacing="5px" style={{ background: "#0b3954", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px 0px #0b3954", width: "450px" }}>
      <FormControl id="name" isRequired>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          style={{ color: "#fff", marginBottom: "10px" }}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          style={{ color: "#fff", marginBottom: "10px" }}
        />
      </FormControl>

      <FormControl id="phone" isRequired>
        <Input
          placeholder="Enter Your Phone"
          onChange={(e) => setPhone(e.target.value)}
          style={{ color: "#fff", marginBottom: "10px" }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ background: "#fff", color: "#0b3954", marginBottom: "10px" }}
          />
          <InputRightElement width="3.5rem">
            <Button
              size="sm"
              onClick={togglePasswordVisibility}
              style={{ background: "transparent", color: "#61d095" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmpassword" isRequired>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            style={{ background: "#fff", color: "#0b3954", marginBottom: "10px" }}
          />
          <InputRightElement width="3.5rem">
            <Button
              size="sm"
              onClick={togglePasswordVisibility}
              style={{ background: "transparent", color: "#61d095" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="photo">
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          style={{ color: "#fff" }}
        />
      </FormControl>

      <Button
        colorScheme="teal"
        width="100%"
        style={{ marginTop: 15, background: "#61d095", color: "#fff" }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default RegistrationComponent;
