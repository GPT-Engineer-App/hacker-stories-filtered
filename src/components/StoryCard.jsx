import { Box, Heading, Text, Link, useColorModeValue } from "@chakra-ui/react";

const StoryCard = ({ story }) => {
  const cardBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg={cardBg} p={4} borderRadius="md" shadow="md" width="100%">
      <Heading size="md" mb={2}>
        <Link href={story.url} isExternal>
          {story.title}
        </Link>
      </Heading>
      <Text fontSize="sm">By {story.by}</Text>
    </Box>
  );
};

export default StoryCard;