import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Designation {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
}

const seed: Array<Pick<Designation, "name" | "description">> = [
  { name: "Senior Counsellor", description: "Leads student counselling." },
  { name: "Counsellor", description: "Guides students on admissions." },
  { name: "Admission Officer", description: "Handles admission processing." },
  { name: "Visa Officer", description: "Assists with visa applications." },
  { name: "Manager", description: "Oversees the branch team." },
  { name: "Agent", description: "Field agent for recruitment." },
  { name: "Support Executive", description: "Provides student support." },
];

const statuses: Designation["status"][] = ["Active", "Inactive"];

const initialDesignations: Designation[] = seed.map((item, index) => ({
  id: String(index + 1),
  name: item.name,
  description: item.description,
  status: statuses[index % statuses.length],
}));

interface DesignationsState {
  items: Designation[];
}

const initialState: DesignationsState = {
  items: initialDesignations,
};

const designationsSlice = createSlice({
  name: "designations",
  initialState,
  reducers: {
    addDesignation(state, action: PayloadAction<Designation>) {
      state.items.unshift(action.payload);
    },
    updateDesignation(state, action: PayloadAction<Designation>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeDesignation(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addDesignation, updateDesignation, removeDesignation } =
  designationsSlice.actions;
export default designationsSlice.reducer;
