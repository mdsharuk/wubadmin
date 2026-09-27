import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Region {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  featureImage?: string;
}

const seed: Array<Pick<Region, "name" | "description">> = [
  { name: "Europe", description: "European continent region." },
  { name: "North America", description: "Northern part of the Americas." },
  { name: "South America", description: "Southern part of the Americas." },
  { name: "Asia", description: "Largest continent by area and population." },
  { name: "Africa", description: "Second-largest continent." },
  { name: "Oceania", description: "Includes Australia and Pacific islands." },
  { name: "Middle East", description: "Western Asia and Egypt." },
  { name: "Central America", description: "Southern tip of North America." },
  { name: "Caribbean", description: "Islands of the Caribbean Sea." },
  { name: "Southeast Asia", description: "Subregion of Asia." },
  { name: "South Asia", description: "Southern region of Asia." },
  { name: "East Asia", description: "Eastern subregion of Asia." },
  { name: "Central Asia", description: "Core region of the Asian continent." },
  { name: "Western Europe", description: "Western part of Europe." },
  { name: "Eastern Europe", description: "Eastern part of Europe." },
  { name: "Northern Europe", description: "Northern part of Europe." },
  { name: "Southern Europe", description: "Southern part of Europe." },
  { name: "Scandinavia", description: "Northern European subregion." },
  { name: "Nordic Countries", description: "Northern Europe and North Atlantic." },
  { name: "Sub-Saharan Africa", description: "Region south of the Sahara." },
];

const statuses: Region["status"][] = ["Active", "Inactive"];

const initialRegions: Region[] = seed.map((item, index) => ({
  id: String(index + 1),
  name: item.name,
  description: item.description,
  status: statuses[index % statuses.length],
}));

interface RegionsState {
  items: Region[];
}

const initialState: RegionsState = {
  items: initialRegions,
};

const regionsSlice = createSlice({
  name: "regions",
  initialState,
  reducers: {
    addRegion(state, action: PayloadAction<Region>) {
      state.items.unshift(action.payload);
    },
    updateRegion(state, action: PayloadAction<Region>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeRegion(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addRegion, updateRegion, removeRegion } = regionsSlice.actions;
export default regionsSlice.reducer;
