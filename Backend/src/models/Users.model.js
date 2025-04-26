import mongoose,{Schema} from "mongoose"

const userSchema=new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        default: "Guest"
    },
    password:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true,
        default: "red"
    },
    clerkId:{
        type: String,
        required: true,
        unique: true
    }
}, { timestamps:true })

const User = mongoose.model("User", userSchema)

export default User;