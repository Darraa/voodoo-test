const openCart = document.getElementById('cartButton');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('close-cart');
const totalPrice = document.getElementById('total-price');

// const cartContainer = document.getElementById('cart-container');

// cartContainer.addEventListener('click', (event)=> {
//     if (event.target.classList.contains('item-increment')) {
//         incrementItemAmount(event.target);
//     } else if (event.target.classList.contains('delete-item')) {
//         event.target.parentElement.closest('.cart__item').remove();
//         totalCalculate();
//     } else if (event.target.classList.contains('item-decrement')) {
//         decrementItemAmount(event.target);
//     }
// });


// window.addEventListener('click', (event)=>{
//     if(event.target.hasAttribute('add-to-cart')){
//             const productName = event.target.parentElement.querySelector('.card__name').textContent;
//             const productPrice = event.target.parentElement.querySelector('.card__price').textContent;
//             const imgElement = event.target.parentElement.querySelector('img').getAttribute('src');
//             const productUId = event.target.parentElement.getAttribute('uid')

//             const itemsHTML = addToCart(productName, productPrice, imgElement, productUId);
//             cartContainer.insertAdjacentHTML("beforeend", itemsHTML)
//             totalCalculate();
//     }
// })

// function addToCart(productName, productPrice, imgElement, productUId) {
//     const cartItems = document.querySelectorAll('.cart__item');

//     for (const item of cartItems) {
//         if (item.getAttribute('uId') == productUId) {
//             const button = item.querySelector('.item-increment');
//             incrementItemAmount(button);
//             return '';
//         }
//     }

//     return `
//         <div class="cart__item flex items-start justify-between gap-10" uid="${productUId}">
//             <div class="item__info flex gap-[18px]">
//                 <img src="${imgElement}" class="w-[74px] h-[74px]" alt="">
//                 <item__info-text class="flex gap-2 flex-col">
//                     <p>${productName}</p>
//                     <p class="product-price">${productPrice}</p>
//                     <div class="item__text-settings flex items-center">
//                         <button class="w-5 h-5 item-decrement">-</button>
//                         <p class="h-5 item-amount">1</p>
//                         <button uid="${productUId}" class="w-5 h-5 item-increment">+</button>
//                     </div>
//                 </item__info-text>
//             </div>
//             <button>
//                 <img class="delete-item" src="img/shopping-cart/delete-item.svg" alt="">
//             </button>
//         </div>
//     `
// }


// function totalCalculate() {
//     const getAllPrices = document.querySelectorAll('.product-price');
//     let res = 0;
//     getAllPrices.forEach(item => {
//         res += parseFloat(item.textContent);
//     })
//     totalPrice.textContent = `${res.toFixed(2)}`;
// }

// function incrementItemAmount(button) {
//     const currentAmount = button.parentElement.querySelector('.item-amount');
//     const itemPrice = button.parentElement.parentNode.querySelector('.product-price');
//     let amountValue = parseInt(currentAmount.textContent);
//     let itemTotalPrice = parseFloat(itemPrice.textContent);
//     itemTotalPrice = itemTotalPrice / amountValue * (amountValue + 1);
//     amountValue++;
//     currentAmount.textContent = amountValue;
//     itemPrice.textContent = `${itemTotalPrice.toFixed(2)} KR.`;
//     totalCalculate()
// }
// function decrementItemAmount(button) {
//     const currentAmount = button.parentElement.querySelector('.item-amount');
//     const itemPrice = button.parentElement.parentNode.querySelector('.product-price');
//     let amountValue = parseInt(currentAmount.textContent);
//     let itemTotalPrice = parseFloat(itemPrice.textContent);
//     amountValue--;
//     if (amountValue > 0) {
//         itemTotalPrice = itemTotalPrice / (amountValue + 1) * (amountValue);
//         currentAmount.textContent = amountValue;
//         itemPrice.textContent = `${itemTotalPrice.toFixed(2)} KR.`;
//     } else {
//         button.parentElement.closest('.cart__item').remove();
//     }
//     totalCalculate();
// }