const express=require("express")
const router=express.Router();
const db=require("../db/queries")
router.get("/",async (req,res)=>{
    await db.deleteAllUsernames();
    res.redirect("/")
})
module.exports=router;