import mongoose from "mongoose";

export const DeliverySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    estimatedDeliveryTime: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false
    },
    cost: {
        type: Number,
        required: true,
    },
    iconUrl: {
        type: String,
        required: false
    }
})


const DeliveryModel = mongoose.models.Delivery || mongoose.model("Delivery", DeliverySchema)

export default DeliveryModel