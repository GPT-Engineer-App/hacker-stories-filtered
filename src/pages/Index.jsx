import { useEffect, useState } from "react";
import { Container, VStack, Text, Switch, FormControl, FormLabel, Box, useColorMode } from "@chakra-ui/react";
import StoryCard from "../components/StoryCard";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filters, setFilters] = useState({
    engineering: false,
    design: false,
    psychology: false,
  });
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchStories = async () => {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storyIds = await response.json();
      const top10Ids = storyIds.slice(0, 10);
      const storyPromises = top10Ids.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
      );
      const stories = await Promise.all(storyPromises);
      setStories(stories);
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter(story => {
    if (filters.engineering && story.title.toLowerCase().includes("engineering")) return false;
    if (filters.design && story.title.toLowerCase().includes("design")) return false;
    if (filters.psychology && story.title.toLowerCase().includes("psychology")) return false;
    return true;
  });

  return (
    <Container centerContent maxW="container.md" py={4}>
      <Box width="100%" textAlign="right" mb={4}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark-mode" mb="0">
            Dark Mode
          </FormLabel>
          <Switch id="dark-mode" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        </FormControl>
      </Box>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Hacker News Stories</Text>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="engineering" mb="0">
            Exclude Engineering
          </FormLabel>
          <Switch
            id="engineering"
            isChecked={filters.engineering}
            onChange={() => setFilters({ ...filters, engineering: !filters.engineering })}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="design" mb="0">
            Exclude Design
          </FormLabel>
          <Switch
            id="design"
            isChecked={filters.design}
            onChange={() => setFilters({ ...filters, design: !filters.design })}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="psychology" mb="0">
            Exclude Psychology
          </FormLabel>
          <Switch
            id="psychology"
            isChecked={filters.psychology}
            onChange={() => setFilters({ ...filters, psychology: !filters.psychology })}
          />
        </FormControl>
        {filteredStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </VStack>
    </Container>
  );
};

export default Index;