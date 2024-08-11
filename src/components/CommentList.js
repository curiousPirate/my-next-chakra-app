// components/CommentList.js
import { useEffect, useState } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { getCommentsByPost } from "../API/api";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommentsByPost(postId)
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <Spinner />;

  return (
    <Box mt={4}>
      {comments.map((comment) => (
        <Text key={comment.id}>{comment.body}</Text>
      ))}
    </Box>
  );
}