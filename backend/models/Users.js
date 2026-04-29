import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// in the model definition, the first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, 'Users' will correspond to the 'users' collection in MongoDB.
const Users = mongoose.model('Users', userSchema); // Collection name will be 'users' in MongoDB

export default Users;