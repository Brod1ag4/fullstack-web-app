console.log('test');
const fs = require('fs');
const path = require('path');

function isExist(element, index, array) {
  if (index === this) {
    return true;
  }
  return false;
}
function getAllProducts(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.log(err);
  }
}

function getByID(file, id) {
  try {
    const productsList = JSON.parse(fs.readFileSync(file, 'utf8'));
    return productsList.find(isExist, id);
  } catch (err) {
    console.log(err);
  }
}

function addNewProducts(file, prodName, prodPrice, prodQuan) {
  try {
    const productsList = JSON.parse(fs.readFileSync(file, 'utf8'));
    const id = productsList[productsList.length - 1].id;
    productsList.push({
      id: id + 1,
      product_name: prodName,
      product_price: prodPrice,
      product_amount: prodQuan,
    });
    fs.writeFileSync(file, JSON.stringify(productsList), (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function updateProducts(file, newProdName, newProdPrice, newProdQuan, id) {
  try {
    const newProd = {
      id: id,
      product_name: newProdName,
      product_price: newProdPrice,
      product_amount: newProdQuan,
    };
    const productsList = JSON.parse(fs.readFileSync(file, 'utf8'));

    productsList.findIndex(isExist, id);
    productsList[id] = newProd;
    fs.writeFileSync(file, JSON.stringify(productsList), (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function deleteProducts(file, id) {
  try {
    const productsList = JSON.parse(fs.readFileSync(file, 'utf8'));
    productsList.findIndex(isExist, id);
    productsList.splice(id, 1);
    fs.writeFileSync(file, JSON.stringify(productsList), (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

const JSONfileName = path.resolve(__dirname, 'products.json');

const express = require('express');

const app = express();

app.get('/products', (req, res) => {
  res.send(getAllProducts(JSONfileName));
});

app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  res.send(getByID(JSONfileName, id));
});

app.listen(8080);
console.log(getAllProducts(JSONfileName));
console.log('Вывод продукта по id \n', getByID(JSONfileName, 1));
addNewProducts(JSONfileName, 'апельсин', 50, 200);
updateProducts(JSONfileName, 'малина', 200, 400, 1);
deleteProducts(JSONfileName, 6);
console.log(getAllProducts(JSONfileName));
