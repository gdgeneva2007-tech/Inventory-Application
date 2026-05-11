const db=require("../db/queries")
const {body,validationResult}=require("express-validator")

const itemValidationRules=[
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Item name is required.")
        .isLength({max:100})
        .withMessage("Item name must be under 100 characters."),
    body("origin")
        .trim()
        .notEmpty()
        .withMessage("Item origin is required.")
        .isLength({max:100})
        .withMessage("Item origin must be under 100 characters."),
    body("description")
        .trim()
        .optional({values:"falsy"})
        .isLength({max:500})
        .withMessage("Item description must be under 500 characters."),
    body("price")
        .isDecimal()
        .withMessage("Price must be a decimal")
        .custom((value)=>value>0)
        .withMessage("Price must be greater than zero"),
    body("stock")
        .isInt({min:0})
        .withMessage("Stock must be a non-negative integer")
]

const viewAll=async (req, res,next)=>{
    try{
        const items=await db.getAllItems();
        res.render("items/index",{title:"View all items",items:items})
    }catch(err){
        next(err)
    }
}

const viewOne=async(req,res,next)=>{
    try{
        const id=parseInt(req.params.id)
        if(isNaN(id)){
            res.status(404).render("notFound",{title:"not found"})
        }
        const item=await db.getOneItem(id);
        if(!item){
            res.status(404).render("notFound",{title:"not found"})
        }
        let categoryName="Uncategorized"
        if(item.category_id){
            const category=await db.getOneCategory(item.category_id)
            categoryName=category?category.name:"Uncategorized"
        }
        
        res.render("items/detail",{title:"Item detail",item:item,category:categoryName})
    }catch(err){
        next(err)
    }
    
}

const createItem=async (req,res,next)=>{
    try{
        const categories=await db.getAllCategories();
        res.render("items/form",{title:"Create Item",errors:[],formdata:{},formAction:"/items/create",categories:categories})
    }catch(err){
        next(err)
    }
}

const createItemHandle=async(req,res,next)=>{
    try{
        const errors=validationResult(req)
        const item={...req.body,price:parseFloat(req.body.price),stock:parseInt(req.body.stock),category_id:parseInt(req.body.category_id)}
        const categories=await db.getAllCategories();
        if(!errors.isEmpty())
        {
            return res.render("items/form",{title:"Create Item", errors:errors.array(), formdata:item,formAction:"/items/create",categories:categories})
        }
        await db.createItem(item)
        res.redirect("/items")
    }catch(err){
        next(err)
    }
}

const editItem=async(req,res,next)=>{
    try{
        const id=parseInt(req.params.id)
        if(isNaN(id)){
            return res.status(404).render("notFound",{title:"not found"})
        }
        const item=await db.getOneItem(id)
        if(!item){
            return res.status(404).render("notFound",{title:"not found"})
        }
        const categories=await db.getAllCategories();
        res.render("items/form",{title:"Edit item",errors:[],formdata:item,formAction:`/items/${item.id}/edit`,categories:categories})
    }catch(err){
        next(err)
    }
}

const editItemHandle=async(req,res,next)=>{
    try{
        const id=parseInt(req.params.id)
        if(isNaN(id)){
            return res.status(404).render("notFound",{title:"not found"})
        }
        const existingItem=await db.getOneItem(id)
        if(!existingItem){
            return res.status(404).render("notFound",{title:"not found"})
        }
        const errors=validationResult(req)
        const item={...req.body,id:parseInt(req.params.id),price:parseFloat(req.body.price),stock:parseInt(req.body.stock),category_id:parseInt(req.body.category_id)}
        if(!errors.isEmpty()){
            const categories=await db.getAllCategories()
            return res.render("items/form",{title:"Create Item", errors:errors.array(), formdata:item,formAction:`/items/${item.id}/edit`,categories:categories})
        }
        await db.editItem(item)
        res.redirect("/items")
    }catch(err){
        next(err)
    }
}

const deleteItem=async(req,res,next)=>{
    try{
        const id=parseInt(req.params.id)
        if(isNaN(id)){
            return res.status(404).render("notFound",{title:"not found"})
        }
        const existingItem=await db.getOneItem(id)
        if(!existingItem){
            return res.status(404).render("notFound",{title:"not found"})
        }
        await db.deleteItem(id)
        res.redirect("/items")
    }catch(err){
        next(err)
    }
}
module.exports={
    viewAll,viewOne,createItem,createItemHandle,itemValidationRules,editItem,editItemHandle,deleteItem
}