import React, { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  Text,
  Avatar,
  useColorModeValue,
  useToast,
  Container,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

// --- API CONFIG IMPORT ---
import API_BASE_URL from "../config";

const ProfilePage = ({ user, setCurrentUser, onBack }) => {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, bio, profilePic }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setCurrentUser(data.user);

        toast({
          title: "Profile updated!",
          description: "Your changes have been saved successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Update failed",
          description: data.message || "Something went wrong",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      toast({
        title: "Server error",
        description: "Could not connect to the database.",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <Stack spacing={6}>
        <HStack spacing={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            variant="ghost"
            onClick={onBack}
            aria-label="Back to Chat"
          />
          <Box>
            <Heading size="lg">My Profile</Heading>
            <Text color="gray.500" fontSize="sm">
              Manage your researcher identity
            </Text>
          </Box>
        </HStack>

        <Box
          bg={bgColor}
          border="1px"
          borderColor={borderColor}
          rounded="2xl"
          p={{ base: 6, md: 10 }}
          boxShadow="sm"
        >
          <form onSubmit={handleUpdate}>
            <Stack spacing={8}>
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                gap={6}
              >
                <Avatar
                  size="2xl"
                  name={name}
                  src={profilePic}
                  border="4px solid"
                  borderColor="blue.500"
                />
                <Stack spacing={1}>
                  <Text fontWeight="bold" fontSize="xl">
                    {name || "User Name"}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    {user?.email}
                  </Text>
                  <Text fontSize="xs" color="blue.500" fontWeight="medium">
                    {(user?.tier || "FREE").toUpperCase()} ACCOUNT
                  </Text>
                </Stack>
              </Flex>

              <Stack spacing={4}>
                <FormControl id="name">
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Full Name
                  </FormLabel>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    focusBorderColor="blue.400"
                  />
                </FormControl>

                <FormControl id="profilePic">
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Profile Picture URL
                  </FormLabel>
                  <Input
                    placeholder="https://images.com/my-photo.jpg"
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                    focusBorderColor="blue.400"
                  />
                </FormControl>

                <FormControl id="bio">
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Professional Bio
                  </FormLabel>
                  <Textarea
                    placeholder="Briefly describe your research background..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    focusBorderColor="blue.400"
                    rows={4}
                  />
                </FormControl>
              </Stack>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                isLoading={isLoading}
                w="full"
                borderRadius="xl"
              >
                Save Profile Updates
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
