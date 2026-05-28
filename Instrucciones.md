---
Titulo: "Manual e Instrucciones de Desarrollo Web Personal"
created: 2026-05-28
updated: 2026-05-28
tags: [ia, ai, prompts, no-procesar]
Resumen: "Guía introductoria y manual operativo para el desarrollo de la web personal de Martín Sánchez utilizando HTML/CSS, GitHub y Vercel."
---

# Guía de Desarrollo Web Personal: CV & Wiki

Este manual documenta el funcionamiento, los conceptos y la ruta de creación de tu sitio web personal. El objetivo es darte control absoluto sobre tus archivos sin depender de suscripciones de pago ni constructores visuales cerrados.

---

## 1. Conceptos Fundamentales (Glosario de Primeros Principios)

Para entender cómo se publica tu web, primero debes comprender el rol de cada tecnología involucrada:

### ¿Qué es una Página Web?
Es un conjunto de archivos de texto estructurado y recursos (como imágenes o PDFs) que se almacenan en un servidor conectado a internet. Cuando escribes una dirección web (URL), tu navegador (Chrome, Safari) descarga estos archivos y los interpreta visualmente.

### HTML (HyperText Markup Language)
*   **Qué es:** El esqueleto o estructura de la página.
*   **Función:** Define *qué* elementos hay en la pantalla. Indica dónde hay un título (`<h1>`), un párrafo (`<p>`), una sección (`<section>`) o un botón (`<a>`).
*   **En tu proyecto:** Es el archivo [index.html](file://index.html).

### CSS (Cascading Style Sheets)
*   **Qué es:** El diseño visual y los estilos.
*   **Función:** Define *cómo* se ven los elementos definidos por el HTML. Controla los colores, las tipografías, el espaciado, los efectos de transparencia (glassmorphic) y la adaptación a celulares (responsividad).
*   **En tu proyecto:** Es el archivo [styles.css](file://styles.css).

### Git & GitHub
*   **Git:** Es un programa que corre en tu Mac y que funciona como una "máquina del tiempo" para tu código. Registra cada línea que modificas, permitiéndote volver atrás si algo se rompe.
*   **GitHub:** Es una plataforma en la nube que almacena tus carpetas con el historial de cambios de Git. Es el almacén de seguridad de tus archivos.

### Vercel
*   **Qué es:** El hosting o servidor.
*   **Función:** Conecta con tu cuenta de GitHub, descarga tu código cada vez que haces un cambio y lo distribuye a nivel global para que cargue en milisegundos en cualquier parte del mundo.

---

## 2. Guía de Configuración Inicial (El Setup)

Sigue estos tres pasos para dejar el sistema listo:

### Paso A: Preparar las Cuentas
1.  Crea una cuenta gratuita en [GitHub](https://github.com).
2.  Crea una cuenta gratuita en [Vercel](https://vercel.com) seleccionando **"Continue with GitHub"** para vincularlas de forma automática.

### Paso B: Instalar el Editor
Descarga e instala [Visual Studio Code](https://code.visualstudio.com) en tu Mac. Este programa te permitirá abrir la carpeta de tu web, ver la estructura con colores de sintaxis legibles y realizar modificaciones fácilmente.

---

## 3. Flujo de Trabajo Diario (Cómo actualizar tu web)

Una vez que tu web esté vinculada a GitHub y Vercel, actualizarla es un proceso automático de 3 pasos:

```
[ 1. Editar en VS Code ] ──► [ 2. Guardar archivo ] ──► [ 3. Enviar a GitHub ] ──► [ Vercel actualiza la web ]
```

1.  **Abrir el proyecto:** Abre Visual Studio Code y arrastra la carpeta `/Varios/Pagina web` dentro de él.
2.  **Modificar textos:** Abre `index.html` y cambia los datos necesarios (ej. tus datos de contacto o tu descripción).
3.  **Sincronizar:**
    *   En la barra lateral izquierda de VS Code, haz clic en el icono de **Source Control** (Control de Código, parece una bifurcación de red).
    *   Escribe un mensaje corto sobre lo que cambiaste (ej. *"Actualización de email"*).
    *   Haz clic en **Commit** y luego en **Sync Changes** (Sincronizar cambios).
4.  **Ver el cambio en vivo:** En menos de un minuto, Vercel detectará el envío y actualizará tu web pública de forma automática.

---

## 4. La Wiki en el Futuro (Quartz)

La carpeta [content/wiki/](file://content/wiki/) está reservada para cuando desees activar tu base de conocimiento pública. 

### ¿Cómo funcionará?
Cuando decidas configurar Quartz (lo cual requiere el uso de comandos de terminal una única vez), este leerá directamente tu carpeta `wiki/` de Obsidian. Podrás escribir notas normales en Markdown en Obsidian, y aquellas que decidas publicar se convertirán en páginas web interactivas dentro de `tu-dominio.com/wiki` de forma automática cada vez que sincronices con GitHub.
