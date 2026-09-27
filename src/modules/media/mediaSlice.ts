import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export type MediaType = "image";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: MediaType;
  size: number;
  createdAt: number;
}

interface MediaState {
  items: MediaItem[];
}

const seedItems: MediaItem[] = Array.from({ length: 24 }).map((_, index) => ({
  id: `seed-${index + 1}`,
  name: `sample-image-${index + 1}.jpg`,
  url: `https://picsum.photos/seed/wuhub${index + 1}/600/450`,
  type: "image",
  size: 120000 + index * 4096,
  createdAt: Date.now() - index * 86400000,
}));

const initialState: MediaState = {
  items: seedItems,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    addMedia: {
      reducer(state, action: PayloadAction<MediaItem>) {
        state.items.unshift(action.payload);
      },
      prepare(input: {
        name: string;
        url: string;
        size?: number;
        type?: MediaType;
      }) {
        return {
          payload: {
            id: nanoid(),
            name: input.name,
            url: input.url,
            size: input.size ?? 0,
            type: input.type ?? "image",
            createdAt: Date.now(),
          } as MediaItem,
        };
      },
    },
    removeMedia(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeMediaMany(state, action: PayloadAction<string[]>) {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.id),
      );
    },
  },
});

export const { addMedia, removeMedia, removeMediaMany } = mediaSlice.actions;
export default mediaSlice.reducer;
