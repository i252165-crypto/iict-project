let cart = JSON.parse(localStorage.getItem("cart")) || [];
let shopcart = document.getElementsByClassName("shoppingcart")[0];
var buttons = document.getElementsByClassName("add");

var cartnum = document.getElementsByClassName("number")[0];
let cartqty = parseInt(localStorage.getItem("cartqty")) || 0;
cartnum.innerText = cartqty;

function renderCart() {
    shopcart.innerHTML = "";

    console.log("Cart items are " + cart.length);

    // Remove shoppingcart if no items
    if (cart.length === 0) {
        let twoBox = document.getElementsByClassName("two-box")[0];

        if (shopcart && twoBox) {
            twoBox.removeChild(shopcart);
        }
        updatesubtotal();
        window.alert("Cart is empty!");
        return;
    }

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.img}" class="item-img">

            <div class="item-details">
                <div class="item-title">${item.title}</div>
                <div class="item-sub"> $${item.price} per item </div>
            </div>

            <div class="qty-box">
                <button class="decrement-btn">-</button>
                <div class="qty-num">${item.quantity}</div>
                <button class="increment-btn">+</button>
            </div>

            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>

            <div class="remove-btn">X</div>
        `;
        shopcart.appendChild(div);

        div.getElementsByClassName("increment-btn")[0].onclick = function() {
            item.quantity += 1;
            cartqty += 1;
            cartnum.innerText = cartqty;
            localStorage.setItem("cartqty", cartqty);

            saveAndRender();
        }; 
        div.getElementsByClassName("decrement-btn")[0].onclick = function() {
            if (item.quantity > 1) {
                item.quantity -= 1;
                cartqty -= 1;
                cartnum.innerText = cartqty;
                localStorage.setItem("cartqty", cartqty);

            } else {
                cart.splice(index, 1);
            }
            saveAndRender();
        };
        div.getElementsByClassName("remove-btn")[0].onclick = function() {
            cartqty = cartqty - item.quantity;
            cartnum.innerText = cartqty;
            localStorage.setItem("cartqty", cartqty);

            cart.splice(index, 1);
            saveAndRender();
        };
    });

    updatesubtotal();
}

function saveAndRender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function updatesubtotal() {
    let subtotal = 0;
    let cartitems = shopcart.getElementsByClassName("cart-item");
    let shippingcost = document.getElementsByClassName("ship")[0];

    for (let i = 0; i < cartitems.length; i++) {
        let price = parseFloat(cartitems[i].getElementsByClassName("item-price")[0].innerText.replace('$', ''));
        let qty = parseInt(cartitems[i].getElementsByClassName("qty-num")[0].innerText);
        subtotal += price * qty;
    }

    console.log("Subtotal is " + subtotal);

    if (cartitems.length === 0) shippingcost.innerText = '$0.00';

    document.getElementsByClassName("Subtotal")[0].innerText = '$' + subtotal.toFixed(2);
    document.getElementsByClassName("Total")[0].innerText = '$' + (subtotal + parseFloat(shippingcost.innerText.replace('$', ''))).toFixed(2);
    console.log("Total is " + '$' + (subtotal + parseFloat(shippingcost.innerText.replace('$', ''))).toFixed(2));
}


saveAndRender();
