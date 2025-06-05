// Configura tu Firebase aquí
const firebaseConfig = {
  apiKey: "AIzaSyAUXP02D_N2sDxSy4W73U0hY4dlIbXAX-Q", // Clave de API de Firebase
  authDomain: "registro-de-proyecto.firebaseapp.com", // Dominio de autenticación
  projectId: "registro-de-proyecto", // ID del proyecto de Firebase
  storageBucket: "registro-de-proyecto.firebasestorage.app", // Bucket para almacenamiento de archivos
  messagingSenderId: "745668793730", // ID del remitente para notificaciones
  appId: "1:745668793730:web:64d4b18ef1cbc4c25fab9b" // ID de la aplicación
};

// Inicializar Firebase con la configuración anterior
firebase.initializeApp(firebaseConfig);

// Obtener instancia de Firestore (base de datos en la nube de Firebase)
const db = firebase.firestore();

// Elementos del DOM (interfaz HTML)
const loginContainer = document.getElementById('loginContainer'); // Contenedor del formulario de inicio de sesión
const formContainer = document.getElementById('formContainer'); // Contenedor del formulario para estudiantes
const adminContainer = document.getElementById('adminContainer'); // Contenedor del panel de administración
const btnIngresar = document.getElementById('btnIngresar'); // Botón de ingresar
const rolSelect = document.getElementById('rol'); // Selector de rol (estudiante o admin)
const adminPasswordContainer = document.getElementById('adminPasswordContainer'); // Contenedor del campo de contraseña para admin
const adminPasswordInput = document.getElementById('adminPassword'); // Input de contraseña del admin
const form = document.getElementById('projectForm'); // Formulario del proyecto
const lista = document.getElementById('listaProyectos'); // Lista donde se muestran los proyectos (admin)
const btnBorrarRegistros = document.getElementById('btnBorrarRegistros'); // Botón para borrar todos los registros
const btnCerrarSesionEstudiante = document.getElementById('btnCerrarSesionEstudiante'); // Botón para cerrar sesión estudiante
const btnCerrarSesionAdmin = document.getElementById('btnCerrarSesionAdmin'); // Botón para cerrar sesión admin

// Mostrar u ocultar el campo de contraseña si el rol es admin
rolSelect.addEventListener('change', () => {
  adminPasswordContainer.style.display = rolSelect.value === 'admin' ? 'block' : 'none';
});

// Evento al hacer clic en el botón "Ingresar"
btnIngresar.addEventListener('click', async () => {
  const rol = rolSelect.value; // Obtener el rol seleccionado

  // Si el rol es estudiante, mostrar formulario y ocultar login
  if (rol === 'estudiante') {
    loginContainer.style.display = 'none';
    formContainer.style.display = 'block';
  } 
  // Si el rol es admin, validar contraseña
  else if (rol === 'admin') {
    const password = adminPasswordInput.value; // Obtener la contraseña ingresada
    if (password === 'Eliam0015') { // Validar si la contraseña es correcta
      loginContainer.style.display = 'none';
      adminContainer.style.display = 'block';
      mostrarProyectos(); // Mostrar los proyectos registrados
    } else {
      alert('Contraseña incorrecta'); // Alerta si la contraseña está mal
    }
  } else {
    alert('Selecciona un rol'); // Alerta si no se seleccionó rol
  }
});

// Evento para cerrar sesión del estudiante
btnCerrarSesionEstudiante.addEventListener('click', () => {
  formContainer.style.display = 'none'; // Ocultar formulario del estudiante
  loginContainer.style.display = 'block'; // Mostrar login
});

// Evento para cerrar sesión del admin
btnCerrarSesionAdmin.addEventListener('click', () => {
  adminContainer.style.display = 'none'; // Ocultar panel admin
  loginContainer.style.display = 'block'; // Mostrar login
});

// Evento al enviar el formulario del proyecto
form.addEventListener('submit', async function (event) {
  event.preventDefault(); // Evitar que se recargue la página

  // Obtener los valores de cada campo del formulario
  const titulo = document.getElementById('titulo').value.trim();
  const categoria = document.getElementById('categoria').value;
  const integrantes = document.getElementById('integrantes').value.split(',').map(e => e.trim()); // Convertir a array
  const avance = document.getElementById('avance').value;
  const fecha = document.getElementById('fecha').value;
  const grupo = document.getElementById('grupo').value.trim();
  const requiereEtica = document.getElementById('requiereEtica').checked; // Checkbox
  const documentoEtico = document.getElementById('documentoEtico').value.trim();

  // Validar que haya entre 2 y 5 estudiantes
  if (integrantes.length < 2 || integrantes.length > 5) {
    alert('El proyecto debe tener entre 2 y 5 estudiantes.');
    return;
  }

  // Validar que la fecha esté dentro del periodo permitido
  const fechaPostulacion = new Date(fecha);
  const inicioConvocatoria = new Date('2025-01-01');
  const finConvocatoria = new Date('2025-06-30');
  if (fechaPostulacion < inicioConvocatoria || fechaPostulacion > finConvocatoria) {
    alert('La fecha está fuera del periodo de convocatoria.');
    return;
  }

  // Validar que si requiere ética, se haya entregado documento
  if (requiereEtica && !documentoEtico) {
    alert('El proyecto requiere documento ético y no ha sido entregado.');
    return;
  }

  // Verificar que ningún estudiante esté en otro proyecto
  const snapshot = await db.collection("proyectos").get(); // Obtener todos los proyectos
  for (const doc of snapshot.docs) {
    const otros = doc.data().integrantes; // Integrantes del proyecto existente
    for (const estudiante of integrantes) {
      if (otros.includes(estudiante)) {
        alert(`El estudiante ${estudiante} ya participa en otro proyecto.`);
        return;
      }
    }
  }

  // Crear un nuevo objeto con los datos del proyecto
  const nuevoProyecto = {
    titulo,
    categoria,
    integrantes,
    avance,
    fecha,
    grupo,
    requiereEtica,
    documentoEtico,
    estado: 'registrado' // Estado inicial del proyecto
  };

  // Guardar el nuevo proyecto en Firestore
  await db.collection("proyectos").add(nuevoProyecto);

  alert('Proyecto registrado con éxito.'); // Confirmación
  form.reset(); // Limpiar el formulario
});

// Función para mostrar todos los proyectos en el panel de administrador
async function mostrarProyectos() {
  lista.innerHTML = ''; // Limpiar la lista anterior
  const snapshot = await db.collection("proyectos").get(); // Obtener los proyectos de Firebase
  snapshot.forEach((doc, index) => {
    const proyecto = doc.data(); // Obtener los datos del proyecto
    const item = document.createElement('li'); // Crear un elemento de lista
    // Mostrar número, título, estado y categoría
    item.textContent = `#${index + 1} - ${proyecto.titulo} (${proyecto.estado}) - ${proyecto.categoria}`;
    lista.appendChild(item); // Agregar a la lista en HTML
  });
}

// Evento para borrar todos los registros de proyectos
btnBorrarRegistros.addEventListener('click', async () => {
  if (confirm('¿Estás seguro de borrar todos los registros?')) { // Confirmación del usuario
    const snapshot = await db.collection("proyectos").get(); // Obtener todos los proyectos
    const batch = db.batch(); // Crear lote para eliminar varios documentos
    snapshot.forEach(doc => {
      batch.delete(doc.ref); // Agregar a lote de eliminación
    });
    await batch.commit(); // Ejecutar la eliminación en lote
    mostrarProyectos(); // Actualizar la lista
  }
});
