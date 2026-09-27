import { Avatar, Badge, Button, Dropdown, Input, Layout, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  FiBell,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout } from '@/modules/auth/authSlice';
import { LOGO_IMAGE } from '@/app/constants';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'account',
      label: (
        <div className="app-header__account">
          <Avatar size="small" icon={<FiUser />} />
          <span className="app-header__account-email">
            {isAuthenticated && user ? user.email : 'Guest'}
          </span>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'profile',
      icon: <FiUser />,
      label: 'View Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <FiSettings />,
      label: 'Account Setting',
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <FiLogOut />,
      label: 'SignOut',
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="app-header">
      <div className="app-header__left">
        <Button
          type="text"
          className="app-header__toggle"
          icon={<FiMenu />}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        />
        <img className="app-header__logo" src={LOGO_IMAGE} alt="WorldUniHub" />
      </div>

      <div className="app-header__right">
        <Input
          className="app-header__search"
          prefix={<FiSearch />}
          placeholder="Search"
        />
        <Button type="text" className="app-header__icon" icon={<FiGrid />} />
        <Badge dot offset={[-4, 4]}>
          <Button type="text" className="app-header__icon" icon={<FiBell />} />
        </Badge>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space className="app-header__user" size={8}>
            <Avatar size="small" icon={<FiUser />} />
            <span className="app-header__username">
              {isAuthenticated && user ? user.name : 'Guest'}
            </span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
