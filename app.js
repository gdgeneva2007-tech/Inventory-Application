require("dotenv").config();

const express=require("express")
const path=require("path")
const indexRouter=require("./routes/index")
const categoriesRouter=require("./routes/categories")
const itemsRouter=require("./routes/items")
const app=express();
const PORT=process.env.PORT||3000;
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.use("/",indexRouter)
app.use("/categories",categoriesRouter)
app.use("/items",itemsRouter)

app.use((req,res)=>{
    res.status(404).render("notFound",{title:"Page Not Found"})
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).render("error",{
        title:"Server Error",
        message:"Something went wrong. Please try again"
    })
})

app.listen(PORT,()=>{
    console.log(`Project running at http://localhost:${PORT}`)
})