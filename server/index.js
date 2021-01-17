console.log('test');
const fs = require('fs');
const path = require('path');

function getAllProducts(file) {
  return JSON.parse(
    fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
}

function getByID(file, id) {
  let productsList = JSON.parse(
    fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      return productsList[i];
    }
  }
}

function addNewProd(file, prodName, prodPrice, prodQuan) {
  const productsList = JSON.parse(
    fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
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
}

function updateProd(file, newProdName, newProdPrice, newProdQuan, id) {
  const newProd = {
    id: id,
    product_name: newProdName,
    product_price: newProdPrice,
    product_amount: newProdQuan,
  };
  const productsList = JSON.parse(
    fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      productsList[i] = newProd;
      break;
    }
  }
  fs.writeFileSync(file, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function deleteProd(file, id) {
  const productsList = JSON.parse(
    fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      productsList.splice(i, 1);
      break;
    }
  }
  fs.writeFileSync(file, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const JSONfileName = path.resolve(__dirname, 'products.json');
console.log(getAllProducts(JSONfileName));
console.log('Вывод продукта по id \n', getByID(JSONfileName, 1));
addNewProd(JSONfileName, 'апельсин', 50, 200);
updateProd(JSONfileName, 'малина', 200, 400, 1);
deleteProd(JSONfileName, 5);
console.log(getAllProducts(JSONfileName));
