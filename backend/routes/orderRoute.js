import express from 'express'
import authMidleware from '../middleware/auth.js'
import {placeOrder,verifyOrder,userOrders, listOrders, updateStatus} from '../controllers/orderController.js'







const orderRouter=express.Router()


orderRouter.post('/place',authMidleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMidleware,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)





export default orderRouter