/**
 * @typedef {"success" | "warning" | "error" | "info"} ToastType
 * Visual category used to choose the toast accent color.
 */

const TOAST_STYLES = {
  success: { accent: "#00e054" },
  warning: { accent: "#f0c14b" },
  error: { accent: "#ff6b6b" },
  info: { accent: "#40bcf4" },
};

/**
 * Displays a Toastify notification using Mini Letterboxd's dark theme.
 *
 * Toastify is loaded from a deferred CDN script in the browser. If it is not
 * available, this helper safely does nothing so the app and Jasmine tests can
 * continue using their existing accessible inline feedback.
 *
 * @param {string} message Plain-text notification message.
 * @param {ToastType} [type="info"] Notification category and accent color.
 * @returns {boolean} `true` when Toastify displayed the notification;
 *   `false` when Toastify is unavailable.
 */
export function showToast(message, type = "info") {
  if (typeof window === "undefined" || typeof window.Toastify !== "function") {
    return false;
  }

  const toastType = Object.prototype.hasOwnProperty.call(TOAST_STYLES, type)
    ? type
    : "info";
  const { accent } = TOAST_STYLES[toastType];

  window
    .Toastify({
      text: String(message),
      duration: 3500,
      gravity: "top",
      position: "right",
      close: true,
      stopOnFocus: true,
      escapeMarkup: true,
      style: {
        background: "linear-gradient(135deg, #1d232a 0%, #14181c 100%)",
        border: `1px solid ${accent}`,
        borderLeft: `4px solid ${accent}`,
        borderRadius: "8px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        color: "#ffffff",
        fontFamily: '"Inter", "Roboto", Arial, sans-serif',
      },
    })
    .showToast();

  return true;
}
