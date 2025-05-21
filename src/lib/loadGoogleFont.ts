export const loadGoogleFont = (font: string) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";

  const fontForUrl = font.replace(/\s+/g, "+");

  link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;

  // Remove any previous font links to avoid overloading the DOM
  const existingLinks = document.querySelectorAll(
    'link[href*="fonts.googleapis.com/css2"]'
  );
  if (existingLinks.length > 3) {
    // Keep a few recent ones for smoother transitions
    existingLinks[0].remove();
  }

  document.head.appendChild(link);
};
