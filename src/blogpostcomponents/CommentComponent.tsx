import {useContext} from "react"
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate"
import { LoginContext } from "../contexts/loginContext";
import { useMutation } from "react-query";
import DeleteIcon from "../icons/DeleteIcon";

interface Props {
    id: string;
    commentContent: string;
    createdAt: string;
    commentOwner: {
        username: string,
        _id: string
    },
    refetch: () => void;
    i:number;
}

const deleteComment = async ({ commentId, token }: { commentId: string; token:string }) => {
    const response = await fetch(`${import.meta.env.VITE_APP_BACK_URI}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete comment");
    }

    return response.json();
};

export default function CommentComponent({ id, commentContent, createdAt, commentOwner, refetch,i }: Props) {
    const {auth} = useContext(LoginContext)

    const mutation = useMutation(deleteComment, {
        onSuccess: () => {
            refetch();
        },
    });

    return (
        <div key={id} className="bg-gradient-to-r from-orange-200 to-yellow-200 p-4 rounded-lg mb-4">
            <div className="text-sm text-gray-800">{commentContent}</div>
            <div className="flex justify-between mt-2">
                <div className="text-xs text-gray-600">
                    {formatDate(createdAt)} • <Link to={`/user/${commentOwner._id}`} className="text-gray-600 hover:text-gray-800">{commentOwner.username}</Link>
                </div>
                {
                    auth.login && (auth.userRoles.includes("admin") || auth.userRoles.includes("mod") || commentOwner.username === auth.username) ?
                    <DeleteIcon onClick={()=>(mutation.mutate({commentId:id, token:auth.accessToken}))} />:
                    null
                }

            </div>
        </div>
    )
}