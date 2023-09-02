import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('@/components/App'), { ssr: false });

const IndexPage: NextPage = () => {
  return <App />;
};

export default IndexPage;
