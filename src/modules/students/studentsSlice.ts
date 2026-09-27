import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Student {
  id: string;
  name: string;
  email: string;
  contact: string;
  destinations: string;
  studyLevels: string;
  status: "Active" | "Inactive" | "Enrolled" | "Graduated" | "Trashed";
}

const names = [
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
  "Chen Wei",
];

const destinations = [
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "United States",
  "Netherlands",
];

const studyLevels = [
  "Undergraduate",
  "Postgraduate",
  "Doctoral",
  "Diploma",
  "Foundation",
];

const statuses: Student["status"][] = [
  "Active",
  "Enrolled",
  "Inactive",
  "Graduated",
];

const initialStudents: Student[] = names.map((name, index) => ({
  id: String(index + 1),
  name,
  email: `${name.split(" ")[0].toLowerCase()}@example.test`,
  contact: `+00 000 000 ${String(index + 1).padStart(3, "0")}`,
  destinations: destinations[index % destinations.length],
  studyLevels: studyLevels[index % studyLevels.length],
  status: statuses[index % statuses.length],
}));

interface StudentsState {
  items: Student[];
}

const initialState: StudentsState = {
  items: initialStudents,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent(state, action: PayloadAction<Student>) {
      state.items.unshift(action.payload);
    },
    updateStudent(state, action: PayloadAction<Student>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) state.items[index] = action.payload;
    },
    removeStudent(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeStudents(state, action: PayloadAction<string[]>) {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.id),
      );
    },
  },
});

export const { addStudent, updateStudent, removeStudent, removeStudents } =
  studentsSlice.actions;
export default studentsSlice.reducer;
