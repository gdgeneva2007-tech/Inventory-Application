const db=require("../db/queries")
const express=require("express")
const router=express.Router();
router.get("/",(req,res)=>{
    res.render("addUserName",{title:"Add Username"})
})
router.post("/",async (req,res)=>{
    const {username}=req.body;
    await db.insertUsername(username)
    res.redirect("/")
})
module.exports=router;