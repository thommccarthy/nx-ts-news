import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ParsedUrlQuery } from 'querystring';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>{props.post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.post.content }}></div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  //reading paths
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);

  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    return { params: { postSlug: matter(fileContent).data.slug } };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: string;
  };
};

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  const { postSlug } = context.params as IStaticProps;

  const filePathToRead = path.join(process.cwd(), 'posts/' + postSlug + '.md');
  const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
  const { data, content } = matter(fileContent);

  return {
    props: {
      post: {
        title: data.title,
        content,
      },
    },
  };
};

export default SinglePage;
