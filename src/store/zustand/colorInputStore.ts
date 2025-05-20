import { create } from "zustand";

type ColorInputStore = {
  showPrimaryColorPicker: boolean;
  showBgColorPicker: boolean;
  showTextColorPicker: boolean;

  togglePrimaryColorPicker: () => void;
  toggleBgColorPicker: () => void;
  toggleTextColorPicker: () => void;
};

const useColorInputStore = create<ColorInputStore>((set, get) => ({
  showPrimaryColorPicker: false,
  showBgColorPicker: false,
  showTextColorPicker: false,

  togglePrimaryColorPicker: () => {
    const current = get().showPrimaryColorPicker;
    set({
      showPrimaryColorPicker: !current,
      showBgColorPicker: false,
      showTextColorPicker: false,
    });
  },

  toggleBgColorPicker: () => {
    const current = get().showBgColorPicker;
    set({
      showPrimaryColorPicker: false,
      showBgColorPicker: !current,
      showTextColorPicker: false,
    });
  },

  toggleTextColorPicker: () => {
    const current = get().showTextColorPicker;
    set({
      showPrimaryColorPicker: false,
      showBgColorPicker: false,
      showTextColorPicker: !current,
    });
  },
}));

export default useColorInputStore;
