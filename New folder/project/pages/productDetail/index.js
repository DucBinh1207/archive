import { PER_PAGE } from "../../common-script/constants.js";
import {
  getProduct,
  getProducts,
} from "../../common-script/services/product-api.js";
import { $, $$, getQueryString } from "../../common-script/utils.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let data;
let newProParams = {
  _start: 0,
  _end: 4,
};
let products = [];

async function init() {
  try {
    data = await getProduct(id);
    const dataPro = await getProducts(getQueryString(newProParams));
    products = dataPro.data;
    render();
    renderNewPro();
  } catch (error) {
    console.log(error);
  }
}

function renderNewPro() {
  if (products.length === 0) {
    return;
  }

  const newProHtml = products.map(
    (product) =>
      `<div onclick="window.location.href='../productDetail/index.html?id=${product.id}';">
        <div class="pro">
            <img src="${product.images[0]}" alt="" />
            <div class="des">
              <span>${product.category.name}</span>
              <h5>${product.title}</h5>
              <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <h4>$${product.price}</h4>
            </div>
            <a href="#"><i class="fas fa-shopping-cart cart"></i></a>
          </div>
        </div>`
  );
  $("pro-container").innerHTML = newProHtml;
}

function render() {
  if (Object.keys(data).length === 0) {
    window.location.replace(
      "https://stackoverflow.com/questions/19635188/why-is-body-scrolltop-deprecated"
    );
    return;
  }

  $("productdetails").innerHTML = `<div class="single-pro-image">
        <img
          src="${data.images[0]}"
          width="100%"
          id="MainImg"
          alt=""
        />
        <div class="small-image-group">
          <div class="small-img-col">
            <img
              src="images/products/f1.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="images/products/f2.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="images/products/f3.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="images/products/f4.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="single-pro-details">
        <h6>Home / T-Shirt</h6>
        <h4>${data.title}</h4>
        <h2>$${data.price}</h2>
        <select>
          <option>Select Size</option>
          <option>XL</option>
          <option>XXL</option>
          <option>Small</option>
          <option>Large</option>
        </select>
        <input type="number" value="1" />
        <button class="normal">Add to Cart</button>
        <h4>Product Details</h4>
        <span
          >${data.description}
        </span>
      </div>`;
}

//start
init();
