import { Inter } from "next/font/google";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme-tools";
import "./globals.css";

// Create the Inter font instance
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Media App",
  description: "Create users, posts, and comments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <ColorModeProvider options={{ useSystemColorMode: true }}>
            {children}
          </ColorModeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}