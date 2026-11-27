/**
 * Creates shareable representations of favorite catalog contents.
 */
export const ListExport = {
  /**
   * @param {import("../models/Content.js").Content[]} favorites Favorite contents.
   * @param {string} format "texto" or "enlace".
   * @param {string} [baseUrl] Current application URL.
   * @returns {string} Exported list representation.
   */
  format(favorites, format, baseUrl = globalThis.location?.href) {
    if (!Array.isArray(favorites)) {
      throw new TypeError("Favorites must be an array.");
    }
    if (format === "texto") {
      return favorites
        .map((content) => `${content.getTitle()} (${content.getYear()})`)
        .join("\n");
    }
    if (format === "enlace") {
      if (!baseUrl) {
        throw new TypeError("A base URL is required to create a share link.");
      }
      const url = new URL(baseUrl);
      url.searchParams.set(
        "lista",
        favorites.map((content) => content.getId()).join(","),
      );
      return url.toString();
    }
    throw new RangeError("Unsupported list export format.");
  },
};
