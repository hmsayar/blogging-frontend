import { useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useInfiniteQuery, useQuery, useMutation } from "react-query";
import CommentComponent from "../blogpostcomponents/CommentComponent";
import TitleComponent from "../blogpostcomponents/TitleComponent";
import ContentComponent from "../blogpostcomponents/ContentComponent";
import CommentInput from "../blogpostcomponents/CommentInput";
import { LoginContext } from "../contexts/loginContext";
import CommentWrapper from "../blogpostcomponents/CommentsWrapper";
import Loading from "../Loading";


async function fetchBlogPost(postId: string | undefined) {
    if (typeof postId === "string") {
        const response = await fetch(`${import.meta.env.VITE_APP_BACK_URI}/blogposts/${postId}/`);
        if (!response.ok) {
            throw new Error("Failed to fetch blog post");
        }
        return response.json();
    }
}

const deleteBlogPost = async ({ postId, token }: { postId: string; token: string }) => {
    const response = await fetch(`${import.meta.env.VITE_APP_BACK_URI}/blogposts/${postId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete post");
    }

    return response.json();
};

async function fetchComments(postId: string | undefined, pageParam: number) {
    if (typeof postId === "string") {
        const response = await fetch(`${import.meta.env.VITE_APP_BACK_URI}/comments/post/${postId}?page=${pageParam}/`);
        if (!response.ok) {
            throw new Error("Failed to fetch comment");
        }
        return response.json();
    }
}

export default function BlogPostPage() {
    const { postId } = useParams<{ postId: string }>();
    const { auth } = useContext(LoginContext)
    const navigate = useNavigate();
    const mutation = useMutation(deleteBlogPost, {
        onSuccess: () => {
            navigate("/");
        },
    });
    const { isLoading, error, data } = useQuery(["blogPost", postId], () =>
        fetchBlogPost(postId),
        {
            refetchOnWindowFocus: false,
        }
    );


    const commentsQuery = useInfiniteQuery(
        ["comments", postId],
        ({ pageParam = 1 }) => fetchComments(postId, pageParam),
        {
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.currentPage === lastPage.totalPages) {
                    return undefined;
                }
                const nextPage = allPages.length + 1
                return nextPage
            }
        }
    );


    const handleLoadMore = () => {
        if (commentsQuery.hasNextPage) {
            commentsQuery.fetchNextPage();
        }
    };

    const handleDelete = () => {
        mutation.mutate({ postId: data.blogPost._id, token: auth.accessToken })
    }

    if (isLoading) return <Loading />
    if (error) return <div>Error</div>;


    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white bg-opacity-70 max-w-2xl w-full mx-auto p-6 rounded-lg mt-20">
                <TitleComponent
                    title={data.blogPost.title}
                    createdAt={data.blogPost.createdAt}
                    ownerId={data.createdBy._id}
                    username={data.createdBy.username}
                    handleDelete={handleDelete}
                />
                <ContentComponent post={data.blogPost.post} />
                <hr className="border-t border-gray-300 my-6" />
                {
                    auth.login && postId ?
                        <CommentInput postId={postId} refetch={commentsQuery.refetch} /> :
                        null
                }

                <CommentWrapper>
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    {commentsQuery?.data && commentsQuery.data.pages.length > 0 ? (
                        commentsQuery.data.pages.flatMap((page) => page.commentsWithUsernames).map((comment: any, i: number) => (
                            <CommentComponent
                                key={comment._id}
                                id={comment._id}
                                commentContent={comment.commentContent}
                                createdAt={comment.createdAt}
                                commentOwner={comment.createdBy}
                                refetch={commentsQuery.refetch}
                                i={i}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                    )}
                </CommentWrapper>
                <div className="flex justify-center">

                    {
                        commentsQuery.hasNextPage && 
                        <button
                            className="bg-red-500 text-white rounded px-4 py-2 mr-2 hover:bg-orange-600 transition duration-200"
                            onClick={handleLoadMore}>
                            Load More
                        </button>
                    }

                </div>

            </div>
        </div>
    );
}