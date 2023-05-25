import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  const { content, title } = post;

  return (
    <div className='max-w-4xl mx-auto px-5 my-3'>
      <h1 className='font-extrabold text-4xl mb-4 '>{title}</h1>
      <div className='prose pb-20 mdx'>
        <MDXRemote {...content} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);

  let paths = [];

  for (let dir of dirs) {
    // Consider only the first .md file per directory
    const postDir = path.join(dirPathToRead, dir);
    const postFiles = fs
      .readdirSync(postDir)
      .filter((file) => file.endsWith('.md'));

    if (postFiles.length > 0) {
      const postFile = postFiles[0];
      const filePathToRead = path.join(postDir, postFile);
      const fileContent = fs.readFileSync(filePathToRead, {
        encoding: 'utf-8',
      });
      const slug = matter(fileContent).data.slug;
      paths.push({ params: { postSlug: slug } });
    }
  }

  return { paths, fallback: 'blocking' };
};

// Define an interface for the static props based on ParsedUrlQuery, with an additional postSlug property
interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

// Define a type for the post data
type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};

// Define the getStaticProps function to fetch the post data based on the postSlug parameter
export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { postSlug } = context.params as IStaticProps;

    const filePathToRead = path.join(
      process.cwd(),
      `posts/${postSlug}/${postSlug}.md`
    );
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    const source: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    return {
      props: {
        post: {
          content: source,
          title: source.frontmatter.title,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default SinglePage;
