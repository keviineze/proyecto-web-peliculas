/**
 * Represents a movie or series available in the catalog.
 */
export class Content {
  #id;
  #title;
  #type;
  #year;
  #genres;
  #initialStatus;

  /**
   * @param {string} id Stable content identifier.
   * @param {string} title Display title.
   * @param {"Película" | "Serie"} type Catalog content type.
   * @param {number} year Release year.
   * @param {string[]} genres One or more associated genres.
   * @param {"pending" | "watched"} initialStatus Default personal status.
   */
  constructor(id, title, type, year, genres, initialStatus) {
    if (typeof id !== "string" || !id.trim()) {
      throw new TypeError("Content id must be a non-empty string.");
    }
    if (typeof title !== "string" || !title.trim()) {
      throw new TypeError("Content title must be a non-empty string.");
    }
    if (type !== "Película" && type !== "Serie") {
      throw new TypeError('Content type must be "Película" or "Serie".');
    }
    if (!Number.isInteger(year) || year < 1) {
      throw new RangeError("Content year must be a positive integer.");
    }
    if (
      !Array.isArray(genres) ||
      genres.length === 0 ||
      genres.some((genre) => typeof genre !== "string" || !genre.trim())
    ) {
      throw new TypeError("Content genres must be a non-empty array of strings.");
    }
    if (initialStatus !== "pending" && initialStatus !== "watched") {
      throw new TypeError(
        'Initial status must be "pending" or "watched".',
      );
    }

    this.#id = id;
    this.#title = title;
    this.#type = type;
    this.#year = year;
    this.#genres = [...genres];
    this.#initialStatus = initialStatus;
  }

  /** @returns {string} */
  getId() {
    return this.#id;
  }

  /** @returns {string} */
  getTitle() {
    return this.#title;
  }

  /** @returns {"Película" | "Serie"} */
  getType() {
    return this.#type;
  }

  /** @returns {number} */
  getYear() {
    return this.#year;
  }

  /** @returns {string[]} A copy of the genre list. */
  getGenres() {
    return [...this.#genres];
  }

  /** @returns {"pending" | "watched"} */
  getInitialStatus() {
    return this.#initialStatus;
  }

  /**
   * @returns {{id: string, title: string, type: string, year: number, genres: string[], initialStatus: string}}
   */
  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      type: this.#type,
      year: this.#year,
      genres: this.getGenres(),
      initialStatus: this.#initialStatus,
    };
  }

  /**
   * Reconstructs a Content instance from serialized data.
   * @param {object} data Serialized content.
   * @returns {Content}
   */
  static fromJSON(data) {
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      throw new TypeError("Content data must be an object.");
    }

    return new Content(
      data.id,
      data.title,
      data.type,
      data.year,
      data.genres,
      data.initialStatus,
    );
  }
}
