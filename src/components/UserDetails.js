// components/UserDetails.js
import { useEffect, useState } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { getUser, getPostsByUser } from "../API/api";
import PostList from "./PostList";
import PostForm from "./PostForm";

export default function UserDetails({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUser(userId), getPostsByUser(userId)])
      .then(([userResponse, postsResponse]) => {
        setUser(userResponse.data);
        setPosts(postsResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details or posts:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Spinner />;

  return (
    <Box>
      <Text>User: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <PostForm userId={userId} />
      <PostList posts={posts} />
    </Box>
  );
}