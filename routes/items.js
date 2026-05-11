const express=require("express")
const router=express.Router();
const db=require("../db/queries")
const {viewAll,viewOne,createItem,createItemHandle,itemValidationRules,editItem,editItemHandle,deleteItem}=require("../controllers/itemController")
router.get("/",viewAll)
router.get("/create",createItem)
router.post("/create",itemValidationRules,createItemHandle)
router.get("/:id",viewOne)
router.get("/:id/edit",editItem)
router.post("/:id/edit",itemValidationRules,editItemHandle)
router.get("/:id/delete",deleteItem)
module.exports=router;