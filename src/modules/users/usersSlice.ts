import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  password?: string;
  role: string;
  designation?: string;
  status: "Active" | "Inactive";
}

const names = [
  "Preview Administrator",
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
  "Chen Wei",
];

const roles = ["Administrator", "Editor", "Author", "Manager", "Subscriber"];

const statuses: User["status"][] = ["Active", "Inactive"];

const initialUsers: User[] = names.map((name, index) => ({
  id: String(index + 1),
  name,
  email: `${name.split(" ")[0].toLowerCase()}@example.test`,
  role: roles[index % roles.length],
  status: statuses[index % statuses.length],
}));

interface UsersState {
  items: User[];
}

const initialState: UsersState = {
  items: initialUsers,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.items.unshift(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeUser(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
