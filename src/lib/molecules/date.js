/**
 * Zet een datum om naar Nederlandse tekst.
 *
 * @param {string} dateString - De datum die je erin stopt (bijv. "2025-12-31")
 * @returns {string} De datum netjes geschreven (bijv. "31 december 2025")
 */
export function formatDateNL(dateString) {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(new Date(dateString));
  }
  