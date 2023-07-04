import mongoose from "mongoose";
const {Schema} = mongoose;


const userSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        min: 8,
        max: 64,
        required: true,
    },
    picture: {
        type: String,
        default: "",

    },
    role: {
        type: [String],
        default: ["Student"],
        enum: ["Student", "Instructor", "Admin"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
    passwordReset: {
        data: String,
        default: "",
    },
    },
    
    

    {
        timestamps: true   
    }
    );

    export default mongoose.model('User', userSchema);

