import { create } from "zustand";
import { persist } from "zustand/middleware";
import { COUNTRIES, asCountry, nextLang, type CountryId } from "./country";
import type { Lang } from "./types";

type GhostState = {
  lang: Lang;
  country: CountryId;
  lowData: boolean;
  largeText: boolean;
  setLang: (lang: Lang) => void;
  setCountry: (country: CountryId) => void;
  toggleLang: () => void;
  toggleLowData: () => void;
  toggleLargeText: () => void;
};

export const useGhost = create<GhostState>()(
  persist(
    (set, get) => ({
      lang: "en",
      country: "ke",
      lowData: false,
      largeText: false,
      setLang: (lang) => set({ lang }),
      setCountry: (country) => {
        const id = asCountry(country);
        set({ country: id, lang: COUNTRIES[id].defaultLang });
      },
      toggleLang: () => {
        const { country, lang } = get();
        set({ lang: nextLang(country, lang) });
      },
      toggleLowData: () => set({ lowData: !get().lowData }),
      toggleLargeText: () => set({ largeText: !get().largeText }),
    }),
    {
      name: "ghostledger-prefs",
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const id = asCountry(state.country);
        state.country = id;
        if (!COUNTRIES[id].languages.includes(state.lang)) {
          state.lang = COUNTRIES[id].defaultLang;
        }
      },
    },
  ),
);
