import { StorageAPI } from "../utils/storage.js";

const storageTypes = ["local", "session"];

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
});
