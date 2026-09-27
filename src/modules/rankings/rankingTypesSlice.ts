import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RankingType {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
}

const seed: Array<Pick<RankingType, "name" | "description">> = [
  {
    name: "World University Rankings",
    description: "Overall global ranking of universities.",
  },
  {
    name: "Subject Rankings",
    description: "Rankings by individual academic subject or discipline.",
  },
  {
    name: "Regional Rankings",
    description: "Rankings within a specific region or country.",
  },
  {
    name: "Business School Rankings",
    description: "Rankings for business and management schools.",
  },
  {
    name: "Young University Rankings",
    description: "Rankings for universities under 50 years old.",
  },
];

const statuses: RankingType["status"][] = ["Active", "Inactive"];

const initialRankingTypes: RankingType[] = seed.map((item, index) => ({
  id: String(index + 1),
  name: item.name,
  description: item.description,
  status: statuses[index % statuses.length],
}));

interface RankingTypesState {
  items: RankingType[];
}

const initialState: RankingTypesState = {
  items: initialRankingTypes,
};

const rankingTypesSlice = createSlice({
  name: "rankingTypes",
  initialState,
  reducers: {
    addRankingType(state, action: PayloadAction<RankingType>) {
      state.items.unshift(action.payload);
    },
    updateRankingType(state, action: PayloadAction<RankingType>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeRankingType(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addRankingType, updateRankingType, removeRankingType } =
  rankingTypesSlice.actions;
export default rankingTypesSlice.reducer;
