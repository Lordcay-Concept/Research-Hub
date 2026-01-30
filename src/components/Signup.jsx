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
} from "@chakra-ui/react";

// --- API CONFIG IMPORT ---
import API_BASE_URL from "../apiConfig";

const Signup = ({ onFlip, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Account Created!",
          description: "You can now login.",
          status: "success",
          duration: 3000,
        });
        onSignupSuccess(); 
        toast({ title: data.message || "Signup Failed", status: "error" });
      }
    } catch (err) {
      toast({ title: "Server Connection Error", status: "error" });
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
            Create Account
          </Heading>
          <Text fontSize="md" color="gray.500">
            Join the elite research community
          </Text>
        </Stack>
        <Box
          rounded="xl"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="2xl"
          p={8}
        >
          <form onSubmit={handleSignup}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  focusBorderColor="blue.400"
                  placeholder="John Doe"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  focusBorderColor="blue.400"
                  placeholder="john@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  focusBorderColor="blue.400"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                borderRadius="lg"
                height="50px"
                mt={4}
              >
                Sign Up
              </Button>
              <Text align="center" fontSize="sm" pt={2}>
                Already a member?{" "}
                <Link color="blue.400" fontWeight="bold" onClick={onFlip}>
                  Login
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
