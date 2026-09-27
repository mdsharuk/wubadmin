import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const APP_NAME = "WuHub Admin";

const routeTitles: Record<string, string> = {
  dashboard: "Dashboard",
  media: "Media",
  "light-sidebar": "Light Sidebar",
  "dark-sidebar": "Dark Sidebar",
  "empty-page": "Empty Page",
  "public-profile": "Public Profile",
  "my-account": "My Account",
  network: "Network",
  login: "Sign In",
  "forgot-password": "Forgot Password",
};

const DocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const segment = pathname.split("/").filter(Boolean)[0] ?? "dashboard";
    const page =
      routeTitles[segment] ??
      segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    document.title = `${page} · ${APP_NAME}`;
  }, [pathname]);

  return null;
};

export default DocumentTitle;
