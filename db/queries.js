const pool=require("./pool")
async function getAllUsernames(){
    const {rows}=await pool.query("SELECT * FROM usernames");
    return rows;
}

async function searchUsernames(searchTerm){
    const {rows}=await pool.query(
        //$1 is the placeholder - never put variables directly in SQL strings
        //to prevent SQL injection attacks
        "SELECT * FROM usernames WHERE username ILIKE $1",
        [`%${searchTerm}%`] 
    )
    return rows
}

async function insertUsername(username){
    await pool.query("INSERT INTO usernames (username) VALUES ($1)",[username]);
}

async function deleteAllUsernames(){
    await pool.query("DELETE FROM usernames")
}

module.exports={
    getAllUsernames,
    insertUsername,
    searchUsernames,
    deleteAllUsernames
}