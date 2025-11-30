var buttons = document.getElementsByClassName("add");

var Quantity = document.getElementsByClassName("number")[0];
let cartqty = parseInt(localStorage.getItem("cartqty")) || 0;
Quantity.innerText = cartqty;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        cartqty += 1;
        Quantity.innerText = cartqty;
        localStorage.setItem("cartqty", cartqty);

        let parent = buttons[i].parentElement;
        let title = parent.querySelector("p").innerText;
        let price = parseFloat(parent.querySelector(".price").innerText.replace("$", ""));
        let img = parent.querySelector("img").src;
        let existing = cart.find(item => item.title === title);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ title: title, price: price, img: img, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    });
}
Quantity.innerText = cartqty;

console.log(cart);