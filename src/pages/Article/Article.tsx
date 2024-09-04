import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import Container from '@/components/Container';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface LoaderData {
    post: Post;
}

const Article = () => {
    const { post } = useLoaderData() as LoaderData;

    if (!post) {
        return <h1>Error: Unable to load the article.</h1>;
    }

    return (
        <Container>
            <Link
                className="mb-8 inline-flex rounded-lg bg-neutral-200 px-3 py-1 transition-colors duration-200 hover:bg-neutral-300"
                to="/blog"
            >
                Back to Blog
            </Link>
            <h1 className="text-2xl font-bold capitalize">{post.title}</h1>
            <h3 className="mb-4 text-lg">Post id:{post.id}</h3>
            <p>{post.body}</p>
        </Container>
    );
};

/* For demonstration purposes, we are using the JSONPlaceholder API to fetch
 * Use a HTTP service of your choice to fetch data from your API
 */
export async function articleLoader(params: LoaderFunctionArgs) {
    try {
        const articleId = params?.params.id;
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${articleId}`
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const post: Post = await res.json();
        return { post };
    } catch (err) {
        console.error(err);
        return { posts: {} };
    }
}

export default Article;
