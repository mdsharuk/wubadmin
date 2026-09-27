import { useState } from "react";
import { Drawer, Grid, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar, { NavMenu } from "./Sidebar";
import Header from "./Header";
import ScrollToTop from "@/components/common/ScrollToTop";
import DocumentTitle from "@/components/common/DocumentTitle";
import { LOGO_IMAGE } from "@/app/constants";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const PrivateLayout = () => {
  const screens = useBreakpoint();
  const isMobile = screens.lg === false;
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggle = () => {
    if (isMobile) {
      setDrawerOpen((open) => !open);
    } else {
      setCollapsed((value) => !value);
    }
  };

  return (
    <Layout className="app-layout">
      <ScrollToTop />
      <DocumentTitle />
      <Header onToggleSidebar={handleToggle} />

      <Layout className="app-layout__body">
        {isMobile ? null : <Sidebar collapsed={collapsed} />}

        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>

      <Drawer
        className="app-drawer"
        placement="left"
        width={256}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closable={false}
        zIndex={1050}
        styles={{ body: { padding: 0 } }}
      >
        <div className="app-drawer__head">
          <img
            className="app-drawer__logo"
            src={LOGO_IMAGE}
            alt="WorldUniHub"
          />
        </div>
        <NavMenu onNavigate={() => setDrawerOpen(false)} />
      </Drawer>
    </Layout>
  );
};

export default PrivateLayout;
