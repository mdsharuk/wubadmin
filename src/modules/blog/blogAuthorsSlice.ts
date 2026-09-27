import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogAuthor {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: "Admin" | "Editor" | "Author";
  posts: number;
}

const names = [
  "Example Author",
  "Ayesha Rahman",
  "Daniel Okafor",
  "Priya Sharma",
  "Minh Nguyen",
  "Fatima Noor",
  "Kwame Mensah",
  "Sofia Rossi",
  "Hiroshi Tanaka",
  "Nimal Perera",
  "Grace Lim",
  "Omar Farouk",
  "Ravi Kumar",
  "Elena Petrova",
  "Liam O'Brien",
];

const roles: BlogAuthor["role"][] = ["Admin", "Editor", "Author"];

const initialAuthors: BlogAuthor[] = names.map((name, index) => ({
  id: String(index + 1),
  username: name.toLowerCase().replace(/[^a-z]+/g, "."),
  displayName: name,
  email: `${name.split(" ")[0].toLowerCase()}@example.test`,
  role: roles[index % roles.length],
  posts: ((index * 7) % 20) + 1,
}));

interface BlogAuthorsState {
  items: BlogAuthor[];
}

const initialState: BlogAuthorsState = {
  items: initialAuthors,
};

const blogAuthorsSlice = createSlice({
  name: "blogAuthors",
  initialState,
  reducers: {
    addAuthor(state, action: PayloadAction<BlogAuthor>) {
      state.items.unshift(action.payload);
    },
    updateAuthor(state, action: PayloadAction<BlogAuthor>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeAuthor(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addAuthor, updateAuthor, removeAuthor } =
  blogAuthorsSlice.actions;
export default blogAuthorsSlice.reducer;
