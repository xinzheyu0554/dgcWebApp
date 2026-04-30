// src/components/GalleryAlbumCard.js
import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Posts from "./Posts";

function GalleryAlbumCard({ album }) {
  return (
    <Box
      border="1px solid"
      borderColor="blackAlpha.200"
      borderRadius="18px"
      bg="white"
      p={{ base: 5, md: 7 }}
      boxShadow="sm"
    >
      <Heading size="lg" mb={2} color="gray.900">
        {album.uploadTitle}
      </Heading>
      <Text color="gray.600" mb={5}>
        {album.albumDescription}
      </Text>

      <VStack
        spacing={2}
        align="stretch"
        bg="blackAlpha.50"
        border="1px solid"
        borderColor="blackAlpha.100"
        borderRadius="14px"
        p={4}
      >
        <Text fontSize="sm" color="gray.700" fontWeight={700}>
          Tips
        </Text>
        {album.tips?.map((t) => (
          <Text key={t} fontSize="sm" color="gray.600">
            • {t}
          </Text>
        ))}
      </VStack>

      <Box mt={6}>
        <Posts album={album} />
      </Box>
    </Box>
  );
}

export default GalleryAlbumCard;
