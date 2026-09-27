import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Page {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status?: "Published" | "Draft";
  parent?: string;
  order?: number;
  region?: string;
  country?: string;
  featureImage?: string;
}

const titles = [
  "About Us",
  "Contact",
  "Privacy Policy",
  "Terms & Conditions",
  "FAQ",
  "How It Works",
  "Study Destinations",
  "Scholarships",
  "Admission Process",
  "Visa Guidance",
  "Test Preparation",
  "Student Services",
  "Partner Universities",
  "Success Stories",
  "Careers",
];

const authors = [
  "Preview Administrator",
  "Ayesha Rahman",
  "Daniel Okafor",
  "Priya Sharma",
  "Minh Nguyen",
  "Fatima Noor",
];

const initialPages: Page[] = titles.map((title, index) => ({
  id: String(index + 1),
  title,
  author: authors[index % authors.length],
  publishDate: `2026-${String((index % 9) + 1).padStart(2, "0")}-${String(
    (index % 27) + 1,
  ).padStart(2, "0")}`,
}));

interface PagesState {
  items: Page[];
}

const initialState: PagesState = {
  items: initialPages,
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    addPage(state, action: PayloadAction<Page>) {
      state.items.unshift(action.payload);
    },
    updatePage(state, action: PayloadAction<Page>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removePage(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addPage, updatePage, removePage } = pagesSlice.actions;
export default pagesSlice.reducer;
