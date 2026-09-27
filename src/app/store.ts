import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/modules/auth/authSlice';
import mediaReducer from '@/modules/media/mediaSlice';
import blogReducer from '@/modules/blog/blogSlice';
import blogCategoriesReducer from '@/modules/blog/blogCategoriesSlice';
import blogAuthorsReducer from '@/modules/blog/blogAuthorsSlice';
import studentsReducer from '@/modules/students/studentsSlice';
import pagesReducer from '@/modules/pages/pagesSlice';
import countryPagesReducer from '@/modules/pages/countryPagesSlice';
import usersReducer from '@/modules/users/usersSlice';
import designationsReducer from '@/modules/users/designationsSlice';
import rankingsReducer from '@/modules/rankings/rankingsSlice';
import companiesReducer from '@/modules/rankings/companiesSlice';
import rankingTypesReducer from '@/modules/rankings/rankingTypesSlice';
import regionsReducer from '@/modules/locations/regionsSlice';
import countriesReducer from '@/modules/locations/countriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
    blog: blogReducer,
    blogCategories: blogCategoriesReducer,
    blogAuthors: blogAuthorsReducer,
    students: studentsReducer,
    pages: pagesReducer,
    countryPages: countryPagesReducer,
    users: usersReducer,
    designations: designationsReducer,
    rankings: rankingsReducer,
    companies: companiesReducer,
    rankingTypes: rankingTypesReducer,
    regions: regionsReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
