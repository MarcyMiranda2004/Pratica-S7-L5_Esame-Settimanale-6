document.addEventListener("DOMContentLoaded", () => {
  const URLparameters = new URLSearchParams(location.search);
  const productId = URLparameters.get("id");
  const productsURL = "https://striveschool-api.herokuapp.com/api/product/";

  console.log("Product ID:", productId);

  const correctAdminEmail = "admin@email.com";
  const correctAdminPassword = "12345";

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

        document
          .getElementById("modificaProdotto")
          .addEventListener("click", () =>
            showAdminModal(() => modifyProduct(data))
          );
        document
          .getElementById("eliminaProdotto")
          .addEventListener("click", () =>
            showAdminModal(() => deleteProduct(data))
          );
      })
      .catch((err) => {
        console.log("ERRORE NEL RECUPERO DATI DEL PRODOTTO", err);
      });
  };

  const showAdminModal = (action) => {
    const adminModal = new bootstrap.Modal(
      document.getElementById("administrationModal")
    );
    adminModal.show();

    document
      .getElementById("adminAccessButton")
      .addEventListener("click", () => {
        const adminEmail = document.getElementById("adminEmail").value;
        const adminPassword = document.getElementById("adminPassword").value;

        if (
          adminEmail === correctAdminEmail &&
          adminPassword === correctAdminPassword
        ) {
          adminModal.hide();

          action();
        } else {
          alert("Credenziali errate. Riprova.");
        }
      });
  };

  const modifyProduct = (data) => {
    const newName = prompt("Modifica nome prodotto:", data.name);
    const newDescription = prompt(
      "Modifica descrizione prodotto:",
      data.description
    );
    const newPrice = prompt("Modifica prezzo prodotto:", data.price);

    if (newName && newDescription && newPrice) {
      const updatedProduct = {
        ...data,
        name: newName,
        description: newDescription,
        price: parseFloat(newPrice),
      };

      fetch(`${productsURL}${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((response) => {
          if (response.ok) {
            alert("Prodotto modificato con successo!");
            location.reload();
          } else {
            alert("Errore durante la modifica del prodotto.");
          }
        })
        .catch((err) => {
          console.log("Errore nella modifica del prodotto", err);
        });
    }
  };

  const deleteProduct = (data) => {
    const confirmation = confirm(
      `Sei sicuro di voler eliminare il prodotto "${data.name}"?`
    );

    if (confirmation) {
      fetch(`${productsURL}${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNWExNzM4MzRiZjAwMTUwMDA4N2IiLCJpYXQiOjE3NDI1NTk3NjcsImV4cCI6MTc0Mzc2OTM2N30.OwmODP0zuONHB5il73OCTi_Jt8FPBI988tVpx7FUcXk",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Prodotto eliminato con successo!");
            window.location.href = "../../home-page.html";
          } else {
            alert("Errore durante l'eliminazione del prodotto.");
          }
        })
        .catch((err) => {
          console.log("Errore nella cancellazione del prodotto", err);
        });
    }
  };

  getProductDetails();
});
