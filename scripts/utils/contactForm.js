function displayModal() {
  if (formCompleted === true) {
    const modal = ddocument.getElementById("contact_modal");
    modal.style.display = "none";
    confirmationForm();
  } else {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
