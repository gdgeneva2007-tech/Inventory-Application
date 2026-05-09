const db=require("../db/queries")

const express=require("express")
const router=express.Router();

router.get("/",async (req,res)=>{
    const searchTerm=req.query.search;
    let usernames;
    if(searchTerm){
        usernames=await db.searchUsernames(searchTerm);
    }
    else{
        usernames=await db.getAllUsernames();
    }

    console.log("Search term: ",searchTerm)
    console.log("Results: ",usernames)

    res.send(
        `Search: ${searchTerm||'none'} | `+`Results: ${usernames.map((user)=>user.username).join(", ")||"no matches"}`
    )
    // const usernames=await db.getAllUsernames();
    // console.log("Usernames: ",usernames)
    // res.send("Usernames: "+usernames.map(user=>user.username).join(", "))
})

module.exports=router;

