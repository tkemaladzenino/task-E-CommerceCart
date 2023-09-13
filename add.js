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





document.addEventListener("DOMContentLoaded", function () {
    // produqts in row1 and row2
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

    // on click change span1 text content
    const span1 = document.getElementById("span1");
    const wishImages = ["w1", "w2", "w3", "w4", "w5", "w6"];
    let count = 0;

    wishImages.forEach(imageId => {
        const wishImage = document.getElementById(imageId);
        wishImage.addEventListener("click", () => {
            count++;
            span1.textContent = count;
        });
    });

    // new ic3 offcanvas +
    const icon3 = document.getElementById("ic3");
    const basketOffcanvasElement = document.getElementById("offcanvasScrolling");
    const basketOffcanvas = new bootstrap.Offcanvas(basketOffcanvasElement);

    icon3.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent any event propagation to elements with product IDs
        const offsetX = window.innerWidth - basketOffcanvasElement.offsetWidth - 10; // Adjust the offset as needed
        const offsetY = 10; // Adjust the offset as needed

        basketOffcanvasElement.style.left = `${offsetX}px`;
        basketOffcanvasElement.style.top = `${offsetY}px`;

        basketOffcanvas.show();
    });


    // sum prices in basketlist
    const basketList = document.getElementById("basketList");
    const totalQuantityElement = document.getElementById("total-quantity");
    const totalPriceElement = document.getElementById("total-price");

    // Create an array to store the items in the cart
    const cart = [];

    // Function to update the total-quantity and total-price elements
    function updateCartInfo() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalQuantityElement.textContent = totalQuantity;
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        span1.textContent = totalQuantity; // Update span1 as well
    }

    // Create a function to add a product to the cart
    function addToCart(productId) {
        // Fetch all product data and find the selected product
        axios.get("https://fakestoreapi.com/products")
            .then(response => {
                const allProducts = response.data;
                const product = allProducts.find(item => item.id === productId);

                if (product) {
                    // Check if the product is already in the cart
                    const existingItem = cart.find(item => item.id === productId);

                    if (existingItem) {
                        // Increment the quantity if the product is already in the cart
                        existingItem.quantity++;
                    } else {
                        // Add the product to the cart with a quantity of 1
                        cart.push({
                            id: productId,
                            name: product.title,
                            price: product.price,
                            quantity: 1,
                            image: product.image,
                        });
                    }

                    // Update the cart UI
                    updateCartUI();

                    // Update the total-quantity and total-price elements
                    updateCartInfo();
                } else {
                    console.error("Product not found.");
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }

    // Create a function to remove an item from the cart
    function removeCartItem(productId) {
        // Find the index of the item in the cart
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex !== -1) {
            // Decrease the quantity or remove the item if the quantity is 1
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }

            // Update the cart UI
            updateCartUI();

            // Update the total-quantity and total-price elements
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
                    <img src="${item.image}" alt="${item.name}" style="max-width: 50px; max-height: 50px;">
                    <span>${item.name}</span>
                </div>
                <div>
                    <span>$${item.price.toFixed(2)}</span>
                    <span>Quantity: ${item.quantity}</span>
                    <button class="btn btn-danger btn-sm ms-2" data-product-id="${item.id}">Delete</button>
                </div>
            `;

            // Attach a click event listener to the delete button
            const deleteButton = listItem.querySelector("button");
            deleteButton.addEventListener("click", () => {
                removeCartItem(item.id);
            });

            basketList.appendChild(listItem);
        });
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












































































