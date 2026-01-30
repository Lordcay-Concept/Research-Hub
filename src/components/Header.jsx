import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const Header = () => {
  const color = useColorModeValue("blue.600", "blue.300");

  return (
    <Box>
      <Heading size="md" letterSpacing="tighter" color={color}>
        RESEARCH HUB
      </Heading>
    </Box>
  );
};

export default Header;
