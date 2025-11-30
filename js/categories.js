var buttons = document.getElementsByClassName("add");

var Quantity = document.getElementsByClassName("number")[0];
let cartqty = parseInt(localStorage.getItem("cartqty")) || 0;
Quantity.innerText = cartqty;