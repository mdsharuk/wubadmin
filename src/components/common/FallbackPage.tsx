import { useLocation } from "react-router-dom";
import PlaceholderPage from "./PlaceholderPage";

const toTitle = (value: string) =>
  value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const FallbackPage = () => {
  const { pathname } = useLocation();
  const segment = pathname.split("/").filter(Boolean).pop() ?? "Page";

  return <PlaceholderPage title={toTitle(segment)} />;
};

export default FallbackPage;
