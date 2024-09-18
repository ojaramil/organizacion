// Variables para almacenar la información
let routines = JSON.parse(localStorage.getItem('routines')) || [];

// Seleccionar elementos del DOM
const addRoutineButton = document.getElementById('add-routine');
const routineInput = document.getElementById('new-routine');
const routineList = document.getElementById('routine-items');
const routineIcon = document.getElementById('routine-icon');
const routinePriority = document.getElementById('routine-priority');
const routineTimeInput = document.getElementById('routine-time');
const moodBeforeInput = document.getElementById('mood-before');
const routineStartInput = document.getElementById('routine-time-start');
const recurringRoutineCheckbox = document.getElementById('recurring-routine');

// Modo Oscuro
const darkModeToggle = document.getElementById('toggle-dark-mode');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Evento al presionar el botón de agregar rutina
addRoutineButton.addEventListener('click', addRoutine);

// Función para agregar nueva rutina
function addRoutine() {
    const routineText = routineInput.value.trim();
    const selectedIcon = routineIcon.value;
    const priority = routinePriority.value;
    const routineTime = routineTimeInput.value;
    const moodBefore = moodBeforeInput.value;
    const routineStart = routineStartInput.value;
    const isRecurring = recurringRoutineCheckbox.checked;

    // Verificación de campos obligatorios
    if (!routineText || !routineTime || !routineStart) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Crear nuevo objeto de rutina
    const newRoutine = {
        id: Date.now(),
        text: routineText,
        icon: selectedIcon,
        priority: priority,
        time: routineTime,
        mood: moodBefore,
        start: routineStart,
        recurring: isRecurring,
        completed: false,
    };

    // Agregar la nueva rutina a la lista de rutinas
    routines.push(newRoutine);
    
    // Guardar en LocalStorage
    saveToLocalStorage();

    // Renderizar la nueva rutina en la lista
    renderRoutine(newRoutine);

    // Limpiar campos de entrada
    routineInput.value = "";
    routineTimeInput.value = "";
    routineStartInput.value = "";
    recurringRoutineCheckbox.checked = false;
}

// Función para renderizar la rutina en la lista
function renderRoutine(routine) {
    const li = document.createElement('li');
    li.setAttribute('data-id', routine.id);
    li.innerHTML = `${routine.icon} ${routine.text} - ${routine.time} minutos - Prioridad: ${routine.priority}`;

    const completeButton = document.createElement('button');
    completeButton.textContent = "Completar";
    completeButton.addEventListener('click', () => {
        routine.completed = !routine.completed;
        saveToLocalStorage();
        li.classList.toggle('completed', routine.completed);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener('click', () => {
        deleteRoutine(routine.id);
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    routineList.appendChild(li);

    // Mostrar si la rutina está completada
    li.classList.toggle('completed', routine.completed);
}

// Función para guardar rutinas en LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('routines', JSON.stringify(routines));
}

// Función para cargar rutinas desde LocalStorage
function loadRoutines() {
    routineList.innerHTML = '';
    routines.forEach(renderRoutine);
}

// Función para eliminar rutina
function deleteRoutine(id) {
    routines = routines.filter(routine => routine.id !== id);
    saveToLocalStorage();
    loadRoutines();
}

// Cargar rutinas desde LocalStorage cuando se cargue la página
window.addEventListener('DOMContentLoaded', loadRoutines);

// Funciones adicionales para las estadísticas y música pueden agregarse aquí si es necesario
