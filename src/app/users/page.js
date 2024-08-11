"use client";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import UserList from "../../components/UserList";
import { getUsers } from "../../API/api";
import Header from "../../components/Header";

export default function Users() {

  const [users, setUsers] = useState([]);

  // Fetch users initially
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users function
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Pass fetchUsers to Header so it can be called when a new user is added
  const handleUsersUpdated = () => {
    fetchUsers();
  };

  return (
    <>
      <Header onUsersUpdated={handleUsersUpdated} />
      <Box p={6} mt={100}>
        <UserList users={users} />
      </Box>
    </>
  );
}