import { colors, combinations } from '@/colors';
import { useInitializeRoute } from '@/use-initialize-route';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('@/components/App'), { ssr: false });

export type SubPageProps = {
  slug: string;
};

const SubPage: NextPage<SubPageProps> = ({ slug }) => {
  useInitializeRoute(slug);

  return <App />;
};

export default SubPage;

export const getStaticProps: GetStaticProps<SubPageProps, SubPageProps> = ({ params }) => {
  if (!params) throw new Error('Expected params');
  const { slug } = params;
  return { props: { slug } };
};

export const getStaticPaths: GetStaticPaths<SubPageProps> = () => {
  const paths = [];

  for (const color of colors) {
    paths.push({
      params: { slug: color } as SubPageProps,
    });
  }

  for (const [color1, color2] of combinations) {
    paths.push({
      params: { slug: `${color1}-${color2}` } as SubPageProps,
    });
  }

  return { paths, fallback: false }
};
