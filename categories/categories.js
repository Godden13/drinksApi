const { saveCategories, getCategories } = require("./categoriesDb");

function getAllCategories(req, res) {
  const categories = getCategories();
  res.json(categories);
}

function getOneCategory(req, res) {
  const id = +req.params.catId;
  const categories = getCategories();
  const category = categories.find(({ catId }) => catId === id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ staus: "NOT_FOUND" });
  }
}

function updateOneCategory(req, res) {
  const id = +req.params.catId;
  const { name, catId } = req.body;
  if (!name || !catId) {
    res.status(403).json({ error: "Drink data missing" });
  }
  const categories = getCategories();
  const index = categories.findIndex((category) => category.catId === id);
  if (index > -1) {
    categories.splice(index, 1, { name, catID });
    saveCategories(categories);
    res.json(categories[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function deleteOneCategory(req, res) {
  const id = +req.params.catId;
  const categories = getCategories();
  const index = categories.findIndex(({ catId }) => catId === id);
  if (index > -1) {
    categories.splice(index, 1);
    saveCategories(categories);
  }
  res.json({ status: "success" });
}

function patchOneCategory(req, res) {
  const id = +req.params.catId;
  const data = req.body;
  if (!data) {
    return writeJson(res, { error: "Category data is missing" }, 403);
  }
  const categories = getCategories();

  const index = categories.findIndex((category) => category.catId === id);
  if (index > -1) {
    categories.splice(index, 1, { ...categories[index], ...data, id });
    saveCategories(categories);
    res.json(categories[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function createCategory(req, res) {
  const data = req.body;
  if (!data) {
    return writeJson(res, { error: "Category data missing" }, 403);
  }
  const categories = getCategories();
  const newCategory = { ...data, catId: categories.length + 1 };  
  saveCategories([...categories, newCategory]);
  res.json(newCategory);
}

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
  patchOneCategory,
};
