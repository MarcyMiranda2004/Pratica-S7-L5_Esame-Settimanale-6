document.addEventListener("DOMContentLoaded", () => {
  //   modale admin
  const administrationButton = document.getElementById("administration");
  const administrationModal = new bootstrap.Modal(
    document.getElementById("administrationModal")
  );

  administrationButton.addEventListener("click", () => {
    administrationModal.show();
  });

  // credenziali admin
  const adminEmail = document.getElementById("adminEmail");
  const adminPassword = document.getElementById("adminPassword");
  const adminAccessButton = document.getElementById("adminAccessButton");

  adminAccessButton.addEventListener("click", () => {
    if (
      adminEmail.value === "admin@email.com" &&
      adminPassword.value === "12345"
    ) {
      window.location.href = "./assets/html/backoffice.html";
      adminEmail.value = "";
      adminPassword.value = "";
    } else {
      alert("Username o Password Errate");
      adminEmail.value = "";
      adminPassword.value = "";
    }
  });

  // aggiunta prodotti
  const form = document.getElementById("product-form");
  const productContainer = document.querySelector("main");

  const fetchProducts = () => {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
      },
    })
      .then((response) => response.json())
      .then((products) => {
        productContainer.innerHTML = "";
        const row = document.createElement("div");
        row.classList.add("row");

        products.forEach((product) => {
          const col = document.createElement("div");
          col.classList.add("col-12", "col-md-3", "col-lg-2");

          col.innerHTML = `
          <div class="card m-3 p-3 shadow text-center">
            <a href="./assets/html/details-page.html">
                <img src="${product.imageUrl}" class="card-img-top" alt="${
            product.name
          }">
            </a>
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              
              <p class="card-text"><strong>Tipo di Prodotto:</strong> ${
                product.brand
              }</p>
              <p class="card-text"><strong>Prezzo:</strong> ${product.price.toFixed(
                2
              )} €</p>
              <a href="./assets/html/details-page.html?id=${
                product._id
              }" class="btn btn-primary">Dettagli</a>
            </div>
          </div>
        `;

          row.appendChild(col);
        });

        productContainer.appendChild(row);
      })
      .catch((error) => console.error("Errore nel recupero prodotti:", error));
  };

  fetchProducts();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const productData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      productTipe: document.getElementById("productTipe").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: parseFloat(document.getElementById("price").value),
    };

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("Errore durante l'invio del prodotto");
        }
      })
      .then(() => {
        alert("Prodotto aggiunto con successo!");
        form.reset();
        fetchProducts();
      })
      .catch((error) => {
        console.error("Errore:", error);
        alert("Si è verificato un errore");
      });
  });

  // details compilation
  document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-list");

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
      },
    })
      .then((response) => response.json())
      .then((products) => {
        productContainer.innerHTML = "";
        products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "card m-2";
          productCard.innerHTML = `
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>€${product.price}</strong></p>
                    <button class="btn btn-primary details-btn" data-id="${product._id}">Dettagli</button>
                </div>
            `;
          productContainer.appendChild(productCard);
        });

        document.querySelectorAll(".details-btn").forEach((button) => {
          button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            console.log("ID prodotto selezionato:", productId);
            window.location.href = `details.html?id=${productId}`;
          });
        });
      })
      .catch((error) =>
        console.error("Errore nel caricamento dei prodotti:", error)
      );
  });
});
