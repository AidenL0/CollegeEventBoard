import { Route, Routes } from "react-router-dom" // imports tools for routing, routing allows us to have multiple pages in our app and navigate between them without refreshing the page
import { Button, Box } from '@chakra-ui/react'
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"
import { useColorModeValue } from "@chakra-ui/react"

// this is the main component of our app, it is responsible for rendering the navbar and the different pages based on the route

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "grey.900")}> {/* this line of code ensures that the background color of the entire app changes based on the color mode */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}
export default App
