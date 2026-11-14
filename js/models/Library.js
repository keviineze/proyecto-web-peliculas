import { Content } from "./Content.js";
import { Catalog } from "./Catalog.js";
import { LibraryEntry } from "./LibraryEntry.js";

/**
 * Manages a user's LibraryEntry collection and related business operations.
 */
export class Library {
  #entries;

  /**
   * @param {LibraryEntry[]} entries Personal library records.
   */
  constructor(entries) {
    if (!Array.isArray(entries)) {
      throw new TypeError("Library entries must be an array.");
    }
    if (entries.some((entry) => !(entry instanceof LibraryEntry))) {
      throw new TypeError("Every library item must be a LibraryEntry instance.");
    }

    const identifiers = new Set(
      entries.map((entry) => entry.getTitleId()),
    );
    if (identifiers.size !== entries.length) {
      throw new RangeError("Library titleIds must be unique.");
    }

    this.#entries = entries.map((entry) =>
      LibraryEntry.fromJSON(entry.toJSON()),
    );
  }

  /** @returns {LibraryEntry[]} Independent copies of the library records. */
  getEntries() {
    return this.#entries.map((entry) =>
      LibraryEntry.fromJSON(entry.toJSON()),
    );
  }

  /**
   * Finds a library record by content identifier.
   * @param {string} titleId Content identifier.
   * @returns {LibraryEntry | null} An independent copy, or null.
   */
  findEntry(titleId) {
    const entry =
      this.#entries.find((item) => item.getTitleId() === titleId) ?? null;

    return entry ? LibraryEntry.fromJSON(entry.toJSON()) : null;
  }

  /**
   * Adds a content as a favorite without overwriting existing personal state.
   * @param {Content} content Content to add.
   * @returns {boolean} Whether the favorite was added.
   */
  addFavorite(content) {
    if (!(content instanceof Content)) {
      throw new TypeError("A Content instance is required.");
    }

    const existingEntry =
      this.#entries.find((entry) => entry.getTitleId() === content.getId()) ??
      null;
    if (existingEntry) {
      if (existingEntry.getIsFavorite()) {
        return false;
      }

      return existingEntry.setFavorite(true);
    }

    this.#entries.push(
      new LibraryEntry(
        content.getId(),
        content.getInitialStatus(),
        true,
        null,
      ),
    );
    return true;
  }

  /**
   * Removes favorite status while preserving the record's other state.
   * @param {string} titleId Content identifier.
   * @returns {boolean} Whether a favorite was removed.
   */
  removeFavorite(titleId) {
    const entry =
      this.#entries.find((item) => item.getTitleId() === titleId) ?? null;

    if (!entry || !entry.getIsFavorite()) {
      return false;
    }

    return entry.setFavorite(false);
  }

  /**
   * Resolves favorite records to their catalog contents.
   * @param {Catalog} catalog Catalog used to resolve content identifiers.
   * @returns {Content[]}
   */
  getFavorites(catalog) {
    Library.#assertCatalog(catalog);

    return this.#entries
      .filter((entry) => entry.getIsFavorite())
      .map((entry) => catalog.findById(entry.getTitleId()))
      .filter((content) => content !== null);
  }

  /**
   * Resolves watched records without ratings to their catalog contents.
   * @param {Catalog} catalog Catalog used to resolve content identifiers.
   * @returns {Content[]}
   */
  getUnratedWatchedContents(catalog) {
    Library.#assertCatalog(catalog);

    return this.#entries
      .filter(
        (entry) =>
          entry.getStatus() === "watched" && entry.getRating() === null,
      )
      .map((entry) => catalog.findById(entry.getTitleId()))
      .filter((content) => content !== null);
  }

  /**
   * Rates a watched library record.
   * @param {string} titleId Content identifier.
   * @param {number | null} rating Integer from 1 to 5, or null to clear it.
   * @returns {boolean} Whether the rating was applied.
   */
  rateContent(titleId, rating) {
    const entry =
      this.#entries.find((item) => item.getTitleId() === titleId) ?? null;

    return entry ? entry.setRating(rating) : false;
  }

  /**
   * Updates a library entry's viewing status without exposing the entry.
   * @param {string} titleId Content identifier.
   * @param {"pending" | "watched"} status New viewing status.
   * @returns {boolean} Whether the status update was applied.
   */
  setStatus(titleId, status) {
    const entry =
      this.#entries.find((item) => item.getTitleId() === titleId) ?? null;

    return entry ? entry.setStatus(status) : false;
  }

  /** @returns {object[]} Plain serializable library entries. */
  toJSON() {
    return this.#entries.map((entry) => entry.toJSON());
  }

  /**
   * Reconstructs a Library and its LibraryEntry instances from serialized data.
   * @param {object[]} data Serialized library.
   * @returns {Library}
   */
  static fromJSON(data) {
    if (!Array.isArray(data)) {
      throw new TypeError("Library data must be an array.");
    }

    return new Library(data.map((item) => LibraryEntry.fromJSON(item)));
  }

  /**
   * Creates the initial personal state from each content's initial status.
   * @param {Catalog} catalog Source catalog.
   * @returns {Library}
   */
  static createInitial(catalog) {
    Library.#assertCatalog(catalog);

    return new Library(
      catalog
        .getAll()
        .map(
          (content) =>
            new LibraryEntry(
              content.getId(),
              content.getInitialStatus(),
              false,
              null,
            ),
        ),
    );
  }

  static #assertCatalog(catalog) {
    if (!(catalog instanceof Catalog)) {
      throw new TypeError("A Catalog instance is required.");
    }
  }
}
