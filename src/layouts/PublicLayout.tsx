import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/components/common/ScrollToTop';
import DocumentTitle from '@/components/common/DocumentTitle';

const LOGIN_IMAGE = 'https://admin.worldunihub.com/images/auth/login.webp';

const PublicLayout = () => (
  <div className="public-layout">
    <ScrollToTop />
    <DocumentTitle />
    <div className="auth-shell">
      <aside className="auth-shell__aside">
        <img className="auth-shell__image" src={LOGIN_IMAGE} alt="" />
      </aside>

      <main className="auth-shell__main">
        <div className="auth-shell__content">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
);

export default PublicLayout;
