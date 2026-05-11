const pool=require("./pool")
async function getAllCategories(){
    const {rows}=await pool.query("SELECT * FROM categories");
    return rows;
}

async function getOneCategory(id){
    const {rows}=await pool.query("SELECT * FROM categories WHERE id=$1",[id])
    return rows[0];
}

async function getOneCategoryItems(id){
    const {rows}=await pool.query("SELECT * FROM items WHERE category_id=$1",[id])
    return rows;
}

async function createCategory(ctg){
    await pool.query("INSERT INTO categories (name,description) VALUES ($1,$2)",[ctg.name,ctg.description])
}

async function editCategory(ctg){
    await pool.query("UPDATE categories SET name=$1,description=$2 WHERE id=$3",[ctg.name,ctg.description,ctg.id])
}

async function deleteCategory(id){
    await pool.query("UPDATE items SET category_id=NULL WHERE category_id=$1",[id])
    await pool.query("DELETE FROM categories WHERE id=$1",[id])
}

async function getAllItems(){
    const {rows}=await pool.query("SELECT * FROM items");
    return rows;
}

async function getOneItem(id){
    const {rows}=await pool.query("SELECT * FROM items WHERE id=$1",[id])
    return rows[0];
}

async function createItem(item){
    await pool.query("INSERT INTO items (name,description,price,stock,origin,category_id) VALUES ($1, $2, $3, $4, $5, $6)",[item.name,item.description,item.price,item.stock,item.origin,item.category_id])
}

async function editItem(item){
    await pool.query("UPDATE items SET name=$1,description=$2,price=$3,stock=$4,origin=$5,category_id=$6 WHERE id=$7",[item.name,item.description,item.price,item.stock,item.origin,item.category_id,item.id])
}

async function deleteItem(id){
    await pool.query("DELETE FROM items WHERE id=$1",[id])
}

module.exports={
    getAllCategories,
    getOneCategory,
    getOneCategoryItems,
    createCategory,
    editCategory,
    deleteCategory,
    getAllItems,
    getOneItem,
    createItem,
    editItem,
    deleteItem
}