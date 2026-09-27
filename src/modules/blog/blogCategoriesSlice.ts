import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  count: number;
}

const initialCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Art & Digital Media",
    description: "Design, media and creative arts",
    slug: "art-digital-media",
    count: 12,
  },
  {
    id: "2",
    name: "Automotive",
    description: "Automotive engineering and design",
    slug: "automotive",
    count: 5,
  },
  {
    id: "3",
    name: "Entertainment",
    description: "Film, music and performing arts",
    slug: "entertainment",
    count: 8,
  },
  {
    id: "4",
    name: "Finance",
    description: "Accounting, banking and finance",
    slug: "finance",
    count: 15,
  },
  {
    id: "5",
    name: "Pet Business",
    description: "Animal care and veterinary studies",
    slug: "pet-business",
    count: 3,
  },
  {
    id: "6",
    name: "Travel",
    description: "Tourism and hospitality",
    slug: "travel",
    count: 9,
  },
  {
    id: "7",
    name: "Business & Management",
    description: "Business, management and marketing",
    slug: "business-management",
    count: 21,
  },
  {
    id: "8",
    name: "Engineering",
    description: "Civil, mechanical and electrical engineering",
    slug: "engineering",
    count: 17,
  },
  {
    id: "9",
    name: "Health & Medicine",
    description: "Nursing, medicine and public health",
    slug: "health-medicine",
    count: 14,
  },
  {
    id: "10",
    name: "Law",
    description: "Legal studies and criminology",
    slug: "law",
    count: 6,
  },
  {
    id: "11",
    name: "IT & Computer Science",
    description: "Software, data and networking",
    slug: "it-computer-science",
    count: 23,
  },
  {
    id: "12",
    name: "Science",
    description: "Physical and life sciences",
    slug: "science",
    count: 11,
  },
  {
    id: "13",
    name: "Education & Teaching",
    description: "Teaching and education studies",
    slug: "education-teaching",
    count: 7,
  },
  {
    id: "14",
    name: "Design",
    description: "Graphic, product and interior design",
    slug: "design",
    count: 10,
  },
  {
    id: "15",
    name: "Uncategorized",
    description: "Posts without a category",
    slug: "uncategorized",
    count: 4,
  },
];

interface BlogCategoriesState {
  items: BlogCategory[];
}

const initialState: BlogCategoriesState = {
  items: initialCategories,
};

const blogCategoriesSlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<BlogCategory>) {
      state.items.unshift(action.payload);
    },
    updateCategory(state, action: PayloadAction<BlogCategory>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, removeCategory } =
  blogCategoriesSlice.actions;
export default blogCategoriesSlice.reducer;
