/**
 * Stores a user's personal state for one catalog content.
 */
export class LibraryEntry {
  #titleId;
  #status;
  #isFavorite;
  #rating;

  /**
   * @param {string} titleId Stable content identifier.
   * @param {"pending" | "watched"} status Personal viewing status.
   * @param {boolean} isFavorite Whether the content is a favorite.
   * @param {number | null} rating Integer rating from 1 to 5, or null.
   */
  constructor(titleId, status, isFavorite, rating) {
    if (typeof titleId !== "string" || !titleId.trim()) {
      throw new TypeError("Library entry titleId must be a non-empty string.");
    }
    if (status !== "pending" && status !== "watched") {
      throw new TypeError('Library entry status must be "pending" or "watched".');
    }
    if (typeof isFavorite !== "boolean") {
      throw new TypeError("Library entry isFavorite must be a boolean.");
    }
    if (!LibraryEntry.#isValidRating(rating)) {
      throw new RangeError("Library entry rating must be null or an integer from 1 to 5.");
    }
    if (rating !== null && status !== "watched") {
      throw new RangeError("Only watched contents can have a rating.");
    }

    this.#titleId = titleId;
    this.#status = status;
    this.#isFavorite = isFavorite;
    this.#rating = rating;
  }

  /** @returns {string} */
  getTitleId() {
    return this.#titleId;
  }

  /** @returns {"pending" | "watched"} */
  getStatus() {
    return this.#status;
  }

  /** @returns {boolean} */
  getIsFavorite() {
    return this.#isFavorite;
  }

  /** @returns {number | null} */
  getRating() {
    return this.#rating;
  }

  /**
   * Updates favorite status.
   * @param {boolean} value New favorite status.
   * @returns {boolean} Whether the update was applied.
   */
  setFavorite(value) {
    if (typeof value !== "boolean") {
      return false;
    }

    this.#isFavorite = value;
    return true;
  }

  /**
   * Updates viewing status, preventing a rated entry from becoming pending.
   * @param {"pending" | "watched"} status New viewing status.
   * @returns {boolean} Whether the update was applied.
   */
  setStatus(status) {
    if (
      (status !== "pending" && status !== "watched") ||
      (status === "pending" && this.#rating !== null)
    ) {
      return false;
    }

    this.#status = status;
    return true;
  }

  /**
   * Sets a rating only for a watched entry.
   * @param {number | null} rating Integer from 1 to 5, or null to clear it.
   * @returns {boolean} Whether the update was applied.
   */
  setRating(rating) {
    if (!LibraryEntry.#isValidRating(rating)) {
      return false;
    }
    if (rating !== null && this.#status !== "watched") {
      return false;
    }

    this.#rating = rating;
    return true;
  }

  /**
   * @returns {{titleId: string, status: string, isFavorite: boolean, rating: number | null}}
   */
  toJSON() {
    return {
      titleId: this.#titleId,
      status: this.#status,
      isFavorite: this.#isFavorite,
      rating: this.#rating,
    };
  }

  /**
   * Reconstructs a LibraryEntry instance from serialized data.
   * @param {object} data Serialized library entry.
   * @returns {LibraryEntry}
   */
  static fromJSON(data) {
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      throw new TypeError("Library entry data must be an object.");
    }

    return new LibraryEntry(
      data.titleId,
      data.status,
      data.isFavorite,
      data.rating,
    );
  }

  static #isValidRating(rating) {
    return (
      rating === null ||
      (Number.isInteger(rating) && rating >= 1 && rating <= 5)
    );
  }
}
