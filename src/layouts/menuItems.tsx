import type { MenuProps } from "antd";
import {
  FiAward,
  FiBarChart2,
  FiBook,
  FiBookOpen,
  FiBriefcase,
  FiClipboard,
  FiCopy,
  FiEdit,
  FiFileText,
  FiFlag,
  FiFolder,
  FiFolderPlus,
  FiGlobe,
  FiHome,
  FiImage,
  FiLayers,
  FiList,
  FiMail,
  FiMap,
  FiMapPin,
  FiPlusCircle,
  FiSettings,
  FiShield,
  FiStar,
  FiTag,
  FiTarget,
  FiType,
  FiUser,
  FiUserCheck,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

export type MenuItem = Required<MenuProps>["items"][number];

export const navItems: MenuItem[] = [
  { key: "/dashboard", icon: <FiHome />, label: "Dashboard" },
  {
    key: "leads",
    icon: <FiTarget />,
    label: "Lead",
    children: [{ key: "/leads", icon: <FiList />, label: "All Lead" }],
  },
  { key: "/contact-us", icon: <FiMail />, label: "Contact us" },
  {
    key: "students",
    icon: <FiUsers />,
    label: "Students",
    children: [
      { key: "/students", icon: <FiList />, label: "All Students" },
      {
        key: "/students/create",
        icon: <FiUserPlus />,
        label: "Create New Student",
      },
    ],
  },
  {
    key: "blog",
    icon: <FiEdit />,
    label: "Blog",
    children: [
      { key: "/blog", icon: <FiList />, label: "All Blog Post" },
      { key: "/blog/create", icon: <FiPlusCircle />, label: "New Blog post" },
      { key: "/blog/categories", icon: <FiFolder />, label: "Blog Category" },
      {
        key: "/blog/categories/create",
        icon: <FiFolderPlus />,
        label: "Create New Category",
      },
      { key: "/blog/tags", icon: <FiTag />, label: "Tags" },
      { key: "/blog/authors", icon: <FiUser />, label: "Author" },
      {
        key: "/blog/authors/create",
        icon: <FiUserPlus />,
        label: "Create New Author",
      },
    ],
  },
  { key: "/media", icon: <FiImage />, label: "Media Library" },
  {
    key: "locations",
    icon: <FiMapPin />,
    label: "Location",
    children: [
      {
        key: "locations-regions",
        icon: <FiMap />,
        label: "Regions",
        children: [
          {
            key: "/locations/regions",
            icon: <FiList />,
            label: "All Regions",
          },
          {
            key: "/locations/regions/create",
            icon: <FiPlusCircle />,
            label: "New Regions",
          },
        ],
      },
      {
        key: "locations-countries",
        icon: <FiFlag />,
        label: "Countries",
        children: [
          {
            key: "/locations/countries",
            icon: <FiList />,
            label: "All Countries",
          },
          {
            key: "/locations/countries/create",
            icon: <FiPlusCircle />,
            label: "New Countries",
          },
        ],
      },
      {
        key: "locations-cities",
        icon: <FiGlobe />,
        label: "Cities",
        children: [
          { key: "/locations/cities", icon: <FiList />, label: "All Cities" },
          {
            key: "/locations/cities/create",
            icon: <FiPlusCircle />,
            label: "New Cities",
          },
        ],
      },
    ],
  },
  {
    key: "universities",
    icon: <FiBookOpen />,
    label: "University's",
    children: [
      {
        key: "/universities",
        icon: <FiList />,
        label: "All University's",
      },
      {
        key: "/universities/create",
        icon: <FiPlusCircle />,
        label: "New University",
      },
      { key: "/universities/courses", icon: <FiBook />, label: "All Courses" },
      {
        key: "/universities/courses/create",
        icon: <FiPlusCircle />,
        label: "New Course",
      },
      {
        key: "/universities/specializations",
        icon: <FiLayers />,
        label: "All Specializations",
      },
      {
        key: "/universities/specializations/create",
        icon: <FiPlusCircle />,
        label: "New Specialization",
      },
      {
        key: "/universities/course-levels",
        icon: <FiBarChart2 />,
        label: "Course Level",
      },
      {
        key: "/universities/course-types",
        icon: <FiType />,
        label: "Course Type",
      },
      {
        key: "/universities/course-types/create",
        icon: <FiPlusCircle />,
        label: "New Type",
      },
      {
        key: "/universities/course-levels/create",
        icon: <FiPlusCircle />,
        label: "New Course Level",
      },
    ],
  },
  {
    key: "rankings",
    icon: <FiAward />,
    label: "Ranking",
    children: [
      { key: "/rankings", icon: <FiList />, label: "All Rankings" },
      {
        key: "/rankings/create",
        icon: <FiPlusCircle />,
        label: "New Ranking",
      },
      {
        key: "/rankings/companies",
        icon: <FiList />,
        label: "All Companies",
      },
      {
        key: "/rankings/companies/create",
        icon: <FiPlusCircle />,
        label: "New Company",
      },
      { key: "/rankings/types", icon: <FiStar />, label: "Ranking Types" },
      {
        key: "/rankings/types/create",
        icon: <FiPlusCircle />,
        label: "New Ranking Type",
      },
    ],
  },
  {
    key: "exams",
    icon: <FiFileText />,
    label: "Exam",
    children: [
      { key: "/exams", icon: <FiList />, label: "All exam" },
      { key: "/exams/create", icon: <FiPlusCircle />, label: "New exam" },
    ],
  },
  {
    key: "pages",
    icon: <FiCopy />,
    label: "Pages",
    children: [
      { key: "/pages", icon: <FiList />, label: "All pages" },
      { key: "/pages/create", icon: <FiPlusCircle />, label: "New pages" },
      { key: "/pages/country", icon: <FiGlobe />, label: "Country page" },
      {
        key: "/pages/country/create",
        icon: <FiPlusCircle />,
        label: "New Country Page",
      },
    ],
  },
  {
    key: "jobs",
    icon: <FiBriefcase />,
    label: "Jobs",
    children: [
      { key: "/jobs", icon: <FiList />, label: "All jobs" },
      { key: "/jobs/create", icon: <FiPlusCircle />, label: "New Jobs post" },
      { key: "/jobs/categories", icon: <FiFolder />, label: "Jobs Category" },
      {
        key: "/jobs/categories/create",
        icon: <FiFolderPlus />,
        label: "New Jobs Category",
      },
      { key: "/jobs/tags", icon: <FiTag />, label: "Jobs Tags" },
      {
        key: "/jobs/recruiters",
        icon: <FiUsers />,
        label: "Recruiter Company",
      },
      {
        key: "/jobs/recruiters/create",
        icon: <FiPlusCircle />,
        label: "New Recruiter Company",
      },
    ],
  },
  {
    key: "agencies",
    icon: <FiHome />,
    label: "Education Agency",
    children: [
      {
        key: "/agencies",
        icon: <FiList />,
        label: "All Education Agency",
      },
      {
        key: "/agencies/create",
        icon: <FiPlusCircle />,
        label: "New Education Agency",
      },
      {
        key: "/agencies/reports",
        icon: <FiClipboard />,
        label: "Repot by student/University",
      },
    ],
  },
  {
    key: "users",
    icon: <FiUser />,
    label: "User",
    children: [
      { key: "/users", icon: <FiList />, label: "All Users" },
      { key: "/users/create", icon: <FiUserPlus />, label: "New Users" },
      { key: "/users/designations", icon: <FiAward />, label: "Designation" },
    ],
  },
  { key: "/profile", icon: <FiUserCheck />, label: "Profile" },
  {
    key: "settings",
    icon: <FiSettings />,
    label: "Setting",
    children: [
      {
        key: "/settings/roles",
        icon: <FiShield />,
        label: "Roll Management",
      },
    ],
  },
];

const findAncestors = (
  items: MenuItem[],
  pathname: string,
  trail: string[],
): string[] | null => {
  for (const item of items) {
    if (!item) continue;
    const key = (item as { key?: string }).key;
    const children = (item as { children?: MenuItem[] }).children;

    if (key === pathname) return trail;

    if (children) {
      const result = findAncestors(
        children,
        pathname,
        key ? [...trail, key] : trail,
      );
      if (result) return result;
    }
  }
  return null;
};

/** Returns the keys of all submenus that contain the given path. */
export const getAncestorKeys = (pathname: string): string[] =>
  findAncestors(navItems, pathname, []) ?? [];
