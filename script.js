
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

// Charger les tâches sauvegardées
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Sauvegarder les tâches
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Afficher les tâches
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.name;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Bouton terminer
        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed
            ? "Annuler"
            : "Terminer";

        completeButton.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        // Bouton supprimer
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.classList.add("delete-btn");

        deleteButton.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        const actions = document.createElement("div");
        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    const remaining = tasks.filter(task => !task.completed).length;

    taskCounter.textContent = remaining + " tâche(s) restante(s)";
}

// Ajouter une tâche
function addTask() {

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Veuillez saisir une tâche !");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

// Événement du bouton Ajouter
addButton.addEventListener("click", addTask);

// Ajouter avec la touche Entrée
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Affichage initial
displayTasks();
