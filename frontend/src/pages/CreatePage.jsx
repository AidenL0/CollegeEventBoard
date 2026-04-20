import { useState } from "react"
import { Container, useColorModeValue, VStack, Heading, Box, Button, Input } from "@chakra-ui/react"
import { create } from "zustand"
import { useProductStore } from "../store/product"
import { useToast } from "@chakra-ui/react"

const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
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
            image: ""
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
                        placeholder="Product Price" 
                        name='price' 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />

                        <Input 
                        placeholder="Event Image URL" 
                        name='imageUrl' 
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
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