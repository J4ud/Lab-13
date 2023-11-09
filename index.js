// Función para agregar una nueva tarea
function addTask() {
    const taskInput = document.getElementById("task");
    const statusSelect = document.getElementById("status");
    const task = taskInput.value;
    const status = statusSelect.value;

    if (task.trim() === "") {
        alert("Por favor, ingresa una tarea válida.");
        return;
    }

    // Crear un objeto de tarea
    const newTask = {
        task: task,
        status: status
    };

    // Obtener las tareas existentes del Local Storage o crear un array vacío
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Agregar la nueva tarea al array de tareas
    tasks.push(newTask);

    // Guardar el array actualizado en el Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Limpiar el input de tarea
    taskInput.value = "";

    // Actualizar la lista de tareas
    displayTasks();
}

// Función para mostrar las tareas en la página
function displayTasks() {
    // Obtener las tareas almacenadas en el Local Storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Tareas en el Local Storage:", tasks);

    // Obtener los divs correspondientes a los estados
    const todoDiv = document.getElementById("todo");
    const doingDiv = document.getElementById("doing");
    const doneDiv = document.getElementById("done");

    // Limpiar los divs antes de mostrar las tareas
    todoDiv.innerHTML = "";
    doingDiv.innerHTML = "";
    doneDiv.innerHTML = "";

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.className = "task-card";
        card.innerHTML = `
            <h3>${task.task}</h3>
            <p>Estado: ${task.status}</p>
            ${getMoveButtons(task.status)}
        `;

        // Coloca la tarjeta en el div correspondiente según su estado
        if (task.status === "Por Hacer") {
            todoDiv.appendChild(card);
        } else if (task.status === "En Proceso") {
            doingDiv.appendChild(card);
        } else if (task.status === "Completada") {
            doneDiv.appendChild(card);
        }
    });
}

// Función para obtener los botones de movimiento
function getMoveButtons(currentStatus) {
    const moveButtons = ["Por Hacer", "En Proceso", "Completada"]
        .filter(status => status !== currentStatus)
        .map(status => `<button id="cambio" onclick="moveTask('${currentStatus}', '${status}')"></button>`)
        .join(" ");
    return moveButtons;
}

// Función para mover una tarea a otra categoría
function moveTask(currentStatus, newStatus) {
    // Obtener las tareas del Local Storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Filtrar la tarea que se va a mover
    const taskToMove = tasks.find(task => task.status === currentStatus);

    if (taskToMove) {
        // Actualizar el estado de la tarea
        taskToMove.status = newStatus;

        // Guardar las tareas actualizadas en el Local Storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Actualizar la lista de tareas en la página
        displayTasks();
    }
}

// Mostrar las tareas al cargar la página
displayTasks();
