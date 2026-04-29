import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    eventDate: {
        type: Date,
        required: true,
        index: { expires: 864000 } // 1 day in seconds
    },
    
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema); // Collection name will be 'products' in MongoDB

export default Product;