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
        required: true
    },
    email:{
        type: String,
        required: true
    }
}, { timestamps:true })

export default Users = mongoose.model("Users", userSchema)