const categoryDB = require("./categoriesDb");

function getAllCategories(req, res) {
  const id = +req.params.id;
  const categories = categoryDB.getCategories();
  res.json(categories);
}

function getOneCategory(req, res) {
  const id = +req.params.id;
  const categories = categoryDB.getCategories();
  const category = categories.find((u) => u.id === id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ staus: "NOT_FOUND" });
  }
}

function updateOneCategory(req, res) {
  const id = +req.params.id;
  const { name, catId } = req.body;
  if (!name || !catId) {
    res.status(403).json({ error: "Drink data missing" });
  }
  const categories = categoryDB.getCategories();
  const index = categories.findIndex((category) => category.id === id);
  if (index > -1) {
    categories.splice(index, 1, { name, catID });
    categoryDB.saveCategories(categories);
    res.json(categories[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function deleteOneCategory(req, res) {
  const id = +req.params.id;
  const categories = categoryDB.getCategories();
  const index = categories.findIndex((category) => catID === id);
  if (index > -1) {
    categories.splice(index, 1);
    categoryDB.saveCategories(categories);
  }
  res.json({ status: "success" });
}

function patchOneCategory(req, res) {
  const id = +req.params.id;
  const data = req.body;
  if (!data) {
    return writeJson(res, { error: "Category data is missing" }, 403);
  }
  const categories = categoryDB.getCategories();

  const index = categories.findIndex((category) => category.id === id);
  if (index > -1) {
    categories.splice(index, 1, { ...categories[index], ...data, id });
    categoryDB.saveCategories(categories);
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
  const newCategory = { ...data, Catid: categories.length + 1 };
  const categories = categoryDB.getCategories();
  categoryDB.saveCategories([...categories, newCategory]);
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
