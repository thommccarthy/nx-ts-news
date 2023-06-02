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
import BlogTag from '@/components/blogs/BlogTag';
import RainbowDivider from '@/components/global/decorative/RainbowDivider';
import useFormattedDate from '@/hooks/useFormattedDate';
import CodePenEmbed from '../../components/blogs/MDX/CodePenEmbed';
import NextImage from '@/components/blogs/MDX/NextImage';

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const components = { CodePenEmbed, NextImage };

const SinglePage: NextPage<Props> = ({ post }) => {
  const { content, title, date, tags } = post;
  const formattedDate = useFormattedDate(date);

  return (
    <div className='max-w-4xl mx-auto px-5 my-3'>
      <h1 className='font-extrabold text-center text-3xl md:text-4xl mb-4 retro'>
        {title}
      </h1>
      <p className='text-sm md:text-base font-black mb-5 max-w-max px-3 py-1 text-center mx-auto rounded-md'>
        {formattedDate}
      </p>
      <ul className='tags flex justify-center items-center mx-auto gap-2 mb-5'>
        {tags.map((tag) => (
          <li key={tag}>
            <BlogTag tagName={tag} />
          </li>
        ))}
      </ul>

      <RainbowDivider />
      <div className='prose pb-20 mdx'>
        <MDXRemote {...content} components={components} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);

  let paths = [];

  for (let dir of dirs) {
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

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    date: string;
    tags: string[];
    content: MDXRemoteSerializeResult;
  };
};

// Define the getStaticProps function to fetch the post data based on the postSlug parameter
export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { postSlug } = context.params as IStaticProps;

    const filePathToRead = path.join(
      process.cwd(),
      `posts/${postSlug}/${postSlug || `index`}.md`
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
          date: source.frontmatter.date,
          tags: source.frontmatter.tags,
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
