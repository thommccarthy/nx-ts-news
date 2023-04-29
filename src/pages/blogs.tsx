// Import the BlogCard component and Next.js types
import BlogCard from '@/components/BlogCard';
import { InferGetStaticPropsType, NextPage } from 'next';

// Define an interface for the structure of the API response data
interface PostApiResponse {
  postInfo: {
    title: string;
    slug: string;
    meta: string;
  }[];
}

// Define the getStaticProps function for fetching the blog posts data
export const getStaticProps = async () => {
  // Fetch the blog posts data and destructure the postInfo property from the response
  const { postInfo }: PostApiResponse = await fetch(
    'http://localhost:3000/api/posts'
  ).then((data) => data.json());

  // Return the blog posts data as props for the Blogs component
  return {
    props: { posts: postInfo },
  };
};

// Define a type alias for the props of the Blogs component based on the return value of the getStaticProps function
type Props = InferGetStaticPropsType<typeof getStaticProps>;

// Define the Blogs component as a NextPage with the inferred Props type
const Blogs: NextPage<Props> = ({ posts }) => {
  // Render the blog posts data using the BlogCard component
  return (
    <ul className='max-w-3xl mx-auto p-5 space-y-4'>
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          desc={post.meta}
          slug={post.slug}
        />
      ))}
    </ul>
  );
};

// Export the Blogs component as the default export
export default Blogs;
