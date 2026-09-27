import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Country {
  id: string;
  name: string;
  capital: string;
  currency: string;
  status: "Active" | "Inactive";
  description?: string;
  language?: string;
  population?: string;
  areaSize?: string;
  internationalStudents?: string;
  academicYear?: string;
  callingCode?: string;
  timeZone?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  featureImage?: string;
  bannerImage?: string;
}

const seed: Array<Pick<Country, "name" | "capital" | "currency">> = [
  { name: "United Kingdom", capital: "London", currency: "GBP" },
  { name: "Canada", capital: "Ottawa", currency: "CAD" },
  { name: "Australia", capital: "Canberra", currency: "AUD" },
  { name: "Germany", capital: "Berlin", currency: "EUR" },
  { name: "United States", capital: "Washington, D.C.", currency: "USD" },
  { name: "Netherlands", capital: "Amsterdam", currency: "EUR" },
  { name: "Ireland", capital: "Dublin", currency: "EUR" },
  { name: "New Zealand", capital: "Wellington", currency: "NZD" },
  { name: "France", capital: "Paris", currency: "EUR" },
  { name: "Sweden", capital: "Stockholm", currency: "SEK" },
  { name: "Japan", capital: "Tokyo", currency: "JPY" },
  { name: "South Korea", capital: "Seoul", currency: "KRW" },
  { name: "Singapore", capital: "Singapore", currency: "SGD" },
  { name: "United Arab Emirates", capital: "Abu Dhabi", currency: "AED" },
  { name: "Malaysia", capital: "Kuala Lumpur", currency: "MYR" },
  { name: "Italy", capital: "Rome", currency: "EUR" },
  { name: "Spain", capital: "Madrid", currency: "EUR" },
  { name: "Switzerland", capital: "Bern", currency: "CHF" },
  { name: "Norway", capital: "Oslo", currency: "NOK" },
  { name: "Denmark", capital: "Copenhagen", currency: "DKK" },
];

const statuses: Country["status"][] = ["Active", "Inactive"];

const initialCountries: Country[] = seed.map((item, index) => ({
  id: String(index + 1),
  name: item.name,
  capital: item.capital,
  currency: item.currency,
  status: statuses[index % statuses.length],
}));

interface CountriesState {
  items: Country[];
}

const initialState: CountriesState = {
  items: initialCountries,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addCountry(state, action: PayloadAction<Country>) {
      state.items.unshift(action.payload);
    },
    updateCountry(state, action: PayloadAction<Country>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeCountry(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCountry, updateCountry, removeCountry } =
  countriesSlice.actions;
export default countriesSlice.reducer;
