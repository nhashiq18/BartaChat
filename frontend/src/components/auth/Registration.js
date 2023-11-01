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
  const toast = useToast();
  const history = useHistory();


  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !phone || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          phone,
          password,
          photo,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics===undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "myrtchatapp");
      data.append("cloud_name", "dnujnylme");
      fetch("https://api.cloudinary.com/v1_1/dnujnylme/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
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
