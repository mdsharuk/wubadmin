import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Page } from "./pagesSlice";

const titles = [
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "United States",
  "Netherlands",
  "Ireland",
  "New Zealand",
  "France",
  "Sweden",
  "Japan",
  "South Korea",
  "Singapore",
  "United Arab Emirates",
  "Malaysia",
];

const authors = [
  "Preview Administrator",
  "Ayesha Rahman",
  "Daniel Okafor",
  "Priya Sharma",
  "Minh Nguyen",
  "Fatima Noor",
];

const initialCountryPages: Page[] = titles.map((title, index) => ({
  id: String(index + 1),
  title,
  author: authors[index % authors.length],
  publishDate: `2026-${String((index % 9) + 1).padStart(2, "0")}-${String(
    (index % 27) + 1,
  ).padStart(2, "0")}`,
  status: index % 3 === 0 ? "Draft" : "Published",
}));

interface CountryPagesState {
  items: Page[];
}

const initialState: CountryPagesState = {
  items: initialCountryPages,
};

const countryPagesSlice = createSlice({
  name: "countryPages",
  initialState,
  reducers: {
    addCountryPage(state, action: PayloadAction<Page>) {
      state.items.unshift(action.payload);
    },
    updateCountryPage(state, action: PayloadAction<Page>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeCountryPage(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCountryPage, updateCountryPage, removeCountryPage } =
  countryPagesSlice.actions;
export default countryPagesSlice.reducer;
