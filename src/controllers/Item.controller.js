import {Item} from "../models/item.models.js"


 export const findItembyId =  async (req,res)=>{

    try {
        const {id} = req.params
            const item = await Item.findById(id)
            if(!item){
                res.render("error.ejs")
            }
            res.render("Item.ejs", {item})
        
    } catch (error) {
        console.log(error.message);
        res.render("error.ejs")
    }

}