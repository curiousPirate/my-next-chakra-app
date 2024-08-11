"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Input,
  useToast,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  SimpleGrid,
  Center
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import Header from "../../components/Header";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentBody, setCommentBody] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://gorest.co.in/public/v2/posts?page=1&per_page=40");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`https://gorest.co.in/public/v2/comments?post_id=${postId}`);
      const data = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: data,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCreateComment = async (postId) => {
    try {
      const commentData = {
        body: commentBody,
        name: "Your Name", // Replace with actual user's name
        email: "your.email@example.com", // Replace with actual user's email
      };

      // You would normally POST to an endpoint here, but for now just clearing the comment body
      setCommentBody("");
      fetchComments(postId);
      toast({
        title: "Comment added.",
        description: "Your comment has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error adding comment.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
    <Box p={6}>
        <Heading mb={4}>All Posts</Heading>
        <Center py={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {posts.map((post) => (
        <Card key={post.id} maxW="md" mb={6}>
          <CardHeader>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              {/* <Avatar name={post.user_id} /> */}
              <Box>
                <Heading size="sm">User {post.user_id}</Heading>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <Heading>{post.title}</Heading>
            <Text mb={4}>{post.body}</Text>
          </CardBody>
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon={<BiChat />} onClick={() => fetchComments(post.id)}>
              View Comments
            </Button>
            {comments[post.id] && (
              <Box mt={4} p={2} borderTop="1px" borderColor="gray.200">
                <Heading fontSize="md" mb={2}>Comments</Heading>
                {comments[post.id].map((comment) => (
                  <Box key={comment.id} mb={4}>
                    <Text fontWeight="bold">{comment.name}</Text>
                    <Text>{comment.body}</Text>
                  </Box>
                ))}
                <Box mt={4}>
                  <Input
                    placeholder="Add a comment"
                    mb={2}
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                  />
                  <Button size="sm" onClick={() => handleCreateComment(post.id)}>
                    Add Comment
                  </Button>
                </Box>
              </Box>
            )}
          </CardFooter>
        </Card>
      ))}
          </SimpleGrid>
        </Center>
        </Box>
    </>
  );
}