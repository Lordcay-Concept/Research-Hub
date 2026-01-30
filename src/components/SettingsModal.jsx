import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Select,
  FormControl,
  FormLabel,
  useColorMode,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Textarea,
  useToast,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const SettingsModal = ({ isOpen, onClose, defaultTab = "theme" }) => {
  const { colorMode, setColorMode } = useColorMode();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const toast = useToast();

  const rules = [
    "Cite AI as a research tool in your bibliographies.",
    "Verify all AI-generated dates and historical facts.",
    "Do not input sensitive or personal private data.",
    "Use AI to brainstorm, not to commit plagiarism.",
    "Critically analyze the logic of every AI response.",
    "Report biased or harmful content via feedback.",
    "Use the Pro Tier for complex data and logic tasks.",
    "Do not use AI for medical or legal life-saving advice.",
    "Ensure prompts are specific to get the best results.",
    "Respect the rate limits to ensure service stability.",
  ];

  const faqs = [
    {
      q: "Why is the AI taking long?",
      a: "Complex queries or 'Pro' reasoning takes more processing time.",
    },
    {
      q: "Difference between Flash & Pro?",
      a: "Flash is built for speed; Pro is built for deep reasoning.",
    },
    {
      q: "Can I delete my history?",
      a: "Currently, history is stored locally; clearing cache removes it.",
    },
    {
      q: "Is my data shared?",
      a: "No, your queries are private and not used for external training.",
    },
    {
      q: "Why did the theme not change?",
      a: "Ensure you click 'Dark' or 'Light' in the Theme tab.",
    },
    {
      q: "Can it write code?",
      a: "Yes, it is highly proficient in JS, Python, and React.",
    },
    {
      q: "Is there a word limit?",
      a: "Responses are capped at 2000 tokens for stability.",
    },
    {
      q: "How to use Pro Tier?",
      a: "Select 'Pro (Thinking)' above the input bar.",
    },
    {
      q: "Does it have live web access?",
      a: "It uses a massive dataset but doesn't browse live links yet.",
    },
    {
      q: "What if I get a '404' error?",
      a: "Restart your backend server and check your API key.",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "theme":
        return (
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="gray.500">
              Customize the UI background.
            </Text>
            <FormControl>
              <FormLabel fontSize="sm">Select Mode</FormLabel>
              <Select
                value={colorMode}
                onChange={(e) => setColorMode(e.target.value)}
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </Select>
            </FormControl>
          </VStack>
        );
      case "instructions":
        return (
          <VStack align="stretch" spacing={2}>
            <Text fontWeight="bold" fontSize="sm" mb={2}>
              10 Rules for AI Usage:
            </Text>
            <List spacing={2}>
              {rules.map((rule, i) => (
                <ListItem
                  key={i}
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                >
                  <ListIcon as={CheckCircleIcon} color="green.500" /> {rule}
                </ListItem>
              ))}
            </List>
          </VStack>
        );
      case "help":
        return (
          <Accordion allowToggle>
            {faqs.map((f, i) => (
              <AccordionItem key={i}>
                <AccordionButton>
                  <Box
                    flex="1"
                    textAlign="left"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    {f.q}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} fontSize="xs" color="gray.500">
                  {f.a}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        );
      case "feedback":
        return (
          <VStack>
            <Textarea placeholder="How can we improve?" fontSize="sm" />
            <Button
              size="sm"
              colorScheme="blue"
              w="full"
              onClick={() =>
                toast({ title: "Feedback Sent!", status: "success" })
              }
            >
              Submit
            </Button>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent borderRadius="2xl" mx={4}>
        <ModalHeader borderBottom="1px" borderColor="gray.100" py={3}>
          <Box display="flex" gap={1} overflowX="auto" pb={1}>
            <Button
              size="xs"
              variant={activeTab === "theme" ? "solid" : "ghost"}
              onClick={() => setActiveTab("theme")}
            >
              Theme
            </Button>
            <Button
              size="xs"
              variant={activeTab === "instructions" ? "solid" : "ghost"}
              onClick={() => setActiveTab("instructions")}
            >
              Rules
            </Button>
            <Button
              size="xs"
              variant={activeTab === "help" ? "solid" : "ghost"}
              onClick={() => setActiveTab("help")}
            >
              FAQs
            </Button>
            <Button
              size="xs"
              variant={activeTab === "feedback" ? "solid" : "ghost"}
              onClick={() => setActiveTab("feedback")}
            >
              Feedback
            </Button>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6} maxH="400px" overflowY="auto">
          {renderContent()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
