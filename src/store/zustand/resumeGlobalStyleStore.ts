import { create } from "zustand";
import { persist } from "zustand/middleware";

type FontFamily = {
  name: string;
  regular: string | null; // URL for the regular font file
};

type ResumeGlobalStyleState = {
  fontSize: number;
  lineHeight: number;
  primaryColor: string;
  bgColor: string;
  textColor: string;
  fontFamily: FontFamily;

  setFontSize: (size: number) => void;
  setLineHeight: (lineHeight: number) => void;
  setPrimaryColor: (color: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setFontFamily: (name: string, regularUrl: string | null) => void;
};

const useResumeGlobalStyle = create<ResumeGlobalStyleState>()(
  persist(
    (set) => ({
      fontSize: 14,
      lineHeight: 1,
      primaryColor: "#FF8DA1",
      bgColor: "#ffffff",
      textColor: "#111111",
      fontFamily: {
        name: "Poppins",
        regular:
          "https://fonts.gstatic.com/s/poppins/v23/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
      },

      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setBgColor: (color) => set({ bgColor: color }),
      setTextColor: (color) => set({ textColor: color }),
      setFontFamily: (name, regularUrl) =>
        set({ fontFamily: { name: name, regular: regularUrl } }),
    }),
    {
      name: "jaagir-global-style",
    }
  )
);

export default useResumeGlobalStyle;
