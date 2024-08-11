// components/CommentForm.js
import { useState } from "react";
import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { createComment } from "../API/api";

export default function CommentForm({ postId }) {
  const [body, setBody] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    createComment(postId, { body })
      .then((response) => {
        toast({
          title: "Comment added.",
          description: "Your comment has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setBody("");
      })
      .catch((error) => {
        toast({
          title: "Error adding comment.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Input
        placeholder="Add a comment"
        mb={2}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleSubmit}>
        Add Comment
      </Button>
    </>

  );
}