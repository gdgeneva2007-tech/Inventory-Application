const {Pool}=require("pg")
// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
})

console.log("Connecting to database:",process.env.DATABASE_URL?"URL found ✓": "URL MISSING ✗")

module.exports=pool