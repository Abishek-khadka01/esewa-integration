import { findItembyId } from "../controllers/Item.controller.js"
import { InitializePayment, VerifyPayment , findAllProducts} from  "../controllers/Payment.controller.js"

import {Router} from "express"


const PaymentRouter = Router()

   PaymentRouter.post("/initialize-esewa", InitializePayment)
   PaymentRouter.get("/verify-payment:token", VerifyPayment) 
   PaymentRouter.get("/", findAllProducts)
   PaymentRouter.get("/product/:id", findItembyId)

export {PaymentRouter}