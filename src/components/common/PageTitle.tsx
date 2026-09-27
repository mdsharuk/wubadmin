import { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
}

const PageTitle = ({ title, subtitle, extra }: PageTitleProps) => (
  <div className="page-title">
    <div className="page-title__content">
      <h1 className="page-title__heading">{title}</h1>
      {subtitle ? <p className="page-title__subtitle">{subtitle}</p> : null}
    </div>
    {extra ? <div className="page-title__extra">{extra}</div> : null}
  </div>
);

export default PageTitle;
