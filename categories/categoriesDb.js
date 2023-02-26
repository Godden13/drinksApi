const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "./categoriesDB.json");

function getCategories(){
  try {
    const data = readFileSync(DB_FILE) || "[]";
    return JSON.parse(data);
  } catch (e){
    console.log(e);
    return [];
  }
}

function saveCategories(categories = []) {
  try {
    const data = JSON.stringify(categories, null, 4);
    writeFileSync(DB_FILE, data);
  }catch(e){
    throw new Error("Database write error")
  }
}

const db = { saveCategories, getCategories }

module.exports = db;
