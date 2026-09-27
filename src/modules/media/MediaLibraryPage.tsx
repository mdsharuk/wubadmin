import { Card } from "antd";
import PageTitle from "@/components/common/PageTitle";
import MediaLibrary from "./MediaLibrary";

const MediaLibraryPage = () => (
  <>
    <PageTitle title="Media" subtitle="Manage your images and files" />
    <Card className="app-card">
      <MediaLibrary />
    </Card>
  </>
);

export default MediaLibraryPage;
