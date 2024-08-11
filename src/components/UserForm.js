import { useState } from "react";
import {
  Center,
  Input,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { createUser, getUsers } from "../API/api";

export default function UserForm({ onUsersUpdated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    createUser({ name, email, gender, status })
      .then((response) => {
        toast({
          title: "User created.",
          description: `User ${response.data.name} created successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setName("");
        setEmail("");
        setGender("");
        setStatus("");
        onClose(); // Close the modal after successful submission

        // Fetch the latest users and notify parent component
        getUsers().then(users => onUsersUpdated(users.data));
      })
      .catch((error) => {
        toast({
          title: "Error creating user.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Center>
        <Button onClick={onOpen} bg={"blue.900"} color={"white"} w={"100%"} _hover={{ bg: "white", borderColor: "blue.900", color: "blue.900" }}>
          + Create User
        </Button>
      </Center>

      <Modal isOpen={isOpen} onClose={() => {
        onClose();
        setName("");
        setEmail("");
        setGender("");
        setStatus("");
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"blue.900"}>New User Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              mb={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              mb={2}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select
              placeholder="Select Gender"
              mb={2}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Select
              placeholder="Select Status"
              mb={2}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button color={"white"} bg={"blue.900"} _hover={{ bg: "white", borderColor: "blue.900", color: "blue.900" }} onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}