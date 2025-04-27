import mongoose,{Schema} from "mongoose"

const pinSchema=new Schema({
    username:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    long:{
        type: Number,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min:0,
        max: 5,
    },
    color:{
        type: String,
        required: true,
        default: "red"
    }
}, { timestamps: true })

const Pins = mongoose.model("Pins", pinSchema)
export default Pins