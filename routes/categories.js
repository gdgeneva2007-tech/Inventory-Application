const express=require("express")
const router=express.Router();
const {viewAll,viewOne,categoryValidationRules,createCategoryForm,createCategoryHandle,editCategoryForm,editCategoryFormHandle,deleteCategory} =require("../controllers/categoryController")

router.get("/",viewAll)
router.get("/create",createCategoryForm)
router.post("/create",categoryValidationRules,createCategoryHandle)
router.get("/:id",viewOne)
router.get("/:id/edit",editCategoryForm)
router.post("/:id/edit",categoryValidationRules,editCategoryFormHandle)
router.get("/:id/delete",deleteCategory)

module.exports=router;