import { useState, useEffect } from "react"
import { Container, useColorModeValue, VStack, Heading, Box, Button, Input, Textarea, useDisclosure } from "@chakra-ui/react"
import { useProductStore } from "../store/product"
import { useUserStore } from "../store/user"
import { useToast } from "@chakra-ui/react"
import LoginModal from "../components/LoginModal"

const CONSTANT_IMAGE_URL = "https://images.unsplash.com/photo-1513886254403-8581397953fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: CONSTANT_IMAGE_URL,
        eventDate: "",
        description: "",
        location: ""
    })

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { createProduct } = useProductStore()
    const { isAuthenticated, checkAuth } = useUserStore()

    // Check if user is logged in when component mounts
    useEffect(() => {
        checkAuth();
        if (!isAuthenticated) {
            onOpen(); // Show login modal if not authenticated
        }
    }, [])

    const handleAppProduct = async () => {
        if (!isAuthenticated) {
            onOpen();// Show login modal if not authenticated
            return; // Prevent product creation if not authenticated
        }

        const { success, message } = await createProduct(newProduct)
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        }
        setNewProduct({
            name: "",
            price: "",
            image: CONSTANT_IMAGE_URL,
            eventDate: "",
            description: "",
            location: ""
        })
    }

    return (
        <>
            <Container maxW={"container.sm"}>
                <VStack spacing={8}>
                    <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                        Create Your Event
                    </Heading>

                    <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                        <VStack spacing={4}>
                            <Input 
                            placeholder="Event Name" 
                            name='name' 
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            />

                            <Input 
                            placeholder="Event Price" 
                            name='price' 
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            />

                            <Input 
                            placeholder="Event Date" 
                            name='eventDate' 
                            type='datetime-local'
                            value={newProduct.eventDate}
                            onChange={(e) => setNewProduct({...newProduct, eventDate: e.target.value})}
                            />

                            <Textarea 
                            placeholder="Event Description" 
                            name='description' 
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                            />

                            <Input 
                            placeholder="Event Location/Address" 
                            name='location' 
                            value={newProduct.location}
                            onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                            />

                            <Button colorScheme="blue" onClick={handleAppProduct} w="full">
                                Create Event
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Container>

            <LoginModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default CreatePage