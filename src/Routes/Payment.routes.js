import { InitializePayment, VerifyPayment , findAllProducts} from  "../controllers/Payment.controller.js"

import {Router} from "express"


const PaymentRouter = Router()

   PaymentRouter.post("/initialize-esewa", InitializePayment)
   PaymentRouter.get("/verify-payment:token", VerifyPayment) 
   PaymentRouter.get("/find-producst", findAllProducts)

export {PaymentRouter}