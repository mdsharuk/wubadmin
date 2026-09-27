import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  categories: string;
  tags: string;
  publishDate: string;
  status: "Published" | "Draft" | "Trashed";
  content: string;
}

const titles = [
  "How to compare university rankings",
  "Top scholarships for international students",
  "A guide to writing a strong SOP",
  "Choosing the right course for your career",
  "IELTS vs TOEFL: which should you take?",
  "Student visa interview tips",
  "Budgeting for studying abroad",
  "Best countries to study engineering",
  "How to find student accommodation",
  "Understanding tuition fees and funding",
  "Part-time work options for students",
  "Preparing for your first semester",
  "Transferring credits between universities",
  "Research vs coursework degrees",
  "Health insurance for international students",
  "Building a standout LinkedIn profile",
  "Internships that boost your CV",
  "Managing culture shock abroad",
  "Post-study work visa explained",
  "How to apply for a PhD",
  "Scholarship essay mistakes to avoid",
];

const authors = [
  "Example Author",
  "Ayesha Rahman",
  "Daniel Okafor",
  "Priya Sharma",
  "Minh Nguyen",
  "Fatima Noor",
];

const categories = [
  "Study Guides",
  "Scholarships",
  "Admissions",
  "Career",
  "Test Prep",
];

const tags = ["Rankings", "Scholarship", "SOP", "Visa", "IELTS", "Budget"];

const statuses: BlogPost["status"][] = ["Published", "Draft", "Trashed"];

const initialPosts: BlogPost[] = titles.map((title, index) => ({
  id: String(index + 1),
  title,
  author: authors[index % authors.length],
  categories: categories[index % categories.length],
  tags: tags[index % tags.length],
  publishDate: `2026-${String((index % 9) + 1).padStart(2, "0")}-${String(
    (index % 27) + 1,
  ).padStart(2, "0")} · ${String((index % 12) + 8).padStart(2, "0")}:00`,
  status: statuses[index % statuses.length],
  content: `<p>${title}. This is a sample article body used for the blog preview.</p>`,
}));

interface BlogState {
  posts: BlogPost[];
}

const initialState: BlogState = {
  posts: initialPosts,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<BlogPost>) {
      state.posts.unshift(action.payload);
    },
    updatePost(state, action: PayloadAction<BlogPost>) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id,
      );
      if (index >= 0) state.posts[index] = action.payload;
    },
    removePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    removePosts(state, action: PayloadAction<string[]>) {
      state.posts = state.posts.filter(
        (post) => !action.payload.includes(post.id),
      );
    },
  },
});

export const { addPost, updatePost, removePost, removePosts } =
  blogSlice.actions;
export default blogSlice.reducer;
