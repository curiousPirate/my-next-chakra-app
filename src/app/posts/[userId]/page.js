'use client';
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  Avatar,
  Flex,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useToast,
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import {
  getUser,
  getPostsByUser,
  createPost,
  getCommentsByPost,
  createComment,
} from "../../../API/api";
import Header from "@/components/Header";

export default function UserDetailsPage({ params }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const toast = useToast();
  const userId = params.userId;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
      fetchPosts();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await getUser(userId);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await getPostsByUser(userId);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await getCommentsByPost(postId);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const postData = {
        title: newPostTitle,
        body: newPostBody,
      };
      await createPost(userId, postData);
      setNewPostTitle("");
      setNewPostBody("");
      fetchPosts();
      onClose();
      toast({
        title: "Post created.",
        description: "Your post has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error creating post.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCreateComment = async (postId) => {
    try {
      const commentData = {
        body: commentBody,
        name: user.name,
        email: user.email
      };

      await createComment(postId, commentData);
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
    <Box p={6} mt={55}>
      <Box bg={"blue.900"} p={6} rounded={"lg"}>
      {user && (
        <Center>
          <Box
            maxW={"270px"}
            w={"full"}
            bg={"white"}
            boxShadow={"xl"}
            rounded={"xl"}
            overflow={"hidden"}
            textAlign={"center"}
          >
            <Flex justify={"center"} mt={4}>
              <Avatar
                size={"xl"}
                name={user?.name}
                bg={user?.gender === "male" ? "blue.500" : "pink.500"}
                pos={"relative"}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: user.status === "active" ? "green.300" : "red.300",
                  border: "2px solid white",
                  rounded: "full",
                  pos: "absolute",
                  bottom: 0,
                  right: 3,
                }}
                css={{
                  border: "2px solid white",
                }}
              />
            </Flex>
            <Box p={6}>
              <Heading fontSize={"2xl"} fontWeight={500}>
                {user?.name}
              </Heading>
              <Text color={"gray.500"}>{user?.email}</Text>
            </Box>
            <Button onClick={onOpen} colorScheme="blue" width={"100%"}>
              Create New Post
            </Button>
          </Box>
        </Center>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="New Post Title"
              mb={2}
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <Input
              placeholder="New Post Body"
              mb={2}
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box mt={6}>
        {posts.map((post) => (
          <Card key={post.id} maxW="md" mb={4}>
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    size={"md"}
                    name={user.name}
                    bg={user.gender === "male" ? "blue.500" : "pink.500"}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                  <Box>
                    <Heading size="sm">{user.name}</Heading>
                    <Text>{user.email}</Text>
                  </Box>
                </Flex>
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
      </Box>
    </Box>
    </>
  );
}