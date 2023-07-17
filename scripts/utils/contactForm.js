function displayModal() {
  if (formCompleted === true) {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    confirmationForm();
  } else {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
  }
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

// Protège contre en envois du formulaire par default + appelle fonction de validation
const validForm = document.querySelector('input[type="submit"]');
const modalSubmit = document.querySelector('.container-confirmation-submit');
const formCompleted = false;
function checkForm() {
  // Tableau pour stocker les résultats de validation
  const inputs = document.querySelectorAll('#first, #last, #email, #text');
  const validationResults = new Array(inputs.length).fill(false);

  // check du prenom (input vide + regex)
  const firstCheck = (value) => {
    const error = document.querySelector('.first');
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    let valid = false;
    if (value.length < 2 || value.trim() === '' || !regex.test(value)) {
      error.setAttribute('data-error-visible', 'true');
    } else {
      valid = true;
      error.setAttribute('data-error-visible', 'ok');
    }
    return valid;
  };
  // check du nom (input vide + regex)
  const lastCheck = (value) => {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    const error = document.querySelector('.last');
    let valid = false;
    if (value.length < 2 || value.trim() === '' || !regex.test(value)) {
      error.setAttribute('data-error-visible', 'true');
    } else {
      valid = true;
      error.setAttribute('data-error-visible', 'ok');
    }
    return valid;
  };
  // check du mail
  const emailCheck = (value) => {
    const error = document.querySelector('.email');
    let valid = false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error.setAttribute('data-error-visible', 'true');
    } else {
      valid = true;
      error.setAttribute('data-error-visible', 'ok');
    }
    return valid;
  };
  // check du prenom (input vide + regex)
  const textCheck = (value) => {
    const error = document.querySelector('.text');
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    let valid = false;
    if (value.length < 20 || value.trim() === '' || !regex.test(value)) {
      error.setAttribute('data-error-visible', 'true');
    } else {
      valid = true;
      error.setAttribute('data-error-visible', 'ok');
    }
    return valid;
  };
  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      switch (e.target.id) {
        case 'first':
          validationResults[index] = firstCheck(e.target.value);
          break;
        case 'last':
          validationResults[index] = lastCheck(e.target.value);
          break;
        case 'email':
          validationResults[index] = emailCheck(e.target.value);
          break;
        case 'text':
          validationResults[index] = textCheck(e.target.value);
          break;
        default:
      }
      // Vérifie si toutes les fonctions ont retourné true
      const allValid = validationResults.every((result) => result === true);
      if (allValid) {
        validForm.addEventListener('click', (event) => {
          event.preventDefault();
          formCompleted === true;
          formValues(inputs);
          const formData = formValues(inputs);
          console.log(formData);
          confirmationForm();
        });
        validForm.addEventListener('keydown', (event) => {
          event.preventDefault();
          formCompleted === true;
          formValues(inputs);
          const formData = formValues(inputs);
          console.log(formData);
          confirmationForm();
        });
      }
    });
  });
}
checkForm();

function formValues(inputs) {
  const dataForm = [];

  for (let i = 0; i < inputs.length; i += 1) {
    if (inputs[i].type === 'text' || inputs[i].type === 'email') {
      dataForm.push(inputs[i].value);
    }
  }

  return dataForm;
}

function confirmationForm() {
  const modal = document.getElementById('contact_modal');
  modalSubmit.style.display = 'block';
  modal.style.display = 'none';
}
