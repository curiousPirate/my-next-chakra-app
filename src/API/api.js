// api.js
import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2";
const TOKEN = "e060cb926dea519abf2babbb2fb25fa737948f13f6ebb606c9453ebb955a4609";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// Users API
export const getUsers = () => api.get("/users?page=1&per_page=40");
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post("/users", data);

// Posts API
export const getPostsByUser = (userId) => api.get(`/users/${userId}/posts`);
export const createPost = (userId, data) => api.post(`/users/${userId}/posts`, data);

// Comments API
export const getCommentsByPost = (postId) => api.get(`/posts/${postId}/comments`);
export const createComment = (postId, data) => api.post(`/posts/${postId}/comments`, data);

export default api;