import { Card } from 'antd';
import PageTitle from './PageTitle';

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
}

const PlaceholderPage = ({ title, subtitle }: PlaceholderPageProps) => (
  <>
    <PageTitle title={title} subtitle={subtitle} />
    <Card className="app-card">
      <div className="page-placeholder">{title} content goes here.</div>
    </Card>
  </>
);

export default PlaceholderPage;
