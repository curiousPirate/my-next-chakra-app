// components/PostForm.js
import { useState } from "react";
import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { createPost } from "../API/api";

export default function PostForm({ userId }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    createPost(userId, { title, body })
      .then((response) => {
        toast({
          title: "Post created.",
          description: `Post ${response.data.title} created successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTitle("");
        setBody("");
      })
      .catch((error) => {
        toast({
          title: "Error creating post.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box mb={6}>
      <Input
        placeholder="Post Title"
        mb={2}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Post Content"
        mb={2}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleSubmit}>
        Create Post
      </Button>
    </Box>
  );
}