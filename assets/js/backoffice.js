document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("product-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const productData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
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
          throw new Error("Errore durante l'invio del prodotto");
        }
      })
      .then(() => {
        alert("Prodotto aggiunto con successo!");
        form.reset();
      })
      .catch((error) => {
        console.error("Errore:", error);
        alert("Si è verificato un errore");
      });
  });
});
