import { Catalog } from "./models/Catalog.js";
import { Content } from "./models/Content.js";
import { Library } from "./models/Library.js";
import { LibraryStorage } from "./utils/libraryStorage.js";

const CONTENT_PRESENTATION = {
  interstellar: {
    image: "assets/images/interestellar-2.jpeg",
    imageAlt: "Paisaje montañoso de la película Interstellar",
    description:
      "Un grupo de exploradores busca un nuevo hogar para la humanidad más allá de las estrellas.",
    extra: "Duración: 169 minutos",
  },
  "el-viaje-de-chihiro": {
    image: "assets/images/chihiro.jpeg",
    imageAlt:
      "Chihiro frente a los edificios iluminados del mundo de los espíritus",
    description:
      "Chihiro entra en un mundo de espíritus y debe encontrar el valor para recuperar a sus padres.",
    extra: "Duración: 125 minutos",
  },
  dark: {
    image: "assets/images/dark.jpeg",
    imageAlt:
      "Paisaje de una ciudad nocturna para representar una serie de misterio",
    description:
      "Cuatro familias buscan respuestas cuando la desaparición de un niño revela un misterio temporal.",
    extra: "Temporadas: 3",
  },
};

let catalog;
let library;

function initializeApp() {
  const main = document.querySelector("main");
  main?.classList.add("is-loading");
  main?.setAttribute("aria-busy", "true");

  catalog = new Catalog([
    new Content(
      "interstellar",
      "Interstellar",
      "Película",
      2014,
      ["Ciencia ficción"],
      "pending",
    ),
    new Content(
      "el-viaje-de-chihiro",
      "El viaje de Chihiro",
      "Película",
      2001,
      ["Animación y fantasía"],
      "watched",
    ),
    new Content(
      "dark",
      "Dark",
      "Serie",
      2017,
      ["Misterio y ciencia ficción"],
      "pending",
    ),
  ]);

  library = loadLibrary();
  configureEvents();
  renderCatalog(catalog.getAll());
  renderLibrary();
  syncFavoriteButtons();

  const searchForm = document.getElementById("search-form");
  renderSearchFeedback(
    searchForm ? searchForm.elements.query.value : "",
    "",
    3,
  );
  main?.classList.remove("is-loading");
  main?.setAttribute("aria-busy", "false");
}

function loadLibrary() {
  const result = LibraryStorage.cargar(catalog);
  if (!result.ok) {
    renderMessage(
      document.getElementById("library-feedback"),
      "La biblioteca está disponible, pero no se pudo guardar su estado completo en este navegador.",
      "danger",
    );
  }
  return result.data;
}

function configureEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
}

function handleClick(event) {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) {
    return;
  }

  switch (actionElement.dataset.action) {
    case "toggle-favorite":
      toggleFavorite(actionElement.dataset.titleId);
      break;
    case "clear-search":
      clearSearch();
      break;
    case "share-list":
      renderShareResult();
      break;
    default:
      break;
  }
}

function handleSubmit(event) {
  if (event.target.id !== "search-form") {
    return;
  }

  event.preventDefault();
  updateSearchResults();
}

function handleInput(event) {
  if (event.target.id === "search-query") {
    updateSearchResults();
    return;
  }

  if (event.target.matches('[data-action="rate-content"]')) {
    previewRating(event.target);
  }
}

function handleChange(event) {
  if (event.target.id === "search-filter") {
    updateSearchResults();
    return;
  }

  if (event.target.matches('[data-action="update-status"]')) {
    updateContentStatus(event.target);
    return;
  }

  if (event.target.matches('[data-action="rate-content"]')) {
    saveRating(event.target);
    return;
  }

  if (event.target.id === "share-format") {
    clearShareResult();
  }
}

function updateSearchResults() {
  const form = document.getElementById("search-form");
  if (!form) {
    return;
  }

  const titleQuery = form.elements.query.value;
  const filterValue = form.elements.filter.value;
  const results = catalog.search(titleQuery, filterValue);
  renderCatalog(results);
  renderSearchFeedback(titleQuery, filterValue, results.length);
}

function clearSearch() {
  const form = document.getElementById("search-form");
  if (!form) {
    return;
  }

  form.reset();
  updateSearchResults();
  form.elements.query.focus();
}

function toggleFavorite(titleId) {
  const content = catalog.findById(titleId);
  if (!content) {
    renderMessage(
      document.getElementById("library-feedback"),
      "No se encontró el contenido seleccionado.",
      "danger",
    );
    return;
  }

  const existingEntry = library.findEntry(titleId);
  const wasFavorite = existingEntry?.getIsFavorite() ?? false;
  const result = persistLibraryChange(() =>
    wasFavorite
      ? library.removeFavorite(titleId)
      : library.addFavorite(content),
  );

  if (result.ok) {
    renderMessage(
      document.getElementById("library-feedback"),
      wasFavorite
        ? "Contenido quitado de Mi Lista."
        : "Contenido agregado a Mi Lista.",
      "success",
    );
  } else if (result.error.type === "domain") {
    renderMessage(
      document.getElementById("library-feedback"),
      wasFavorite
        ? "No se pudo quitar el contenido de Mi Lista."
        : "No se pudo agregar el contenido a Mi Lista.",
      "warning",
    );
  }
}

function updateContentStatus(select) {
  const titleId = select.dataset.titleId;
  const status = select.value;
  const result = persistLibraryChange(() => library.setStatus(titleId, status));

  if (result.ok) {
    renderMessage(
      document.getElementById("library-feedback"),
      "Estado actualizado.",
      "success",
    );
  } else if (result.error.type === "domain") {
    renderMessage(
      document.getElementById("library-feedback"),
      "No se pudo cambiar el estado. Una calificación existente requiere mantener el contenido como visto.",
      "warning",
    );
  }
}

function previewRating(input) {
  const rating = Number(input.value);
  const isValid = Number.isInteger(rating) && rating >= 1 && rating <= 5;
  const valueOutput = document.getElementById(input.dataset.valueId);
  const feedback = document.getElementById(input.dataset.feedbackId);

  if (valueOutput) {
    valueOutput.textContent = String(input.value);
  }
  setFieldFeedback(
    input,
    feedback,
    isValid
      ? "La calificación se guardará al soltar el control."
      : "Elegí un valor entero entre 1 y 5.",
    isValid,
  );
}

function saveRating(input) {
  const rating = Number(input.value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    previewRating(input);
    return;
  }

  const result = persistLibraryChange(() =>
    library.rateContent(input.dataset.titleId, rating),
  );
  const currentInput = document.getElementById(input.id) ?? input;
  const feedback = document.getElementById(input.dataset.feedbackId);
  const saved = result.ok;
  const storageFailed = !result.ok && result.error.type === "storage";
  setFieldFeedback(
    currentInput,
    feedback,
    saved
      ? "Calificación guardada."
      : storageFailed
        ? "La calificación es válida, pero no se pudo guardar."
        : "Solo se pueden calificar contenidos marcados como vistos.",
    storageFailed ? null : saved,
  );
  if (saved) {
    renderMessage(
      document.getElementById("library-feedback"),
      "Calificación guardada.",
      "success",
    );
  }
}

function persistLibraryChange(change) {
  const result = LibraryStorage.cambiar(library, change);
  library = result.data;
  if (!result.ok && result.error.type === "domain") {
    renderLibrary();
    syncFavoriteButtons();
    return result;
  }
  if (!result.ok) {
    renderLibrary();
    syncFavoriteButtons();
    renderMessage(
      document.getElementById("library-feedback"),
      "No se pudo guardar el cambio. La biblioteca anterior fue restaurada.",
      "danger",
    );
    return result;
  }

  renderLibrary();
  renderCurrentCatalog();
  syncFavoriteButtons();
  clearShareResult();
  return result;
}

function renderCurrentCatalog() {
  const form = document.getElementById("search-form");
  if (!form) {
    renderCatalog(catalog.getAll());
    return;
  }

  renderCatalog(
    catalog.search(form.elements.query.value, form.elements.filter.value),
  );
}

function renderCatalog(contents) {
  const container = document.querySelector(".catalog-grid");
  if (!container) {
    return;
  }

  container.replaceChildren(...contents.map(createCatalogCard));
}

function createCatalogCard(content) {
  const presentation = CONTENT_PRESENTATION[content.getId()] ?? {};
  const column = createElement("div", "col");
  const article = createElement("article", "h-100 catalog-card");
  const image = createElement("img");
  image.src = presentation.image ?? "";
  image.alt = presentation.imageAlt ?? content.getTitle();
  image.loading = "lazy";
  image.decoding = "async";

  const title = createElement("h3", "", content.getTitle());
  const details = createElement(
    "p",
    "",
    `${content.getType()} | ${content.getYear()} | ${content.getGenres().join(", ")}`,
  );
  const description = createElement("p", "", presentation.description ?? "");
  const metadata = createElement("div", "card-meta");
  const actions = createElement("div", "card-actions");

  if (presentation.extra) {
    metadata.append(createElement("p", "", presentation.extra));
  }
  article.append(image, title, details, description, metadata, actions);
  actions.append(createFavoriteButton(content.getId()));
  column.append(article);
  return column;
}

function createFavoriteButton(titleId) {
  const entry = library.findEntry(titleId);
  const isFavorite = entry?.getIsFavorite() ?? false;
  const button = createElement(
    "button",
    "btn btn-primary",
    isFavorite ? "Quitar de Mi Lista" : "Agregar a Mi Lista",
  );
  button.type = "button";
  button.dataset.action = "toggle-favorite";
  button.dataset.titleId = titleId;
  button.setAttribute("aria-pressed", String(isFavorite));
  return button;
}

function renderLibrary() {
  const entries = library.getEntries();
  renderLibraryStatus("pending", entries);
  renderLibraryStatus("watched", entries);
}

function renderLibraryStatus(status, entries) {
  const container = document.getElementById(
    status === "pending" ? "pending-items" : "watched-items",
  );
  const emptyState = document.getElementById(
    status === "pending" ? "pending-empty" : "watched-empty",
  );
  if (!container) {
    return;
  }

  const cards = entries
    .filter((entry) => entry.getStatus() === status)
    .map((entry) => {
      const content = catalog.findById(entry.getTitleId());
      return content ? createLibraryCard(content, entry) : null;
    })
    .filter(Boolean);

  container.replaceChildren(...cards);
  if (emptyState) {
    emptyState.hidden = cards.length > 0;
  }
}

function createLibraryCard(content, entry) {
  const article = createElement("article", "library-entry");
  article.append(
    createElement("h4", "", content.getTitle()),
    createElement(
      "p",
      "",
      entry.getIsFavorite() ? "En Mi Lista" : "No está en Mi Lista",
    ),
  );

  const statusLabel = createElement("label", "", "Estado de visualización");
  const statusSelect = createElement("select", "form-select");
  const selectId = `status-${content.getId()}`;
  statusLabel.htmlFor = selectId;
  statusSelect.id = selectId;
  statusSelect.dataset.action = "update-status";
  statusSelect.dataset.titleId = content.getId();
  for (const [value, label] of [
    ["pending", "Pendiente"],
    ["watched", "Vista"],
  ]) {
    const option = createElement("option", "", label);
    option.value = value;
    option.selected = entry.getStatus() === value;
    if (value === "pending" && entry.getRating() !== null) {
      option.disabled = true;
    }
    statusSelect.append(option);
  }
  article.append(statusLabel, statusSelect);

  if (entry.getStatus() === "watched") {
    article.append(createRatingControl(content, entry));
  }
  article.append(createFavoriteButton(content.getId()));
  return article;
}

function createRatingControl(content, entry) {
  const wrapper = createElement("div", "rating-control");
  const inputId = `rating-${content.getId()}`;
  const valueId = `${inputId}-value`;
  const feedbackId = `${inputId}-feedback`;
  const label = createElement(
    "label",
    "",
    `Tu calificación: ${content.getTitle()}`,
  );
  label.htmlFor = inputId;

  const input = createElement("input", "form-range");
  input.id = inputId;
  input.type = "range";
  input.min = "1";
  input.max = "5";
  input.step = "1";
  input.value = String(entry.getRating() ?? 3);
  input.dataset.action = "rate-content";
  input.dataset.titleId = content.getId();
  input.dataset.valueId = valueId;
  input.dataset.feedbackId = feedbackId;
  input.setAttribute("aria-describedby", `${valueId} ${feedbackId}`);

  const value = createElement("output", "rating-value", input.value);
  value.id = valueId;
  const feedback = createElement(
    "small",
    "form-text",
    entry.getRating() === null
      ? "Elegí una calificación de 1 a 5."
      : `Calificación guardada: ${entry.getRating()}.`,
  );
  feedback.id = feedbackId;
  if (entry.getRating() !== null) {
    input.classList.add("is-valid");
  }
  input.setAttribute("aria-invalid", "false");
  wrapper.append(label, input, value, feedback);
  return wrapper;
}

function syncFavoriteButtons() {
  document
    .querySelectorAll('[data-action="toggle-favorite"]')
    .forEach((button) => {
      const entry = library.findEntry(button.dataset.titleId);
      const isFavorite = entry?.getIsFavorite() ?? false;
      button.textContent = isFavorite
        ? "Quitar de Mi Lista"
        : "Agregar a Mi Lista";
      button.setAttribute("aria-pressed", String(isFavorite));
    });
}

function renderSearchFeedback(titleQuery, filterValue, resultCount) {
  const message =
    resultCount === 0
      ? "No se encontraron contenidos. Probá con otros criterios."
      : `${resultCount} ${resultCount === 1 ? "contenido encontrado" : "contenidos encontrados"}.`;
  const hasCriteria = Boolean(titleQuery.trim() || filterValue);
  renderMessage(
    document.getElementById("search-feedback"),
    hasCriteria || resultCount === 0 ? message : "Mostrando todo el catálogo.",
    resultCount === 0 ? "info" : "success",
  );
}

function renderShareResult() {
  const format = document.getElementById("share-format")?.value;
  const output = document.getElementById("share-output");
  const favorites = library.getFavorites(catalog);
  if (!output) {
    return;
  }
  if (favorites.length === 0) {
    output.value = "";
    output.hidden = true;
    renderMessage(
      document.getElementById("share-feedback"),
      "No hay contenidos en Mi Lista para compartir.",
      "warning",
    );
    return;
  }
  if (format !== "texto" && format !== "enlace") {
    renderMessage(
      document.getElementById("share-feedback"),
      "Elegí un formato válido para exportar la lista.",
      "danger",
    );
    return;
  }

  output.value =
    format === "texto"
      ? favorites
          .map((content) => `${content.getTitle()} (${content.getYear()})`)
          .join("\n")
      : `https://miproyecto.com/lista?ids=${encodeURIComponent(favorites.map((content) => content.getId()).join(","))}`;
  output.hidden = false;
  renderMessage(
    document.getElementById("share-feedback"),
    "Lista preparada. Podés seleccionar y copiar el resultado.",
    "success",
  );
}

function clearShareResult() {
  const output = document.getElementById("share-output");
  if (output) {
    output.value = "";
    output.hidden = true;
  }
  renderMessage(document.getElementById("share-feedback"), "", "info");
}

function renderMessage(container, message, type) {
  if (!container) {
    return;
  }

  container.textContent = message;
  container.className = message ? `alert alert-${type} mb-3` : "";
  container.hidden = !message;
  container.setAttribute("role", type === "danger" ? "alert" : "status");
  container.setAttribute(
    "aria-live",
    type === "danger" ? "assertive" : "polite",
  );
}

function setFieldFeedback(input, feedback, message, isValid) {
  input.classList.toggle("is-valid", isValid === true);
  input.classList.toggle("is-invalid", isValid === false);
  input.setAttribute("aria-invalid", String(isValid === false));
  if (feedback) {
    feedback.textContent = message;
    feedback.classList.toggle("text-success", isValid === true);
    feedback.classList.toggle("text-danger", isValid === false);
  }
}

function createElement(tagName, className = "", text = "") {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initializeApp, { once: true });
}
