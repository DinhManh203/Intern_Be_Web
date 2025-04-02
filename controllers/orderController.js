import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"

//Placing orders using COD method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            paymnet: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success:true, message: "Order Placed"})
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false, 
            message: error.message
        })
    }

}

//Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {



}

//Placing orders using Razor method
const placeOrderRazorpay = async (req, res) => {



}

//All Orders data for Admin Panel
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({})
        res.json({
            success: true,
            orders
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false, 
            message: error.message
        })
    }

}

//User Order Data For Frontend
const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ 
            success: true,
            orders
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false, 
            message: error.message
        })
    }

}

//update order status from Admin Panel
const updateStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({
            success: true,
            message: 'Status Updated'
        })
        
    } catch (error) {


        
    }

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }