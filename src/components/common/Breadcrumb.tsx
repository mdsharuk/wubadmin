import { Breadcrumb as AntBreadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  login: 'Login',
  'forgot-password': 'Forgot Password',
};

interface BreadcrumbProps {
  /** Replaces the label of the last (current) segment (e.g. show a name instead of an id). */
  lastLabel?: string;
}

const Breadcrumb = ({ lastLabel }: BreadcrumbProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  if (pathnames.length === 0) return null;

  const items = [
    {
      title: (
        <Link
          to="/dashboard"
          className="app-breadcrumb__home"
          aria-label="Home"
          title="Home"
        >
          <FiHome />
        </Link>
      ),
    },
    ...pathnames.map((name, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      const label = isLast && lastLabel
        ? lastLabel
        : (routeLabels[name] ??
          name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()));

      return {
        title: isLast ? label : <Link to={to}>{label}</Link>,
      };
    }),
  ];

  return <AntBreadcrumb className="app-breadcrumb" items={items} />;
};

export default Breadcrumb;
