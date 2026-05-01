import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    
    loginUser: async (email, password) => {
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (data.success) {
                set({ user: data.user, isAuthenticated: true });
                localStorage.setItem("user", JSON.stringify(data.user));
                return { success: true, message: "Login successful" };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    
    signupUser: async (username, email, password) => {
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();
            
            if (data.success) {
                set({ user: data.user, isAuthenticated: true });
                localStorage.setItem("user", JSON.stringify(data.user));
                return { success: true, message: "Signup successful" };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    
    logoutUser: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem("user");
    },
    
    checkAuth: () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            set({ user: JSON.parse(savedUser), isAuthenticated: true });
        }
    }
}));