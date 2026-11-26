# m4pl3-studio-canvas

Un tema de Claude basado en el sistema de diseño de M4PL3, "The Studio Canvas": papel crema con una
cuadrícula de 56px, contornos de tinta de 2px, sombras duras sin desenfoque y un solo acento rojo ladrillo.
Tus mensajes salen como stickers (mantequilla, menta, rojo y tinta), las respuestas como tarjetas blancas y las
llamadas a herramientas como chips. Es solo modo claro, como pide el sistema de diseño.

## Instalar

En una sesión de Claude Code en la terminal:

```
/plugin install m4pl3-studio-canvas --marketplace abdalotaa/m4pl3-claude-theme
```

Responde `y` para agregar el marketplace y elige el alcance. También puedes clonar el repositorio y cargarlo
con `claude --plugin-dir <carpeta>`.

## Qué hay dentro

Los colores salen de `hooks/make-colors.js`, un ayudante que viene con la herramienta de mods de Claude; el
estilo (stickers, tarjetas, cuadrícula) está en `hooks/register.ts`. Los botones de la app, la letra Archivo y la
letra a mano no se pueden cambiar desde un tema.
