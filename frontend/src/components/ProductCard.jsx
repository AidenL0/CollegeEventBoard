import { Box, Image, Heading, Text, Input, VStack, HStack, IconButton, useColorModeValue, useDisclosure, Modal, ModalContent, ModalCloseButton, ModalHeader } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { ModalOverlay, ModalBody, Button, ModalFooter } from "@chakra-ui/react";
import { useState } from "react";


const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const {deleteProduct, updateProduct} = useProductStore()
    const toast = useToast()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose} = useDisclosure()

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct)
        onClose()
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid)
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }


    return (
        <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl", cursor: "pointer" }}
        bg={bg}
        onClick={onDetailOpen}
        >
            <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

            <Box p={4}>
                <Heading as="h3" size ="md" mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2} onClick={(e) => e.stopPropagation()}>
                    <IconButton icon={<EditIcon />} colorScheme="blue"  onClick={onOpen} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder="Event Name" name='name' value={updatedProduct.name} 
                        onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}  />

                        <Input placeholder="Product Price" name='price' value={updatedProduct.price} onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>

                    </VStack>                        
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} 
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Event Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <VStack spacing={4} align="start">
                        <Box>
                            <Text fontWeight="bold" mb={1}>Event Name</Text>
                            <Text>{product.name}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={1}>Price</Text>
                            <Text>${product.price}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={1}>Date</Text>
                            <Text>{new Date(product.eventDate).toLocaleString()}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={1}>Description</Text>
                            <Text>{product.description}</Text>
                        </Box>
                    </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={onDetailClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard