import { Webhook } from "svix"
import Users from  "../models/Users.model.js"

const getRandomColor=()=>{
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return `rgb(${r}, ${g}, ${b})`
}

export const clerkWebhook=async (req,res)=>{
    const WEBHOOK_SECRET=process.env.CLERK_WEBHOOK_SIGNING_SECRET

    if (!WEBHOOK_SECRET){
        throw new Error("Webhook secret key required")
    }
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        console.log("Webhook Verification failed...")
        return res.status(400).json({
            message:"Webhook verification failed..."
        });
    }
    if (evt.type === 'user.created') {
        console.log(evt.data)

        try {
            const newUser = new Users({
                clerkId: evt.data.id,
                username: evt.data.username,
                email: evt.data.email_addresses[0].email_address,
                color: getRandomColor()
            })
            await newUser.save()

            return res.status(200).json({
                message: "User successfully created..."
            })
        } catch (error) {
            res.status(500).json({
                message: "User creation failed!!!"
            })
            console.log(`ERROR:${error}`)
        }


      }
}