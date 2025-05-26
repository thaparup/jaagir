import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Font } from "@react-pdf/renderer";

export type APIFontData = {
  family: string;
  variants: string[];
  files: Record<string, string>;
  [key: string]: any;
};

export type RegisteredFont = {
  family: string;
  sources: {
    regular: string;
    bold?: string;
    italic?: string;
  };
};

type ResumeStore = {
  // Global style properties
  fontSize: number;
  lineHeight: number;
  primaryColor: string;
  bgColor: string;
  textColor: string;

  // Font properties
  selectedFont: RegisteredFont | null;

  // Global style setters
  setFontSize: (size: number) => void;
  setLineHeight: (lineHeight: number) => void;
  setPrimaryColor: (color: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;

  // Font setter
  registerAndSetFont: (apiFont: APIFontData) => void;
};

// Default Poppins font data
const defaultPoppinsFont: RegisteredFont = {
  family: "Poppins",
  sources: {
    regular:
      "https://fonts.gstatic.com/s/poppins/v23/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
    bold: "https://fonts.gstatic.com/s/poppins/v23/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf",
    italic:
      "https://fonts.gstatic.com/s/poppins/v23/pxiGyp8kv8JHgFVrJJLed3FBGPaTSQ.ttf",
  },
};

// Register default Poppins font
const poppinsFonts: {
  src: string;
  fontWeight?: "normal" | "bold" | number;
  fontStyle?: "normal" | "italic" | "oblique";
}[] = [{ src: defaultPoppinsFont.sources.regular, fontWeight: "normal" }];

if (defaultPoppinsFont.sources.bold) {
  poppinsFonts.push({
    src: defaultPoppinsFont.sources.bold,
    fontWeight: "bold",
  });
}

if (defaultPoppinsFont.sources.italic) {
  poppinsFonts.push({
    src: defaultPoppinsFont.sources.italic,
    fontStyle: "italic",
  });
}

Font.register({
  family: "Poppins",
  fonts: poppinsFonts,
});

const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      // Initial global style values
      fontSize: 14,
      lineHeight: 1,
      primaryColor: "#FF8DA1",
      bgColor: "#ffffff",
      textColor: "#111111",

      // Initial font value with Poppins as default
      selectedFont: defaultPoppinsFont,

      // Global style setters
      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setBgColor: (color) => set({ bgColor: color }),
      setTextColor: (color) => set({ textColor: color }),

      // Font setter with registration
      registerAndSetFont: (apiFont: APIFontData) => {
        const { family, files } = apiFont;

        const sources: RegisteredFont["sources"] = {
          regular: files["regular"],
          bold: files["700"] || files["600"] || files["500"],
          italic: files["italic"],
        };

        const fonts: {
          src: string;
          fontWeight?: "normal" | "bold" | number;
          fontStyle?: "normal" | "italic" | "oblique";
        }[] = [];

        // Always add regular font (required)
        if (sources.regular) {
          fonts.push({ src: sources.regular, fontWeight: "normal" });
        }

        // Add bold font if available
        if (sources.bold) {
          fonts.push({ src: sources.bold, fontWeight: "bold" });
        }

        // Add italic font if available
        if (sources.italic) {
          fonts.push({ src: sources.italic, fontStyle: "italic" });
        }

        // Only register if we have at least the regular font
        if (fonts.length > 0) {
          if (fonts.length === 1) {
            Font.register({
              family,
              ...fonts[0],
            });
          } else {
            Font.register({
              family,
              fonts,
            });
          }

          set({ selectedFont: { family, sources } });
        }
      },
    }),
    {
      name: "jaagir-resume-store", // Combined storage key
      // Optional: you can add partialize to exclude selectedFont from persistence
      // if you don't want to persist font registration across sessions
      // partialize: (state) => ({
      //   fontSize: state.fontSize,
      //   lineHeight: state.lineHeight,
      //   primaryColor: state.primaryColor,
      //   bgColor: state.bgColor,
      //   textColor: state.textColor,
      // }),
    }
  )
);

export default useResumeStore;
