import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoute.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // grabs port from .env file or defaults to 5000
const __dirname = path.resolve(); // gets the current directory path

app.use(express.json()); // allows us to accept JSON data in request bodies

app.use("/api/products", productRoutes);

//postman

console.log(process.env.MONGO_URI);

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Catch-all route for React Router - must be after all API routes
app.get(/^(?!\/api\/).*/, (req,res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});



app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port http://localhost:' + PORT);
});

