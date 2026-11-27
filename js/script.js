import { Catalog } from "./models/Catalog.js";
import { Content } from "./models/Content.js";
import { Library } from "./models/Library.js";
import { LibraryStorage } from "./utils/libraryStorage.js";
import { ListExport } from "./utils/listExport.js";

const FEEDBACK_TIMEOUT_MS = 4000;
const feedbackTimeouts = new WeakMap();

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
let currentListFilter = "all";

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
  renderFeaturedCarousel(catalog.getAll());
  renderLibrary();
  renderMyList();
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
  const listFilter = event.target.closest("[data-list-filter]");
  if (listFilter) {
    event.preventDefault();
    currentListFilter = listFilter.dataset.listFilter;
    renderMyList();
    return;
  }

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
      startSharing();
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
  const queryInput = form.elements.query;
  const feedback = document.getElementById("search-feedback");
  const queryIsValid = queryInput.value.length <= 100;
  queryInput.classList.toggle("is-invalid", !queryIsValid);
  queryInput.setAttribute("aria-invalid", String(!queryIsValid));
  form.elements.filter.setAttribute("aria-invalid", "false");
  if (!queryIsValid) {
    renderMessage(
      feedback,
      "La búsqueda no puede superar los 100 caracteres.",
      "danger",
    );
    return;
  }
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

  const result = persistLibraryChange(() => library.toggleFavorite(content));

  if (result.ok) {
    const isFavorite = library.findEntry(titleId)?.getIsFavorite() ?? false;
    renderMessage(
      document.getElementById("library-feedback"),
      isFavorite
        ? "Contenido agregado a Mi Lista."
        : "Contenido quitado de Mi Lista.",
      "success",
    );
  } else if (result.error.type === "domain") {
    renderMessage(
      document.getElementById("library-feedback"),
      "No se pudo actualizar el contenido en Mi Lista.",
      "warning",
    );
  }
}

function updateContentStatus(select) {
  const titleId = select.dataset.titleId;
  const status = select.value;
  const result = persistLibraryChange(() => library.setStatus(titleId, status));

  if (result.ok) {
    select.setAttribute("aria-invalid", "false");
    renderMessage(
      document.getElementById("library-feedback"),
      "Estado actualizado.",
      "success",
    );
  } else if (result.error.type === "domain") {
    const currentEntry = library.findEntry(titleId);
    if (currentEntry) {
      select.value = currentEntry.getStatus();
    }
    select.setAttribute("aria-invalid", "true");
    renderMessage(
      document.getElementById("library-feedback"),
      "No se pudo cambiar el estado. Una calificación existente requiere mantener el contenido como visto.",
      "warning",
    );
  }
}

function previewRating(input) {
  const isValid = input.checkValidity();
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
      : input.validationMessage || "Elegí una calificación válida.",
    isValid,
  );
}

function saveRating(input) {
  const rating = input.valueAsNumber;
  if (!input.checkValidity()) {
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
        : "No se pudo aplicar la calificación a este contenido.",
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
    renderMyList();
    syncFavoriteButtons();
    return result;
  }
  if (!result.ok) {
    renderLibrary();
    renderMyList();
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
  renderMyList();
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

function renderFeaturedCarousel(contents) {
  const carousel = document.querySelector("#featured-carousel .carousel-inner");
  if (!carousel) {
    return;
  }

  carousel.replaceChildren(
    ...contents.map((content, index) => {
      const item = createElement(
        "div",
        `carousel-item${index === 0 ? " active" : ""}`,
      );
      const presentation = CONTENT_PRESENTATION[content.getId()] ?? {};
      const slide = createElement("div", "featured-slide");
      const image = createElement("img", "featured-slide-image");
      image.src = presentation.image ?? "";
      image.alt = presentation.imageAlt ?? content.getTitle();
      image.loading = "lazy";
      image.decoding = "async";

      const caption = createElement("div", "featured-slide-caption");
      caption.append(
        createElement("h3", "", content.getTitle()),
        createFavoriteButton(content.getId()),
        createElement(
          "p",
          "",
          `${content.getType()} | ${content.getYear()} | ${content.getGenres().join(", ")}`,
        ),
        createElement("p", "", presentation.description ?? ""),
      );
      slide.append(image, caption);
      item.append(slide);
      return item;
    }),
  );
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

function renderMyList() {
  const container = document.getElementById("my-list-items");
  if (!container) {
    return;
  }

  const filters = {
    all: () => true,
    favorites: (entry) => entry.getIsFavorite(),
    watched: (entry) => entry.getStatus() === "watched",
    pending: (entry) => entry.getStatus() === "pending",
  };
  const matchesFilter = filters[currentListFilter] ?? filters.all;
  const entries = library
    .getEntries()
    .filter(matchesFilter)
    .map((entry) => ({ entry, content: catalog.findById(entry.getTitleId()) }))
    .filter(({ content }) => content !== null);

  container.replaceChildren(
    ...entries.map(({ entry, content }) => {
      const item = createElement("article", "my-list-entry");
      item.append(
        createElement("h3", "", content.getTitle()),
        createElement(
          "p",
          "",
          `${entry.getStatus() === "watched" ? "Vista" : "Pendiente"} · ${entry.getIsFavorite() ? "Favorita" : "No favorita"}`,
        ),
        createFavoriteButton(content.getId()),
      );
      return item;
    }),
  );

  const emptyState = document.getElementById("my-list-empty");
  if (emptyState) {
    emptyState.hidden = entries.length > 0;
  }
  document.querySelectorAll("[data-list-filter]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.listFilter === currentListFilter),
    );
  });
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

  try {
    output.value = ListExport.format(favorites, format);
  } catch {
    renderMessage(
      document.getElementById("share-feedback"),
      "No se pudo preparar la lista con ese formato.",
      "danger",
    );
    return null;
  }
  output.hidden = false;
  renderMessage(
    document.getElementById("share-feedback"),
    "Lista preparada. Podés seleccionar y copiar el resultado.",
    "success",
  );
  return { format, value: output.value, output };
}

function startSharing() {
  const result = renderShareResult();
  if (!result) {
    return;
  }

  if (typeof navigator.share === "function") {
    navigator.share({ title: "Mi Lista", text: result.value }).then(
      () =>
        renderMessage(
          document.getElementById("share-feedback"),
          "Lista compartida.",
          "success",
        ),
      (error) => {
        if (error.name !== "AbortError") {
          renderMessage(
            document.getElementById("share-feedback"),
            "No se pudo abrir la opción de compartir. El resultado quedó listo para copiar.",
            "warning",
          );
        }
      },
    );
    return;
  }

  result.output.focus();
  result.output.select();
  renderMessage(
    document.getElementById("share-feedback"),
    "Lista preparada y seleccionada para copiar.",
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
  clearTimeout(feedbackTimeouts.get(container));
  if (message) {
    const timeout = setTimeout(() => {
      container.hidden = true;
      container.textContent = "";
      container.className = "";
      feedbackTimeouts.delete(container);
    }, FEEDBACK_TIMEOUT_MS);
    feedbackTimeouts.set(container, timeout);
  }
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
