import { useQuery } from 'react-query';
import { Link } from "react-router-dom"
import { formatDate } from "../utils/formatDate"
import PostIcon from '../icons/PostIcon';
import Loading from '../Loading';

async function fetchBlogPosts() {
    const response = await fetch('http://localhost:8080/blogposts/latest');
    if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
    }

    return response.json();
}

export default function MainPageList() {
    
    const { isLoading, error, data } = useQuery('blogPosts', fetchBlogPosts, {
        refetchInterval: 60000,
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error</div>;

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-red-500 bg-opacity-20 max-w-2xl w-full p-3 rounded shadow-lg">
                <div className="space-y-1">
                    {data.slice().reverse().map((post: any) => (
                        <div key={post._id}>
                            <Link to={`/post/${post._id}`}>
                                <div className="blogPostRow">
                                    <div className="flex justify-between items-center">
                                        <div className="flex font-semibold">
                                            <PostIcon />
                                            {post.title}

                                        </div>
                                        <div className="text-sm">
                                            {formatDate(post.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};