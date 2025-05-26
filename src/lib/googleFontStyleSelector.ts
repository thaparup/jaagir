type GoogleFont = {
  family: string;
  files: Record<string, string>;
};

function mapGoogleFontToFontFamily(font: GoogleFont) {
  const files = font.files;

  const getClosestWeight = (weights: string[]) => {
    for (const w of weights) {
      if (files[w]) return files[w];
    }
    return null;
  };

  return {
    name: font.family,
    regular: files["regular"] || getClosestWeight(["400", "300", "100"]),
    bold: getClosestWeight(["700", "600", "500", "800", "900"]),
    italic: files["italic"] || getClosestWeight(["400italic", "300italic"]),
    boldItalic: getClosestWeight([
      "700italic",
      "600italic",
      "500italic",
      "800italic",
      "900italic",
    ]),
  };
}
