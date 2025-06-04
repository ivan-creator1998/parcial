Sistema de Registro de Proyectos Estudiantiles
Este proyecto es una aplicación web que permite a estudiantes registrar sus proyectos académicos y a administradores visualizar todos los proyectos registrados. Está desarrollado utilizando tecnologías modernas como Firebase para la autenticación y almacenamiento de datos, y está desplegado en Vercel para facilitar su acceso.

🧩 Características Principales
Autenticación de Usuarios: Registro e inicio de sesión utilizando Firebase Authentication.

Gestión de Roles: Asignación de roles de estudiante o administrador durante el registro.

Registro de Proyectos: Los estudiantes pueden registrar nuevos proyectos académicos.

Visualización de Proyectos: Los administradores pueden visualizar todos los proyectos registrados por los estudiantes.

Interfaz Intuitiva: Diseño amigable y responsivo para una mejor experiencia de usuario.

🚀 Tecnologías Utilizadas
Frontend: HTML, CSS, JavaScript

Backend: Firebase (Authentication y Firestore)

Despliegue: Vercel

📦 Estructura del Proyecto
cpp
Copiar
Editar
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── ...
├── src/
│   ├── js/
│   │   ├── auth.js
│   │   ├── firebase.js
│   │   └── ...
│   └── css/
│       └── styles.css
├── .firebaserc
├── firebase.json
├── .gitignore
└── README.md
⚙️ Configuración del Proyecto
Prerrequisitos
Node.js instalado en tu máquina.

Cuenta en Firebase y proyecto creado.

Cuenta en Vercel para el despliegue (opcional).

Pasos para Configurar
Clonar el Repositorio

bash
Copiar
Editar
git clone https://github.com/ivan-creator1998/parcial.git
cd parcial
Instalar Dependencias

Si estás utilizando herramientas como npm o yarn:

bash
Copiar
Editar
npm install
Configurar Firebase

Crea un nuevo proyecto en Firebase.

Habilita Firebase Authentication (correo y contraseña).

Crea una base de datos Firestore.

Obtén la configuración de Firebase y reemplaza los valores en src/js/firebase.js.

javascript
Copiar
Editar
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
Iniciar el Servidor de Desarrollo

Puedes utilizar una extensión como Live Server en VSCode o configurar un servidor local:

bash
Copiar
Editar
npm start
Desplegar en Vercel (Opcional)

Inicia sesión en Vercel.

Importa el proyecto desde GitHub.

Configura los ajustes necesarios y despliega.

📄 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

🙌 Agradecimientos
Agradecimientos a todos los colaboradores y a la comunidad que ha apoyado en el desarrollo de este proyecto.
