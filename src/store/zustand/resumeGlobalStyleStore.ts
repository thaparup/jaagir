import { create } from "zustand";
import { persist } from "zustand/middleware";

type ResumeGlobalStyleState = {
  fontSize: number;
  lineHeight: number;
  primaryColor: string;
  bgColor: string;
  textColor: string;
  fontFamily: string;

  setFontSize: (size: number) => void;
  setLineHeight: (lineHeight: number) => void;
  setPrimaryColor: (color: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setFontFamily: (font: string) => void;
};

const useResumeGlobalStyle = create<ResumeGlobalStyleState>()(
  persist(
    (set) => ({
      fontSize: 14,
      lineHeight: 1,
      primaryColor: "#FF8DA1",
      bgColor: "#ffffff",
      textColor: "#111111",
      fontFamily: "Poppins",

      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setBgColor: (color) => set({ bgColor: color }),
      setTextColor: (color) => set({ textColor: color }),
      setFontFamily: (font) => set({ fontFamily: font }),
    }),
    {
      name: "jaagir-global-style",
    }
  )
);

export default useResumeGlobalStyle;
