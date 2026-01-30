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
  UnorderedList,
  ListItem,
  Textarea,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";

export const HubModals = ({ isOpen, onClose, type }) => {
  const [feedback, setFeedback] = useState("");
  const toast = useToast();

  const helpItems = [
    {
      q: "How do I choose the right Tier?",
      a: "Use 'Fast' for quick definitions and general summaries. Use 'Pro' for deep literature reviews, complex data synthesis, and advanced reasoning.",
    },
    {
      q: "Is my research data secure?",
      a: "Yes. Research Hub v1.0 stores all interaction data on your local MongoDB instance. Queries sent to AI models are encrypted.",
    },
    {
      q: "How can I export my results?",
      a: "Every AI response features a 'Copy' icon in the top-right corner. Click it to copy the text to your clipboard for use in Word or LaTeX.",
    },
    {
      q: "What are the 'Instructions'?",
      a: "These are pre-set academic protocols that ensure the AI maintains an objective tone and prioritizes peer-reviewed logic over casual data.",
    },
    {
      q: "Why is the response taking long?",
      a: "Pro Tier (Thinking) models process much larger datasets to ensure precision. If it takes longer than 60 seconds, check your local server status.",
    },
    {
      q: "Can the AI provide citations?",
      a: "Yes, the AI will attempt to provide citations. However, per our Instructions, you must cross-verify these with primary academic databases.",
    },
    {
      q: "How do I update my location?",
      a: "Location is detected via your IP address to provide regional academic context. You can click the 'Update' link in the sidebar footer.",
    },
  ];

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return;
    toast({
      title: "Feedback Received",
      description: "Thank you for helping us reach perfection.",
      status: "success",
      duration: 3000,
    });
    setFeedback("");
    onClose();
  };

  const content = {
    instructions: {
      title: "Instructions for Research Hub",
      body: (
        <VStack align="stretch" spacing={4}>
          <Text fontSize="xs" fontWeight="bold" color="blue.600">
            ACADEMIC PROTOCOLS:
          </Text>
          <UnorderedList spacing={3} fontSize="xs" color="gray.600">
            <ListItem>
              Maintain a formal, third-person objective perspective.
            </ListItem>
            <ListItem>
              Structure long responses with clear headings and bullet points.
            </ListItem>
            <ListItem>
              Format mathematical formulas and variables using LaTeX.
            </ListItem>
            <ListItem>
              Avoid inflammatory language or unsubstantiated claims.
            </ListItem>
          </UnorderedList>
        </VStack>
      ),
    },
    help: {
      title: "Help & Support Center",
      body: (
        <Accordion allowToggle>
          {helpItems.map((item, i) => (
            <AccordionItem
              key={i}
              border="none"
              borderBottom="1px"
              borderColor="gray.100"
            >
              <AccordionButton
                px={0}
                _hover={{ bg: "transparent", color: "blue.500" }}
              >
                <Box flex="1" textAlign="left" fontSize="xs" fontWeight="bold">
                  {item.q}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                pb={4}
                fontSize="xs"
                color="gray.600"
                lineHeight="tall"
              >
                {item.a}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ),
    },
    feedback: {
      title: "Send Feedback",
      body: (
        <VStack align="stretch" spacing={4}>
          <Text fontSize="xs" color="gray.500">
            Share your thoughts on the v1.0 progress.
          </Text>
          <Textarea
            fontSize="xs"
            placeholder="What features would you like to see next?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            minH="120px"
          />
          <Button
            size="sm"
            colorScheme="blue"
            w="full"
            onClick={handleFeedbackSubmit}
          >
            Submit Feedback
          </Button>
        </VStack>
      ),
    },
  };

  const active = content[type] || {
    title: "Info",
    body: <Text>Content loading...</Text>,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="xl" maxH="80vh">
        <ModalHeader fontSize="sm" fontWeight="bold">
          {active.title}
        </ModalHeader>
        <ModalCloseButton size="sm" />
        <ModalBody
          pb={6}
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb": {
              background: "#CBD5E0",
              borderRadius: "10px",
            },
          }}
        >
          {active.body}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
