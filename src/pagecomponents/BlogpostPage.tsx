import { useContext } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query";
import CommentComponent from "../blogpostcomponents/CommentComponent";
import TitleComponent from "../blogpostcomponents/TitleComponent";
import ContentComponent from "../blogpostcomponents/ContentComponent";
import CommentInput from "../blogpostcomponents/CommentInput";
import { LoginContext } from "../contexts/loginContext";
import CommentWrapper from "../blogpostcomponents/CommentsWrapper";

async function fetchBlogPost(postId: string | undefined) {
    if (typeof postId === "string") {
        const response = await fetch(`http://localhost:8080/blogposts/${postId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch blog post");
        }
        return response.json();
    }
}

export default function BlogPostPage() {
    const { postId } = useParams<{ postId: string }>();
    const { auth } = useContext(LoginContext)
    const { isLoading, error, data, refetch } = useQuery(["blogPost", postId], () =>
        fetchBlogPost(postId),
        {
            refetchOnWindowFocus: false,
        }
    );


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    console.log(data)

    return (
        <div className="bg-white bg-opacity-70 max-w-2xl w-full mx-auto p-6 rounded-lg mt-20">
            <TitleComponent
                title={data.blogPost.title}
                createdAt={data.blogPost.createdAt}
                ownerId={data.createdBy._id}
                username={data.createdBy.username}
            />
            <ContentComponent post={data.blogPost.post} />
            <hr className="border-t border-gray-300 my-6" />

            <CommentWrapper>
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                {data.commentsWithUsernames && data.commentsWithUsernames.length > 0 ? (
                    data.commentsWithUsernames.map((comment: any) => (
                        <CommentComponent
                            key={comment._id}
                            id={comment._id}
                            commentContent={comment.commentContent}
                            createdAt={comment.createdAt}
                            commentOwner={comment.createdBy}
                            refetch={refetch}
                        />
                    ))
                ) : (
                    <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                )}
            </CommentWrapper>


            {
                auth.login && postId ?
                    <CommentInput postId={postId} refetch={refetch} /> :
                    null
            }

        </div>
    );
}