import { showToast } from "../utils/notifications.js";

describe("showToast (librería externa Toastify)", function () {
  let toastifySpy;
  let showSpy;
  let capturedOptions;

  beforeEach(function () {
    capturedOptions = [];
    showSpy = jasmine.createSpy("showToast");
    toastifySpy = jasmine
      .createSpy("Toastify")
      .and.callFake(function (options) {
        capturedOptions.push(options);
        return { showToast: showSpy };
      });
    window.Toastify = toastifySpy;
  });

  afterEach(function () {
    delete window.Toastify;
  });

  describe("inicialización", function () {
    it("debe disponer de la librería Toastify cargada vía CDN en index.html", async function () {
      const response = await fetch("index.html");
      const html = await response.text();
      const toastifyTag = html.match(/<script[^>]*toastify\.min\.js[^>]*>/i);
      expect(toastifyTag).not.toBeNull();
      expect(toastifyTag[0]).toContain("defer");
      expect(toastifyTag[0]).toContain("integrity=");
      expect(toastifyTag[0]).toContain('crossorigin="anonymous"');
      expect(html).toContain("toastify.min.css");
    });

    it("debe inicializar el wrapper sin errores de consola", function () {
      const errorSpy = spyOn(console, "error");
      expect(showToast("Notificación de prueba")).toBeTrue();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it("debe degradar de forma controlada cuando la librería no está disponible", function () {
      delete window.Toastify;
      expect(function () {
        showToast("Sin librería cargada");
      }).not.toThrow();
      expect(showToast("Sin librería cargada")).toBeFalse();
    });
  });

  describe("configuración", function () {
    it("debe aplicar las opciones configuradas según la documentación oficial", function () {
      showToast("Catálogo actualizado");
      expect(toastifySpy).toHaveBeenCalledTimes(1);
      const options = capturedOptions[0];
      expect(options.text).toBe("Catálogo actualizado");
      expect(options.duration).toBe(3500);
      expect(options.gravity).toBe("top");
      expect(options.position).toBe("right");
      expect(options.close).toBeTrue();
      expect(options.stopOnFocus).toBeTrue();
      expect(options.escapeMarkup).toBeTrue();
    });

    it("debe aplicar el estilo del tema oscuro y el acento del tipo indicado", function () {
      showToast("Agregado a Mi Lista", "success");
      const style = capturedOptions[0].style;
      expect(style.background).toBe(
        "linear-gradient(135deg, #1d232a 0%, #14181c 100%)",
      );
      expect(style.borderLeft).toBe("4px solid #00e054");
      expect(style.color).toBe("#ffffff");
      expect(style.borderRadius).toBe("8px");
    });

    it("debe usar el acento info por defecto y ante tipos desconocidos", function () {
      showToast("Mensaje por defecto");
      showToast("Mensaje con tipo inválido", "no-existe");
      expect(capturedOptions[0].style.borderLeft).toBe("4px solid #40bcf4");
      expect(capturedOptions[1].style.borderLeft).toBe("4px solid #40bcf4");
    });
  });

  describe("funcionalidad principal", function () {
    it("debe ejecutar la funcionalidad principal mostrando el toast", function () {
      expect(showToast("Todo en orden", "success")).toBeTrue();
      expect(showSpy).toHaveBeenCalledTimes(1);
    });

    it("debe recortar el mensaje antes de mostrarlo", function () {
      showToast("   Mensaje con espacios   ");
      expect(capturedOptions[0].text).toBe("Mensaje con espacios");
    });

    it("debe conservar el mensaje como texto plano y escapar el marcado", function () {
      showToast("<b>Atención</b>");
      expect(capturedOptions[0].text).toBe("<b>Atención</b>");
      expect(capturedOptions[0].escapeMarkup).toBeTrue();
    });
  });

  describe("manejo de errores de la librería", function () {
    it("debe rechazar mensajes vacíos o no textuales sin invocar la librería", function () {
      expect(showToast("")).toBeFalse();
      expect(showToast("    ")).toBeFalse();
      expect(showToast(null)).toBeFalse();
      expect(showToast(42)).toBeFalse();
      expect(showToast({})).toBeFalse();
      expect(toastifySpy).not.toHaveBeenCalled();
    });

    it("debe degradar de forma controlada cuando la librería lanza una excepción", function () {
      toastifySpy.and.throwError("Toastify roto");
      expect(showToast("Mensaje válido")).toBeFalse();
      expect(showSpy).not.toHaveBeenCalled();
    });
  });

  describe("interacción con otras partes del sistema", function () {
    let feedback;
    let favoriteButton;
    let createdFeedback;

    beforeEach(function () {
      // Fixture propio e independiente: no depende de que script.spec.js
      // haya inicializado la app ni del orden de carga de las suites.
      createdFeedback = false;
      feedback = document.getElementById("library-feedback");
      if (!feedback) {
        feedback = document.createElement("p");
        feedback.id = "library-feedback";
        document.body.append(feedback);
        createdFeedback = true;
      }
      feedback.hidden = true;
      feedback.textContent = "";

      favoriteButton = document.createElement("button");
      favoriteButton.type = "button";
      favoriteButton.setAttribute("data-action", "toggle-favorite");
      favoriteButton.dataset.titleId = "interstellar";
      favoriteButton.textContent = "Mi Lista";
      favoriteButton.addEventListener("click", function (event) {
        // Detiene la propagación para que el handler global registrado por
        // script.spec.js (si está cargado) no procese el botón de prueba.
        event.stopPropagation();
        feedback.hidden = false;
        feedback.textContent = "Interstellar se agregó a Mi Lista.";
        showToast("Interstellar se agregó a Mi Lista.", "success");
      });
      document.body.append(favoriteButton);
    });

    afterEach(function () {
      favoriteButton.remove();
      if (createdFeedback) {
        feedback.remove();
      } else {
        feedback.hidden = true;
        feedback.textContent = "";
      }
    });

    it("debe notificar por toast al actualizar un título en Mi Lista", function () {
      favoriteButton.click();
      expect(toastifySpy).toHaveBeenCalledTimes(1);
      expect(capturedOptions[0].text).toContain("Mi Lista");
      expect(feedback.hidden).toBe(false);
      expect(feedback.textContent).toContain("Mi Lista");
    });

    it("debe mantener la interfaz funcional cuando Toastify no está cargado", function () {
      delete window.Toastify;
      expect(function () {
        favoriteButton.click();
      }).not.toThrow();
      expect(feedback.hidden).toBe(false);
      expect(feedback.textContent).toContain("Mi Lista");
    });
  });
});
