// components/Header.js
import { Box, Flex, Heading, IconButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Button, useDisclosure, useBreakpointValue, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import Link from "next/link";
import UserForm from "../components/UserForm";
import { useState } from "react";

export default function Header({ onUsersUpdated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const display = useBreakpointValue({ base: "none", md: "flex" }); // Show hamburger menu only on mobile

  if ( !onUsersUpdated ) {
    onUsersUpdated = () => {};
  }
  // Handle user list update
  const handleUsersUpdated = () => {
    onUsersUpdated();
  };

  return (
    <Box
      position="fixed"
      top={0}
      zIndex={100}
      width="100%"
    >
      {/* Desktop Navigation */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding={4}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("black", "white")}
        display={display === "flex" ? "flex" : "none"}
      >
        <Heading size="md" color={"blue.900"}>
          <Link href="/users">Social&apos;s</Link>
        </Heading>
        <Flex align="center" gap={4}>
          <Link href="/users">
            <Button variant="link">
              Users
            </Button>
          </Link>
          <Link href="/posts">
            <Button variant="link">
              Posts
            </Button>
          </Link>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="outline"
            aria-label="Toggle Theme"
          />
          <UserForm onUsersUpdated={handleUsersUpdated} />
        </Flex>
      </Flex>

      {/* Mobile Navigation */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding={4}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("black", "white")}
        display={display === "none" ? "flex" : "none"}
      >
        <Heading size="md">
          <Link href="/users">Social&apos;s</Link>
        </Heading>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onOpen}
          variant="outline"
          aria-label="Open Menu"
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap={4}>
              <Link href="/users" passHref>
                <Button variant="link" color={"blue.900"} onClick={onClose}>
                  Users
                </Button>
              </Link>
              <Link href="/posts" passHref>
                <Button variant="link" color={"blue.900"} onClick={onClose}>
                  Posts
                </Button>
              </Link>
              <UserForm onUsersUpdated={handleUsersUpdated} />
              <IconButton
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="outline"
                aria-label="Toggle Theme"
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}