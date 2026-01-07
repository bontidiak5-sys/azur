const API_URL = 'http://api.open-notify.org/astros.json';
const spinner = document.getElementById('spinner');
const errorMessage = document.getElementById('error-message');
const cardsContainer = document.getElementById('cards-container');
const astronautCount = document.getElementById('astronaut-count');
const stationFilter = document.getElementById('station-filter');

let astronauts = [];
let stations = [];

function showSpinner() {
    spinner.classList.remove('hidden');
}
function hideSpinner() {
    spinner.classList.add('hidden');
}
function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
    cardsContainer.innerHTML = '';
}
function hideError() {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
}

