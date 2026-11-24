import { StorageAPI } from "../utils/storage.js";
import { LibraryStorage } from "../utils/libraryStorage.js";
import { Catalog } from "../models/Catalog.js";
import { Content } from "../models/Content.js";
import { Library } from "../models/Library.js";

const storageTypes = ["local", "session"];
const LIBRARY_STORAGE_KEY = "mlb:biblioteca:listaPersonal";

describe("StorageAPI", function () {
  beforeEach(function () {
    localStorage.clear();
    sessionStorage.clear();
  });

  storageTypes.forEach(function (type) {
    describe(`${type}Storage`, function () {
      it("guarda y obtiene valores JSON, devolviendo null si la clave no existe", function () {
        expect(StorageAPI.guardar("test:item", { title: "Dark" }, type)).toBeTrue();
        expect(StorageAPI.obtener("test:item", type)).toEqual({ title: "Dark" });
        expect(StorageAPI.obtener("test:missing", type)).toBeNull();
      });

      it("actualiza una clave existente y rechaza una inexistente", function () {
        const warning = spyOn(console, "warn");
        StorageAPI.guardar("test:item", { version: 1 }, type);

        expect(StorageAPI.actualizar("test:item", { version: 2 }, type)).toBeTrue();
        expect(StorageAPI.obtener("test:item", type)).toEqual({ version: 2 });
        expect(StorageAPI.actualizar("test:missing", "value", type)).toBeFalse();
        expect(warning).toHaveBeenCalled();
      });

      it("actualiza una clave existente cuyo valor es null", function () {
        StorageAPI.guardar("test:null", null, type);

        expect(StorageAPI.actualizar("test:null", "updated", type)).toBeTrue();
        expect(StorageAPI.obtener("test:null", type)).toBe("updated");
      });

      it("elimina claves y lista solamente las que coinciden con el prefijo", function () {
        StorageAPI.guardar("catalog:one", 1, type);
        StorageAPI.guardar("catalog:two", 2, type);
        StorageAPI.guardar("library:one", 3, type);

        expect(StorageAPI.listar("catalog:", type).sort()).toEqual([
          "catalog:one",
          "catalog:two",
        ]);
        expect(StorageAPI.eliminar("catalog:one", type)).toBeTrue();
        expect(StorageAPI.obtener("catalog:one", type)).toBeNull();
        expect(StorageAPI.listar("catalog:", type)).toEqual(["catalog:two"]);
      });

      it("limpia únicamente el storage seleccionado", function () {
        const otherType = type === "local" ? "session" : "local";
        StorageAPI.guardar("test:item", "value", type);
        StorageAPI.guardar("test:other", "preserved", otherType);

        expect(StorageAPI.limpiar(type)).toBeTrue();
        expect(StorageAPI.obtener("test:item", type)).toBeNull();
        expect(StorageAPI.obtener("test:other", otherType)).toBe("preserved");
      });

      it("devuelve null y reporta errores si el valor almacenado no es JSON válido", function () {
        const error = spyOn(console, "error");
        const storage = type === "local" ? localStorage : sessionStorage;
        storage.setItem("test:corrupt", "{no es json");

        expect(StorageAPI.obtener("test:corrupt", type)).toBeNull();
        expect(error).toHaveBeenCalled();
      });

      it("maneja QuotaExceededError al guardar sin propagar la excepción", function () {
        const storage = type === "local" ? localStorage : sessionStorage;
        const quotaError = Object.assign(new Error("storage full"), {
          name: "QuotaExceededError",
        });
        const setItem = spyOn(storage, "setItem").and.callFake(function () {
          throw quotaError;
        });
        const error = spyOn(console, "error");

        expect(StorageAPI.guardar("test:full", "value", type)).toBeFalse();
        expect(setItem).toHaveBeenCalled();
        expect(error).toHaveBeenCalled();
      });
    });
  });

  it("devuelve false y reporta un error si el valor no se puede serializar", function () {
    const circular = {};
    circular.self = circular;
    const error = spyOn(console, "error");

    expect(StorageAPI.guardar("test:circular", circular)).toBeFalse();
    expect(error).toHaveBeenCalled();
  });

  it("rechaza un tipo de storage inválido sin guardar en sessionStorage", function () {
    const error = spyOn(console, "error");

    expect(StorageAPI.guardar("test:invalid", "value", "xyz")).toBeFalse();
    expect(sessionStorage.getItem("test:invalid")).toBeNull();
    expect(error).toHaveBeenCalled();
    expect(error.calls.mostRecent().args[0]).toContain("[Storage Error]");
    expect(error.calls.mostRecent().args[1].name).toBe("TypeError");
  });

  it("carga y normaliza la biblioteca mediante resultados tipados", function () {
    const catalog = new Catalog([
      new Content("dark", "Dark", "Serie", 2017, ["Misterio"], "pending"),
    ]);
    StorageAPI.guardar(LIBRARY_STORAGE_KEY, [
      {
        titleId: "dark",
        status: "watched",
        isFavorite: true,
        rating: 4,
      },
    ]);

    const result = LibraryStorage.cargar(catalog);

    expect(result.ok).toBeTrue();
    expect(result.error).toBeNull();
    expect(result.data).toEqual(jasmine.any(Library));
    expect(result.data.toJSON()).toEqual([
      { titleId: "dark", status: "watched", isFavorite: true, rating: 4 },
    ]);
  });

  it("devuelve la biblioteca anterior y un error de storage al fallar el guardado", function () {
    const catalog = new Catalog([
      new Content("dark", "Dark", "Serie", 2017, ["Misterio"], "pending"),
    ]);
    const library = Library.createInitial(catalog);
    const originalData = library.toJSON();
    spyOn(StorageAPI, "guardar").and.returnValue(false);

    const result = LibraryStorage.cambiar(library, () =>
      library.addFavorite(catalog.findById("dark")),
    );

    expect(result.ok).toBeFalse();
    expect(result.error.type).toBe("storage");
    expect(result.data.toJSON()).toEqual(originalData);
  });
});
