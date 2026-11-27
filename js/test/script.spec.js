import "../script.js";
import { StorageAPI } from "../utils/storage.js";
import { ListExport } from "../utils/listExport.js";
import { Content } from "../models/Content.js";

const LIBRARY_STORAGE_KEY = "mlb:biblioteca:listaPersonal";

StorageAPI.eliminar(LIBRARY_STORAGE_KEY);

function dispatch(element, type) {
  element.dispatchEvent(new Event(type, { bubbles: true }));
}

function getFavoriteButton(titleId) {
  return document.querySelector(
    `[data-action="toggle-favorite"][data-title-id="${titleId}"]`,
  );
}

describe("Interfaz de catálogo y biblioteca", function () {
  afterEach(function () {
    const form = document.getElementById("search-form");
    if (form) {
      form.reset();
      dispatch(form.elements.query, "input");
    }
  });

  it("inicializa el catálogo, la biblioteca y su persistencia usando el DOM", function () {
    expect(document.querySelectorAll(".catalog-grid article").length).toBe(3);
    expect(
      document.querySelectorAll("#featured-carousel .carousel-item").length,
    ).toBe(3);
    expect(document.querySelector("#featured-carousel").textContent).toContain(
      "El viaje de Chihiro",
    );
    expect(
      document.querySelector("#pending-items article").textContent,
    ).toContain("Interstellar");
    expect(
      document.querySelector("#watched-items article").textContent,
    ).toContain("El viaje de Chihiro");
    expect(JSON.parse(localStorage.getItem(LIBRARY_STORAGE_KEY)).length).toBe(
      3,
    );
    expect(document.getElementById("search-feedback").textContent).toBe(
      "Mostrando todo el catálogo.",
    );
  });

  it("actualiza los resultados al buscar y filtrar desde el formulario", function () {
    const query = document.getElementById("search-query");
    const filter = document.getElementById("search-filter");
    query.value = "chihiro";
    dispatch(query, "input");

    expect(document.querySelectorAll(".catalog-grid article").length).toBe(1);
    expect(document.querySelector(".catalog-grid").textContent).toContain(
      "El viaje de Chihiro",
    );

    query.value = "";
    filter.value = "Serie";
    dispatch(filter, "change");
    expect(document.querySelectorAll(".catalog-grid article").length).toBe(1);
    expect(document.querySelector(".catalog-grid").textContent).toContain(
      "Dark",
    );

    query.value = "sin coincidencias";
    dispatch(query, "input");
    expect(document.querySelectorAll(".catalog-grid article").length).toBe(0);
    expect(document.getElementById("search-feedback").textContent).toContain(
      "No se encontraron contenidos",
    );
  });

  it("cancela el submit del formulario y actualiza los resultados del catálogo", function () {
    const form = document.getElementById("search-form");
    form.elements.query.value = "chihiro";

    const event = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    expect(event.defaultPrevented).toBeTrue();
    expect(document.querySelectorAll(".catalog-grid article").length).toBe(1);
    expect(document.querySelector(".catalog-grid").textContent).toContain(
      "El viaje de Chihiro",
    );
    expect(document.getElementById("search-feedback").textContent).toBe(
      "1 contenido encontrado.",
    );
  });

  it("alterna favoritos en el modelo, la interfaz y localStorage", function () {
    const button = getFavoriteButton("interstellar");
    button.click();
    const updatedButton = getFavoriteButton("interstellar");

    expect(updatedButton.getAttribute("aria-pressed")).toBe("true");
    expect(updatedButton.textContent).toBe("Quitar de Mi Lista");
    expect(
      JSON.parse(localStorage.getItem(LIBRARY_STORAGE_KEY)).find(
        (entry) => entry.titleId === "interstellar",
      ).isFavorite,
    ).toBeTrue();

    updatedButton.click();
    const restoredButton = getFavoriteButton("interstellar");
    expect(restoredButton.getAttribute("aria-pressed")).toBe("false");
    expect(restoredButton.textContent).toBe("Agregar a Mi Lista");
  });

  it("filtra Mi Lista y muestra explícitamente los contenidos favoritos", function () {
    getFavoriteButton("interstellar").click();
    const favoritesFilter = document.querySelector(
      '[data-list-filter="favorites"]',
    );
    favoritesFilter.click();

    expect(favoritesFilter.getAttribute("aria-pressed")).toBe("true");
    expect(document.querySelectorAll("#my-list-items article").length).toBe(1);
    expect(document.getElementById("my-list-items").textContent).toContain(
      "Interstellar",
    );
    expect(document.getElementById("my-list-items").textContent).toContain(
      "Favorita",
    );

    document.querySelector('[data-list-filter="all"]').click();
    getFavoriteButton("interstellar").click();
  });

  it("actualiza el estado desde el control y mueve la tarjeta entre secciones", function () {
    const select = document.querySelector(
      '[data-action="update-status"][data-title-id="interstellar"]',
    );
    select.value = "watched";
    dispatch(select, "change");

    expect(document.querySelector("#watched-items").textContent).toContain(
      "Interstellar",
    );
    expect(document.querySelector("#pending-items").textContent).not.toContain(
      "Interstellar",
    );

    const updatedSelect = document.querySelector(
      '[data-action="update-status"][data-title-id="interstellar"]',
    );
    updatedSelect.value = "pending";
    dispatch(updatedSelect, "change");
    expect(document.querySelector("#pending-items").textContent).toContain(
      "Interstellar",
    );
  });

  it("previsualiza y guarda calificaciones válidas para contenidos vistos", function () {
    const input = document.querySelector(
      '[data-action="rate-content"][data-title-id="el-viaje-de-chihiro"]',
    );
    input.value = "4";
    dispatch(input, "input");
    expect(
      document.getElementById("rating-el-viaje-de-chihiro-value").textContent,
    ).toBe("4");

    dispatch(input, "change");
    expect(
      document.getElementById("rating-el-viaje-de-chihiro-feedback")
        .textContent,
    ).toBe("Calificación guardada.");
    expect(
      JSON.parse(localStorage.getItem(LIBRARY_STORAGE_KEY)).find(
        (entry) => entry.titleId === "el-viaje-de-chihiro",
      ).rating,
    ).toBe(4);
  });

  it("prepara una exportación de favoritos como texto y la limpia al cambiar la lista", function () {
    getFavoriteButton("dark").click();
    document.getElementById("share-format").value = "texto";
    document.querySelector('[data-action="share-list"]').click();

    const output = document.getElementById("share-output");
    expect(output.hidden).toBeFalse();
    expect(output.value).toBe("Dark (2017)");
    expect(document.getElementById("share-feedback").textContent).toContain(
      "Lista preparada",
    );

    getFavoriteButton("dark").click();
    expect(output.hidden).toBeTrue();
    expect(output.value).toBe("");
  });

  it("comparte desde el acceso de navegación y selecciona la alternativa de copia", function () {
    getFavoriteButton("dark").click();
    document.getElementById("navbar-share").click();

    const output = document.getElementById("share-output");
    expect(output.hidden).toBeFalse();
    expect(output.value).toBe("Dark (2017)");
    expect(document.getElementById("share-feedback").textContent).toContain(
      "Lista preparada",
    );
    getFavoriteButton("dark").click();
  });

  it("oculta el feedback de búsqueda después de su ciclo visible", function () {
    jasmine.clock().install();
    try {
      const query = document.getElementById("search-query");
      query.value = "dark";
      dispatch(query, "input");
      const feedback = document.getElementById("search-feedback");
      expect(feedback.hidden).toBeFalse();

      jasmine.clock().tick(4001);
      expect(feedback.hidden).toBeTrue();
      expect(feedback.textContent).toBe("");
    } finally {
      jasmine.clock().uninstall();
    }
  });

  it("formatea favoritos como texto o enlace desde el servicio de exportación", function () {
    const favorite = new Content(
      "dark",
      "Dark",
      "Serie",
      2017,
      ["Misterio"],
      "pending",
    );

    expect(ListExport.format([favorite], "texto")).toBe("Dark (2017)");
    expect(
      ListExport.format([favorite], "enlace", "https://example.test/"),
    ).toBe("https://example.test/?lista=dark");
    expect(() => ListExport.format([favorite], "csv")).toThrowError(RangeError);
  });

  it("revierte el cambio visual si la persistencia falla y muestra el error en el DOM", function () {
    spyOn(StorageAPI, "guardar").and.returnValue(false);
    const button = getFavoriteButton("dark");
    button.click();

    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(document.getElementById("library-feedback").textContent).toContain(
      "La biblioteca anterior fue restaurada",
    );
  });
});
