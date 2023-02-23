const drinkDb = require("./drinkDb");

const { writeJson, readRequestData, getIdFromUrl } = require("./utils");

function getAllDrinks(req, res) {
  const drinks = drinkDb.getDrinks();
  writeJson(res, drinks);
}

function getOneDrink(req, res) {
  const id = getIdFromUrl(req.url);
  const drinks = drinkDb.getDrinks();
  const drink = drinks.find((u) => u.id === id);
  if (drink) {
    writeJson(res, drink);
  } else {
    writeJson(res, { status: "NOT_FOUND" }, 404);
  }
}

async function updateOneDrink(req, res) {
  const id = getIdFromUrl(req.url);
  const { name, desc, src, ingredients } = await readRequestData(req);
  if (!name || !desc || !src || !ingredients) {
    return writeJson(res, { error: "Drink data missing" }, 403);
  }
  const drinks = drinkDb.getDrinks();
  const index = drinks.findIndex((drink) => drink.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { name, desc, src, ingredients, id });
    drinkDb.saveDrinks(drinks);
    writeJson(res, drinks[index]);
  } else {
    writeJson(res, { status: "NOT_FOUND" }, 404);
  }
}

function deleteOneDrink(req, res) {
  const id = getIdFromUrl(req.url);
  const drinks = drinkDb.getDrinks();
  const index = drinks.findIndex((drink) => drink.id === id);
  if (index > -1) {
    drinks.splice(index, 1);
    drinkDb.saveDrinks(drinks);
  }
  writeJson(res, { status: "succes" });
}

async function patchOneDrink(req, res) {
  const id = getIdFromUrl(req.url);
  const data = await readRequestData(req);
  if (!data) {
    return writeJson(res, { error: "Drink data is missing" }, 403);
  }
  const drinks = drinkDb.getDrinks();

  const index = drinks.findIndex((drink) => drink.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { ...drinks[index], ...data, id });
    drinkDb.saveDrinks(drinks);
    writeJson(res, drinks[index]);
  } else {
    writeJson(res, { status: "NOT_FOUND" }, 404);
  }
}

async function createDrink(req, res) {
  const data = await readRequestData(req);
  if (!data) {
    return writeJson(res, { error: "drink data missing" }, 403);
  }
  const newDrink = { ...data, id: Date.now() };
  const drinks = drinkDb.getDrinks();
  drinkDb.saveDrinks([...drinks, newDrink]);
  writeJson(res, newDrink);
}

module.exports = {
  getAllDrinks,
  createDrink,
  getOneDrink,
  updateOneDrink,
  deleteOneDrink,
  patchOneDrink,
};
