const barraAgregar = document.getElementById("barraAgregar");
const botonAgregar = document.getElementById("botonAgregar");
const labelElementosRealizados = document.getElementById("elementosRealizados");
const labelTotalTareas = document.getElementById("totalTareas");

let tareas = [
    { id: 1, descripcion: 'Llamar al banco', estado: false },
    { id: 2, descripcion: 'Estudiar', estado: false },
    { id: 3, descripcion: 'Ir al gym', estado: false },
    { id: 4, descripcion: 'Preparar la cena', estado: false }
];

function actualizarRecuento() {
    const realizadas = tareas.filter(tarea => tarea.estado).length;
    const total = tareas.length;

    labelElementosRealizados.textContent = realizadas;
    labelTotalTareas.textContent = total;
}

function renderTareas() {
    const contenedorTareas = document.getElementById("contenedorTareas");
    contenedorTareas.innerHTML = ''; 

    for (const tarea of tareas) {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea-item');

        const idElemento = document.createElement('span');
        idElemento.textContent = tarea.id;
        idElemento.classList.add('tarea-id');

        const label = document.createElement('label');
        label.textContent = tarea.descripcion;


        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.estado;
        checkbox.setAttribute('data-id', tarea.id);


        checkbox.addEventListener('change', () => {
            tarea.estado = checkbox.checked;
            actualizarRecuento();
        });


        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.className = 'boton-eliminar';
        botonEliminar.addEventListener('click', () => {
            tareas = tareas.filter(t => t.id !== tarea.id);
            renderTareas(); 
        });

        tareaDiv.appendChild(idElemento);
        tareaDiv.appendChild(label);
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(botonEliminar);
        tareaDiv.appendChild(checkboxContainer);

        contenedorTareas.appendChild(tareaDiv);
    }

    actualizarRecuento();
}

renderTareas();

botonAgregar.addEventListener("click", () => {
    const nuevaTarea = barraAgregar.value;
    if (nuevaTarea.trim() === "") {
        alert("Por favor, ingresa una tarea.");
        return;
    }
    tareas.push({
        id: Date.now() % 1000,
        descripcion: nuevaTarea,
        estado: false
    });

    barraAgregar.value = "";
    renderTareas();
});