document.addEventListener("DOMContentLoaded", () => {
  const URLparameters = new URLSearchParams(location.search);
  const productId = URLparameters.get("id");

  const productsURL = "https://striveschool-api.herokuapp.com/api/product/";

  console.log("Product ID:", productId);

  const getProductDetails = () => {
    fetch(`${productsURL}${productId}`, {
      // Corretto: utilizziamo GET, non POST
      method: "GET", // Cambiato da POST a GET
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
        const name = document.getElementById("name");
        name.innerText = data.name;
      })
      .catch((err) => {
        console.log("ERRORE NEL RECUPERO DATI DEL PRODOTTO", err);
      });
  };

  getProductDetails();
});
