import { Link, useLoaderData } from 'react-router-dom';

import Container from '@/components/Container';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface LoaderData {
    posts: Post[];
}

const BlogRoll = () => {
    const data = useLoaderData() as LoaderData;

    return (
        <Container>
            {data.posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.posts.map(post => (
                        <Link
                            className="rounded-lg bg-white p-4 shadow-md transition-colors duration-200 hover:bg-neutral-50"
                            key={post.id}
                            title={post.title}
                            to={`/blog/${post.id}`}
                        >
                            <h2 className="mb-3 line-clamp-2 text-xl font-bold capitalize">
                                {post.title}
                            </h2>
                            <p className="line-clamp-2">{post.body}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No posts found</p>
            )}
        </Container>
    );
};

export async function blogLoader() {
    /* For demonstration purposes, we are using the JSONPlaceholder API to fetch
     * Use a HTTP service of your choice to fetch data from your API
     */
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const posts: Post[] = await res.json();
        return { posts };
    } catch (err) {
        console.error(err);
        return { posts: [] };
    }
}

export default BlogRoll;
