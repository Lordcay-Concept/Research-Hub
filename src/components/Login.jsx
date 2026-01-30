import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

// --- API CONFIG IMPORT ---
import API_BASE_URL from "../config";

const Login = ({ onLoginSuccess, onFlip, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast({ title: "Welcome back!", status: "success", duration: 3000 });

        onLoginSuccess({ ...data.user, token: data.token });
      } else {
        toast({
          title: data.message || "Login Failed",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      toast({
        title: "Server Connection Error",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "#121212")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} w="full">
        <Stack align="center">
          <Heading fontSize="3xl" color="blue.600">
            RESEARCH HUB{" "}
            <Text as="span" color="blue.300">
              PRO
            </Text>
          </Heading>
          <Text fontSize="md" color="gray.500">
            Sign in to your academic portal
          </Text>
        </Stack>
        <Box
          rounded="xl"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="2xl"
          p={8}
        >
          <Stack spacing={4}>
            {/* GOOGLE LOGIN BUTTON */}
            <Box w="full" display="flex" justifyContent="center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const details = jwtDecode(credentialResponse.credential);

                    // SYNC WITH BACKEND
                    const res = await fetch(
                      `${API_BASE_URL}/api/v1/google-login`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: details.name,
                          email: details.email,
                          profilePic: details.picture,
                        }),
                      },
                    );

                    const data = await res.json();

                    if (res.ok) {
                      localStorage.setItem("token", data.token);
                      localStorage.setItem("user", JSON.stringify(data.user));

                      onLoginSuccess({ ...data.user, token: data.token });

                      toast({
                        title: `Signed in as ${data.user.name}`,
                        status: "success",
                      });
                    } else {
                      throw new Error("Backend sync failed");
                    }
                  } catch (err) {
                    toast({ title: "Google Sync Error", status: "error" });
                  }
                }}
                onError={() =>
                  toast({ title: "Google Login Failed", status: "error" })
                }
                useOneTap
              />
            </Box>

            <Flex align="center" py={2}>
              <Divider />
              <Text fontSize="xs" color="gray.500" px={3} whiteSpace="nowrap">
                OR EMAIL
              </Text>
              <Divider />
            </Flex>

            <form onSubmit={handleLogin}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    focusBorderColor="blue.400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    focusBorderColor="blue.400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  isLoading={isLoading}
                  borderRadius="lg"
                  height="50px"
                  mt={4}
                  w="full"
                >
                  Sign in
                </Button>
              </Stack>
            </form>

            <Text align="center" fontSize="sm" pt={2}>
              Don't have an account?{" "}
              <Link color="blue.400" fontWeight="bold" onClick={onFlip}>
                Sign up
              </Link>
            </Text>

            <Button
              variant="ghost"
              size="sm"
              color="gray.500"
              onClick={onCancel}
              _hover={{ bg: "transparent", color: "blue.400" }}
            >
              Cancel and Return
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
