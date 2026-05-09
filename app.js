//LOAD ENVIRONMENT VARIABLES FIRST
//this reads your .env file and puts everything into process.env before any other code runs
require("dotenv").config();

const express=require("express")
const path=require("path")
const indexRouter=require("./routes/index")
const newRouter=require("./routes/new")
const deleteRouter=require("./routes/delete")
const app=express();
const PORT=process.env.PORT||3000;
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))

app.use("/",indexRouter)
app.use("/new",newRouter)
app.use("/delete",deleteRouter)

app.use((req,res)=>{
    res.status(404).render("notFound",{title:"Page Not Found"})
})

app.listen(PORT,()=>{
    console.log(`Project running at http://localhost:${PORT}`)
})