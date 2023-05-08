import { useState, useContext } from "react";
import { useMutation } from "react-query";
import { LoginContext } from "../contexts/loginContext";

interface Props {
    postId: string;
    refetch: () => void;
}

const postComment = async ({ postId, commentContent, token }: { postId: string; commentContent: string; token:string }) => {
    const response = await fetch(`${import.meta.env.VITE_APP_BACK_URI}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ commentContent, postId }),
    });

    if (!response.ok) {
        throw new Error("Failed to post comment");
    }

    return response.json();
};

export default function CommentInput({ postId, refetch }: Props) {
    const [commentContent, setCommentContent] = useState("");
    const { auth } = useContext(LoginContext)
    const mutation = useMutation(postComment, {
        onSuccess: () => {
            setCommentContent("");
            refetch();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ postId, commentContent, token:auth.accessToken });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Add a comment
            </label>
            <textarea
                id="comment"
                className="w-full border rounded-md p-2 mb-2"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
            />
            <button
                type="submit"
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600"
            >
                Submit
            </button>
        </form>
    );
};

