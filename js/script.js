const LIBRARY_STORAGE_KEY = "miniLetterboxdLibrary";

const CONTENT_CATALOG = Object.freeze([
  Object.freeze({
    id: "interstellar",
    title: "Interstellar",
    type: "Película",
    year: 2014,
    genres: Object.freeze(["Ciencia ficción"]),
    initialStatus: "pending",
  }),
  Object.freeze({
    id: "el-viaje-de-chihiro",
    title: "El viaje de Chihiro",
    type: "Película",
    year: 2001,
    genres: Object.freeze(["Animación y fantasía"]),
    initialStatus: "watched",
  }),
  Object.freeze({
    id: "dark",
    title: "Dark",
    type: "Serie",
    year: 2017,
    genres: Object.freeze(["Misterio y ciencia ficción"]),
    initialStatus: "pending",
  }),
]);

const MENU_TEXT = [
  "Mini Letterboxd - Menú principal",
  "1. Buscar y filtrar contenidos",
  "2. Gestionar lista personal (favoritos)",
  "3. Exportar y compartir lista personal",
  "4. Calificar contenidos vistos",
  "0. Salir",
  "Elegí una opción:",
].join("\n");

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findTitleByName(catalog, titleName) {
  const normalizedTitle = normalizeText(titleName);
  if (!normalizedTitle) {
    return null;
  }

  return (
    catalog.find(
      (content) => normalizeText(content.title) === normalizedTitle,
    ) ?? null
  );
}

/**
 * Busca títulos por nombre y filtra opcionalmente por tipo o género.
 * @param {Array<object>} catalog Catálogo de contenidos disponibles.
 * @param {string} titleQuery Texto parcial del título; vacío incluye todos.
 * @param {string} filterValue Tipo o género opcional.
 * @returns {Array<object>} Coincidencias en el orden original del catálogo.
 */
function searchContents(catalog, titleQuery, filterValue) {
  const normalizedTitle = normalizeText(titleQuery);
  const normalizedFilter = normalizeText(filterValue);

  return catalog.filter((content) => {
    const matchesTitle =
      !normalizedTitle ||
      normalizeText(content.title).includes(normalizedTitle);
    const matchesFilter =
      !normalizedFilter ||
      normalizeText(content.type).includes(normalizedFilter) ||
      content.genres.some((genre) =>
        normalizeText(genre).includes(normalizedFilter),
      );

    return matchesTitle && matchesFilter;
  });
}

function findLibraryRecord(library, titleId) {
  return library.find((record) => record.titleId === titleId) ?? null;
}

function createInitialLibrary(catalog) {
  return catalog.map((content) => ({
    titleId: content.id,
    status: content.initialStatus === "watched" ? "watched" : "pending",
    isFavorite: false,
    rating: null,
  }));
}

function isValidLibraryRecord(record) {
  return (
    record !== null &&
    typeof record === "object" &&
    typeof record.titleId === "string" &&
    (record.status === "pending" || record.status === "watched")
  );
}

function validateRating(value) {
  if (
    (typeof value !== "string" && typeof value !== "number") ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return false;
  }

  const numericRating = Number(value);
  return (
    Number.isInteger(numericRating) && numericRating >= 1 && numericRating <= 5
  );
}

function normalizeLibraryRecord(record) {
  return {
    titleId: record.titleId,
    status: record.status,
    isFavorite: record.isFavorite === true,
    rating: validateRating(record.rating) ? Number(record.rating) : null,
  };
}

/**
 * Recupera y normaliza la biblioteca persistida.
 * @param {Storage|object|null} storage Almacenamiento compatible con getItem.
 * @returns {Array<object>} Registros válidos o un array vacío ante datos inválidos.
 */
function readStoredLibrary(storage) {
  if (!storage || typeof storage.getItem !== "function") {
    return null;
  }

  try {
    const serializedLibrary = storage.getItem(LIBRARY_STORAGE_KEY);
    if (serializedLibrary === null) {
      return null;
    }

    const parsedLibrary = JSON.parse(serializedLibrary);
    if (
      !Array.isArray(parsedLibrary) ||
      !parsedLibrary.every(isValidLibraryRecord)
    ) {
      return null;
    }

    return parsedLibrary.map(normalizeLibraryRecord);
  } catch {
    return null;
  }
}

function loadLibrary(storage) {
  const storedLibrary = readStoredLibrary(storage);
  if (storedLibrary === null) {
    return [];
  }

  return storedLibrary;
}

/**
 * Persiste una biblioteca serializable sin exponer errores de Storage al flujo.
 * @param {Storage|object|null} storage Almacenamiento compatible con setItem.
 * @param {Array<object>} library Registros que se desean guardar.
 * @returns {boolean} Si la escritura se completó correctamente.
 */
function saveLibrary(storage, library) {
  if (
    !storage ||
    typeof storage.setItem !== "function" ||
    !Array.isArray(library)
  ) {
    return false;
  }

  try {
    storage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(library));
    return true;
  } catch {
    return false;
  }
}

/**
 * Agrega un título al conjunto de favoritos de forma inmutable.
 * @param {Array<object>} catalog Catálogo de contenidos disponibles.
 * @param {Array<object>} library Estado personal actual.
 * @param {string} titleName Título elegido por el usuario.
 * @returns {{success: boolean, message: string, library: Array<object>}} Resultado y nuevo estado.
 */
function addFavorite(catalog, library, titleName) {
  const content = findTitleByName(catalog, titleName);
  if (!content) {
    return {
      success: false,
      message: "El contenido no existe en el catálogo.",
      library,
    };
  }

  const existingRecord = findLibraryRecord(library, content.id);
  if (existingRecord?.isFavorite) {
    return {
      success: false,
      message: "El contenido ya está en tu lista personal.",
      library,
    };
  }

  const updatedLibrary = existingRecord
    ? library.map((record) =>
        record.titleId === content.id
          ? { ...record, isFavorite: true }
          : record,
      )
    : [
        ...library,
        {
          titleId: content.id,
          status: content.initialStatus === "watched" ? "watched" : "pending",
          isFavorite: true,
          rating: null,
        },
      ];

  return {
    success: true,
    message: "Contenido agregado exitosamente.",
    library: updatedLibrary,
  };
}

/**
 * Quita un favorito sin borrar su estado de visto ni su calificación.
 * @param {Array<object>} library Estado personal actual.
 * @param {string} titleId Identificador estable del contenido.
 * @returns {{success: boolean, message: string, library: Array<object>}} Resultado y nuevo estado.
 */
function removeFavorite(library, titleId) {
  const existingRecord = findLibraryRecord(library, titleId);
  if (!existingRecord?.isFavorite) {
    return {
      success: false,
      message: "El contenido no está en tu lista personal.",
      library,
    };
  }

  return {
    success: true,
    message: "Contenido removido exitosamente.",
    library: library.map((record) =>
      record.titleId === titleId ? { ...record, isFavorite: false } : record,
    ),
  };
}

function getFavoriteContents(catalog, library) {
  return library
    .filter((record) => record.isFavorite)
    .map((record) => catalog.find((content) => content.id === record.titleId))
    .filter(Boolean);
}

function formatFavoritesAsText(catalog, library) {
  const favoriteContents = getFavoriteContents(catalog, library);
  return favoriteContents
    .map((content) => `${content.title} (${content.year})`)
    .join("\n");
}

function createFavoritesLink(library) {
  const favoriteIds = library
    .filter((record) => record.isFavorite)
    .map((record) => record.titleId);

  return `https://miproyecto.com/lista?ids=${encodeURIComponent(favoriteIds.join(","))}`;
}

/**
 * Resuelve los contenidos vistos que todavía no recibieron una calificación.
 * @param {Array<object>} catalog Catálogo de contenidos disponibles.
 * @param {Array<object>} library Estado personal actual.
 * @returns {Array<object>} Contenidos pendientes de calificar, en orden de biblioteca.
 */
function getUnratedWatchedContents(catalog, library) {
  return library
    .filter(
      (record) =>
        record.status === "watched" &&
        (record.rating === null || typeof record.rating === "undefined"),
    )
    .map((record) => catalog.find((content) => content.id === record.titleId))
    .filter(Boolean);
}

/**
 * Asigna una calificación válida a un contenido visto sin mutar la biblioteca recibida.
 * @param {Array<object>} library Estado personal actual.
 * @param {string} titleId Identificador estable del contenido.
 * @param {number|string} rating Calificación entera entre 1 y 5.
 * @returns {{success: boolean, message: string, library: Array<object>}} Resultado y nuevo estado.
 */
function rateWatchedContent(library, titleId, rating) {
  if (!validateRating(rating)) {
    return {
      success: false,
      message: "La calificación debe ser un número entero entre 1 y 5.",
      library,
    };
  }

  const existingRecord = findLibraryRecord(library, titleId);
  if (!existingRecord || existingRecord.status !== "watched") {
    return {
      success: false,
      message: "Solo se pueden calificar contenidos marcados como vistos.",
      library,
    };
  }

  return {
    success: true,
    message: "Calificación guardada.",
    library: library.map((record) =>
      record.titleId === titleId
        ? { ...record, rating: Number(rating) }
        : record,
    ),
  };
}

function formatContentDetails(content) {
  return `${content.title} | ${content.type} | ${content.year} | ${content.genres.join(", ")}`;
}

function formatSearchResults(contents) {
  if (contents.length === 0) {
    return "No se encontraron contenidos.";
  }

  return `Resultados de búsqueda:\n${contents.map(formatContentDetails).join("\n")}`;
}

function resolvePromptFunction(promptFunction) {
  if (typeof promptFunction === "function") {
    return promptFunction;
  }

  if (
    typeof globalThis !== "undefined" &&
    typeof globalThis.prompt === "function"
  ) {
    return globalThis.prompt.bind(globalThis);
  }

  return () => null;
}

function resolveAlertFunction(alertFunction) {
  if (typeof alertFunction === "function") {
    return alertFunction;
  }

  if (
    typeof globalThis !== "undefined" &&
    typeof globalThis.alert === "function"
  ) {
    return globalThis.alert.bind(globalThis);
  }

  return () => {};
}

function resolveStorage(storage) {
  if (storage) {
    return storage;
  }

  try {
    return typeof globalThis !== "undefined" ? globalThis.localStorage : null;
  } catch {
    return null;
  }
}

function getWorkingLibrary(storage, catalog) {
  const storedLibrary = readStoredLibrary(storage);
  if (storedLibrary !== null) {
    return storedLibrary;
  }

  const initialLibrary = createInitialLibrary(catalog);
  saveLibrary(storage, initialLibrary);
  return initialLibrary;
}

function askYesNo(promptFunction, question, alertFunction) {
  const showAlert = resolveAlertFunction(alertFunction);

  while (true) {
    const answer = promptFunction(`${question} (sí/no)`);
    if (answer === null) {
      return null;
    }

    const normalizedAnswer = normalizeText(answer);
    if (["si", "s", "yes", "y"].includes(normalizedAnswer)) {
      return true;
    }

    if (["no", "n"].includes(normalizedAnswer)) {
      return false;
    }

    showAlert("Respuesta inválida. Respondé sí o no.");
  }
}

/**
 * Ejecuta la interacción del flujo de búsqueda y filtrado descrito en el diagrama 1.
 * @param {object} options Funciones de interacción y catálogo inyectables para pruebas.
 */
function runSearchFlow(options = {}) {
  const promptFunction = resolvePromptFunction(options.promptFunction);
  const alertFunction = resolveAlertFunction(options.alertFunction);
  const catalog = options.catalog ?? CONTENT_CATALOG;

  let titleQuery = promptFunction(
    "Ingresá un título para buscar o cancelar para volver al menú:",
  );
  if (titleQuery === null) {
    alertFunction("Búsqueda cancelada.");
    return;
  }

  let filterValue = promptFunction(
    "Ingresá un tipo o género para filtrar, o dejá vacío:",
  );
  if (filterValue === null) {
    filterValue = "";
  }
  alertFunction(
    formatSearchResults(searchContents(catalog, titleQuery, filterValue)),
  );

  while (
    askYesNo(
      promptFunction,
      "¿Deseás cambiar los criterios de búsqueda?",
      alertFunction,
    )
  ) {
    titleQuery = promptFunction(
      "Ingresá un título para buscar o cancelar para volver al menú:",
    );
    if (titleQuery === null) {
      alertFunction("Búsqueda cancelada.");
      return;
    }

    filterValue = promptFunction(
      "Ingresá un tipo o género para filtrar, o dejá vacío:",
    );
    if (filterValue === null) {
      filterValue = "";
    }

    alertFunction(
      formatSearchResults(searchContents(catalog, titleQuery, filterValue)),
    );
  }

  alertFunction("Fin de búsqueda.");
}

/**
 * Ejecuta altas y bajas de favoritos hasta que el usuario abandona el ciclo.
 * @param {object} options Funciones de interacción, almacenamiento y estado inyectables.
 * @returns {Array<object>} Estado personal resultante.
 */
function runFavoritesFlow(options = {}) {
  const promptFunction = resolvePromptFunction(options.promptFunction);
  const alertFunction = resolveAlertFunction(options.alertFunction);
  const catalog = options.catalog ?? CONTENT_CATALOG;
  const storage = resolveStorage(options.storage);
  let library = Array.isArray(options.library)
    ? options.library
    : getWorkingLibrary(storage, catalog);

  while (
    askYesNo(
      promptFunction,
      "¿Deseás gestionar un contenido de tu lista personal?",
      alertFunction,
    )
  ) {
    const titleName = promptFunction(
      "Ingresá el título del contenido del catálogo:",
    );
    const content = findTitleByName(catalog, titleName);

    if (!content) {
      alertFunction(
        titleName === null
          ? "Operación cancelada."
          : "El contenido no existe en el catálogo.",
      );
    } else {
      const existingRecord = findLibraryRecord(library, content.id);
      const shouldRemove = existingRecord?.isFavorite;
      const confirmed = askYesNo(
        promptFunction,
        shouldRemove
          ? `¿Deseás remover ${content.title} de tu lista personal?`
          : `¿Deseás agregar ${content.title} a tu lista personal?`,
        alertFunction,
      );

      if (!confirmed) {
        alertFunction("Operación cancelada.");
      } else {
        const result = shouldRemove
          ? removeFavorite(library, content.id)
          : addFavorite(catalog, library, content.title);

        if (result.success && saveLibrary(storage, result.library)) {
          library = result.library;
          alertFunction(result.message);
        } else {
          alertFunction(
            result.success
              ? "No se pudo guardar la lista en el almacenamiento local."
              : result.message,
          );
        }
      }
    }
  }

  return library;
}

/**
 * Exporta los favoritos en texto o en un enlace simulado.
 * @param {object} options Funciones de interacción, almacenamiento y estado inyectables.
 */
function runSharingFlow(options = {}) {
  const promptFunction = resolvePromptFunction(options.promptFunction);
  const alertFunction = resolveAlertFunction(options.alertFunction);
  const catalog = options.catalog ?? CONTENT_CATALOG;
  const storage = resolveStorage(options.storage);
  const library = Array.isArray(options.library)
    ? options.library
    : getWorkingLibrary(storage, catalog);
  const favoriteContents = getFavoriteContents(catalog, library);

  if (favoriteContents.length === 0) {
    alertFunction("No hay contenidos en tu lista para compartir.");
    return;
  }

  let format = promptFunction(
    "Elegí el formato de exportación: texto o enlace.",
  );
  while (
    format !== null &&
    !["texto", "enlace"].includes(normalizeText(format))
  ) {
    alertFunction("Formato incorrecto. Ingresá texto o enlace.");
    format = promptFunction("Elegí el formato de exportación: texto o enlace.");
  }

  if (format === null) {
    alertFunction("Exportación cancelada.");
    return;
  }

  const result =
    normalizeText(format) === "texto"
      ? formatFavoritesAsText(catalog, library)
      : createFavoritesLink(library);

  promptFunction("Copiá el resultado y cerrá esta ventana:", result);
  alertFunction("Exportación finalizada.");
}

/**
 * Califica secuencialmente los contenidos vistos pendientes, persistiendo cada cambio.
 * @param {object} options Funciones de interacción, almacenamiento y estado inyectables.
 * @returns {Array<object>} Estado personal actualizado hasta completar o cancelar.
 */
function runRatingFlow(options = {}) {
  const promptFunction = resolvePromptFunction(options.promptFunction);
  const alertFunction = resolveAlertFunction(options.alertFunction);
  const catalog = options.catalog ?? CONTENT_CATALOG;
  const storage = resolveStorage(options.storage);
  let library = Array.isArray(options.library)
    ? options.library
    : getWorkingLibrary(storage, catalog);
  const unratedContents = getUnratedWatchedContents(catalog, library);

  if (unratedContents.length === 0) {
    alertFunction("No hay contenidos vistos pendientes de calificación.");
    return library;
  }

  let contentIndex = 0;
  while (contentIndex < unratedContents.length) {
    const content = unratedContents[contentIndex];
    let ratingInput = promptFunction(
      `Ingresá una calificación de 1 a 5 para ${content.title}, o cancelá para interrumpir:`,
    );

    if (ratingInput === null) {
      alertFunction("Proceso interrumpido.");
      return library;
    }

    while (!validateRating(ratingInput)) {
      alertFunction("La calificación debe ser un número entero entre 1 y 5.");
      ratingInput = promptFunction(
        `Ingresá nuevamente la calificación para ${content.title}:`,
      );

      if (ratingInput === null) {
        alertFunction("Proceso interrumpido.");
        return library;
      }
    }

    const result = rateWatchedContent(library, content.id, ratingInput);
    if (!result.success) {
      alertFunction(result.message);
      contentIndex += 1;
      continue;
    }

    if (!saveLibrary(storage, result.library)) {
      alertFunction(
        "No se pudo guardar la calificación en el almacenamiento local.",
      );
      return library;
    }

    library = result.library;
    alertFunction(`Calificación guardada para ${content.title}.`);
    contentIndex += 1;
  }

  alertFunction("Todos los contenidos vistos han sido calificados.");
  return library;
}

function startApp(options = {}) {
  const promptFunction = resolvePromptFunction(options.promptFunction);
  const alertFunction = resolveAlertFunction(options.alertFunction);
  const storage = resolveStorage(options.storage);
  const catalog = options.catalog ?? CONTENT_CATALOG;
  let library = getWorkingLibrary(storage, catalog);
  let selectedOption = promptFunction(MENU_TEXT);

  while (selectedOption !== null && normalizeText(selectedOption) !== "0") {
    switch (normalizeText(selectedOption)) {
      case "1":
        runSearchFlow({ promptFunction, alertFunction, catalog });
        break;
      case "2":
        library = runFavoritesFlow({
          promptFunction,
          alertFunction,
          storage,
          catalog,
          library,
        });
        break;
      case "3":
        runSharingFlow({
          promptFunction,
          alertFunction,
          storage,
          catalog,
          library,
        });
        break;
      case "4":
        library = runRatingFlow({
          promptFunction,
          alertFunction,
          storage,
          catalog,
          library,
        });
        break;
      default:
        alertFunction("Opción inválida. Elegí una opción del menú.");
    }

    selectedOption = promptFunction(MENU_TEXT);
  }
}

if (typeof window !== "undefined" && typeof jasmine === "undefined") {
  startApp();
}
