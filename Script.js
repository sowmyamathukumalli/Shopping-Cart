let cart = [];
let item = function (name,price,count) {
    this.name = name;
    this.price = price;
    this.count = count;
};
//Add Items To The Cart-------------------------------1

function addItemToCart(name,price,count){
    for (let i in cart) {
        if (cart[i].name === name){
            cart[i].count += count;
            saveCart();
            return;
        }
    }
    cart.push( new item(name,price,count) );
    saveCart();
}

//Remove Items From The Cart----------------------------2

function removeItemFromCart(name) {
    for (let i in cart){
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
}

//Remove Item From Cart All--------------------------3

function removeItemFromCartAll(name) {
    for (let i in cart) {
        if (cart[i].name === name){
            cart.splice(i,1);
            break;
        }
    }
    saveCart();
}

//Clear Cart-----------------------------------------4

function clearCart() {
    cart = [];
    saveCart();
}

// Count Cart-----------------------------------------5

function countCart() {
    let totalCount = 0;
    for (let i in cart){
        totalCount += cart[i].count;
    }
    return totalCount;
}


//Total cost of all items in the cart-----------------6

function totalCart() {
    let totalCost = 0;
    for (let i in cart) {
        totalCost += cart[i].price*cart[i].count;
    }
    return totalCost.toFixed(2);
}

//list cart------------------------------------------7

function  listCart() {
    let cartCopy = [];
    for (let i in cart){
        let Item = cart[i];
        let ItemCopy = {};
        for (let p in Item){
            ItemCopy[p] = Item[p];
        }
        ItemCopy.total += (Item.price * Item.count).toFixed(2);
        cartCopy.push(ItemCopy);
    }
     return cartCopy;
}
 // Save Cart----------------------------------------8

function saveCart() {
    sessionStorage.setItem(`shoppingCart`,JSON.stringify(cart));
}

// Load Cart-------------------------------------------9

function loadCart() {
    cart = JSON.parse(sessionStorage.getItem(`shoppingCart`));
}
if (sessionStorage.getItem(`shoppingCart`) != null ){
    loadCart();
    displayCart();
}
//Jquery for Display

 $(`.add-to-cart`).click(function (event) {
    event.preventDefault();
    let name = $(this).attr(`data-name`);
    let price = Number($(this).attr(`data-price`));
    addItemToCart(name,price,1);
    displayCart();
});

$(`.clear-cart`).click(function() {
    clearCart();
    displayCart();
});

function displayCart() {
    let cartArray = listCart();
    let output = ``;
    for (let i in cartArray) {
        output +=
            "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td><div class='input-group'><div class='input-group-prepend'><button class='minus-item btn btn-elegant btn-sm m-0 px-1 py-1 z-depth-0' data-name='" + cartArray[i].name + "'>-</button></div>" +
            "<input type='number' class='number item-count form-control' data-name='" + cartArray[i].name + "' value ='" + cartArray[i].count + "'>" +
            "<div class='input-group-append'><button class='plus-item btn btn-elegant btn-sm m-0 px-1 py-1 z-depth-0' data-name='" + cartArray[i].name + "'>+</button></div></div></td>" +
            "<td>" +
            "<p class='price'>Rs." + cartArray[i].price + "</p>" +"</td>" +
            "<td>" +"<button class='delete-item btn btn-elegant btn-sm' data-name='" + cartArray[i].name + "'>Clear Item</button>"+ "</td>" +
            "<td>" +
            "<p class='price'>Rs." + (cartArray[i].price*cartArray[i].count).toFixed(2) + "</p>" + "</td>" +
            "</tr>";
    }
    $(`.show-cart`).html(output);
    $(`.total-cart`).html(totalCart());
    $('.itemCount').html(countCart());
}

$(`.show-cart`).on(`click`,`.delete-item`,function () {
 let name = $(this).data(`name`);
removeItemFromCartAll(name);
 displayCart();
});

$("div.show-cart").on(`click`, `.minus-item`, function() {
    let name = $(this).data(`name`);
    removeItemFromCart(name);
    displayCart();
});

$(".show-cart").on("click",".plus-item", function () {
   let name = $(this).data(`name`);
   addItemToCart(name, 0 , 1);
   displayCart();
});

$(`.toggler`).on('click', function() {
    $(this).toggleClass(`active`);
    $('.toggler-div').animate({width: 'toggle'});
});

$(`.modal-content`).resizable({
    minHeight: 300,
    minWidth: 300
});
$(`.modal-dialog`).draggable();
$(`#address-modal`).on(`show.bs.modal`,function () {
    $(this).find('.modal-body').css({
        'max-height': '100%',
        'max-width': '100%'
    });
});




