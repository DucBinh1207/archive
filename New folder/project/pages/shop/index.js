import { PER_PAGE } from "../../common-script/constants.js";
import { getProducts } from "../../common-script/services/product-api.js";
import { $, $$, getQueryString } from "../../common-script/utils.js";

let params = {
  q: "",
  _limit: PER_PAGE,
  _page: 1,
  _totalRows: 0,
};
let products = [];

async function init() {
  try {
    const { data, pagination } = await getProducts(getQueryString(params));
    products = data;
    params = {
      ...params,
      ...pagination,
    };
    renderProducts();
    renderPagination();
    renderSearch();
  } catch (error) {
    console.log(error);
  }
}

function renderPagination() {
  if (params._totalRows < PER_PAGE) {
    $("pagination").innerHTML = ``;
    return;
  }
  const totalPages = Math.ceil(params._totalRows / PER_PAGE);
  const paginationHtml = [...Array(totalPages)].map(
    (_, index) =>
      `<a data-page="${index + 1}" class="page ${
        params._page === index + 1 && "active"
      }">${index + 1}</a>`
  );

  $("pagination").innerHTML = ``;
  $("pagination").innerHTML = paginationHtml.join("");

  $$(".page").forEach((page) => {
    page.onclick = () => {
      handlePageChange(page.getAttribute("data-page"));
    };
  });
}

async function handlePageChange(page) {
  try {
    const { data, pagination } = await getProducts(
      getQueryString({
        ...params,
        _page: page,
      })
    );
    products = data;
    params = {
      ...params,
      ...pagination,
    };
    renderProducts();
    renderPagination();
    window.scrollTo(0, 0);
  } catch (error) {
    console.log(error);
  }
}

function renderProducts() {
  if (products.length === 0) {
    return;
  }

  const productsHtml = products.map(
    (
      product
    ) => ` <div class="pro" onclick="window.location.href='../productDetail/index.html?id=${product.id}';">
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
        </div>`
  );

  $("product-render").innerHTML = productsHtml.join("");
}

async function renderSearch() {
  const search = $("search");
  search.addEventListener("input", async () => {
    params = {
      ...params,
      q: search.value,
    };

    const { data, pagination } = await getProducts(getQueryString(params));
    console.log(data, pagination);

    products = data;
    params = {
      ...params,
      ...pagination,
    };
    console.log(params);
    renderProducts();
    renderPagination();
  });
}

/// start
init();
