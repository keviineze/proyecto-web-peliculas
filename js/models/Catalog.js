import { Content } from "./Content.js";

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Manages the available collection of Content instances.
 */
export class Catalog {
  #contents;

  /**
   * @param {Content[]} contents Catalog contents.
   */
  constructor(contents) {
    if (!Array.isArray(contents)) {
      throw new TypeError("Catalog contents must be an array.");
    }
    if (contents.some((content) => !(content instanceof Content))) {
      throw new TypeError("Every catalog item must be a Content instance.");
    }

    const identifiers = new Set(contents.map((content) => content.getId()));
    if (identifiers.size !== contents.length) {
      throw new RangeError("Catalog content identifiers must be unique.");
    }

    this.#contents = [...contents];
  }

  /** @returns {Content[]} A copy of the catalog collection. */
  getAll() {
    return [...this.#contents];
  }

  /**
   * Finds a content by its stable identifier.
   * @param {string} id Content identifier.
   * @returns {Content | null}
   */
  findById(id) {
    return this.#contents.find((content) => content.getId() === id) ?? null;
  }

  /**
   * Finds a content by its full title, ignoring case and diacritics.
   * @param {string} name Content title.
   * @returns {Content | null}
   */
  findByName(name) {
    const normalizedName = normalizeText(name);
    if (!normalizedName) {
      return null;
    }

    return (
      this.#contents.find(
        (content) => normalizeText(content.getTitle()) === normalizedName,
      ) ?? null
    );
  }

  /**
   * Searches by partial title and optionally filters by type or genre.
   * @param {string} titleQuery Partial title; an empty value matches all titles.
   * @param {string} filterValue Optional type or genre filter.
   * @returns {Content[]} Matching contents in catalog order.
   */
  search(titleQuery, filterValue) {
    const normalizedTitle = normalizeText(titleQuery);
    const normalizedFilter = normalizeText(filterValue);

    return this.#contents.filter((content) => {
      const matchesTitle =
        !normalizedTitle ||
        normalizeText(content.getTitle()).includes(normalizedTitle);
      const matchesFilter =
        !normalizedFilter ||
        normalizeText(content.getType()).includes(normalizedFilter) ||
        content
          .getGenres()
          .some((genre) => normalizeText(genre).includes(normalizedFilter));

      return matchesTitle && matchesFilter;
    });
  }

  /** @returns {object[]} Plain serializable content data. */
  toJSON() {
    return this.#contents.map((content) => content.toJSON());
  }

  /**
   * Reconstructs a Catalog and its Content instances from serialized data.
   * @param {object[]} data Serialized catalog.
   * @returns {Catalog}
   */
  static fromJSON(data) {
    if (!Array.isArray(data)) {
      throw new TypeError("Catalog data must be an array.");
    }

    return new Catalog(data.map((item) => Content.fromJSON(item)));
  }
}
