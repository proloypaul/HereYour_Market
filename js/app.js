// load product
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((product) => product);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src="${image}">
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h4>Rate: ${product.rating.rate} Count: ${product.rating.count}</h4>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="collectId(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// cart account 
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);  // change parseInt(element)
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(parseFloat(total).toFixed(2)); // change Math.round(total)
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(parseFloat(value).toFixed(2)); // change Math.round(value)
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(parseFloat(grandTotal).toFixed(2));  // change grandTotal

};

// collect data Id  
const collectId = (idData) => {
  const url = `https://fakestoreapi.com/products/${idData}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayDetailsId(data));
};

const displayDetailsId = data => {

  console.log(data)
  const addedDetails = document.getElementById("addedDetails");
  const div = document.createElement("div");
  div.innerHTML = `
    <div>
      <img src="${data.image}"/>
      <h4>Rate: ${data.rating.rate}</h4>
      <h1>${data.title}</h1>
      <p>${data.description}</p>
    </div>
  `
  addedDetails.appendChild(div);
}
