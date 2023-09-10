document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const slides = carousel.querySelectorAll(".multi-carousel-item");
    const navigationButtons = document.querySelectorAll(".carousel-navigation .circle");

    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        const offset = -(index * 50); // Adjust 50% width based on your design
        carousel.style.transform = `translateX(${offset}%)`;
        navigationButtons.forEach((button, i) => {
            button.classList.toggle("active", i === index);
        });
    }

    // Event listener for navigation buttons
    navigationButtons.forEach((button, i) => {
        button.addEventListener("click", () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });

    // Show the initial slides (first two items)
    showSlide(currentSlide);
});



const productIdsRow1 = [2, 3, 4];
const productIdsRow2 = [7, 8, 10];

function populateProductsInRow(rowId, productIds) {
    axios.get("https://fakestoreapi.com/products")
        .then(response => {
            const allProducts = response.data;
            const productContainers = document.querySelectorAll(`#${rowId} .product`);

            for (let i = 0; i < productIds.length; i++) {
                const productId = productIds[i];
                const product = allProducts.find(item => item.id === productId);
                if (product) {
                    const productContainer = productContainers[i];
                    const imageElement = productContainer.querySelector('.image');
                    const titleElement = productContainer.querySelector('.title');
                    const ratingElement = productContainer.querySelector('.rating');
                    const priceElement = productContainer.querySelector('.price');

                    imageElement.innerHTML = `<img src="${product.image}" alt="${product.title}" />`;
                    titleElement.textContent = product.title;
                    ratingElement.textContent = `Rating: ${product.rating.rate}`;
                    priceElement.textContent = `$${product.price.toFixed(2)}`;
                }
            }
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
}

populateProductsInRow("row1", productIdsRow1);
populateProductsInRow("row2", productIdsRow2);







document.addEventListener("DOMContentLoaded", function () {
    const span1 = document.getElementById("span1");

    const wishImage1 = document.getElementById("w1");
    const wishImage2 = document.getElementById("w2");
    const wishImage3 = document.getElementById("w3");
    const wishImage4 = document.getElementById("w4");
    const wishImage5 = document.getElementById("w5");
    const wishImage6 = document.getElementById("w6");
    let count = 0;

    wishImage1.addEventListener("click", () => {
        count++;
        span1.textContent = count;
    });

    wishImage2.addEventListener("click", () => {
        count++;
        span1.textContent = count;
    });

    wishImage3.addEventListener("click", () => {
        count++;
        span1.textContent = count;
    });

    wishImage4.addEventListener("click", () => {
        count++;
        span1.textContent = count;
    });

    wishImage5.addEventListener("click", () => {
        count++;
        span1.textContent = count;
    });

    wishImage6.addEventListener("click", () => {
        count++;
        span1.textContent = count;
    });
});












document.addEventListener("DOMContentLoaded", function () {
    const span1 = document.getElementById("span1");
    const basketList = document.getElementById("basketList");
    const basketOffcanvas = new bootstrap.Offcanvas(document.getElementById("basketOffcanvas"));

    let count = parseInt(span1.textContent) || 0;

    // Create a function to add a product to the cart
    function addToCart(productId) {
        count++;
        span1.textContent = count;

        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                const productData = response.data;

                const listItem = document.createElement("li");
                listItem.className = "list-group-item d-flex justify-content-between align-items-center";
                listItem.innerHTML = `
                    <div>
                        <img src="${productData.image}" alt="${productData.title}" width="40">
                        <span class="ms-2">${productData.title}</span>
                    </div>
                    <div>
                        <span>$${productData.price.toFixed(2)}</span>
                        <button class="btn btn-danger btn-sm ms-2" data-product-id="${productId}">Delete</button>
                    </div>
                `;

                // Attach a click event listener to the delete button
                const deleteButton = listItem.querySelector("button");
                deleteButton.addEventListener("click", () => {
                    removeCartItem(productId);
                });

                basketList.appendChild(listItem);
                basketOffcanvas.show();
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }

    // Create a function to remove a product from the cart
    function removeCartItem(productId) {
        // Remove the item from the cart UI
        const cartItems = basketList.querySelectorAll("li");
        cartItems.forEach(item => {
            const deleteButton = item.querySelector("button");
            if (deleteButton.getAttribute("data-product-id") === productId.toString()) {
                item.remove();
            }
        });

        // Update the count in span1 and close the cart if it's empty
        count--;
        span1.textContent = count;
        if (count === 0) {
            basketOffcanvas.hide();
        }
    }

    // Attach click event listeners to your product images (w1, w2, ...)
    const productIds = [2, 3, 4, 7, 8, 10]; // Product IDs associated with w1, w2, ...
    const productImages = ["w1", "w2", "w3", "w4", "w5", "w6"]; // IDs of your product images
    productImages.forEach((productImage, index) => {
        const element = document.getElementById(productImage);
        element.addEventListener("click", () => {
            const productId = productIds[index];
            addToCart(productId);
        });
    });
});




//new ic3

document.addEventListener("DOMContentLoaded", function () {
    var icon3 = document.getElementById("ic3");
    var basketOffcanvas = new bootstrap.Offcanvas(document.getElementById("basketOffcanvas"));
    var basketOffcanvasElement = document.getElementById("basketOffcanvas");

    icon3.addEventListener("click", () => {
        // Calculate the position for the offcanvas based on icon3's position
        var icon3Rect = icon3.getBoundingClientRect();
        const offsetX = window.innerWidth - 90 - basketOffcanvasElement.offsetWidth;
        const offsetY = icon3Rect.bottom + 20;

        // Set the calculated position for the offcanvas
        basketOffcanvasElement.style.left = `${offsetX}px`;
        basketOffcanvasElement.style.top = `${offsetY}px`;

        basketOffcanvas.show(); // Open the offcanvas
    });

    // Get a reference to the custom close button by its ID
    var customCloseButton = document.getElementById("customCloseButton");

    // Attach a click event listener to the custom close button
    customCloseButton.addEventListener("click", () => {
        basketOffcanvas.hide(); // Close the offcanvas
    });
});




// ---------------   total   -----




// Function to calculate the total price of items in the cart
document.addEventListener("DOMContentLoaded", function () {
    const span1 = document.getElementById("span1");
    const totalQuantityElement = document.getElementById("total-quantity");
    const totalPriceElement = document.getElementById("total-price");
    const basketList = document.getElementById("basketList");
    const basketOffcanvas = new bootstrap.Offcanvas(document.getElementById("basketOffcanvas"));

    // Initialize the cart and count
    const cart = [];
    let count = 0;

    // Function to update the total-quantity and total-price elements
    function updateCartInfo() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalQuantityElement.textContent = totalQuantity;
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        span1.textContent = totalQuantity;
    }

    // Create a function to add a product to the cart
    function addToCart(productId) {
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                const productData = response.data;
                const existingItem = cart.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: productId,
                        name: productData.title,
                        price: productData.price,
                        quantity: 1,
                    });
                }
                updateCartUI();
                updateCartInfo();
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }

    // Create a function to remove an item from the cart
    function removeCartItem(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
            updateCartUI();
            updateCartInfo();
        }
    }

    // Function to update the cart UI
    function updateCartUI() {
        basketList.innerHTML = ''; // Clear the cart list
        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.innerHTML = `
                <div>
                    <span>${item.name}</span>
                </div>
                <div>
                    <span>$${item.price.toFixed(2)}</span>
                    <span>Quantity: ${item.quantity}</span>
                    <button class="btn btn-danger btn-sm ms-2" data-product-id="${item.id}">Delete</button>
                </div>
            `;

            const deleteButton = listItem.querySelector("button");
            deleteButton.addEventListener("click", () => {
                removeCartItem(item.id);
            });

            basketList.appendChild(listItem);
        });
    }
    const productIds = [2, 3, 4, 7, 8, 10];
    const productImages = ["w1", "w2", "w3", "w4", "w5", "w6"];
    productImages.forEach((productImage, index) => {
        const element = document.getElementById(productImage);
        element.addEventListener("click", () => {
            const productId = productIds[index];
            addToCart(productId);
        });
    });
});
























































































