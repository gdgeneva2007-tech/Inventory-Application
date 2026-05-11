const db=require("../db/queries")

const express=require("express")
const router=express.Router();

router.get("/",async (req,res)=>{
    const categories=await db.getAllCategories();
    res.render("index",{title:"Home page",categories:categories})
})

module.exports=router;

