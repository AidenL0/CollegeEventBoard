import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useToast
} from "@chakra-ui/react";
import { useUserStore } from "../store/user";

const LoginModal = ({ isOpen, onClose }) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const toast = useToast();
    
    const { loginUser, signupUser } = useUserStore();

    const handleLogin = async () => {
        if (!loginEmail || !loginPassword) {
            toast({ title: "Error", description: "Please fill all fields", status: "error" });
            return;
        }
        
        const { success, message } = await loginUser(loginEmail, loginPassword);
        if (success) {
            toast({ title: "Success", description: message, status: "success" });
            onClose();
            setLoginEmail("");
            setLoginPassword("");
        } else {
            toast({ title: "Error", description: message, status: "error" });
        }
    };

    const handleSignup = async () => {
        if (!signupUsername || !signupEmail || !signupPassword) {
            toast({ title: "Error", description: "Please fill all fields", status: "error" });
            return;
        }
        
        const { success, message } = await signupUser(signupUsername, signupEmail, signupPassword);
        if (success) {
            toast({ title: "Success", description: message, status: "success" });
            onClose();
            setSignupUsername("");
            setSignupEmail("");
            setSignupPassword("");
        } else {
            toast({ title: "Error", description: message, status: "error" });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Your Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Tabs>
                        <TabList>
                            <Tab>Login</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <VStack spacing={4}>
                                    <Input
                                        placeholder="Email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                    <Button colorScheme="blue" w="full" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </VStack>
                            </TabPanel>

                            <TabPanel>
                                <VStack spacing={4}>
                                    <Input
                                        placeholder="Username"
                                        value={signupUsername}
                                        onChange={(e) => setSignupUsername(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Email"
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                    />
                                    <Button colorScheme="blue" w="full" onClick={handleSignup}>
                                        Sign Up
                                    </Button>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;