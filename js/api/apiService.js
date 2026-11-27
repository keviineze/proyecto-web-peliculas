/**
 * Service for loading and normalizing the asynchronous movie catalog.
 */
export class ApiService {
  /**
   * Loads and sanitizes catalog data from a local or remote JSON endpoint.
   * @param {string} endpoint JSON resource URL.
   * @returns {Promise<object[]>} Sanitized catalog records.
   * @throws {Error} When the response is not successful or the payload is invalid.
   */
  static async fetchCatalog(endpoint = "api/data.json") {
    try {
      const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`No se pudo cargar el catálogo (${response.status}).`);
      }

      const payload = await response.json();
      const rawItems = Array.isArray(payload) ? payload : payload?.catalog;
      if (!Array.isArray(rawItems)) {
        throw new TypeError("El catálogo recibido no tiene un formato válido.");
      }

      return ApiService.processCollection(rawItems);
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Ocurrió un error inesperado al cargar el catálogo.");
    }
  }

  /**
   * Validates whether a raw value can be represented as catalog content.
   * @param {*} item Raw catalog item.
   * @returns {boolean} Whether the item contains the required fields.
   */
  static isValidContent(item) {
    return (
      item !== null &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      typeof item.id === "string" &&
      item.id.trim().length > 0 &&
      typeof item.title === "string" &&
      item.title.trim().length > 0 &&
      (item.type === "Película" || item.type === "Serie") &&
      Number.isInteger(item.year) &&
      item.year > 0 &&
      Array.isArray(item.genres) &&
      item.genres.length > 0 &&
      item.genres.every(
        (genre) => typeof genre === "string" && genre.trim().length > 0,
      ) &&
      (item.initialStatus === "pending" || item.initialStatus === "watched")
    );
  }

  /**
   * Sanitizes a valid catalog item into the POO domain format.
   * @param {object} item Raw catalog item.
   * @returns {object|null} A normalized object or null when invalid.
   */
  static sanitizeContent(item) {
    if (!ApiService.isValidContent(item)) {
      return null;
    }

    const sanitized = {
      id: item.id.trim(),
      title: item.title.trim(),
      type: item.type,
      year: item.year,
      genres: item.genres.map((genre) => genre.trim()).filter(Boolean),
      initialStatus: item.initialStatus,
    };
    if (typeof item.description === "string") {
      sanitized.description = item.description.trim();
    }
    if (typeof item.extra === "string") {
      sanitized.extra = item.extra.trim();
    }
    if (
      typeof item.image === "string" &&
      /^assets\/images\/[a-z0-9-]+\.(?:svg|webp|jpe?g|png)$/i.test(item.image)
    ) {
      sanitized.image = item.image;
    }
    if (typeof item.imageAlt === "string") {
      sanitized.imageAlt = item.imageAlt.trim();
    }
    return sanitized;
  }

  /**
   * Processes a collection explicitly with map, filter and reduce.
   * @param {*} items Raw collection.
   * @returns {object[]} Sanitized and de-duplicated catalog items.
   */
  static processCollection(items) {
    if (!Array.isArray(items)) {
      return [];
    }

    const mapped = items.map((item) => ApiService.sanitizeContent(item));
    const validItems = mapped.filter((item) => item !== null);

    return validItems.reduce((collection, item) => {
      if (!collection.some((current) => current.id === item.id)) {
        collection.push(item);
      }
      return collection;
    }, []);
  }

  /**
   * Filters a collection by type or genre.
   * @param {object[]} items Sanitized catalog items.
   * @param {string} category Type or genre to match.
   * @returns {object[]} Matching items.
   */
  static filterByCategory(items, category) {
    const normalized = String(category ?? "").trim().toLocaleLowerCase("es");
    if (!normalized) {
      return Array.isArray(items) ? [...items] : [];
    }

    return (Array.isArray(items) ? items : []).filter(
      (item) =>
        item.type.toLocaleLowerCase("es").includes(normalized) ||
        item.genres.some((genre) =>
          genre.toLocaleLowerCase("es").includes(normalized),
        ),
    );
  }

  /**
   * Calculates catalog statistics with reduce().
   * @param {object[]} items Sanitized catalog items.
   * @returns {{total: number, movies: number, series: number, genres: number, averageYear: number}} Statistics.
   */
  static calculateStats(items) {
    const collection = Array.isArray(items) ? items : [];
    const totals = collection.reduce(
      (stats, item) => {
        stats.total += 1;
        stats[item.type === "Película" ? "movies" : "series"] += 1;
        item.genres.forEach((genre) => stats.genreNames.add(genre));
        stats.yearTotal += item.year;
        return stats;
      },
      {
        total: 0,
        movies: 0,
        series: 0,
        genreNames: new Set(),
        yearTotal: 0,
      },
    );
    return {
      total: totals.total,
      movies: totals.movies,
      series: totals.series,
      genres: totals.genreNames.size,
      averageYear:
        totals.total === 0 ? 0 : Math.round(totals.yearTotal / totals.total),
    };
  }

  /**
   * Instance wrapper for fetchCatalog().
   * @param {string} endpoint JSON resource URL.
   * @returns {Promise<object[]>} Sanitized catalog records.
   */
  fetchCatalog(endpoint = "api/data.json") {
    return ApiService.fetchCatalog(endpoint);
  }

  /**
   * Shows a visible loading state inside the catalog container.
   * @param {HTMLElement|null} container Catalog status container.
   * @returns {void}
   */
  static showLoading(container) {
    if (
      typeof HTMLElement === "undefined" ||
      !(container instanceof HTMLElement)
    ) {
      return;
    }
    container.hidden = false;
    container.className = "catalog-status catalog-loading";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    container.textContent = "Cargando catálogo...";
  }

  /**
   * Hides the catalog loading or error state.
   * @param {HTMLElement|null} container Catalog status container.
   * @returns {void}
   */
  static hideLoading(container) {
    if (
      typeof HTMLElement === "undefined" ||
      !(container instanceof HTMLElement)
    ) {
      return;
    }
    container.hidden = true;
  }

  /**
   * Shows an accessible error and retry control.
   * @param {HTMLElement|null} container Catalog status container.
   * @param {string} message Friendly error message.
   * @param {() => void} retry Callback executed by the retry button.
   * @returns {void}
   */
  static showError(container, message, retry) {
    if (
      typeof HTMLElement === "undefined" ||
      !(container instanceof HTMLElement) ||
      typeof document === "undefined"
    ) {
      return;
    }
    container.hidden = false;
    container.className = "catalog-status catalog-error";
    container.setAttribute("role", "alert");
    container.replaceChildren();

    const text = document.createElement("p");
    text.textContent = message;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.textContent = "Reintentar";
    button.addEventListener("click", () => {
      if (typeof retry === "function") {
        retry();
      }
    });
    container.append(text, button);
  }

  /** @type {typeof ApiService.showLoading} */
  showLoading(container) {
    ApiService.showLoading(container);
  }

  /** @type {typeof ApiService.hideLoading} */
  hideLoading(container) {
    ApiService.hideLoading(container);
  }

  /** @type {typeof ApiService.showError} */
  showError(container, message, retry) {
    ApiService.showError(container, message, retry);
  }
}

export default ApiService;
