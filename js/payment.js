let cart = JSON.parse(localStorage.getItem("cart")) || [];
let shopcart = document.getElementsByClassName("product")[0];
var buttons = document.getElementsByClassName("add");


var cartnum = document.getElementsByClassName("number")[0];
quantity = parseInt(cartnum.innerText) || 0;
let cartqty = parseInt(localStorage.getItem("cartqty")) || 0;
quantity = cartqty;
cartnum.innerText = quantity;
var shippingcost = document.getElementsByClassName("shipping-price")[0];

function renderCart() {
    shopcart.innerHTML = "";

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "prod";
        div.innerHTML = `
            <img src="${item.img}" class="prod-img">
            <div class="prod-name">${item.title}</div>
            <div class="prod-price">$${item.price}</div>
            <div class="qty">${item.quantity}</div>
        `;
        shopcart.appendChild(div);
    });

    updatesubtotal();
}

function saveAndRender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function updatesubtotal() {
    let subtotal = 0;
    let cartitems = shopcart.getElementsByClassName("prod");

    for (let i = 0; i < cartitems.length; i++) {
        let price = parseFloat(cartitems[i].getElementsByClassName("prod-price")[0].innerText.replace('$', ''));
        let qty = parseInt(cartitems[i].getElementsByClassName("qty")[0].innerText);
        subtotal += price * qty;
    }

    if (cartitems.length === 0) shippingcost.innerText = '$0.00';
    document.getElementsByClassName("sub-total-price")[0].innerText = '$' + subtotal.toFixed(2);
    document.getElementsByClassName("total-price")[0].innerText = '$' + (subtotal + parseFloat(shippingcost.innerText.replace('$', ''))).toFixed(2);
}

document.getElementsByClassName("pay-btn")[0].onclick = function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        shippingcost.innerText = '$0.00';
        return;
    }
    cart = [];
    cartqty = 0;
    quantity = cartqty;
    cartnum.innerText = quantity;
    localStorage.setItem("cartqty", cartqty);
    document.getElementsByClassName("sub-total-price")[0].innerText = '$0.00';
    document.getElementsByClassName("total-price")[0].innerText = '$0.00';
    document.getElementsByClassName("shipping-price")[0].innerText = '$0.00';
    saveAndRender();
    alert("Thank you for your Purchase!");
    window.location.href = 'home.html';





}

renderCart();