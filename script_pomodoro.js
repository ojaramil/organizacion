let isWorkMode = true; // Alterna entre modo trabajo y descanso
let timerInterval; // Intervalo para manejar el temporizador
let timeRemaining = 25 * 60; // Tiempo inicial en segundos (25 minutos)

// Elementos HTML
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

// Sonidos
const audioStart = document.getElementById('audio-start'); // Sonido al iniciar el ciclo
const audioEnd = document.getElementById('audio-end'); // Sonido al finalizar el ciclo

// Función para actualizar el temporizador
function updateTimer() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');

    if (timeRemaining === 0) {
        toggleMode(); // Cambia de modo cuando el tiempo llega a 0
    } else {
        timeRemaining--;
    }
}

// Cambiar entre modo trabajo y descanso
function toggleMode() {
    audioEnd.play(); // Sonido al finalizar un ciclo
    isWorkMode = !isWorkMode;
    timeRemaining = isWorkMode ? 25 * 60 : 5 * 60; // Modo trabajo o descanso
    statusDisplay.textContent = isWorkMode ? 'Modo de trabajo' : 'Modo de descanso';
    updateTimer();
}

// Iniciar el temporizador
function startTimer() {
    clearInterval(timerInterval);
    audioStart.play(); // Sonido al iniciar el ciclo
    timerInterval = setInterval(updateTimer, 1000); // Actualiza cada segundo
}

// Reiniciar el temporizador
function resetTimer() {
    clearInterval(timerInterval);
    isWorkMode = true;
    timeRemaining = 25 * 60;
    statusDisplay.textContent = 'Modo de trabajo';
    updateTimer();
}

// Event Listeners para los botones
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Inicializar el temporizador en la carga de la página
updateTimer();

