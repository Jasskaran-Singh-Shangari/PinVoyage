import Pins from "../models/Pins.model.js"

export const savePin=async(req,res)=>{
    const newPin= new Pins(req.body)
        try {
            const savedPin=await newPin.save()
            if(savedPin){
                res.status(200).json(
                    savedPin
                    // message: "Pin saved successfully"
                )
            }
        } catch (error) {
            res.status(500).json(error)
        }
}

export const getPin= async (req, res)=>{
    try {
        const pins = await Pins.find()
        res.status(200).json(pins)
    } catch (error) {
        res.status(500).json({
            message:`There is an error ${error}`
        })
    }

}