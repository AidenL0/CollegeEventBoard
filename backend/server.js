import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // grabs port from .env file or defaults to 5000

app.use(express.json()); // allows us to accept JSON data in request bodies

app.use("/api/products", productRoutes);

//postman

console.log(process.env.MONGO_URI);



app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port http://localhost:' + PORT);
});

