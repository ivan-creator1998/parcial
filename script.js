// Configura tu Firebase aquí
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Elementos del DOM
const loginContainer = document.getElementById('loginContainer');
const formContainer = document.getElementById('formContainer');
const adminContainer = document.getElementById('adminContainer');
const btnIngresar = document.getElementById('btnIngresar');
const rolSelect = document.getElementById('rol');
const adminPasswordContainer = document.getElementById('adminPasswordContainer');
const adminPasswordInput = document.getElementById('adminPassword');
const form = document.getElementById('projectForm');
const lista = document.getElementById('listaProyectos');
const btnBorrarRegistros = document.getElementById('btnBorrarRegistros');
const btnCerrarSesionEstudiante = document.getElementById('btnCerrarSesionEstudiante');
const btnCerrarSesionAdmin = document.getElementById('btnCerrarSesionAdmin');

rolSelect.addEventListener('change', () => {
  adminPasswordContainer.style.display = rolSelect.value === 'admin' ? 'block' : 'none';
});

btnIngresar.addEventListener('click', async () => {
  const rol = rolSelect.value;
  if (rol === 'estudiante') {
    loginContainer.style.display = 'none';
    formContainer.style.display = 'block';
  } else if (rol === 'admin') {
    const password = adminPasswordInput.value;
    if (password === 'admin123') {
      loginContainer.style.display = 'none';
      adminContainer.style.display = 'block';
      mostrarProyectos();
    } else {
      alert('Contraseña incorrecta');
    }
  } else {
    alert('Selecciona un rol');
  }
});

btnCerrarSesionEstudiante.addEventListener('click', () => {
  formContainer.style.display = 'none';
  loginContainer.style.display = 'block';
});

btnCerrarSesionAdmin.addEventListener('click', () => {
  adminContainer.style.display = 'none';
  loginContainer.style.display = 'block';
});

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const categoria = document.getElementById('categoria').value;
  const integrantes = document.getElementById('integrantes').value.split(',').map(e => e.trim());
  const avance = document.getElementById('avance').value;
  const fecha = document.getElementById('fecha').value;
  const grupo = document.getElementById('grupo').value.trim();
  const requiereEtica = document.getElementById('requiereEtica').checked;
  const documentoEtico = document.getElementById('documentoEtico').value.trim();

  if (integrantes.length < 2 || integrantes.length > 5) {
    alert('El proyecto debe tener entre 2 y 5 estudiantes.');
    return;
  }

  const fechaPostulacion = new Date(fecha);
  const inicioConvocatoria = new Date('2025-01-01');
  const finConvocatoria = new Date('2025-06-30');
  if (fechaPostulacion < inicioConvocatoria || fechaPostulacion > finConvocatoria) {
    alert('La fecha está fuera del periodo de convocatoria.');
    return;
  }

  if (requiereEtica && !documentoEtico) {
    alert('El proyecto requiere documento ético y no ha sido entregado.');
    return;
  }

  // Validar que ningún integrante ya esté registrado
  const snapshot = await db.collection("proyectos").get();
  for (const doc of snapshot.docs) {
    const otros = doc.data().integrantes;
    for (const estudiante of integrantes) {
      if (otros.includes(estudiante)) {
        alert(`El estudiante ${estudiante} ya participa en otro proyecto.`);
        return;
      }
    }
  }

  const nuevoProyecto = {
    titulo,
    categoria,
    integrantes,
    avance,
    fecha,
    grupo,
    requiereEtica,
    documentoEtico,
    estado: 'registrado'
  };

  await db.collection("proyectos").add(nuevoProyecto);

  alert('Proyecto registrado con éxito.');
  form.reset();
});

async function mostrarProyectos() {
  lista.innerHTML = '';
  const snapshot = await db.collection("proyectos").get();
  snapshot.forEach((doc, index) => {
    const proyecto = doc.data();
    const item = document.createElement('li');
    item.textContent = `#${index + 1} - ${proyecto.titulo} (${proyecto.estado}) - ${proyecto.categoria}`;
    lista.appendChild(item);
  });
}

btnBorrarRegistros.addEventListener('click', async () => {
  if (confirm('¿Estás seguro de borrar todos los registros?')) {
    const snapshot = await db.collection("proyectos").get();
    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    mostrarProyectos();
  }
});
