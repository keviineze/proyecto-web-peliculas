/**
 * JSON-based CRUD helpers for browser localStorage and sessionStorage.
 *
 * Each public operation handles storage, serialization, and parsing errors
 * locally, logs the failure, and returns its documented failure value.
 *
 * @module StorageAPI
 */

/**
 * @typedef {"local" | "session"} StorageType
 * Selects persistent localStorage or sessionStorage.
 */

/**
 * Resolves a browser storage implementation by type.
 *
 * @param {StorageType} [tipo="local"] Storage implementation to use.
 * @returns {Storage} The selected browser Storage object.
 * @throws {TypeError} If `tipo` is not `"local"` or `"session"`.
 * @throws {ReferenceError} If the selected browser storage global is unavailable.
 */
function obtenerStorage(tipo = "local") {
  if (tipo === "local") return localStorage;
  if (tipo === "session") return sessionStorage;
  throw new TypeError("El tipo de storage debe ser 'local' o 'session'.");
}

/**
 * Stores a JSON-serializable value under a key.
 *
 * Storage access and serialization errors, including quota exhaustion and
 * invalid storage types, are logged and converted to `false`.
 *
 * @param {string} clave Storage key.
 * @param {*} valor Value to serialize with `JSON.stringify`.
 * @param {StorageType} [tipo="local"] Storage implementation to use.
 * @returns {boolean} `true` when the write succeeds; otherwise `false`.
 */
function guardar(clave, valor, tipo = "local") {
  try {
    const storage = obtenerStorage(tipo);
    const valorSerializado = JSON.stringify(valor);
    storage.setItem(clave, valorSerializado);
    return true;
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      console.error(`[Storage Error] Almacenamiento lleno. No se pudo guardar: ${clave}`);
    } else {
      console.error(`[Storage Error] Fallo al guardar la clave ${clave}:`, error);
    }
    return false;
  }
}

/**
 * Retrieves and parses a JSON value stored under a key.
 *
 * Missing keys, invalid JSON, and storage access errors are logged when an
 * error occurs and return `null`.
 *
 * @param {string} clave Storage key.
 * @param {StorageType} [tipo="local"] Storage implementation to use.
 * @returns {*} Parsed value, or `null` when the key is missing or unreadable.
 */
function obtener(clave, tipo = "local") {
  try {
    const storage = obtenerStorage(tipo);
    const dato = storage.getItem(clave);
    return dato ? JSON.parse(dato) : null;
  } catch (error) {
    console.error(`[Storage Error] Datos corruptos al obtener la clave ${clave}.`, error);
    return null;
  }
}

/**
 * Replaces the JSON value of an existing key without creating a new key.
 *
 * Missing keys produce a warning and `false`; storage and serialization
 * errors are logged and also return `false`.
 *
 * @param {string} clave Existing storage key.
 * @param {*} valor Replacement value to serialize.
 * @param {StorageType} [tipo="local"] Storage implementation to use.
 * @returns {boolean} `true` when the existing value is replaced; otherwise `false`.
 */
function actualizar(clave, valor, tipo = "local") {
  try {
    const storage = obtenerStorage(tipo);
    if (storage.getItem(clave) !== null) {
      return guardar(clave, valor, tipo);
    }
    console.warn(`[Storage Warning] Clave inexistente, no se puede actualizar: ${clave}`);
    return false;
  } catch (error) {
    console.error(`[Storage Error] Fallo al actualizar la clave ${clave}:`, error);
    return false;
  }
}

/**
 * Removes a key from the selected storage.
 *
 * Storage access errors are logged and return `false`.
 *
 * @param {string} clave Storage key to remove.
 * @param {StorageType} [tipo="local"] Storage implementation to use.
 * @returns {boolean} `true` when removal succeeds; otherwise `false`.
 */
function eliminar(clave, tipo = "local") {
  try {
    const storage = obtenerStorage(tipo);
    storage.removeItem(clave);
    return true;
  } catch (error) {
    console.error(`[Storage Error] Fallo al eliminar la clave ${clave}:`, error);
    return false;
  }
}

/**
 * Lists storage keys that begin with a prefix.
 *
 * Storage access errors or invalid prefix values are logged and return an
 * empty array.
 *
 * @param {string} prefijo Prefix used to filter keys.
 * @param {StorageType} [tipo="local"] Storage implementation to use.
 * @returns {string[]} Matching storage keys, or an empty array on failure.
 */
function listar(prefijo, tipo = "local") {
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
}

/**
 * Removes every key from the selected storage implementation.
 *
 * Storage access errors are logged and return `false`.
 *
 * @param {StorageType} [tipo="local"] Storage implementation to clear.
 * @returns {boolean} `true` when clearing succeeds; otherwise `false`.
 */
function limpiar(tipo = "local") {
  try {
    const storage = obtenerStorage(tipo);
    storage.clear();
    return true;
  } catch (error) {
    console.error(`[Storage Error] Fallo al limpiar el storage ${tipo}:`, error);
    return false;
  }
}

export const StorageAPI = {
  guardar,
  obtener,
  actualizar,
  eliminar,
  listar,
  limpiar,
};
