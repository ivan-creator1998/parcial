// Obtener todos los elementos del DOM por su ID
const loginContainer = document.getElementById('loginContainer'); // Contenedor de inicio de sesión
const formContainer = document.getElementById('formContainer'); // Contenedor del formulario para estudiantes
const adminContainer = document.getElementById('adminContainer'); // Contenedor del panel para el administrador
const btnIngresar = document.getElementById('btnIngresar'); // Botón para ingresar según el rol seleccionado
const rolSelect = document.getElementById('rol'); // Menú desplegable para seleccionar el rol (estudiante o admin)
const adminPasswordContainer = document.getElementById('adminPasswordContainer'); // Contenedor del input de contraseña de admin
const adminPasswordInput = document.getElementById('adminPassword'); // Campo de texto para introducir la contraseña del admin
const form = document.getElementById('projectForm'); // Formulario de registro de proyectos estudiantiles
const lista = document.getElementById('listaProyectos'); // Lista de proyectos visibles solo para el administrador
const btnBorrarRegistros = document.getElementById('btnBorrarRegistros'); // Botón para borrar todos los proyectos registrados
const btnCerrarSesionEstudiante = document.getElementById('btnCerrarSesionEstudiante'); // Botón para cerrar sesión de estudiante
const btnCerrarSesionAdmin = document.getElementById('btnCerrarSesionAdmin'); // Botón para cerrar sesión de administrador

// Obtener los datos de proyectos y estudiantes desde el almacenamiento local, o inicializar como arreglo vacío si no existen
let proyectos = JSON.parse(localStorage.getItem('proyectos')) || []; // Lista de proyectos guardados
let estudiantesRegistrados = JSON.parse(localStorage.getItem('estudiantes')) || []; // Lista de estudiantes ya registrados

// Evento que se ejecuta cuando cambia el rol seleccionado
rolSelect.addEventListener('change', () => {
  // Si el rol es "admin", se muestra el campo de contraseña, si no, se oculta
  adminPasswordContainer.style.display = rolSelect.value === 'admin' ? 'block' : 'none';
});

// Evento que se ejecuta cuando el usuario hace clic en "Ingresar"
btnIngresar.addEventListener('click', () => {
  const rol = rolSelect.value; // Se obtiene el valor del rol seleccionado

  // Si el rol es estudiante, se muestra el formulario y se oculta el login
  if (rol === 'estudiante') {
    loginContainer.style.display = 'none'; // Oculta el contenedor de login
    formContainer.style.display = 'block'; // Muestra el formulario para estudiantes
  } 
  // Si el rol es admin, se verifica la contraseña
  else if (rol === 'admin') {
    const password = adminPasswordInput.value; // Se obtiene la contraseña ingresada

    // Si la contraseña es correcta, se muestra el panel de admin
    if (password === 'admin123') {
      loginContainer.style.display = 'none'; // Oculta el contenedor de login
      adminContainer.style.display = 'block'; // Muestra el panel del administrador
      mostrarProyectos(); // Llama a la función para mostrar los proyectos
    } 
    // Si la contraseña es incorrecta, se muestra una alerta
    else {
      alert('Contraseña incorrecta'); // Muestra mensaje de error
    }
  } 
  // Si no se seleccionó ningún rol, se muestra una alerta
  else {
    alert('Selecciona un rol'); // Muestra mensaje indicando que se debe seleccionar un rol
  }
});

// Evento que se ejecuta cuando el estudiante cierra sesión
btnCerrarSesionEstudiante.addEventListener('click', () => {
  formContainer.style.display = 'none'; // Oculta el formulario
  loginContainer.style.display = 'block'; // Vuelve a mostrar el contenedor de login
});

// Evento que se ejecuta cuando el admin cierra sesión
btnCerrarSesionAdmin.addEventListener('click', () => {
  adminContainer.style.display = 'none'; // Oculta el panel de admin
  loginContainer.style.display = 'block'; // Vuelve a mostrar el contenedor de login
});

// Evento que se ejecuta al enviar el formulario de registro de proyectos
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Previene que se recargue la página al enviar el formulario

  // Obtener y limpiar los valores del formulario
  const titulo = document.getElementById('titulo').value.trim(); // Título del proyecto
  const categoria = document.getElementById('categoria').value; // Categoría del proyecto
  const integrantes = document.getElementById('integrantes').value.split(',').map(e => e.trim()); // Lista de nombres de los integrantes (separados por comas)
  const avance = document.getElementById('avance').value; // Estado de avance del proyecto
  const fecha = document.getElementById('fecha').value; // Fecha de postulación
  const grupo = document.getElementById('grupo').value.trim(); // Grupo académico o curso
  const requiereEtica = document.getElementById('requiereEtica').checked; // Si el proyecto requiere revisión ética
  const documentoEtico = document.getElementById('documentoEtico').value.trim(); // Documento entregado si requiere ética

  // Validar que haya entre 2 y 5 integrantes
  if (integrantes.length < 2 || integrantes.length > 5) {
    alert('El proyecto debe tener entre 2 y 5 estudiantes.'); // Alerta si no se cumple
    return; // Detiene la ejecución
  }

  // Validar que ningún estudiante ya esté registrado en otro proyecto
  for (const estudiante of integrantes) {
    if (estudiantesRegistrados.includes(estudiante)) {
      alert(`El estudiante ${estudiante} ya participa en otro proyecto.`); // Alerta si ya está en otro proyecto
      return; // Detiene la ejecución
    }
  }

  // Validar que la fecha esté dentro del rango permitido
  const fechaPostulacion = new Date(fecha); // Fecha que se ingresó
  const inicioConvocatoria = new Date('2025-01-01'); // Fecha de inicio válida
  const finConvocatoria = new Date('2025-06-30'); // Fecha de fin válida

  // Comprobar si la fecha está fuera del rango
  if (fechaPostulacion < inicioConvocatoria || fechaPostulacion > finConvocatoria) {
    alert('La fecha está fuera del periodo de convocatoria.'); // Alerta si la fecha es inválida
    return; // Detiene la ejecución
  }

  // Validar que se haya entregado documento ético si se requiere
  if (requiereEtica && !documentoEtico) {
    alert('El proyecto requiere documento ético y no ha sido entregado.'); // Alerta si falta el documento
    return; // Detiene la ejecución
  }

  // Crear un nuevo objeto con los datos del proyecto
  const nuevoProyecto = {
    titulo, // Título del proyecto
    categoria, // Categoría del proyecto
    integrantes, // Lista de estudiantes
    avance, // Estado de avance
    fecha, // Fecha de postulación
    grupo, // Grupo o curso
    requiereEtica, // Si requiere revisión ética
    documentoEtico, // Documento de ética (si aplica)
    estado: 'registrado' // Estado inicial del proyecto
  };

  // Agregar el nuevo proyecto a la lista de proyectos
  proyectos.push(nuevoProyecto);

  // Agregar los integrantes a la lista de estudiantes registrados
  estudiantesRegistrados.push(...integrantes);

  // Guardar los datos actualizados en localStorage
  localStorage.setItem('proyectos', JSON.stringify(proyectos)); // Guardar proyectos
  localStorage.setItem('estudiantes', JSON.stringify(estudiantesRegistrados)); // Guardar estudiantes

  // Mostrar mensaje de éxito
  alert('Proyecto registrado con éxito.');

  // Limpiar el formulario
  form.reset();
});

// Función para mostrar los proyectos guardados en la vista de administrador
function mostrarProyectos() {
  lista.innerHTML = ''; // Limpiar la lista actual

  // Recorrer todos los proyectos y mostrarlos como elementos de lista
  proyectos.forEach((proyecto, index) => {
    const item = document.createElement('li'); // Crear elemento de lista
    item.textContent = `#${index + 1} - ${proyecto.titulo} (${proyecto.estado}) - ${proyecto.categoria}`; // Texto con información del proyecto
    lista.appendChild(item); // Agregar el elemento a la lista del DOM
  });
}

// Evento para borrar todos los registros desde el panel de admin
btnBorrarRegistros.addEventListener('click', () => {
  // Confirmación del usuario antes de borrar
  if (confirm('¿Estás seguro de borrar todos los registros?')) {
    // Borrar datos del almacenamiento local
    localStorage.removeItem('proyectos'); // Eliminar los proyectos guardados
    localStorage.removeItem('estudiantes'); // Eliminar los estudiantes registrados

    // Vaciar las variables locales
    proyectos = [];
    estudiantesRegistrados = [];

    // Llamar a la función para actualizar la lista vacía en pantalla
    mostrarProyectos();
  }
});
