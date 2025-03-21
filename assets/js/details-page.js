document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const ProductsURL = "https://striveschool-api.herokuapp.com/api/product/";
  console.log("Product ID:", productId);

  if (!productId) {
    console.error("Nessun prodotto selezionato");
    document.querySelector("main").innerHTML =
      "<p class='text-center text-danger'>Errore: Nessun prodotto selezionato.</p>";
    return;
  }

  const fetchProductDetails = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
      },
    })
      .then((response) => response.json())
      .then((product) => {
        console.log("Dati ricevuti:", product);

        document.getElementById("product-image").src = product.imageUrl;
        document.getElementById("name").textContent = product.name;
        document.getElementById("description").textContent =
          product.description;
        document.getElementById(
          "productTipe"
        ).innerHTML = `<strong>Tipo di Prodotto:</strong> ${product.brand}`;
        document.getElementById(
          "price"
        ).innerHTML = `<strong>Prezzo:</strong> €${product.price}`;
      })
      .catch((error) => {
        console.error("Errore nel caricamento del prodotto:", error);
        document.querySelector("main").innerHTML =
          "<p class='text-center text-danger'>Errore nel caricamento del prodotto.</p>";
      });
  };

  fetchProductDetails();

  // MODIFICA DESCRIZIONE
  document.getElementById("modificaProdotto").addEventListener("click", () => {
    const newDescription = prompt("Inserisci la nuova descrizione:");
    if (newDescription) {
      fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
        },
        body: JSON.stringify({ description: newDescription }),
      })
        .then((response) => response.json())
        .then(() => {
          alert("Descrizione modificata con successo!");
          fetchProductDetails();
        })
        .catch((error) => console.error("Errore durante la modifica:", error));
    }
  });

  // ELIMINA PRODOTTO
  document.getElementById("eliminaProdotto").addEventListener("click", () => {
    if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
        },
      })
        .then((response) => response.json())
        .then(() => {
          alert("Prodotto eliminato con successo!");
          window.location.href = "../../home-page.html";
        })
        .catch((error) =>
          console.error("Errore durante l'eliminazione:", error)
        );
    }
  });
});
