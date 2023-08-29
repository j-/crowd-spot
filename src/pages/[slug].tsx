import { colors, combinations } from '@/colors';
import App from '@/components/App';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

type PageProps = {
  slug: string;
};

const SubPage: NextPage<PageProps> = ({ slug }) => {
  return (
    <div>
      <pre>{slug}</pre>
      <App />
    </div>
  );
};

export default SubPage;

export const getStaticProps: GetStaticProps<PageProps, PageProps> = ({ params }) => {
  if (!params) throw new Error('Expected params');
  const { slug } = params;
  return { props: { slug } };
};

export const getStaticPaths: GetStaticPaths<PageProps> = () => {
  const paths = [];

  for (const color of colors) {
    paths.push({
      params: { slug: color } as PageProps,
    });
  }

  for (const [color1, color2] of combinations) {
    paths.push({
      params: { slug: `${color1}-${color2}` } as PageProps,
    });
  }

  return { paths, fallback: false }
};
