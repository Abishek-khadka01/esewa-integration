/*

 Input should be string type and the value of Signed_field_names
Parameters(total_amount,transaction_uuid,product_code) should be mandatory and should be in the same order while creating the signature

*/


// creating the secret key to send the request to the esewa merchant account 

const axios = require("axios")
const crypto = require("crypto")


 export async function HashEsewaPayment (amount, transaction_id){

    try {
        const data = `total_amount=${amount},transaction_uuid=${transaction_id}, product_code=${process.env.ESEWA_PRODUCT_CODE}`

        const hash = crypto.createHmac(
            "sha256", process.env.ESEWA_SECRET_KEY
        ).update(data).digest("base64")

        return {
            signature : hash,
            signed_field_names :"total_amount, transaction_uuidm product_code"
        }



    } catch (error) {
            throw error
    }



}

// after the successful request from the server , the esewa gateway sends the response in the same encoded format , we have to decode it and get the details
export async function verifyEsewaRequest (encodedKey){

    try{
        let  decodedData = atob(encodedKey);
        decodedData = await JSON.parse(decodedData);
    console.log(decodedData)


/*

    Decoded response is in the format of 
  {
  "transaction_code": "0LD5CEH",
  "status": "COMPLETE",
  "total_amount": "1,000.0",
  "transaction_uuid": "240613-134231",
  "product_code": "EPAYTEST",
  "signed_field_names": "transaction_code,status,total_amount,transaction_uuid,product_code,signed_field_names",
  "signature": "Mpwy0TFlHqpJjFUDGic+22mdoenITT+Ccz1LC61qMAc="
} 

*/
 let reqOptions = {
    url : `${process.env.ESEWA_GATEWAY_URL}/api/epay.transaction/status/?product_code= ${process.env.ESEWA_PRODUCT_CODE}&total_amount= ${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`
, method :"GET",
headers : headersList
 }


let response = await axios.request(reqOptions)
if (
    response.data.status !== "COMPLETE" ||
    response.data.transaction_uuid !== decodedData.transaction_uuid ||
    Number(response.data.total_amount) !== Number(decodedData.total_amount)
  ) {
    throw { message: "Invalid Info", decodedData };
  }
  return { response: response.data, decodedData };
}

 catch (error) {
  throw error;
 }
}