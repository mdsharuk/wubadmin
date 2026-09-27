import { useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getAncestorKeys, navItems } from "./menuItems";

const { Sider } = Layout;

interface NavMenuProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

export const NavMenu = ({ collapsed = false, onNavigate }: NavMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>(() =>
    getAncestorKeys(location.pathname),
  );

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (!key.startsWith("/")) return;
    navigate(key);
    onNavigate?.();
    setOpenKeys(getAncestorKeys(key));
  };

  return (
    <Menu
      className="app-menu"
      theme="light"
      mode="inline"
      inlineIndent={16}
      inlineCollapsed={collapsed}
      selectedKeys={[location.pathname]}
      items={navItems}
      onClick={handleMenuClick}
      {...(collapsed ? {} : { openKeys, onOpenChange: setOpenKeys })}
    />
  );
};

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed = false }: SidebarProps) => (
  <Sider
    className="app-sider"
    theme="light"
    width={256}
    collapsedWidth={80}
    collapsed={collapsed}
    trigger={null}
  >
    <NavMenu collapsed={collapsed} />
  </Sider>
);

export default Sidebar;
