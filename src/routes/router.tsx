import { createBrowserRouter, Navigate } from 'react-router-dom';
import PrivateLayout from '@/layouts/PrivateLayout';
import PublicLayout from '@/layouts/PublicLayout';
import PrivateRoute from '@/routes/PrivateRoute';
import LoginPage from '@/modules/auth/login/LoginPage';
import ForgotPasswordPage from '@/modules/auth/forgot-password/ForgotPasswordPage';
import DashboardPage from '@/modules/dashboard/DashboardPage';
import MediaLibraryPage from '@/modules/media/MediaLibraryPage';
import AllLeadsPage from '@/modules/leads/AllLeadsPage';
import AllBlogPostsPage from '@/modules/blog/AllBlogPostsPage';
import NewBlogPostPage from '@/modules/blog/NewBlogPostPage';
import BlogCategoriesPage from '@/modules/blog/BlogCategoriesPage';
import NewBlogCategoryPage from '@/modules/blog/NewBlogCategoryPage';
import BlogTagsPage from '@/modules/blog/BlogTagsPage';
import BlogAuthorsPage from '@/modules/blog/BlogAuthorsPage';
import NewBlogAuthorPage from '@/modules/blog/NewBlogAuthorPage';
import ContactUsPage from '@/modules/contact/ContactUsPage';
import AllStudentsPage from '@/modules/students/AllStudentsPage';
import StudentViewPage from '@/modules/students/StudentViewPage';
import NewStudentPage from '@/modules/students/NewStudentPage';
import ProfilePage from '@/modules/profile/ProfilePage';
import AllPagesPage from '@/modules/pages/AllPagesPage';
import NewPagePage from '@/modules/pages/NewPagePage';
import AllCountryPagesPage from '@/modules/pages/AllCountryPagesPage';
import NewCountryPagePage from '@/modules/pages/NewCountryPagePage';
import AllUsersPage from '@/modules/users/AllUsersPage';
import NewUserPage from '@/modules/users/NewUserPage';
import AllDesignationsPage from '@/modules/users/AllDesignationsPage';
import NewDesignationPage from '@/modules/users/NewDesignationPage';
import AllRankingsPage from '@/modules/rankings/AllRankingsPage';
import NewRankingPage from '@/modules/rankings/NewRankingPage';
import AllCompaniesPage from '@/modules/rankings/AllCompaniesPage';
import NewCompanyPage from '@/modules/rankings/NewCompanyPage';
import AllRankingTypesPage from '@/modules/rankings/AllRankingTypesPage';
import NewRankingTypePage from '@/modules/rankings/NewRankingTypePage';
import AllRegionsPage from '@/modules/locations/AllRegionsPage';
import NewRegionPage from '@/modules/locations/NewRegionPage';
import AllCountriesPage from '@/modules/locations/AllCountriesPage';
import NewCountryPage from '@/modules/locations/NewCountryPage';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import FallbackPage from '@/components/common/FallbackPage';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/media',
        element: <MediaLibraryPage />,
      },
      {
        path: '/leads',
        element: <AllLeadsPage />,
      },
      {
        path: '/contact-us',
        element: <ContactUsPage />,
      },
      {
        path: '/students',
        element: <AllStudentsPage />,
      },
      {
        path: '/students/view/:id',
        element: <StudentViewPage />,
      },
      {
        path: '/students/create',
        element: <NewStudentPage />,
      },
      {
        path: '/students/edit/:id',
        element: <NewStudentPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/pages',
        element: <AllPagesPage />,
      },
      {
        path: '/pages/create',
        element: <NewPagePage />,
      },
      {
        path: '/pages/edit/:id',
        element: <NewPagePage />,
      },
      {
        path: '/pages/country',
        element: <AllCountryPagesPage />,
      },
      {
        path: '/pages/country/create',
        element: <NewCountryPagePage />,
      },
      {
        path: '/pages/country/edit/:id',
        element: <NewCountryPagePage />,
      },
      {
        path: '/users',
        element: <AllUsersPage />,
      },
      {
        path: '/users/create',
        element: <NewUserPage />,
      },
      {
        path: '/users/edit/:id',
        element: <NewUserPage />,
      },
      {
        path: '/users/designations',
        element: <AllDesignationsPage />,
      },
      {
        path: '/users/designations/create',
        element: <NewDesignationPage />,
      },
      {
        path: '/users/designations/edit/:id',
        element: <NewDesignationPage />,
      },
      {
        path: '/rankings',
        element: <AllRankingsPage />,
      },
      {
        path: '/rankings/create',
        element: <NewRankingPage />,
      },
      {
        path: '/rankings/edit/:id',
        element: <NewRankingPage />,
      },
      {
        path: '/rankings/companies',
        element: <AllCompaniesPage />,
      },
      {
        path: '/rankings/companies/create',
        element: <NewCompanyPage />,
      },
      {
        path: '/rankings/companies/edit/:id',
        element: <NewCompanyPage />,
      },
      {
        path: '/rankings/types',
        element: <AllRankingTypesPage />,
      },
      {
        path: '/rankings/types/create',
        element: <NewRankingTypePage />,
      },
      {
        path: '/rankings/types/edit/:id',
        element: <NewRankingTypePage />,
      },
      {
        path: '/locations/regions',
        element: <AllRegionsPage />,
      },
      {
        path: '/locations/regions/create',
        element: <NewRegionPage />,
      },
      {
        path: '/locations/regions/edit/:id',
        element: <NewRegionPage />,
      },
      {
        path: '/locations/countries',
        element: <AllCountriesPage />,
      },
      {
        path: '/locations/countries/create',
        element: <NewCountryPage />,
      },
      {
        path: '/locations/countries/edit/:id',
        element: <NewCountryPage />,
      },
      {
        path: '/blog',
        element: <AllBlogPostsPage />,
      },
      {
        path: '/blog/create',
        element: <NewBlogPostPage />,
      },
      {
        path: '/blog/edit/:id',
        element: <NewBlogPostPage />,
      },
      {
        path: '/blog/categories',
        element: <BlogCategoriesPage />,
      },
      {
        path: '/blog/categories/create',
        element: <NewBlogCategoryPage />,
      },
      {
        path: '/blog/categories/edit/:id',
        element: <NewBlogCategoryPage />,
      },
      {
        path: '/blog/tags',
        element: <BlogTagsPage />,
      },
      {
        path: '/blog/authors',
        element: <BlogAuthorsPage />,
      },
      {
        path: '/blog/authors/create',
        element: <NewBlogAuthorPage />,
      },
      {
        path: '/blog/authors/edit/:id',
        element: <NewBlogAuthorPage />,
      },
      {
        path: '/light-sidebar',
        element: <PlaceholderPage title="Light Sidebar" />,
      },
      {
        path: '/dark-sidebar',
        element: <PlaceholderPage title="Dark Sidebar" />,
      },
      {
        path: '/empty-page',
        element: <PlaceholderPage title="Empty Page" />,
      },
      {
        path: '/public-profile',
        element: <PlaceholderPage title="Public Profile" />,
      },
      {
        path: '/my-account',
        element: <PlaceholderPage title="My Account" />,
      },
      {
        path: '/network',
        element: <PlaceholderPage title="Network" />,
      },
      {
        path: '*',
        element: <FallbackPage />,
      },
    ],
  },
]);

export default router;
