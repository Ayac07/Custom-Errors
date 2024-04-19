# CustomError & errorHandler Middleware

CustomError es una clase de JavaScript que extiende la clase Error para proporcionar una manera conveniente de crear errores personalizados con información adicional, como un código de estado HTTP, una lista de errores relacionados y detalles de la petición. Mientras tanto, errorHandler es un middleware de Express para manejar errores de manera centralizada en una aplicación Node.js, proporcionando una forma conveniente de crear y enviar respuestas de error con detalles adicionales, como códigos de estado HTTP y mensajes de error personalizados.

## Instalación

Para instalar la librería, puedes utilizar npm o yarn:

```bash
npm install custom-errors-lib
```

o

```bash
yarn add custom-errors-lib
```

## Uso

```javascript
const { CustomError, errorHandler } = require('custom-errors-lib');
const log4js = require('ruta-configuracion-log4js');

// Agregar middleware errorHandler al final de las definiciones de ruta
app.use(errorHandler(log4js, 'errorHandler'));

// Lanzar un error personalizado en una ruta
app.get('/ruta', (req, res, next) => {
  try {
    // Lógica de la ruta que puede lanzar un error
    throw CustomError.notFound('Recurso no encontrado');
  } catch (error) {
    next(error); // Pasar el error al middleware errorHandler
  }
});
```

## API

### errorHandler(error, req, res, next)

Middleware de Express que maneja errores de manera centralizada. Se debe colocar al final de las definiciones de ruta para capturar y manejar errores en la aplicación.

### CustomError

CustomError es una clase que extiende la clase Error de JavaScript para crear errores personalizados con detalles adicionales, como códigos de estado HTTP, mensajes de error y una lista de errores relacionados.

#### Métodos estáticos

- `CustomError.badRequest(message [, errors [, infoPeticion]])`: Crea una instancia de CustomError con un código de estado HTTP 400 (Solicitud incorrecta).
- `CustomError.unauthorized(message [, errors [, infoPeticion]])`: Crea una instancia de CustomError con un código de estado HTTP 401 (No autorizado).
- `CustomError.invalidParameters(message [, errors [, infoPeticion]])`: Crea una instancia de CustomError con un código de estado HTTP 402 (Parámetros inválidos).
- `CustomError.forbidden(message [, errors [, infoPeticion]])`: Crea una instancia de CustomError con un código de estado HTTP 403 (Prohibido).
- `CustomError.notFound(message [, errors [, infoPeticion]])`: Crea una instancia de CustomError con un código de estado HTTP 404 (No encontrado).
- `CustomError.conflict(message [, errors [, infoPeticion]])`: Crea una instancia de CustomError con un código de estado HTTP 409 (Conflictos en la petición).

## Contribuir

Si encuentras un error o deseas mejorar esta librería, no dudes en enviar una solicitud de extracción en el repositorio de GitHub.
