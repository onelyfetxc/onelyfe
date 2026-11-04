const accessDialog = document.querySelector("[data-access-dialog]");
const openAccess = document.querySelector("[data-open-access]");
const closeAccess = document.querySelector("[data-close-access]");

openAccess?.addEventListener("click", () => accessDialog?.showModal());
closeAccess?.addEventListener("click", () => accessDialog?.close());

accessDialog?.addEventListener("click", (event) => {
  if (event.target === accessDialog) accessDialog.close();
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
