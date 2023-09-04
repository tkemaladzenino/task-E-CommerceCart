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
                    ratingElement.textContent = `Rating: ${product.rating}`;
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





