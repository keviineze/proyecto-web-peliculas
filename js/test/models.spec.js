import { Catalog } from "../models/Catalog.js";
import { Content } from "../models/Content.js";
import { Library } from "../models/Library.js";
import { LibraryEntry } from "../models/LibraryEntry.js";

function createContent(
  id = "interstellar",
  title = "Interstellar",
  type = "Película",
  year = 2014,
  genres = ["Ciencia ficción"],
  initialStatus = "pending",
  description = "",
  extra = "",
  image = "",
  imageAlt = "",
) {
  return new Content(
    id,
    title,
    type,
    year,
    genres,
    initialStatus,
    description,
    extra,
    image,
    imageAlt,
  );
}

describe("Content", function () {
  it("construye contenido válido, expone sus datos y protege la lista de géneros", function () {
    const genres = ["Ciencia ficción"];
    const content = createContent(
      "interstellar",
      "Interstellar",
      "Película",
      2014,
      genres,
      "pending",
    );

    genres.push("Drama");
    const exposedGenres = content.getGenres();
    exposedGenres.push("Acción");

    expect(content.getId()).toBe("interstellar");
    expect(content.getTitle()).toBe("Interstellar");
    expect(content.getType()).toBe("Película");
    expect(content.getYear()).toBe(2014);
    expect(content.getGenres()).toEqual(["Ciencia ficción"]);
    expect(content.getInitialStatus()).toBe("pending");
    expect(content.getDescription()).toBe("");
    expect(content.getExtra()).toBe("");
    expect(content.getImage()).toBe("");
    expect(content.getImageAlt()).toBe("");
    expect(content.id).toBeUndefined();
  });

  it("valida identificador, título, tipo, año, géneros y estado inicial", function () {
    expect(() => createContent("", "Título")).toThrowError(TypeError);
    expect(() => createContent("id", " ")).toThrowError(TypeError);
    expect(() => createContent("id", "Título", "Documental")).toThrowError(
      TypeError,
    );
    expect(() => createContent("id", "Título", "Serie", 0)).toThrowError(
      RangeError,
    );
    expect(() => createContent("id", "Título", "Serie", 2024.5)).toThrowError(
      RangeError,
    );
    expect(() => createContent("id", "Título", "Serie", 2024, [])).toThrowError(
      TypeError,
    );
    expect(() =>
      createContent("id", "Título", "Serie", 2024, ["Drama", " "]),
    ).toThrowError(TypeError);
    expect(() =>
      createContent("id", "Título", "Serie", 2024, ["Drama"], "planned"),
    ).toThrowError(TypeError);
  });

  it("serializa y reconstruye una instancia validando el JSON de entrada", function () {
    const content = createContent(
      "dark",
      "Dark",
      "Serie",
      2017,
      ["Misterio"],
      "watched",
      "Descripción",
      "Dato adicional",
      "assets/images/dark.jpeg",
      "Texto alternativo",
    );

    expect(content.toJSON()).toEqual({
      id: "dark",
      title: "Dark",
      type: "Serie",
      year: 2017,
      genres: ["Misterio"],
      initialStatus: "watched",
      description: "Descripción",
      extra: "Dato adicional",
      image: "assets/images/dark.jpeg",
      imageAlt: "Texto alternativo",
    });
    const restored = Content.fromJSON(content.toJSON());
    expect(restored).toEqual(jasmine.any(Content));
    expect(restored.toJSON()).toEqual(content.toJSON());
    expect(
      Content.fromJSON({
        id: "legacy",
        title: "Legacy",
        type: "Película",
        year: 2000,
        genres: ["Drama"],
        initialStatus: "pending",
      }).toJSON(),
    ).toEqual({
      id: "legacy",
      title: "Legacy",
      type: "Película",
      year: 2000,
      genres: ["Drama"],
      initialStatus: "pending",
      description: "",
      extra: "",
      image: "",
      imageAlt: "",
    });
    expect(() => Content.fromJSON(null)).toThrowError(TypeError);
    expect(() => Content.fromJSON([])).toThrowError(TypeError);
  });

  it("rechaza objetos JSON parcialmente válidos y valores inválidos al reconstruir", function () {
    expect(() =>
      Content.fromJSON({
        id: "dark",
        title: "Dark",
        type: "Serie",
        year: 2017,
      }),
    ).toThrowError(TypeError);
    expect(() =>
      Content.fromJSON({
        id: "dark",
        title: "Dark",
        type: "Serie",
        year: 2017,
        genres: ["Misterio"],
        initialStatus: "planned",
      }),
    ).toThrowError(TypeError);
  });
});

describe("Catalog", function () {
  const contents = [
    createContent(),
    createContent(
      "chihiro",
      "El viaje de Chihiro",
      "Película",
      2001,
      ["Animación y fantasía"],
      "watched",
    ),
    createContent(
      "dark",
      "Dark",
      "Serie",
      2017,
      ["Misterio y ciencia ficción"],
      "pending",
    ),
  ];

  it("valida el arreglo y requiere contenidos con identificadores únicos", function () {
    expect(() => new Catalog(null)).toThrowError(TypeError);
    expect(() => new Catalog([{}])).toThrowError(TypeError);
    expect(
      () => new Catalog([contents[0], createContent("interstellar")]),
    ).toThrowError(RangeError);
  });

  it("mantiene la colección encapsulada y permite búsquedas por ID y título normalizado", function () {
    const source = [...contents];
    const catalog = new Catalog(source);
    source.pop();
    catalog.getAll().pop();

    expect(catalog.getAll().length).toBe(3);
    expect(catalog.findById("dark")).toBe(contents[2]);
    expect(catalog.findById("missing")).toBeNull();
    expect(catalog.findByName("  EL VIAJE DE CHIHIRO ")).toBe(contents[1]);
    expect(catalog.findByName("")).toBeNull();
    expect(catalog.findByName("No existe")).toBeNull();
  });

  it("busca por título parcial y combina filtros de tipo o género sin distinguir tildes", function () {
    const catalog = new Catalog(contents);

    expect(catalog.search("inter", "").map((item) => item.getId())).toEqual([
      "interstellar",
    ]);
    expect(catalog.search("", "pelicula").map((item) => item.getId())).toEqual([
      "interstellar",
      "chihiro",
    ]);
    expect(catalog.search("", "CIENCIA").map((item) => item.getId())).toEqual([
      "interstellar",
      "dark",
    ]);
    expect(catalog.search("dark", "animacion")).toEqual([]);
    expect(catalog.search("", "").length).toBe(3);
  });

  it("serializa el catálogo y reconstruye sus instancias Content", function () {
    const catalog = new Catalog(contents);
    const restored = Catalog.fromJSON(catalog.toJSON());

    expect(restored).toEqual(jasmine.any(Catalog));
    expect(restored.getAll()[0]).toEqual(jasmine.any(Content));
    expect(restored.toJSON()).toEqual(catalog.toJSON());
    expect(() => Catalog.fromJSON({})).toThrowError(TypeError);
    expect(() => Catalog.fromJSON([null])).toThrowError(TypeError);
  });

  it("rechaza catálogos JSON parcialmente inválidos y IDs duplicados", function () {
    expect(() =>
      Catalog.fromJSON([
        {
          id: "dark",
          title: "Dark",
          type: "Serie",
          year: 2017,
          genres: ["Misterio"],
          initialStatus: "pending",
        },
        { id: "incomplete" },
      ]),
    ).toThrowError(TypeError);
    expect(() =>
      Catalog.fromJSON([contents[0].toJSON(), contents[0].toJSON()]),
    ).toThrowError(RangeError);
  });
});

describe("LibraryEntry", function () {
  it("construye un registro válido y protege sus datos mediante getters", function () {
    const entry = new LibraryEntry("dark", "watched", true, 5);

    expect(entry.getTitleId()).toBe("dark");
    expect(entry.getStatus()).toBe("watched");
    expect(entry.getIsFavorite()).toBeTrue();
    expect(entry.getRating()).toBe(5);
    expect(entry.titleId).toBeUndefined();
  });

  it("valida ID, estado, favorito, rango de calificación y compatibilidad del estado", function () {
    expect(() => new LibraryEntry("", "pending", false, null)).toThrowError(
      TypeError,
    );
    expect(() => new LibraryEntry("id", "planned", false, null)).toThrowError(
      TypeError,
    );
    expect(() => new LibraryEntry("id", "pending", "true", null)).toThrowError(
      TypeError,
    );
    expect(() => new LibraryEntry("id", "watched", false, 0)).toThrowError(
      RangeError,
    );
    expect(() => new LibraryEntry("id", "watched", false, 5.5)).toThrowError(
      RangeError,
    );
    expect(() => new LibraryEntry("id", "pending", false, 3)).toThrowError(
      RangeError,
    );
  });

  it("actualiza favorito, estado y calificación y rechaza transiciones inválidas", function () {
    const entry = new LibraryEntry("dark", "pending", false, null);

    expect(entry.setFavorite(true)).toBeTrue();
    expect(entry.setFavorite("sí")).toBeFalse();
    expect(entry.getIsFavorite()).toBeTrue();
    expect(entry.setRating(4)).toBeFalse();
    expect(entry.setStatus("watched")).toBeTrue();
    expect(entry.setRating(4)).toBeTrue();
    expect(entry.setStatus("pending")).toBeFalse();
    expect(entry.setRating(6)).toBeFalse();
    expect(entry.getRating()).toBe(4);
    expect(entry.setRating(null)).toBeTrue();
    expect(entry.setStatus("pending")).toBeTrue();
  });

  it("rechaza flags no booleanos y estados inválidos al actualizar o reconstruir", function () {
    expect(() => new LibraryEntry("dark", "pending", 1, null)).toThrowError(
      TypeError,
    );
    expect(() => new LibraryEntry("dark", "planned", false, null)).toThrowError(
      TypeError,
    );

    const entry = new LibraryEntry("dark", "pending", false, null);
    expect(entry.setStatus("planned")).toBeFalse();
    expect(entry.getStatus()).toBe("pending");
    expect(() =>
      LibraryEntry.fromJSON({
        titleId: "dark",
        status: "watched",
        isFavorite: "true",
        rating: null,
      }),
    ).toThrowError(TypeError);
    expect(() =>
      LibraryEntry.fromJSON({ titleId: "dark", status: "pending" }),
    ).toThrowError(TypeError);
  });

  it("serializa y reconstruye una entrada validando el objeto", function () {
    const entry = new LibraryEntry("dark", "watched", true, null);

    expect(entry.toJSON()).toEqual({
      titleId: "dark",
      status: "watched",
      isFavorite: true,
      rating: null,
    });
    expect(LibraryEntry.fromJSON(entry.toJSON()).toJSON()).toEqual(
      entry.toJSON(),
    );
    expect(() => LibraryEntry.fromJSON(null)).toThrowError(TypeError);
    expect(() => LibraryEntry.fromJSON([])).toThrowError(TypeError);
  });
});

describe("Library", function () {
  const catalog = new Catalog([
    createContent(),
    createContent(
      "chihiro",
      "El viaje de Chihiro",
      "Película",
      2001,
      ["Animación y fantasía"],
      "watched",
    ),
    createContent("dark", "Dark", "Serie", 2017, ["Misterio"], "pending"),
  ]);

  it("valida entradas únicas y encapsula copias independientes", function () {
    const sourceEntry = new LibraryEntry(
      "interstellar",
      "pending",
      false,
      null,
    );
    const source = [sourceEntry];
    const library = new Library(source);

    sourceEntry.setFavorite(true);
    const exposedEntry = library.getEntries()[0];
    exposedEntry.setFavorite(true);

    expect(() => new Library(null)).toThrowError(TypeError);
    expect(() => new Library([{}])).toThrowError(TypeError);
    expect(
      () =>
        new Library([
          new LibraryEntry("same", "pending", false, null),
          new LibraryEntry("same", "watched", false, null),
        ]),
    ).toThrowError(RangeError);
    expect(library.findEntry("interstellar").getIsFavorite()).toBeFalse();
    expect(library.findEntry("missing")).toBeNull();
  });

  it("crea el estado inicial y agrega o quita favoritos preservando otros datos", function () {
    const library = Library.createInitial(catalog);

    expect(library.toJSON()).toEqual([
      {
        titleId: "interstellar",
        status: "pending",
        isFavorite: false,
        rating: null,
      },
      {
        titleId: "chihiro",
        status: "watched",
        isFavorite: false,
        rating: null,
      },
      { titleId: "dark", status: "pending", isFavorite: false, rating: null },
    ]);
    expect(library.addFavorite(catalog.findById("chihiro"))).toBeTrue();
    expect(library.rateContent("chihiro", 5)).toBeTrue();
    expect(library.addFavorite(catalog.findById("chihiro"))).toBeFalse();
    expect(library.removeFavorite("chihiro")).toBeTrue();
    expect(library.removeFavorite("chihiro")).toBeFalse();
    expect(library.findEntry("chihiro").toJSON()).toEqual({
      titleId: "chihiro",
      status: "watched",
      isFavorite: false,
      rating: 5,
    });
    expect(() => library.addFavorite({})).toThrowError(TypeError);
    expect(() => Library.createInitial({})).toThrowError(TypeError);
  });

  it("alterna favoritos desde el dominio sin perder estado personal", function () {
    const library = Library.createInitial(catalog);
    library.setStatus("chihiro", "watched");
    library.rateContent("chihiro", 5);

    expect(library.toggleFavorite(catalog.findById("chihiro"))).toBeTrue();
    expect(library.findEntry("chihiro").toJSON()).toEqual({
      titleId: "chihiro",
      status: "watched",
      isFavorite: true,
      rating: 5,
    });
    expect(library.toggleFavorite(catalog.findById("chihiro"))).toBeTrue();
    expect(library.findEntry("chihiro").getIsFavorite()).toBeFalse();
  });

  it("restaura datos válidos sobre el estado inicial y omite registros inválidos o desconocidos", function () {
    const restored = Library.restore(catalog, [
      {
        titleId: "chihiro",
        status: "watched",
        isFavorite: true,
        rating: 4,
      },
      { titleId: "dark", status: "pending", isFavorite: "yes", rating: null },
      {
        titleId: "removed-title",
        status: "watched",
        isFavorite: true,
        rating: null,
      },
    ]);

    expect(restored.findEntry("chihiro").toJSON()).toEqual({
      titleId: "chihiro",
      status: "watched",
      isFavorite: true,
      rating: 4,
    });
    expect(restored.findEntry("dark").toJSON()).toEqual({
      titleId: "dark",
      status: "pending",
      isFavorite: false,
      rating: null,
    });
    expect(restored.getEntries().length).toBe(3);
    expect(() => Library.restore({}, [])).toThrowError(TypeError);
  });

  it("resuelve favoritos y vistos sin calificación desde el catálogo", function () {
    const library = Library.createInitial(catalog);
    library.addFavorite(catalog.findById("dark"));
    library.setStatus("chihiro", "watched");

    expect(library.getFavorites(catalog).map((item) => item.getId())).toEqual([
      "dark",
    ]);
    expect(
      library.getUnratedWatchedContents(catalog).map((item) => item.getId()),
    ).toEqual(["chihiro"]);
    expect(() => library.getFavorites({})).toThrowError(TypeError);
    expect(() => library.getUnratedWatchedContents({})).toThrowError(TypeError);
  });

  it("actualiza estados y ratings existentes y rechaza cambios inválidos o IDs ausentes", function () {
    const library = Library.createInitial(catalog);

    expect(library.rateContent("interstellar", 4)).toBeFalse();
    expect(library.setStatus("missing", "watched")).toBeFalse();
    expect(library.setStatus("interstellar", "watched")).toBeTrue();
    expect(library.rateContent("interstellar", 4)).toBeTrue();
    expect(library.setStatus("interstellar", "pending")).toBeFalse();
    expect(library.rateContent("interstellar", 8)).toBeFalse();
    expect(library.rateContent("interstellar", null)).toBeTrue();
    expect(library.setStatus("interstellar", "pending")).toBeTrue();
  });

  it("maneja IDs inexistentes al actualizar y omite entradas no resueltas por el catálogo", function () {
    const library = new Library([
      new LibraryEntry("removed-title", "watched", true, null),
    ]);

    expect(library.removeFavorite("missing")).toBeFalse();
    expect(library.rateContent("missing", 4)).toBeFalse();
    expect(library.setStatus("missing", "watched")).toBeFalse();
    expect(library.getFavorites(catalog)).toEqual([]);
    expect(library.getUnratedWatchedContents(catalog)).toEqual([]);
  });

  it("serializa y restaura la biblioteca con entradas independientes", function () {
    const library = Library.createInitial(catalog);
    library.addFavorite(catalog.findById("dark"));
    const restored = Library.fromJSON(library.toJSON());

    expect(restored.toJSON()).toEqual(library.toJSON());
    expect(restored.getEntries()[0]).toEqual(jasmine.any(LibraryEntry));
    expect(() => Library.fromJSON({})).toThrowError(TypeError);
    expect(() => Library.fromJSON([null])).toThrowError(TypeError);
    expect(() =>
      Library.fromJSON([
        {
          titleId: "dark",
          status: "pending",
          isFavorite: false,
          rating: null,
        },
        { titleId: "incomplete" },
      ]),
    ).toThrowError(TypeError);
  });
});
