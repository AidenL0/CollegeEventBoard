import { useState } from "react"
import { Container, useColorModeValue, VStack, Heading, Box, Button, Input, Textarea } from "@chakra-ui/react"
import { create } from "zustand"
import { useProductStore } from "../store/product"
import { useToast } from "@chakra-ui/react"

const CONSTANT_IMAGE_URL = "https://images.unsplash.com/photo-1513886254403-8581397953fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Change this to your image URL

const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: CONSTANT_IMAGE_URL,
        eventDate: "",
        description: ""
    })

    const toast = useToast() // this is a hook from chakra ui that allows us to show toast notifications, we will use it to show success or error messages when creating a product

    const {createProduct} = useProductStore()

    const handleAppProduct = async () => {
        const {success, message} = await createProduct(newProduct)
        if (!success) {
            toast({
                title:"Error", // this is the title of the toast notification
                description: message, // this is the description of the toast notification, we will show the error message returned from the createProduct function
                status: "error", // this is the status of the toast notification, it can be "success", "error", "warning", or "info"
                duration: 5000, // this is the duration of the toast notification in milliseconds
                isClosable: true, // this allows the user to close the toast notification manually
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
            description: ""
        })
    }
    return (
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

                        <Button colorScheme="blue" onClick={handleAppProduct} w="full">
                            Create Event
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreatePage