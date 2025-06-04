# Sistema de Registro de Proyectos Estudiantiles

Este es un proyecto universitario desarrollado con **HTML**, **CSS**, **JavaScript** y **Firebase**, que permite registrar y gestionar proyectos de innovación estudiantil.

## Características

* Registro e inicio de sesión de usuarios.
* Roles de usuario: **Estudiante** y **Administrador**.

  * **Estudiantes** pueden registrar nuevos proyectos.
  * **Administradores** pueden visualizar todos los proyectos registrados.
* Almacenamiento de datos en **Firebase Firestore**.

## Tecnologías Utilizadas

* HTML, CSS, JavaScript
* Firebase Authentication
* Firebase Firestore

## Cómo Usarlo

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ivan-creator1998/parcial.git
   ```

2. Abre el archivo `index.html` en tu navegador.

3. Regístrate o inicia sesión con tu correo y contraseña.

4. Dependiendo de tu rol:

   * Si eres estudiante, podrás **registrar proyectos**.
   * Si eres administrador, podrás **ver los proyectos registrados**.

## Estructura del Proyecto

* `index.html`: Página principal con el login y formulario.
* `app.js`: Lógica del sistema (inicio de sesión, registro, control de roles, conexión con Firebase).
* `style.css`: Estilos básicos del sitio.

## Notas

* Necesitas tener configurado Firebase en tu propio proyecto y reemplazar la configuración en el archivo `app.js`.
* Este proyecto es una base simple, puedes ampliarlo con validaciones, filtros de búsqueda o una mejor interfaz.

## Autor

Desarrollado por [ivan-creator1998](https://github.com/ivan-creator1998)
