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
    // Usa "click" invece di "submit"
    if (
      adminEmail.value === "admin@email.com" &&
      adminPassword.value === "12345"
    ) {
      window.location.href = "./assets/html/backoffice.html";
      adminEmail.value = "";
      adminPassword.value = "";
    } else {
      alert("Username o Password Errate");
      form.reset();
    }
  });
});
