console.log("Welcome");

const addProductBtn2 = document.getElementById('addProductButton')

let products;
async function fetchProducts() {

    console.log("fetching products...")

    const response = await fetch('/products');
    products = await response.json();
    // console.log(products);  
    for (let product of products) {
        const card = document.createElement("div");
        card.classList.add("card", product.category); // Add category class
        card.setAttribute("data-price", product.price); // Add price attribute
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        const image = document.createElement("img");
        image.setAttribute("src", product.image);
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);
        const container = document.createElement("div");
        container.classList.add("container");
        const price = document.createElement("h3");
        price.innerText = product.price + "Rs";
        container.appendChild(price);
        const name = document.createElement("h4");
        name.classList.add("product-name");
        name.innerText = product.name.toUpperCase();
        container.appendChild(name);
        const location = document.createElement("h5");
        location.classList.add("product-location");
        location.innerText = "Hostel D";
        container.appendChild(location);
        card.appendChild(container);
        document.getElementById('products').appendChild(card);
    }
}

async function addProduct() {
    // const image = document.getElementById('image').value;
    let name = document.getElementById('productName').value;
    let price = document.getElementById('productPrice').value;
    let category = document.getElementById('Category').value;

    const newProduct = {
        name,
        price,
        image: "/images/laptop1.jpeg",
        category
        // id: Math.random()
    };
    name = "";
    price = "";

    const response = await fetch('/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newProduct })
    });

    const result = await response.json();
    // alert(result.message); // Display success message

    // fetchProducts();
   
}



document.querySelector('.sell-button').addEventListener('click', function() {
    var sellItem = document.querySelector('.sellItem');
    // var dropD=document.querySelector('#dropDown');

    if (sellItem.style.display === 'none') {
      sellItem.style.display = 'flex';
      sellItem.style.flexDirection = 'column';
    //   dropD.style.display = 'flex';

    } else {
      sellItem.style.display = 'none';
    //   dropD.style.display = 'none';
    }
  });


addProductBtn2.addEventListener("click", () => {
    console.log("another fn callled")
    addProduct();
})
  console.log("This iscode");

  document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});


function filterProductByType(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
    });

    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
    if (value == "all") {
        element.classList.remove("hide");
    } else {
        if (element.classList.contains(value)) {
        element.classList.remove("hide");
        } else {
        element.classList.add("hide");
        }
    }
    });
}
        
document.getElementById("search").addEventListener("click", () => {
        let searchInput = document.getElementById("search-input").value;
        let elements = document.querySelectorAll(".product-name");
        let cards = document.querySelectorAll(".card");
    
        elements.forEach((element, index) => {
            if (element.innerText.includes(searchInput.toUpperCase())) {
            cards[index].classList.remove("hide");
        } else {
            cards[index].classList.add("hide");
        }
    });
});
    
    window.onload = () => {
        filterProductByType("all");
    };
    
    
    document.getElementById("price").onchange = (e) => {
        const selectedRange = e.target.value;
        console.log(selectedRange)
        const minPrice = +selectedRange.split("-")[0];
        const maxPrice = +selectedRange.split("-")[1];
        // const maxPrice=1000;
        console.log(minPrice, maxPrice);
        filterProductByPrice(minPrice, maxPrice);
    }
    
    function filterProductByPrice(minPrice, maxPrice) {
        let elements = document.querySelectorAll(".card");
        elements.forEach((element) => {
            const productPrice = parseFloat(element.dataset.price); // Assuming price is stored in a data attribute
    
            if (minPrice <= productPrice && productPrice <= maxPrice) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        });
    }
    
    // async function filterPrice(minPrice, maxPrice) {
    //     // console.log("enter");
    //     const productsInRange = products.filter(product => {
    //         console.log(product.price, minPrice, maxPrice)
    //         return product.price >= minPrice && product.price <= maxPrice;
    //     });
    //     console.log(productsInRange);
    //     // console.log("enter")
    // }     

