const drinkDb = require("./drinkDb");

function getAllDrinks(req, res) {
  const drinks = drinkDb.getDrinks();
  res.json(drinks);
}

function getOneDrink(req, res) {
  const id = +req.params.id;
  const drinks = drinkDb.getDrinks();
  const drink = drinks.find((u) => u.id === id);
  if (drink) {
    res.json(drink);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

async function updateOneDrink(req, res) {
  const id = +req.params.id;
  const { name, desc, src, ingredients } = req.body;
  if (!name || !desc || !src || !ingredients) {
    res.status(403).json({ error: "Drink data missing" });
  }
  const drinks = drinkDb.getDrinks();
  const index = drinks.findIndex((drink) => drink.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { name, desc, src, ingredients, id });
    drinkDb.saveDrinks(drinks);
    res.json(drinks[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

function deleteOneDrink(req, res) {
  const id = +req.params.id;
  const drinks = drinkDb.getDrinks();
  const index = drinks.findIndex((drink) => drink.id === id);
  if (index > -1) {
    drinks.splice(index, 1);
    drinkDb.saveDrinks(drinks);
  }
  res.json({ status: "success" });
}

async function patchOneDrink(req, res) {
  const id = +req.params.id;
  const data = req.body;
  if (!data) {
    return writeJson(res, { error: "Drink data is missing" }, 403);
  }
  const drinks = drinkDb.getDrinks();

  const index = drinks.findIndex((drink) => drink.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { ...drinks[index], ...data, id });
    drinkDb.saveDrinks(drinks);
    res.json(drinks[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}

async function createDrink(req, res) {
  const data = req.body;
  if (!data) {
    return writeJson(res, { error: "drink data missing" }, 403);
  }
  const newDrink = { ...data, id: Date.now() };
  const drinks = drinkDb.getDrinks();
  drinkDb.saveDrinks([...drinks, newDrink]);
  res.json(newDrink);
}

module.exports = {
  getAllDrinks,
  createDrink,
  getOneDrink,
  updateOneDrink,
  deleteOneDrink,
  patchOneDrink,
};
