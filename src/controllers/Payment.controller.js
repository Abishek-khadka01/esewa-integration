import {verifyEsewaRequest , HashEsewaPayment }  from "./esewaHandler.js"
import {Item}  from "../models/item.models.js"
import {PurchasedItem } from  "../models/PurchasedItem.models.js"
 async function InitializePayment  (req,res){
    try {
        const {itemId, totalPrice } = req.body;
        if(!itemId  || !totalPrice){
            console.log(`NO either itemid or totalPrice`)
            res.status(400).json({
                success : false,
                message : "NO itemId or total Price"
            })
        }

        const item = await Item.findOne({
            _id: itemId,
            price : Number(totalPrice)
        })
        if(!item){
            console.log(`NO such item exist`)
            res.status(401).json({
                success : false,
                message :"NO item found"
            })
        }

        // Create a record for the purchase
        const purchasedItemdata = await PurchasedItem.create({
            item : itemId,
            paymentMethod :"esewa",
            totalPrice : totalPrice
        }) 

        
    const paymentInitiate = await HashEsewaPayment(totalPrice, purchasedItemdata._id)

        if(!paymentInitiate){
            console.log(`Error in the   payment `)
            res.status(500).json({
                success : false,
                message :"the payment was failed"
            }
            )
        }

        res.status(200).json({
            success : true,
            payment : paymentInitiate,
            purchasedItemdata
        })

        
    } catch (error) {
        res.status(500).json({
            error : true,
            message : error.message
        })
    }


}



 const VerifyPayment = async (req,res)=>{

    try {

        // after the initialization of the esewa , the esewa sends the data as the query to redirect_url
        const {data} = req.query;
        
            const paymentInfo = await verifyEsewaRequest(data)

            const purchasedItemdata = await PurchasedItem.findById(paymentInfo.response.transaction_uuid)
            if(!purchasedItemdata){
                console.log(`No purchased Item data`)
                res.status(401).json({
                    success : false,
                    message : "Purchase not found"
                })
            }

            const paymentData = await Payment.create({
                pidx : paymentInfo.decodedData.transaction_code,
                transactionId : paymentInfo.decodedData.transaction_code,
                productId : paymentInfo.response.transaction_uuid,
                amount : purchasedItemdata.totalPrice,
                dataFromVerificationReq : paymentInfo,
                apiQueryFromUser: req.query,
                paymentGateway :"esewa",
                status : "success"
            })

            await PurchasedItem.findByIdAndUpdate(
                paymentInfo.response.transaction_uuid,
                { $set: { status: "completed" } }
              );

              res.json({
                success: true,
                message: "Payment successful",
                paymentData,
              });


    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success :false,
            message :error.message
        })
    }

    
}

const findAllProducts = async (req,res)=>{
    try {
        const items = await Item.find()
        res.status(200).json({
            success : true,
            message :"Items found",
            items
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false
            ,message :"Internal Server Error"
        })
    }
}


export  {InitializePayment, VerifyPayment, findAllProducts}