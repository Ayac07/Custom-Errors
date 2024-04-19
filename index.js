const log4js = require('../../helpers/logger');
const logger = log4js.getLogger('errorHandler');

class CustomError extends Error {
    constructor(message = 'Ocurrió un error', code = 500, errors = null, infoPeticion = {}) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.errors = Array.isArray(errors) ? errors : [errors];
        Error.captureStackTrace(this, this.constructor);
        this.infoPeticion = infoPeticion;
    }

    static badRequest(message = 'Solicitud incorrecta', errors = null, infoPeticion = {}) {
        return new CustomError(message, 400, errors, infoPeticion);
    }

    static unauthorized(message = 'No autorizado', errors = null, infoPeticion = {}) {
        return new CustomError(message, 401, errors, infoPeticion);
    }

    static invalidParameters(message = 'No autorizado', errors = null, infoPeticion = {}) {
        return new CustomError(message, 402, errors, infoPeticion);
    }

    static forbidden(message = 'Prohibido', errors = null, infoPeticion = {}) {
        return new CustomError(message, 403, errors, infoPeticion);
    }

    static notFound(message = 'No encontrado', errors = null, infoPeticion = {}) {
        return new CustomError(message, 404, errors, infoPeticion);
    }

    static conflict(message = 'Conflictos en la peticion', errors = null, infoPeticion = {}) {
        return new CustomError(message, 409, errors, infoPeticion);
    }
}

const errorHandler = (log4js, appenderName) => {
    const logger = log4js.getLogger(appenderName);

    return async function (error, req, res, next) {
        try {
            let errorCode = error.code || 500;
            let errorList = null;

            if (validStatuses.includes(errorCode)) {
                errorCode = error.code;
            }

            if (error instanceof CustomError) {
                errorList = error.errors;
            } else {
                error = new CustomError(error.message, errorCode, error);
            }

            error.infoPeticion = req.infoPeticion;
            errorList = { message: error.message, code: errorCode, name: error.name || '' };

            const data = { error: error.message, errorList };

            logger[errorCode >= 400 && errorCode < 500 ? 'warn' : 'error'](`${errorCode >= 400 && errorCode < 500 ? 'WARN' : 'ERROR'}: En Handler`, error);

            res.status(errorCode).send(data);
        } catch (err) {
            logger.error('Error en el manejador de errores:', err);
            res.status(500).send('Error interno del servidor');
        }
    };
};

const validStatuses = [
    202, //proceso activo
    400, //Peticion mala
    401, //No autorizado o permisos no suficientes
    402, //Faltaron datos en los parametros
    403, //No autorizado o permisos no suficientes
    404, //No encontrado, ruta no existe
    405, //Metodo no permitido por el servidor
    407, //Se require autentificacion en el proxy
    409, //Datos duplicados
    422, //datos secuencia incompletos
    500, //Error en el servidor 
];

module.exports = { CustomError, errorHandler };
