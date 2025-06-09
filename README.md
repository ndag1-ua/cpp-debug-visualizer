# C++ Debug Visualizer

Extensión para Visual Studio Code que permite visualizar estructuras de datos en programas C++ durante la depuración, utilizando GDB como backend. El objetivo principal es ofrecer una representación gráfica clara e interactiva de variables complejas como punteros, clases, árboles, arreglos o estructuras anidadas.

---

## Estado del proyecto

Este proyecto está **en fase de desarrollo** y actualmente se encuentra en estado **prototipo funcional**. Algunas funcionalidades clave ya han sido implementadas, pero el soporte para ciertos tipos y estructuras está en proceso de mejora.

---

## Características principales

- Visualización gráfica de estructuras de datos en tiempo de depuración.
- Soporte para tipos simples, punteros, arreglos y clases.
- Representación mediante nodos conectados con flechas usando [LeaderLine.js](https://anseki.github.io/leader-line/).
- Interacción con el usuario mediante funciones de **zoom**, **arrastre** y **expansión/colapsado** de elementos.
- Integración con Visual Studio Code a través de la API de extensiones y del depurador GDB.

---

## Cómo probarlo

1. Clona o descarga el repositorio.
2. Abre el proyecto en Visual Studio Code.
3. Asegúrate de tener instalada la extensión oficial de C++ (ms-vscode.cpptools).
4. Pulsa `F5` o selecciona `Run > Start Debugging` para lanzar el entorno de desarrollo de extensiones (**Extension Development Host**).
5. Abre un proyecto C++ con configuración de depuración activa.
6. Establece un punto de interrupción y ejecuta la depuración.
7. Al detenerse la ejecución, la extensión mostrará un panel lateral con la visualización correspondiente.

