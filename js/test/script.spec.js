function createSpecCatalog() {
  return [
    {
      id: "interstellar",
      title: "Interstellar",
      type: "Película",
      year: 2014,
      genres: ["Ciencia ficción"],
      initialStatus: "pending",
    },
    {
      id: "chihiro",
      title: "El viaje de Chihiro",
      type: "Película",
      year: 2001,
      genres: ["Animación y fantasía"],
      initialStatus: "watched",
    },
    {
      id: "dark",
      title: "Dark",
      type: "Serie",
      year: 2017,
      genres: ["Misterio y ciencia ficción"],
      initialStatus: "pending",
    },
  ];
}

function createSpecStorage(initialValue = null) {
  return {
    value: initialValue,
    lastReadKey: null,
    lastWrittenKey: null,
    getItem(key) {
      this.lastReadKey = key;
      return this.value;
    },
    setItem(key, value) {
      this.lastWrittenKey = key;
      this.value = value;
    },
  };
}

describe("Flujo 1: Búsqueda y filtrado de contenidos", function () {
  it("encuentra coincidencias parciales sin distinguir mayúsculas ni tildes", function () {
    const catalog = createSpecCatalog();

    expect(searchContents(catalog, "INTER", "").map((content) => content.id)).toEqual([
      "interstellar",
    ]);
    expect(searchContents(catalog, "chihiro", "").map((content) => content.id)).toEqual([
      "chihiro",
    ]);
  });

  it("aplica filtros por tipo y género, combinándolos con el título", function () {
    const catalog = createSpecCatalog();

    expect(searchContents(catalog, "", "pelicula").map((content) => content.id)).toEqual([
      "interstellar",
      "chihiro",
    ]);
    expect(searchContents(catalog, "", "CIENCIA").map((content) => content.id)).toEqual([
      "interstellar",
      "dark",
    ]);
    expect(searchContents(catalog, "inter", "ficcion").map((content) => content.id)).toEqual([
      "interstellar",
    ]);
  });

  it("devuelve el catálogo completo para una consulta vacía y un array vacío sin coincidencias", function () {
    const catalog = createSpecCatalog();

    expect(searchContents(catalog, "", "")).toEqual(catalog);
    expect(searchContents(catalog, "inexistente", "")).toEqual([]);
    expect(searchContents(catalog, "dark", "animacion")).toEqual([]);
  });

  it("busca títulos por nombre normalizado y devuelve null si no encuentra uno", function () {
    const catalog = createSpecCatalog();

    expect(findTitleByName(catalog, "  EL VIAJE DE CHIHIRO ")).toEqual(catalog[1]);
    expect(findTitleByName(catalog, "")).toBeNull();
    expect(findTitleByName(catalog, "Otro título")).toBeNull();
  });

  it("formatea resultados y muestra el mensaje definido cuando no hay coincidencias", function () {
    const catalog = createSpecCatalog();

    expect(formatSearchResults([catalog[0]])).toBe(
      "Resultados de búsqueda:\nInterstellar | Película | 2014 | Ciencia ficción",
    );
    expect(formatSearchResults([])).toBe("No se encontraron contenidos.");
  });

  it("cancela la búsqueda inicial y muestra el mensaje correspondiente", function () {
    const promptFunction = jasmine.createSpy("promptFunction").and.returnValue(null);
    const alertFunction = jasmine.createSpy("alertFunction");

    runSearchFlow({
      catalog: createSpecCatalog(),
      promptFunction,
      alertFunction,
    });

    expect(promptFunction).toHaveBeenCalledTimes(1);
    expect(promptFunction).toHaveBeenCalledWith(
      "Ingresá un título para buscar o cancelar para volver al menú:",
    );
    expect(alertFunction).toHaveBeenCalledWith("Búsqueda cancelada.");
  });

  it("repite la búsqueda con nuevos criterios y finaliza al responder que no desea repetir", function () {
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("inter", "", "sí", "dark", "serie", "no");
    const alertFunction = jasmine.createSpy("alertFunction");

    runSearchFlow({
      catalog: createSpecCatalog(),
      promptFunction,
      alertFunction,
    });

    expect(promptFunction).toHaveBeenCalledTimes(6);
    expect(alertFunction).toHaveBeenCalledWith(
      "Resultados de búsqueda:\nInterstellar | Película | 2014 | Ciencia ficción",
    );
    expect(alertFunction).toHaveBeenCalledWith(
      "Resultados de búsqueda:\nDark | Serie | 2017 | Misterio y ciencia ficción",
    );
    expect(alertFunction).toHaveBeenCalledWith("Fin de búsqueda.");
  });

  it("finaliza después de una búsqueda cuando el usuario no solicita repetirla", function () {
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("chihiro", "", "no");
    const alertFunction = jasmine.createSpy("alertFunction");

    runSearchFlow({
      catalog: createSpecCatalog(),
      promptFunction,
      alertFunction,
    });

    expect(promptFunction).toHaveBeenCalledTimes(3);
    expect(alertFunction).toHaveBeenCalledWith(
      "Resultados de búsqueda:\nEl viaje de Chihiro | Película | 2001 | Animación y fantasía",
    );
    expect(alertFunction).toHaveBeenCalledWith("Fin de búsqueda.");
  });

  it("cancela una búsqueda repetida sin volver a solicitar el filtro ni finalizar el flujo", function () {
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("inter", "", "sí", null);
    const alertFunction = jasmine.createSpy("alertFunction");

    runSearchFlow({
      catalog: createSpecCatalog(),
      promptFunction,
      alertFunction,
    });

    expect(promptFunction).toHaveBeenCalledTimes(4);
    expect(alertFunction).toHaveBeenCalledWith("Búsqueda cancelada.");
    expect(alertFunction).not.toHaveBeenCalledWith("Fin de búsqueda.");
  });
});

describe("Flujo 2: Gestión de lista personal (favoritos)", function () {
  it("crea el estado inicial, busca registros y agrega un favorito de forma inmutable", function () {
    const catalog = createSpecCatalog();
    const initialLibrary = createInitialLibrary(catalog);
    const originalLibrary = initialLibrary.slice();
    const result = addFavorite(catalog, initialLibrary, "Dark");

    expect(initialLibrary).toEqual(originalLibrary);
    expect(initialLibrary[1]).toEqual({
      titleId: "chihiro",
      status: "watched",
      isFavorite: false,
      rating: null,
    });
    expect(findLibraryRecord(initialLibrary, "chihiro")).toBe(initialLibrary[1]);
    expect(findLibraryRecord(initialLibrary, "missing")).toBeNull();
    expect(result.success).toBeTruthy();
    expect(result.library).not.toBe(initialLibrary);
    expect(result.library[result.library.length - 1]).toEqual({
      titleId: "dark",
      status: "pending",
      isFavorite: true,
      rating: null,
    });
  });

  it("agrega a un registro existente conservando estado y calificación y rechaza duplicados", function () {
    const catalog = createSpecCatalog();
    const library = [
      {
        titleId: "chihiro",
        status: "watched",
        isFavorite: false,
        rating: 5,
      },
    ];
    const result = addFavorite(catalog, library, "El viaje de Chihiro");
    const duplicate = addFavorite(catalog, result.library, "el VIAJE de chihiro");

    expect(result.library[0]).toEqual({
      titleId: "chihiro",
      status: "watched",
      isFavorite: true,
      rating: 5,
    });
    expect(library[0].isFavorite).toBeFalsy();
    expect(duplicate.success).toBeFalsy();
    expect(duplicate.library).toBe(result.library);
  });

  it("rechaza contenidos inexistentes y elimina favoritos sin borrar estado ni calificación", function () {
    const catalog = createSpecCatalog();
    const library = [
      {
        titleId: "chihiro",
        status: "watched",
        isFavorite: true,
        rating: 4,
      },
    ];
    const missing = addFavorite(catalog, library, "No existe");
    const removed = removeFavorite(library, "chihiro");
    const notFavorite = removeFavorite(removed.library, "chihiro");

    expect(missing.success).toBeFalsy();
    expect(missing.library).toBe(library);
    expect(removed.success).toBeTruthy();
    expect(removed.library).not.toBe(library);
    expect(removed.library[0]).toEqual({
      titleId: "chihiro",
      status: "watched",
      isFavorite: false,
      rating: 4,
    });
    expect(library[0].isFavorite).toBeTruthy();
    expect(notFavorite.success).toBeFalsy();
  });

  it("maneja clave inexistente, JSON inválido y un array vacío sin confundir sus resultados", function () {
    expect(readStoredLibrary(createSpecStorage(null))).toBeNull();
    expect(readStoredLibrary(createSpecStorage("{inválido"))).toBeNull();
    expect(readStoredLibrary(createSpecStorage("[]"))).toEqual([]);
  });

  it("conserva y normaliza los registros válidos aunque el array también contenga registros inválidos", function () {
    const storage = createSpecStorage(
      JSON.stringify([
        {
          titleId: "interstellar",
          status: "watched",
          isFavorite: true,
          rating: "5",
          ignored: "dato",
        },
        { titleId: "sin-estado", isFavorite: true },
        { titleId: 7, status: "pending" },
        null,
        {
          titleId: "dark",
          status: "pending",
          isFavorite: "true",
          rating: 9,
        },
      ]),
    );

    expect(readStoredLibrary(storage)).toEqual([
      {
        titleId: "interstellar",
        status: "watched",
        isFavorite: true,
        rating: 5,
      },
      {
        titleId: "dark",
        status: "pending",
        isFavorite: false,
        rating: null,
      },
    ]);
  });

  it("lee todos los registros válidos y loadLibrary devuelve una biblioteca vacía si no hay datos legibles", function () {
    const validRecords = [
      {
        titleId: "interstellar",
        status: "pending",
        isFavorite: false,
        rating: null,
      },
      {
        titleId: "chihiro",
        status: "watched",
        isFavorite: true,
        rating: 3,
      },
    ];

    expect(readStoredLibrary(createSpecStorage(JSON.stringify(validRecords)))).toEqual(
      validRecords,
    );
    expect(loadLibrary(createSpecStorage(null))).toEqual([]);
    expect(loadLibrary(createSpecStorage(JSON.stringify(validRecords)))).toEqual(
      validRecords,
    );
  });

  it("usa el array persistido, incluso vacío, o crea y persiste el estado inicial", function () {
    const catalog = createSpecCatalog();
    const emptyStorage = createSpecStorage("[]");
    const missingStorage = createSpecStorage(null);
    const initialLibrary = createInitialLibrary(catalog);

    expect(getWorkingLibrary(emptyStorage, catalog)).toEqual([]);
    expect(emptyStorage.lastWrittenKey).toBeNull();
    expect(getWorkingLibrary(missingStorage, catalog)).toEqual(initialLibrary);
    expect(missingStorage.lastWrittenKey).toBe("miniLetterboxdLibrary");
    expect(JSON.parse(missingStorage.value)).toEqual(initialLibrary);
  });

  it("persiste arrays y devuelve false ante entradas inválidas o errores de escritura", function () {
    const storage = createSpecStorage(null);
    const library = createInitialLibrary(createSpecCatalog());
    const failingStorage = {
      setItem() {
        throw new Error("storage unavailable");
      },
    };

    expect(saveLibrary(storage, library)).toBeTruthy();
    expect(storage.lastWrittenKey).toBe("miniLetterboxdLibrary");
    expect(JSON.parse(storage.value)).toEqual(library);
    expect(saveLibrary(storage, null)).toBeFalsy();
    expect(saveLibrary(null, library)).toBeFalsy();
    expect(saveLibrary(failingStorage, library)).toBeFalsy();
  });

  it("gestiona favoritos con opciones inyectadas y persiste sin abrir diálogos reales", function () {
    const catalog = createSpecCatalog();
    const storage = createSpecStorage(null);
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("sí", "Interstellar", "sí", "no");
    const alertFunction = jasmine.createSpy("alertFunction");

    const library = runFavoritesFlow({
      catalog,
      library: [],
      storage,
      promptFunction,
      alertFunction,
    });

    expect(library).toEqual([
      {
        titleId: "interstellar",
        status: "pending",
        isFavorite: true,
        rating: null,
      },
    ]);
    expect(storage.lastWrittenKey).toBe("miniLetterboxdLibrary");
    expect(alertFunction).toHaveBeenCalledWith("Contenido agregado exitosamente.");
    expect(promptFunction).toHaveBeenCalledTimes(4);
  });

  it("confirma la eliminación de un favorito y persiste la biblioteca actualizada", function () {
    const catalog = createSpecCatalog();
    const originalLibrary = [
      {
        titleId: "chihiro",
        status: "watched",
        isFavorite: true,
        rating: 4,
      },
    ];
    const storage = createSpecStorage(null);
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("sí", "El viaje de Chihiro", "sí", "no");
    const alertFunction = jasmine.createSpy("alertFunction");

    const library = runFavoritesFlow({
      catalog,
      library: originalLibrary,
      storage,
      promptFunction,
      alertFunction,
    });

    expect(library).toEqual([
      {
        titleId: "chihiro",
        status: "watched",
        isFavorite: false,
        rating: 4,
      },
    ]);
    expect(originalLibrary[0].isFavorite).toBeTruthy();
    expect(JSON.parse(storage.value)).toEqual(library);
    expect(alertFunction).toHaveBeenCalledWith("Contenido removido exitosamente.");
    expect(promptFunction).toHaveBeenCalledTimes(4);
  });

  it("cancela la confirmación de agregar y no persiste cambios", function () {
    const storage = createSpecStorage(null);
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("sí", "Interstellar", "no", "no");
    const alertFunction = jasmine.createSpy("alertFunction");

    const library = runFavoritesFlow({
      catalog: createSpecCatalog(),
      library: [],
      storage,
      promptFunction,
      alertFunction,
    });

    expect(library).toEqual([]);
    expect(storage.lastWrittenKey).toBeNull();
    expect(alertFunction).toHaveBeenCalledWith("Operación cancelada.");
    expect(promptFunction).toHaveBeenCalledTimes(4);
  });

  it("cancela la confirmación de quitar y conserva el favorito sin persistir", function () {
    const originalLibrary = [
      {
        titleId: "chihiro",
        status: "watched",
        isFavorite: true,
        rating: 4,
      },
    ];
    const storage = createSpecStorage(null);
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("sí", "El viaje de Chihiro", "no", "no");
    const alertFunction = jasmine.createSpy("alertFunction");

    const library = runFavoritesFlow({
      catalog: createSpecCatalog(),
      library: originalLibrary,
      storage,
      promptFunction,
      alertFunction,
    });

    expect(library).toBe(originalLibrary);
    expect(library[0].isFavorite).toBeTruthy();
    expect(storage.lastWrittenKey).toBeNull();
    expect(alertFunction).toHaveBeenCalledWith("Operación cancelada.");
    expect(promptFunction).toHaveBeenCalledTimes(4);
  });
});

describe("Flujo 3: Exportar y compartir lista personal", function () {
  it("obtiene solo favoritos existentes en el catálogo y los formatea como texto", function () {
    const catalog = createSpecCatalog();
    const library = [
      { titleId: "interstellar", isFavorite: true },
      { titleId: "chihiro", isFavorite: false },
      { titleId: "desconocido", isFavorite: true },
    ];

    expect(getFavoriteContents(catalog, library)).toEqual([catalog[0]]);
    expect(formatFavoritesAsText(catalog, library)).toBe("Interstellar (2014)");
    expect(formatFavoritesAsText(catalog, [])).toBe("");
  });

  it("genera un enlace con IDs codificados y representa correctamente una lista vacía", function () {
    expect(
      createFavoritesLink([
        { titleId: "interstellar", isFavorite: true },
        { titleId: "id con espacio", isFavorite: true },
        { titleId: "dark", isFavorite: false },
      ]),
    ).toBe("https://miproyecto.com/lista?ids=interstellar%2Cid%20con%20espacio");
    expect(createFavoritesLink([])).toBe("https://miproyecto.com/lista?ids=");
  });

  it("no solicita formato ni abre diálogos reales cuando no hay favoritos", function () {
    const promptFunction = jasmine.createSpy("promptFunction");
    const alertFunction = jasmine.createSpy("alertFunction");

    runSharingFlow({
      catalog: createSpecCatalog(),
      library: [],
      storage: createSpecStorage(null),
      promptFunction,
      alertFunction,
    });

    expect(promptFunction).not.toHaveBeenCalled();
    expect(alertFunction).toHaveBeenCalledWith(
      "No hay contenidos en tu lista para compartir.",
    );
  });

  it("exporta texto usando las funciones de interacción inyectadas", function () {
    const promptFunction = jasmine.createSpy("promptFunction").and.returnValue("texto");
    const alertFunction = jasmine.createSpy("alertFunction");
    const library = [
      { titleId: "interstellar", status: "pending", isFavorite: true, rating: null },
    ];

    runSharingFlow({
      catalog: createSpecCatalog(),
      library,
      storage: createSpecStorage(null),
      promptFunction,
      alertFunction,
    });

    expect(promptFunction).toHaveBeenCalledWith(
      "Copiá el resultado y cerrá esta ventana:",
      "Interstellar (2014)",
    );
    expect(alertFunction).toHaveBeenCalledWith("Exportación finalizada.");
  });

  it("reintenta formatos inválidos y después exporta el enlace elegido", function () {
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("JSON", "enlace");
    const alertFunction = jasmine.createSpy("alertFunction");
    const library = [
      { titleId: "interstellar", status: "pending", isFavorite: true, rating: null },
    ];

    runSharingFlow({
      catalog: createSpecCatalog(),
      library,
      storage: createSpecStorage(null),
      promptFunction,
      alertFunction,
    });

    expect(promptFunction).toHaveBeenCalledTimes(3);
    expect(promptFunction).toHaveBeenCalledWith(
      "Copiá el resultado y cerrá esta ventana:",
      "https://miproyecto.com/lista?ids=interstellar",
    );
    expect(alertFunction).toHaveBeenCalledWith(
      "Formato incorrecto. Ingresá texto o enlace.",
    );
    expect(alertFunction).toHaveBeenCalledWith("Exportación finalizada.");
  });

  it("permite cancelar la selección del formato", function () {
    const promptFunction = jasmine.createSpy("promptFunction").and.returnValue(null);
    const alertFunction = jasmine.createSpy("alertFunction");

    runSharingFlow({
      catalog: createSpecCatalog(),
      library: [
        { titleId: "interstellar", status: "pending", isFavorite: true, rating: null },
      ],
      storage: createSpecStorage(null),
      promptFunction,
      alertFunction,
    });

    expect(promptFunction).toHaveBeenCalledTimes(1);
    expect(alertFunction).toHaveBeenCalledWith("Exportación cancelada.");
  });
});

describe("Flujo 4: Calificación de contenidos vistos", function () {
  it("acepta calificaciones enteras de 1 a 5 y rechaza límites o entradas inválidas", function () {
    [1, 2, 3, 4, 5, "1", "5"].forEach((rating) => {
      expect(validateRating(rating)).toBeTruthy();
    });
    [0, -1, 6, 1.5, "", "  ", null, undefined, {}, true].forEach((rating) => {
      expect(validateRating(rating)).toBeFalsy();
    });
  });

  it("selecciona solo contenidos vistos sin calificación y existentes en el catálogo", function () {
    const catalog = createSpecCatalog();
    const library = [
      { titleId: "chihiro", status: "watched", rating: null },
      { titleId: "interstellar", status: "pending", rating: null },
      { titleId: "dark", status: "watched", rating: 4 },
      { titleId: "missing", status: "watched", rating: null },
    ];

    expect(getUnratedWatchedContents(catalog, library)).toEqual([catalog[1]]);
  });

  it("califica contenidos vistos de forma inmutable y rechaza ratings inválidos o pendientes", function () {
    const library = [
      { titleId: "chihiro", status: "watched", isFavorite: true, rating: null },
      { titleId: "interstellar", status: "pending", isFavorite: false, rating: null },
    ];
    const result = rateWatchedContent(library, "chihiro", "4");
    const invalidRating = rateWatchedContent(library, "chihiro", 2.5);
    const pending = rateWatchedContent(library, "interstellar", 5);

    expect(result.success).toBeTruthy();
    expect(result.library).not.toBe(library);
    expect(result.library[0]).toEqual({
      titleId: "chihiro",
      status: "watched",
      isFavorite: true,
      rating: 4,
    });
    expect(library[0].rating).toBeNull();
    expect(invalidRating.success).toBeFalsy();
    expect(invalidRating.library).toBe(library);
    expect(pending.success).toBeFalsy();
  });

  it("reintenta una calificación inválida, guarda la válida y devuelve el estado actualizado", function () {
    const catalog = createSpecCatalog();
    const library = [
      { titleId: "chihiro", status: "watched", isFavorite: false, rating: null },
    ];
    const storage = createSpecStorage(null);
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("0", "4");
    const alertFunction = jasmine.createSpy("alertFunction");

    const result = runRatingFlow({
      catalog,
      library,
      storage,
      promptFunction,
      alertFunction,
    });

    expect(result[0].rating).toBe(4);
    expect(library[0].rating).toBeNull();
    expect(JSON.parse(storage.value)).toEqual(result);
    expect(promptFunction).toHaveBeenCalledTimes(2);
    expect(alertFunction).toHaveBeenCalledWith(
      "La calificación debe ser un número entero entre 1 y 5.",
    );
    expect(alertFunction).toHaveBeenCalledWith("Todos los contenidos vistos han sido calificados.");
  });

  it("permite cancelar durante los reintentos sin alterar la biblioteca original", function () {
    const library = [
      { titleId: "chihiro", status: "watched", isFavorite: false, rating: null },
    ];
    const promptFunction = jasmine
      .createSpy("promptFunction")
      .and.returnValues("6", null);
    const alertFunction = jasmine.createSpy("alertFunction");
    const storage = createSpecStorage(null);

    const result = runRatingFlow({
      catalog: createSpecCatalog(),
      library,
      storage,
      promptFunction,
      alertFunction,
    });

    expect(result).toBe(library);
    expect(result[0].rating).toBeNull();
    expect(storage.lastWrittenKey).toBeNull();
    expect(alertFunction).toHaveBeenCalledWith("Proceso interrumpido.");
  });

  it("no inicia prompts si no existen contenidos vistos pendientes de calificación", function () {
    const promptFunction = jasmine.createSpy("promptFunction");
    const alertFunction = jasmine.createSpy("alertFunction");
    const library = [
      { titleId: "interstellar", status: "pending", rating: null },
      { titleId: "chihiro", status: "watched", rating: 3 },
    ];

    const result = runRatingFlow({
      catalog: createSpecCatalog(),
      library,
      storage: createSpecStorage(null),
      promptFunction,
      alertFunction,
    });

    expect(result).toBe(library);
    expect(promptFunction).not.toHaveBeenCalled();
    expect(alertFunction).toHaveBeenCalledWith(
      "No hay contenidos vistos pendientes de calificación.",
    );
  });
});
