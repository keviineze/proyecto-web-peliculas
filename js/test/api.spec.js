import { ApiService } from "../api/apiService.js";

const RAW_CATALOG = [
  {
    id: " interstellar ",
    title: " Interstellar ",
    type: "Película",
    year: 2014,
    genres: [" Ciencia ficción "],
    initialStatus: "pending",
    description: "  Una odisea espacial más allá de los agujeros de gusano.  ",
    image: "assets/images/interestellar-2.jpeg",
    imageAlt: "  Portada de Interstellar  ",
  },
  {
    id: "dark",
    title: "Dark",
    type: "Serie",
    year: 2017,
    genres: ["Misterio", "Ciencia ficción"],
    initialStatus: "watched",
  },
  {
    id: "invalido",
    title: "",
    type: "Documental",
    year: "2020",
    genres: [],
    initialStatus: "pending",
  },
];

function fakeResponse(payload, options = {}) {
  const { ok = true, status = 200 } = options;
  return {
    ok,
    status,
    json: async () => payload,
  };
}

describe("ApiService", function () {
  describe("fetchCatalog() con respuesta exitosa", function () {
    it("debe obtener datos exitosamente de la API", async function () {
      const fetchSpy = spyOn(window, "fetch").and.resolveTo(
        fakeResponse(RAW_CATALOG),
      );
      const data = await ApiService.fetchCatalog();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(2);
    });

    it("debe devolver un array con la estructura del catálogo cuando la API responde una lista", async function () {
      spyOn(window, "fetch").and.resolveTo(fakeResponse(RAW_CATALOG));
      const data = await ApiService.fetchCatalog();
      expect(data.length).toBe(2);
      data.forEach(function (item) {
        expect(typeof item.id).toBe("string");
        expect(typeof item.title).toBe("string");
        expect(item.type === "Película" || item.type === "Serie").toBe(true);
        expect(Number.isInteger(item.year)).toBe(true);
        expect(Array.isArray(item.genres)).toBe(true);
      });
    });

    it("debe aceptar el payload envuelto en la clave catalog", async function () {
      spyOn(window, "fetch").and.resolveTo(
        fakeResponse({ catalog: RAW_CATALOG }),
      );
      const data = await ApiService.fetchCatalog();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(2);
    });

    it("debe pedir el endpoint por defecto con la cabecera Accept: application/json", async function () {
      const fetchSpy = spyOn(window, "fetch").and.resolveTo(
        fakeResponse(RAW_CATALOG),
      );
      await ApiService.fetchCatalog();
      expect(fetchSpy).toHaveBeenCalledWith("api/data.json", {
        headers: { Accept: "application/json" },
      });
    });

    it("debe sanear espacios y campos opcionales de los datos recibidos", async function () {
      spyOn(window, "fetch").and.resolveTo(fakeResponse(RAW_CATALOG));
      const data = await ApiService.fetchCatalog();
      expect(data[0].id).toBe("interstellar");
      expect(data[0].title).toBe("Interstellar");
      expect(data[0].genres).toEqual(["Ciencia ficción"]);
      expect(data[0].description).toBe(
        "Una odisea espacial más allá de los agujeros de gusano.",
      );
      expect(data[0].imageAlt).toBe("Portada de Interstellar");
      expect(data[0].image).toBe("assets/images/interestellar-2.jpeg");
      expect(data[1].description).toBeUndefined();
    });
  });

  describe("fetchCatalog() con error HTTP", function () {
    it("debe lanzar error cuando la API responde 404", async function () {
      spyOn(window, "fetch").and.resolveTo(
        fakeResponse({}, { ok: false, status: 404 }),
      );
      await expectAsync(ApiService.fetchCatalog()).toBeRejectedWithError(/404/);
    });

    it("debe lanzar error cuando la API responde 500", async function () {
      spyOn(window, "fetch").and.resolveTo(
        fakeResponse({}, { ok: false, status: 500 }),
      );
      await expectAsync(ApiService.fetchCatalog()).toBeRejectedWithError(/500/);
    });

    it("debe informar el estado HTTP exacto en el mensaje de error", async function () {
      spyOn(window, "fetch").and.resolveTo(
        fakeResponse({}, { ok: false, status: 403 }),
      );
      await expectAsync(ApiService.fetchCatalog()).toBeRejectedWithError(
        "No se pudo cargar el catálogo (403).",
      );
    });
  });

  describe("fetchCatalog() con error de red", function () {
    it("debe capturar el error de red cuando fetch() falla", async function () {
      spyOn(window, "fetch").and.rejectWith(new TypeError("Failed to fetch"));
      await expectAsync(ApiService.fetchCatalog()).toBeRejectedWithError(
        "No se pudo conectar con el servidor del catálogo.",
      );
    });

    it("debe conservar la causa original del fallo de red", async function () {
      spyOn(window, "fetch").and.rejectWith(new TypeError("Failed to fetch"));
      let error;
      try {
        await ApiService.fetchCatalog();
        fail("Debería haber lanzado un error");
      } catch (caught) {
        error = caught;
      }
      expect(error.cause).toBeDefined();
      expect(error.cause.message).toBe("Failed to fetch");
    });
  });

  describe("fetchCatalog() con payload inválido", function () {
    it("debe rechazar un payload que no contiene una lista de catálogo", async function () {
      spyOn(window, "fetch").and.resolveTo(fakeResponse({ ok: true }));
      await expectAsync(ApiService.fetchCatalog()).toBeRejectedWithError(
        TypeError,
        "El catálogo recibido no tiene un formato válido.",
      );
    });

    it("debe rechazar respuestas con estructura de datos no soportada", async function () {
      spyOn(window, "fetch").and.resolveTo(fakeResponse("cadena de texto"));
      await expectAsync(ApiService.fetchCatalog()).toBeRejectedWithError(
        TypeError,
        "El catálogo recibido no tiene un formato válido.",
      );
    });
  });

  describe("procesamiento de datos con map/filter/reduce", function () {
    it("debe transformar los datos crudos con map()", function () {
      const processed = ApiService.processCollection(RAW_CATALOG);
      expect(processed[0].title).toBe("Interstellar");
      expect(processed[0].genres).toEqual(["Ciencia ficción"]);
      expect(processed[0].year).toBe(2014);
    });

    it("debe filtrar los elementos inválidos con filter()", function () {
      const processed = ApiService.processCollection(RAW_CATALOG);
      expect(processed.length).toBe(2);
      expect(
        processed.every(function (item) {
          return ApiService.isValidContent(item);
        }),
      ).toBe(true);
    });

    it("debe filtrar la colección por tipo o género con filterByCategory()", function () {
      const processed = ApiService.processCollection(RAW_CATALOG);
      expect(
        ApiService.filterByCategory(processed, "Serie").map(function (item) {
          return item.id;
        }),
      ).toEqual(["dark"]);
      expect(ApiService.filterByCategory(processed, "película").length).toBe(1);
      expect(ApiService.filterByCategory(processed, "misterio").length).toBe(1);
      expect(ApiService.filterByCategory(processed, "").length).toBe(2);
    });

    it("debe eliminar duplicados al agregar con reduce()", function () {
      const duplicated = [...RAW_CATALOG, { ...RAW_CATALOG[1] }];
      const processed = ApiService.processCollection(duplicated);
      expect(processed.length).toBe(2);
      expect(
        processed.filter(function (item) {
          return item.id === "dark";
        }).length,
      ).toBe(1);
    });

    it("debe calcular estadísticas con reduce()", function () {
      const processed = ApiService.processCollection(RAW_CATALOG);
      const stats = ApiService.calculateStats(processed);
      expect(stats).toEqual({
        total: 2,
        movies: 1,
        series: 1,
        genres: 2,
        averageYear: 2016,
      });
    });

    it("debe devolver estadísticas en cero con reduce() sobre una colección vacía", function () {
      expect(ApiService.calculateStats([])).toEqual({
        total: 0,
        movies: 0,
        series: 0,
        genres: 0,
        averageYear: 0,
      });
    });

    it("debe devolver un arreglo vacío cuando la colección no es un array", function () {
      expect(ApiService.processCollection(null)).toEqual([]);
      expect(ApiService.processCollection("no es un array")).toEqual([]);
    });
  });

  describe("integración con el DOM", function () {
    let container;

    beforeEach(function () {
      container = document.createElement("div");
      container.id = "catalog-status";
      document.body.append(container);
    });

    afterEach(function () {
      container.remove();
    });

    it("debe mostrar el estado de carga accesible mientras consulta la API", function () {
      ApiService.showLoading(container);
      expect(container.hidden).toBe(false);
      expect(container.className).toContain("catalog-loading");
      expect(container.getAttribute("role")).toBe("status");
      expect(container.getAttribute("aria-live")).toBe("polite");
      expect(container.textContent).toBe("Cargando catálogo...");
    });

    it("debe ocultar el estado de loading al finalizar correctamente", function () {
      ApiService.showLoading(container);
      ApiService.hideLoading(container);
      expect(container.hidden).toBe(true);
    });

    it("debe mostrar el estado de error con un control de reintento operativo", function () {
      const retry = jasmine.createSpy("retry");
      ApiService.showError(container, "No pudimos cargar el catálogo.", retry);
      expect(container.hidden).toBe(false);
      expect(container.className).toContain("catalog-error");
      expect(container.getAttribute("role")).toBe("alert");
      const button = container.querySelector("button");
      expect(button.textContent).toBe("Reintentar");
      button.click();
      expect(retry).toHaveBeenCalledTimes(1);
    });

    it("debe ignorar contenedores que no son elementos del DOM sin fallar", function () {
      expect(function () {
        ApiService.showLoading(null);
      }).not.toThrow();
      expect(function () {
        ApiService.hideLoading("no es un elemento");
      }).not.toThrow();
      expect(function () {
        ApiService.showError(null, "mensaje", function () {});
      }).not.toThrow();
    });

    it("debe coordinar el estado de carga con el resultado de fetch", async function () {
      spyOn(window, "fetch").and.resolveTo(fakeResponse(RAW_CATALOG));
      ApiService.showLoading(container);
      expect(container.textContent).toBe("Cargando catálogo...");
      const data = await ApiService.fetchCatalog();
      ApiService.hideLoading(container);
      expect(container.hidden).toBe(true);
      expect(data.length).toBe(2);
    });

    it("debe reintentar la carga al activar el control Reintentar", async function () {
      const fetchSpy = spyOn(window, "fetch").and.resolveTo(
        fakeResponse({}, { ok: false, status: 500 }),
      );
      ApiService.showLoading(container);
      await expectAsync(ApiService.fetchCatalog()).toBeRejectedWithError(/500/);
      const retry = jasmine.createSpy("retry").and.callFake(function () {
        return ApiService.fetchCatalog();
      });
      ApiService.showError(container, "No pudimos cargar el catálogo.", retry);
      fetchSpy.and.resolveTo(fakeResponse(RAW_CATALOG));
      container.querySelector("button").click();
      await new Promise(function (resolve) {
        setTimeout(resolve, 0);
      });
      expect(retry).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
  });
});
