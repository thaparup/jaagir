import { create } from "zustand";

interface FormState {
  handleBuilderFormChange: () => void;
  setHandleBuilderFormChange: (fn: () => void) => void;
}

export const useFormStore = create<FormState>((set) => ({
  handleBuilderFormChange: () => {
    // This will be updated with the actual function
    console.log("Form change triggered from store");
  },
  setHandleBuilderFormChange: (fn) => set({ handleBuilderFormChange: fn }),
}));
