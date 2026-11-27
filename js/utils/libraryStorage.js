import { Library } from "../models/Library.js";
import { StorageAPI } from "./storage.js";

const LIBRARY_STORAGE_KEY = "mlb:biblioteca:listaPersonal";

/**
 * @typedef {{ok: boolean, data: Library, error: null | {type: "storage" | "domain", message: string, cause?: Error}}} LibraryStorageResult
 * Result returned by library persistence operations. `data` always contains
 * the usable library, including the restored copy after a failed mutation.
 */

/**
 * Persistence facade for loading, saving, and transactionally updating the
 * personal library. It merges valid stored entries over the catalog defaults
 * and restores the previous in-memory state when a change cannot be persisted.
 *
 * @module LibraryStorage
 */
export const LibraryStorage = {
  /**
   * Loads the personal library, merges valid known entries over initial
   * catalog state, and writes the normalized full library back to storage.
   * Invalid entries and records for unknown catalog items are ignored.
   *
   * @param {import("../models/Catalog.js").Catalog} catalog Catalog supplying
   *   the default library state and valid content identifiers.
   * @returns {LibraryStorageResult} The usable library and any initial save
   *   error. A failed read is treated as no saved data by `StorageAPI`.
   */
  cargar(catalog) {
    const storedEntries = StorageAPI.obtener(LIBRARY_STORAGE_KEY);
    return this.guardar(Library.restore(catalog, storedEntries));
  },

  /**
   * Saves the complete serializable state of a library.
   *
   * Storage and serialization failures are reported in the result rather
   * than thrown.
   *
   * @param {Library} library Library whose `toJSON()` data should be saved.
   * @returns {LibraryStorageResult} The same library and a storage error when
   *   the write fails.
   */
  guardar(library) {
    const ok = StorageAPI.guardar(LIBRARY_STORAGE_KEY, library.toJSON());
    return {
      ok,
      data: library,
      error: ok
        ? null
        : {
            type: "storage",
            message: "No se pudo guardar la biblioteca.",
          },
    };
  },

  /**
   * Applies a domain change and persists it as one operation. A rejected or
   * throwing change returns the unchanged snapshot; a failed write returns
   * the snapshot so the controller can restore its state and interface.
   *
   * @param {Library} library Library to update.
   * @param {() => boolean} cambio Domain mutation returning whether it changed
   *   the library.
   * @returns {LibraryStorageResult} Updated library on success, or a restored
   *   snapshot plus a typed domain/storage error.
   * @throws {TypeError} If `cambio` is not a function.
   */
  cambiar(library, cambio) {
    if (typeof cambio !== "function") {
      throw new TypeError("El cambio de biblioteca debe ser una función.");
    }

    const previousLibrary = Library.fromJSON(library.toJSON());
    let changed;
    let cause;
    try {
      changed = cambio();
    } catch (error) {
      changed = false;
      cause = error;
    }

    if (!changed) {
      return {
        ok: false,
        data: previousLibrary,
        error: {
          type: "domain",
          message: "El cambio de biblioteca fue rechazado.",
          ...(cause ? { cause } : {}),
        },
      };
    }

    const result = this.guardar(library);
    return result.ok ? result : { ...result, data: previousLibrary };
  },
};
