function obtenerStorage(tipo = 'local') {
    if (tipo === 'local') return localStorage;
    if (tipo === 'session') return sessionStorage;
    throw new TypeError("El tipo de storage debe ser 'local' o 'session'.");
}

export const StorageAPI = {
    guardar: (clave, valor, tipo = 'local') => {
        try {
            const storage = obtenerStorage(tipo);
            const valorSerializado = JSON.stringify(valor);
            storage.setItem(clave, valorSerializado);
            return true;
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error(`[Storage Error] Almacenamiento lleno. No se pudo guardar: ${clave}`);
            } else {
                console.error(`[Storage Error] Fallo al guardar la clave ${clave}:`, error);
            }
            return false;
        }
    },

    obtener: (clave, tipo = 'local') => {
        try {
            const storage = obtenerStorage(tipo);
            const dato = storage.getItem(clave);
            return dato ? JSON.parse(dato) : null;
        } catch (error) {
            console.error(`[Storage Error] Datos corruptos al obtener la clave ${clave}.`, error);
            return null;
        }
    },

    actualizar: (clave, valor, tipo = 'local') => {
        try {
            const storage = obtenerStorage(tipo);
            if (storage.getItem(clave) !== null) {
                return StorageAPI.guardar(clave, valor, tipo);
            }
            console.warn(`[Storage Warning] Clave inexistente, no se puede actualizar: ${clave}`);
            return false;
        } catch (error) {
            console.error(`[Storage Error] Fallo al actualizar la clave ${clave}:`, error);
            return false;
        }
    },

    eliminar: (clave, tipo = 'local') => {
        try {
            const storage = obtenerStorage(tipo);
            storage.removeItem(clave);
            return true;
        } catch (error) {
            console.error(`[Storage Error] Fallo al eliminar la clave ${clave}:`, error);
            return false;
        }
    },

    listar: (prefijo, tipo = 'local') => {
        try {
            const storage = obtenerStorage(tipo);
            const claves = [];
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                if (key.startsWith(prefijo)) claves.push(key);
            }
            return claves;
        } catch (error) {
            console.error(`[Storage Error] Fallo al listar con prefijo ${prefijo}:`, error);
            return [];
        }
    },

    limpiar: (tipo = 'local') => {
        try {
            const storage = obtenerStorage(tipo);
            storage.clear();
            return true;
        } catch (error) {
            console.error(`[Storage Error] Fallo al limpiar el storage ${tipo}:`, error);
            return false;
        }
    }
};