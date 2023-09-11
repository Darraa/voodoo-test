// ------------------RECEIVING DATA FROM API----------------
const Api = () => { 
    const url = 'https://voodoo-sandbox.myshopify.com/products.json?limit=24';

    const getResponse = async (page = 1) => {
        const response = await fetch(`${url}&page=${page}`);

        if (!response.ok){
            throw new Error(`Couldn't fetch ${url}&page${page}. Server response: ${response.status}`);
        }

        return await response.json();
    };

    const getGoods = async (page) =>{
        const products = await getResponse(page);

        return products.products.map(getProductData);
    };

    const getProductData = (product) => {
        return {
            id: product.id,
            title: product.title,
            price: product.variants[0].price,
            img: product.images[0] ? product.images[0].src : null,
            quantity: 1
        }
    };

    return {
        getGoods
    };
};


document.addEventListener('DOMContentLoaded', () =>{

    let productsInCart = [];

    // ----------OUTPUT OF ALL PRODUCTS--------------------
    const shopifyApi = Api();
    const itemList = document.querySelector('#item-list');

    const updateItemList = async (page) => {
        const products = await shopifyApi.getGoods(page);

        itemList.innerHTML = '';

        products.forEach((product) => 
        (itemList.innerHTML += `
            <div class="text-sm flex flex-col gap-3 justify-between max-w-lg relative overflow-hidden" id="${product.id}">
                <div class="border border-black rounded">
                    <div class="text-white absolute bg-black rounded-md top-3 left-3 px-2 py-1 text-sm">USED</div>
                        <div class="block w-72 h-72 p-3 m-auto">
                        ${product.img ? `<img class="w-full h-full object-cover" src="${product.img}" />` : null}
                        </div>
                    </div>

                <div class="flex justify-between items-end w-full">
                    <div class="font-bold">
                        <p>${product.title}</p> 
                        <p>${product.price} KR.</p>
                    </div>

                    <div class="text-end">
                        <p>Condition</p>
                        <p class="w-[89px]">Slightly used</p>
                    </div>
                </div>

                <button class="add-to-cart text-white bg-black w-full py-2 rounded-md  hover:opacity-80">ADD TO CART</button>
            </div>`)
        );

        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach((btn) =>{
            btn.addEventListener('click', (e) =>{
                const previousText = btn.textContent;
                btn.textContent = "ADDED";
                setTimeout(()=>{
                    btn.textContent = previousText
                }, 500)

                products.forEach((product)=>{
                    if(product.id == btn.parentElement.id){
                        if(productsInCart.includes(product)){
                            product.quantity++;
                        }else {
                            productsInCart.push(product);
                        }
                    }
                });
            })
        })
    };


    //  ----------------REALIZE PAGINATION-------------------
    const paginationBtnContainer = document.querySelector('#pagination-btns-container');

    const updatePaginationBtns = (current = 1) => {
        paginationBtnContainer.innerHTML = '';
        for(let i=1; i <= 20; i++){
            if(i=== 1 || i === 20 || (i >= current -3 && i <= current +3)){
                paginationBtnContainer.innerHTML += `<button class="pagination-btn border border-black rounded-full w-10 h-10 ${current == i ? " bg-black text-white" : "text-black"}" 
                id="pagination-btn-${i}">${i}</button>`;
            }
        };

        const paginationBtns = document.querySelectorAll('.pagination-btn');
        if(current < 17){
            paginationBtns[paginationBtns.length - 2].textContent = '...';
            paginationBtns[paginationBtns.length -2].disabled = true;
        }
        if(current >= 5){
            paginationBtns[1].textContent = '...';
            paginationBtns[1].disabled = true;
        }

        paginationBtns.forEach((btn)=>{
            btn.addEventListener('click', (e)=>{
                const btnID = e.target.id.replace(/\D/g, '');
                updatePaginationBtns(+btnID);
                updateItemList(+btnID);
            })
        });
    };


    // ----------------REALIZED FUNCTIONALITY SHOPPING CART-------------------------
    const cartBtn = document.querySelector('.cart');
    const cart = document.querySelector('#cart');
    const cartClose = document.querySelector('.cart-close');
    const cartContainer = document.querySelector('#cart-container')
    let totalPrice = document.querySelector('#total-price');

    const main = document.querySelector('.main');
    const footer = document.querySelector('.footer');

    
    const updateCartDisplay = (open) => {
        if (open) {
            cart.classList.remove('hidden');
            document.body.style.overflow = "hidden";
            main.classList.add('hidden');
            footer.classList.add('hidden');

            if (productsInCart.length === 0){
                cartContainer.innerHTML = `<span>The cart is empty.</span>`;
            } else{
            cartContainer.innerHTML = "";
            productsInCart.forEach((cartItem) => {
                cartContainer.innerHTML += `
                    <div class="cart-item flex items-start justify-between gap-10">
                        <div class="item-info flex gap-[18px]">
                            <div class="border rounded w-[74px] h-[74px]">
                            ${cartItem.img ? `<img class="w-full h-full object-cover" src="${cartItem.img}" />` : ''}
                            </div>
                            <div class="text-sm flex flex-col gap-2">
                                <p>${cartItem.title}</p>
                                <p>${cartItem.price} KR.</p>
                                <div class="item-text-settings flex items-center">
                                    <button class="amount-minus w-5 h-5" data-product-id="${cartItem.id}">-</button>
                                    <p class="amount-goods h-5">${cartItem.quantity}</p>
                                    <button class="amount-plus w-5 h-5" data-product-id="${cartItem.id}">+</button>
                                </div>
                            </div>
                        </div>
                        <button class="delete-item" data-product-id="${cartItem.id}">
                            <svg class="w-6 h-6 cursor-pointer">
                                <use xlink:href="./img/sprite.svg#icon-delete"></use>
                            </svg>
                        </button>
                    </div>`;
            });
                calculateTotalPrice();
                updateQuantity();
                deleteProductFromCart();
        }} else {
            cart.classList.add('hidden');
            document.body.style.overflow = "auto";
            main.classList.remove('hidden');
            footer.classList.remove('hidden');
        }
    }

    cartBtn.addEventListener('click', () => {
        updateCartDisplay(true); 
    });

    cartClose.addEventListener('click', () => {
        updateCartDisplay(false);
    });


    const calculateTotalPrice = () =>{
        let result = 0;
        productsInCart.forEach((item)=>{
            result += +item.price * +item.quantity; 
        })
        totalPrice.textContent = result;
    }

    const updateQuantity = () =>{
        const amountMinus = document.querySelectorAll('.amount-minus');
        const amountPlus = document.querySelectorAll('.amount-plus');

        amountMinus.forEach((minusBtn) => {
            minusBtn.addEventListener('click', (e)=>{
                productsInCart.forEach((product)=>{
                    if(product.id == minusBtn.getAttribute(['data-product-id'])){
                        product.quantity == 1 ?product.quantity : product.quantity--;
                        updateCartDisplay(true);
                    }
                })
            })
        })

        amountPlus.forEach((plusBtn) => {
            plusBtn.addEventListener('click', (e)=>{
                productsInCart.forEach((product)=>{
                    if(product.id == plusBtn.getAttribute(['data-product-id'])){
                        product.quantity++;
                        updateCartDisplay(true);
                    }
                })
            })
        })
    }


    const deleteProductFromCart = () =>{
        const deleteBtns = document.querySelectorAll('.delete-item');
        deleteBtns.forEach((deleteBtn)=>{
            deleteBtn.addEventListener('click', () =>{
                productsInCart = productsInCart.filter((product) => product.id != deleteBtn.getAttribute(['data-product-id']));
                updateCartDisplay(true);
            })
        })
    }

    updateItemList();
    updatePaginationBtns();
    updateCartDisplay();
});



