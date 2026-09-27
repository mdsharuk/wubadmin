import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Company {
  id: string;
  name: string;
  website: string;
  description?: string;
  status: "Active" | "Inactive";
}

const seed: Array<Pick<Company, "name" | "website" | "description">> = [
  {
    name: "QS Quacquarelli Symonds",
    website: "https://www.topuniversities.com",
    description:
      "Publisher of the QS World University Rankings, covering global and subject rankings.",
  },
  {
    name: "Times Higher Education",
    website: "https://www.timeshighereducation.com",
    description:
      "Provides the THE World University Rankings and related higher-education data.",
  },
  {
    name: "ShanghaiRanking Consultancy",
    website: "https://www.shanghairanking.com",
    description:
      "Publishes the Academic Ranking of World Universities (ARWU).",
  },
  {
    name: "U.S. News & World Report",
    website: "https://www.usnews.com",
    description:
      "Publishes the Best Global Universities rankings and college guides.",
  },
  {
    name: "CWUR",
    website: "https://cwur.org",
    description:
      "The Center for World University Rankings assesses universities on education quality and research.",
  },
  {
    name: "Webometrics",
    website: "https://www.webometrics.info",
    description:
      "Ranks universities by their web presence and online visibility.",
  },
  {
    name: "Leiden Ranking",
    website: "https://www.leidenranking.com",
    description:
      "Ranks universities based on scientific publication impact and collaboration.",
  },
];

const statuses: Company["status"][] = ["Active", "Inactive"];

const initialCompanies: Company[] = seed.map((item, index) => ({
  id: String(index + 1),
  name: item.name,
  website: item.website,
  description: item.description,
  status: statuses[index % statuses.length],
}));

interface CompaniesState {
  items: Company[];
}

const initialState: CompaniesState = {
  items: initialCompanies,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompany(state, action: PayloadAction<Company>) {
      state.items.unshift(action.payload);
    },
    updateCompany(state, action: PayloadAction<Company>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeCompany(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCompany, updateCompany, removeCompany } =
  companiesSlice.actions;
export default companiesSlice.reducer;
