const db=require("../db/queries")
const {body,validationResult} =require("express-validator")

const categoryValidationRules=[
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({max:100})
        .withMessage("Category name must be under 100 characters."),
    body("description")
        .trim()
        .optional({values:"falsy"})
        .isLength({max:500})
        .withMessage("Description must be under 500 characters.")
]

const viewAll=async (req ,res,next)=>{
    try{
        const categories=await db.getAllCategories();
        res.render("categories/index",{title:"All categories",categories:categories})
    }catch(err){
        next(err)
    }
}

const viewOne=async (req,res,next)=>{
    try{
        const id=parseInt(req.params.id)
        if(isNaN(id)){
            return res.status(404).render("notFound",{title:"Page Not Found"})
        }
        const category=await db.getOneCategory(id);
        if(!category){
            return res.status(404).render("notFound",{title:"Page Not Found"})
        }
        const items=await db.getOneCategoryItems(id)
        res.render("categories/detail",{title:`${category.name} Details`,category:category,items:items})
    }catch(err){
        next(err)
    }
}

const createCategoryForm=(req,res)=>{
    res.render("categories/form",{title:"Create category",formAction:"/categories/create",errors:[],formdata:{}})
}

const createCategoryHandle=async (req,res,next)=>{
    try{
        const err=validationResult(req);
        if(!err.isEmpty()){
            return res.render("categories/form",{title:"Create category",formAction:"/categories/create",errors:err.array(),formdata:req.body})
        }
        const ctg=req.body
        await db.createCategory(ctg)
        res.redirect("/categories")
    }catch(err){
        next(err)
    }
}

const editCategoryForm=async (req,res,next)=>{
    try{
        const id=parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(404).render("notFound", { title: "Invalid Category ID" });
        }
        const ctgInfo=await db.getOneCategory(id)
        if(!ctgInfo){
            return res.status(404).render("notFound",{title:"Page Not Found"})
        }
        res.render("categories/form",{title:"Edit category",formAction:`/categories/${id}/edit`,errors:[],formdata:ctgInfo})
    }catch(err){
        next(err)
    }
}

const editCategoryFormHandle=async (req,res,next)=>{
    try{
        const id=parseInt(req.params.id)
        if(isNaN(id)){
            return res.status(404).render("notFound",{title:"Not Found"})
        }
        // Check the category actually exists before trying to update it
        const category=await db.getOneCategory(id)
        if(!category){
            return res.status(404).render("notFound",{title:"Page not found"})
        }
        const err=validationResult(req)
        if(!err.isEmpty()){
            return res.render("categories/form",{title:"Edit category",formAction:`/categories/${req.params.id}/edit`,errors:err.array(),formdata:req.body})
        }
        await db.editCategory({...req.body,id:parseInt(req.params.id)})
        res.redirect("/categories")
    }catch(err){
        next(err)
    }
}

const deleteCategory=async(req,res,next)=>{
    try{
        const id=req.params.id
        if(isNaN(id)){
            return res.status(404).render("notFound",{title:"not found"})
        }
        const category=await db.getOneCategory(id)
        if(!category){
            return res.status(404).render("notFound",{title:"not found"})
        }
        await db.deleteCategory(id)
        res.redirect("/categories")
    }catch(err){
        next(err)
    }
}
module.exports={
    categoryValidationRules,
    viewAll,
    viewOne,createCategoryForm,createCategoryHandle,editCategoryForm,editCategoryFormHandle,deleteCategory
}