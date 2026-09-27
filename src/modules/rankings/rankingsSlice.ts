import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ranking {
  id: string;
  university: string;
  company: string;
  type: string;
  edition: string;
  rank: string;
  status: "Published" | "Draft";
  scope?: string;
  overallScore?: string;
  subject?: string;
  sourceUrl?: string;
  verifiedOn?: string;
  verificationNote?: string;
}

const universities = [
  "University of Oxford",
  "Massachusetts Institute of Technology",
  "Stanford University",
  "University of Cambridge",
  "Harvard University",
  "California Institute of Technology",
  "ETH Zurich",
  "University of Toronto",
  "National University of Singapore",
  "University of Melbourne",
  "University of Edinburgh",
  "Tsinghua University",
];

const companies = [
  "QS World University Rankings",
  "Times Higher Education",
  "ShanghaiRanking",
  "U.S. News",
];

const types = [
  "World University Rankings",
  "Subject Rankings",
  "Regional Rankings",
  "Business School Rankings",
];

const statuses: Ranking["status"][] = ["Published", "Draft"];

const initialRankings: Ranking[] = universities.map((university, index) => ({
  id: String(index + 1),
  university,
  company: companies[index % companies.length],
  type: types[index % types.length],
  edition: `2026`,
  rank: `#${index + 1}`,
  status: statuses[index % statuses.length],
}));

interface RankingsState {
  items: Ranking[];
}

const initialState: RankingsState = {
  items: initialRankings,
};

const rankingsSlice = createSlice({
  name: "rankings",
  initialState,
  reducers: {
    addRanking(state, action: PayloadAction<Ranking>) {
      state.items.unshift(action.payload);
    },
    updateRanking(state, action: PayloadAction<Ranking>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeRanking(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addRanking, updateRanking, removeRanking } =
  rankingsSlice.actions;
export default rankingsSlice.reducer;
