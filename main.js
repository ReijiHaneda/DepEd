

const nameInput = document.getElementById('dataInput');
const lrnInput = document.getElementById('lrnInput');
const form = document.getElementById('dataForm');
const nameError = document.getElementById('nameError');
const lrnError = document.getElementById('lrnError');

function storeAndLogData() {
  const dataInput = nameInput.value;
  const lrnInput = document.getElementById('lrnInput').value;

  localStorage.setItem('userLRN', lrnInput);
  localStorage.setItem('userName', dataInput);

  document.getElementById('your-name-here').textContent = dataInput;
  document.getElementById('your-lrn-here').textContent = lrnInput;
  document.getElementById('your-name-here2').textContent = dataInput;
  document.querySelector('.your-name-here').textContent = lrnInput;
}

function formatName(input) {
  return input.replace(/[^a-zA-Z\s]/g, '')
              .replace(/\b\w/g, c => c.toUpperCase())
              .slice(0, 50);
}

function formatLRN(input) {
  return input.replace(/\D/g, '').slice(0, 12);
}

function isSequential(str) {
  for (let i = 0; i < str.length - 1; i++) {
    if (parseInt(str[i+1]) - parseInt(str[i]) !== 1) {
      return false;
    }
  }
  return true;
}

function showError(element, message) {
  element.textContent = message;
}

function clearErrors() {
  nameError.textContent = '';
  lrnError.textContent = '';
}

nameInput.addEventListener('input', function() {
  this.value = formatName(this.value);
  this.setCustomValidity('');
  nameError.textContent = '';
});

lrnInput.addEventListener('input', function() {
  this.value = formatLRN(this.value);
  this.setCustomValidity('');
  lrnError.textContent = '';
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  clearErrors();
  
  const name = nameInput.value.trim();
  const lrn = lrnInput.value;

  let isValid = true;

  if (name.length < 8) {
    showError(nameError, 'Name must be at least 6 characters long');
    nameInput.setCustomValidity('Name must be at least 6 characters long');
    isValid = false;
  }

  if (lrn.length !== 12) {
    showError(lrnError, 'LRN must be exactly 12 digits long');
    lrnInput.setCustomValidity('LRN must be exactly 12 digits long');
    isValid = false;
  } else if (isSequential(lrn)) {
    showError(lrnError, 'LRN cannot be a sequence of numbers');
    lrnInput.setCustomValidity('LRN cannot be a sequence of numbers');
    isValid = false;
  }

  if (isValid) {
    storeAndLogData();

    const mainContent = document.querySelector('.main-container');
    const background = document.querySelector('.background1');
    const container = document.querySelector('.container');
    const modal = document.querySelector('.loading');

    modal.style.display = 'block';
    background.style.display = 'block';

    setTimeout(() => {
      modal.style.display = 'none';
      background.style.display = 'none';
      container.style.display = 'none';
      mainContent.style.display = 'block';

      
      
    }, 10000);
    
    setTimeout(()=>{
      const userName = localStorage.getItem('userName');
      
      document.getElementById("stylename").textContent = `We found 1 matching result(s) for ${userName}!`;
    }, 5000)
    
  } else {
    if (!nameInput.validity.valid) {
      nameInput.reportValidity();
    } else if (!lrnInput.validity.valid) {
      lrnInput.reportValidity();
    }
  }
});

// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const closeBtn = document.querySelector('.close-btn');

menuToggle.addEventListener('click', () => {
  menu.style.right = menu.style.right === '0px' ? '-250px' : '0px';
});

closeBtn.addEventListener('click', () => {
  menu.style.right = '-250px';
});

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menu.style.right = '-250px';
  }
});

function myVer() {
  window.location='verification.html';
  
}
