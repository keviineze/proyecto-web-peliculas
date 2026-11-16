export const StorageAPI = {
    guardar: (clave, valor, tipo = 'local') => {
        try {
            const storage = tipo === 'local' ? localStorage : sessionStorage;
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
            const storage = tipo === 'local' ? localStorage : sessionStorage;
            const dato = storage.getItem(clave);
            return dato ? JSON.parse(dato) : null;
        } catch (error) {
            console.error(`[Storage Error] Datos corruptos al obtener la clave ${clave}.`, error);
            return null;
        }
    },

    actualizar: (clave, valor, tipo = 'local') => {
        if (StorageAPI.obtener(clave, tipo) !== null) {
            return StorageAPI.guardar(clave, valor, tipo);
        }
        console.warn(`[Storage Warning] Clave inexistente, no se puede actualizar: ${clave}`);
        return false;
    },

    eliminar: (clave, tipo = 'local') => {
        try {
            const storage = tipo === 'local' ? localStorage : sessionStorage;
            storage.removeItem(clave);
            return true;
        } catch (error) {
            console.error(`[Storage Error] Fallo al eliminar la clave ${clave}:`, error);
            return false;
        }
    },

    listar: (prefijo, tipo = 'local') => {
        try {
            const storage = tipo === 'local' ? localStorage : sessionStorage;
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
            const storage = tipo === 'local' ? localStorage : sessionStorage;
            storage.clear();
            return true;
        } catch (error) {
            console.error(`[Storage Error] Fallo al limpiar el storage ${tipo}:`, error);
            return false;
        }
    }
};