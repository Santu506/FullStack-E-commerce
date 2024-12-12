import Order from "../model/order.model.js";
import User from "../model/user.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
//global variable
const currency = "usd";
const deleveryCharges = 10;
// console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//cod order
const placeOrders = async (req, res) => {
    try {
        const { userId, products, totalAmount, address } = req.body;
        const order = await Order.create({
            userId,
            products,
            totalAmount,
            address,
            paymentMethod:"COD",
            payment:false
        });

        await User.findByIdAndUpdate(userId, {cartData:{}});
        res.status(200).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const placeOrderStripe = async (req, res) => {
    
    try {
        const { userId, products, totalAmount, address } = req.body;
        const {origin} = req.headers;
        const order = await Order.create({
            userId,
            products,
            totalAmount,
            address,
            paymentMethod:"Stripe",
            payment:false
        });
        
        const line_item = products.map((product) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        }));
        
        line_item.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delevery Charges",
                },
                unit_amount:  deleveryCharges* 100,
            },
            quantity:1,
        })
        
        const session = await stripe.checkout.sessions.create({
            line_items: line_item,
            mode: "payment",
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?cancel=false&orderId=${order._id}`,
        });
        res.status(200).json({success: true, secure_url: session.url });

    } catch (error) {
        console.log("hello");
        res.status(500).json({ success: false, message: error.message });
    }
};
//verify stripe
const verifyStripe = async (req, res) => {
    try {
        const { orderId,success,userId } = req.body;
        
        if(success === "true"){
             await Order.findByIdAndUpdate(orderId,{payment:true});
             await User.findByIdAndUpdate(userId,{cartData:{}});
             
             res.status(200).json({ success: true, message: "Order placed successfully" });
        }else{
            await Order.findByIdAndDelete(orderId);
            res.status(200).json({ success: false, message: "Order cancel" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const placeOrderRozerPay = async (req, res) => {
    
}
//all order data for admin panel
const allOrders = async (req, res) => {
    
    try {
      const orders = await Order.find({ });
      
      // Only send the response once
      if (!orders) {
        return res.status(404).json({ message: 'No orders found' });
      }
      
      console.log("dxcfvghbjkl");
      
      // Send orders as the response
      return res.status(200).json({success: true, orders});
    } catch (err) {
      // Handle any errors
      return res.status(500).json({ error: 'An error occurred while fetching orders', details: err.message });
    }
  };
//user order data for frontend
const userOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({ userId }).select("products status totalAmount payment paymentMethod ");  
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//update order status from admin panel
const updateStatus = async (req, res) => {
    try{
        const { orderId, status } = req.body;
        const order = await Order.findById(orderId);
        // Return an error message if something goes wrong
        res.status(500).json({ success: false, message: error.message });
        order.status = status;
        await order.save();
        res.status(200).json({ success: true, message: "Order updated successfully" });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

export  { placeOrders, placeOrderStripe,verifyStripe, placeOrderRozerPay, allOrders, userOrder, updateStatus }