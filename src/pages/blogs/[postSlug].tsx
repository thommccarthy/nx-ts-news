// Import Next.js types, Node.js file system and path modules, gray-matter library, and querystring type
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

// Define a type alias for the props of the SinglePage component based on the return value of the getStaticProps function
type Props = InferGetStaticPropsType<typeof getStaticProps>;

// Define the SinglePage component as a NextPage with the inferred Props type
const SinglePage: NextPage<Props> = (props) => {
  // Render the post title and content using the provided props
  return (
    <div>
      <h1>{props.post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.post.content }}></div>
    </div>
  );
};

// Define the getStaticPaths function to specify the paths that should be pre-rendered at build time
export const getStaticPaths: GetStaticPaths = () => {
  // Read the post files from the 'posts' directory
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);

  // Extract the slug from each post file and create a path object
  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), 'posts/' + filename);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    return { params: { postSlug: matter(fileContent).data.slug } };
  });

  // Return the paths and specify that no fallback behavior should be used for non-existent paths
  return {
    paths: paths,
    fallback: false,
  };
};

// Define an interface for the static props based on ParsedUrlQuery, with an additional postSlug property
interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

// Define a type for the post data
type Post = {
  post: {
    title: string;
    content: string;
  };
};

// Define the getStaticProps function to fetch the post data based on the postSlug parameter
export const getStaticProps: GetStaticProps<Post> = async (context) => {
  // Extract the postSlug from the context params
  const { postSlug } = context.params as IStaticProps;

  // Read the post file with the corresponding slug and parse its content using gray-matter
  const filePathToRead = path.join(process.cwd(), 'posts/' + postSlug + '.md');
  const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
  const { data, content } = matter(fileContent);

  // Return the parsed post data as props for the SinglePage component
  return {
    props: {
      post: {
        title: data.title,
        content,
      },
    },
  };
};

// Export the SinglePage component as the default export
export default SinglePage;
