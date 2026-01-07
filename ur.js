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
async function fetchAstronauts() {
    showSpinner();
    hideError();
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Hiba a hálózati válaszban!');
        const data = await response.json();
        astronauts = data.people;
        astronautCount.textContent = data.number;
        stations = [...new Set(astronauts.map(a => a.craft))];
        renderStationOptions();
        renderCards();
    } catch (err) {
        showError('Nem sikerült betölteni az adatokat. Próbáld újra később!');
    } finally {
        hideSpinner();
    }
}

function renderStationOptions() { const selected = stationFilter.value;
    let filtered = astronauts;
    if (selected !== 'all') {
        filtered = astronauts.filter(a => a.craft === selected);
    }
    cardsContainer.innerHTML = '';
    if (filtered.length === 0) {
        cardsContainer.innerHTML = '<div class="error">Nincs megjeleníthető űrhajós ezen az állomáson.</div>';
        return;
    }
    filtered.forEach(a => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h2>${a.name}</h2><p>Űrállomás: <strong>${a.craft}</strong></p>`;
        cardsContainer.appendChild(card);
    });
}
window.addEventListener('DOMContentLoaded', fetchAstronauts);
