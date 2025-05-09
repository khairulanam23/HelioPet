document.addEventListener('DOMContentLoaded', () => {
    let cart = {
        items: [{
            id: 1,
            name: 'Khepsi Mug',
            price: 14.99,
            quantity: 2,
            image: 'https://i.pinimg.com/736x/29/39/85/29398518b55f8993326bc3e19cc05e40.jpg'
        }],
        shipping: {
            free: 50,
            standard: 8.99
        }
    };

    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const shippingAlert = document.querySelector('.shipping-alert p');
    const shippingProgressBar = document.querySelector('.shipping-progress-bar');

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        cart.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            cartItemsContainer.appendChild(createCartItem(item, itemTotal));
        });

        updateTotals(subtotal);
        addEventListeners();
    }

    function createCartItem(item, itemTotal) {
        const itemElement = document.createElement('div');
        itemElement.className = 'product-item';
        itemElement.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-details">
                <div class="product-title">${item.name}</div>
                <div class="product-price">$${item.price.toFixed(2).split('.')[0]}<sup>${item.price.toFixed(2).split('.')[1]}</sup></div>
                <div class="quantity-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}">−</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
            </div>
            <div class="product-actions">
                <button class="remove-btn" data-id="${item.id}">🗑️</button>
            </div>
            <div class="product-total">$${itemTotal.toFixed(2).split('.')[0]}<sup>${itemTotal.toFixed(2).split('.')[1]}</sup></div>
        `;
        return itemElement;
    }

    function updateTotals(subtotal) {
        cartTotal.innerHTML = `$${subtotal.toFixed(2).split('.')[0]}<sup>${subtotal.toFixed(2).split('.')[1]}</sup> BDT`;
        const remaining = Math.max(0, cart.shipping.free - subtotal);
        
        if (remaining > 0) {
            shippingAlert.innerHTML = `Your order is <b>$${remaining.toFixed(2)} BDT</b> away from standard free shipping.`;
            shippingProgressBar.style.width = `${(subtotal / cart.shipping.free) * 100}%`;
        } else {
            shippingAlert.innerHTML = '<b>Congratulations!</b> Your order qualifies for free shipping.';
            shippingProgressBar.style.width = '100%';
        }
    }

    function addEventListeners() {
        document.querySelectorAll('.1-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const item = cart.items.find(i => i.id === itemId);
                if (item) {
                    if (this.classList.contains('increase')) item.quantity++;
                    else if (item.quantity > 1) item.quantity--;
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                cart.items = cart.items.filter(i => i.id !== parseInt(this.getAttribute('data-id')));
                updateCart();
            });
        });
    }

    document.querySelector('.close-btn').addEventListener('click', () => alert('Cart closed'));
    document.querySelector('.checkout-btn').addEventListener('click', () => alert('Proceeding to checkout'));
    document.querySelector('.alternative-payment').addEventListener('click', () => alert('Proceeding to ShopPay checkout'));
    document.querySelector('.more-options').addEventListener('click', () => alert('More payment options clicked'));

    updateCart();
});
