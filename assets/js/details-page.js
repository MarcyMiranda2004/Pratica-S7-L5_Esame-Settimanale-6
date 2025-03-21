document.addEventListener("DOMContentLoaded", () => {
  const URLparameters = new URLSearchParams(location.search);
  const productId = URLparameters.get("id");
  const productsURL = "https://striveschool-api.herokuapp.com/api/product/";

  console.log("Product ID:", productId);

  const getProductDetails = () => {
    fetch(`${productsURL}${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
      },
    })
      .then((response) => {
        console.log("response", response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dettagli");
        }
      })
      .then((data) => {
        console.log("DETTAGLI PRODOTTO", data);

        const nameElement = document.getElementById("name");
        const productTypeElement = document.getElementById("productTipe");
        const descriptionElement = document.getElementById("description");
        const priceElement = document.getElementById("price");
        const imageUrlElement = document.getElementById("imageUrl");

        nameElement.innerHTML = `<strong class="fs-3">${data.name}</strong> `;
        productTypeElement.innerHTML = `<strong>Tipo di Prodotto:</strong> ${data.category}`;
        descriptionElement.innerHTML = `<strong>Descrizione:</strong> ${data.description}`;
        priceElement.innerHTML = `<strong>Prezzo:</strong> €${data.price}`;
        imageUrlElement.src = data.imageUrl || "../img/placeholder.png";
      })
      .catch((err) => {
        console.log("ERRORE NEL RECUPERO DATI DEL PRODOTTO", err);
      });
  };

  getProductDetails();
});
