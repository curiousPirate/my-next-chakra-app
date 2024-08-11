// components/PostList.js
import { Box, Text } from "@chakra-ui/react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function PostList({ posts }) {
  return (
    <Box mt={6}>
      {posts.map((post) => (
        <Box key={post.id} mb={4}>
          <Text fontWeight="bold">{post.title}</Text>
          <Text>{post.body}</Text>
          <CommentForm postId={post.id} />
          <CommentList postId={post.id} />
        </Box>
      ))}
    </Box>
  );
}