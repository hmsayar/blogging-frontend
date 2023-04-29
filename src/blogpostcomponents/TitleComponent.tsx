import { useContext } from "react"
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import DeleteIcon from "../icons/DeleteIcon";
import { LoginContext } from "../contexts/loginContext";

interface Props {
    title: string;
    createdAt: string;
    ownerId: string;
    username: string;
    handleDelete: () => void
}


export default function TitleComponent({ title, createdAt, ownerId, username, handleDelete }: Props) {
    const { auth } = useContext(LoginContext)
    return (
        <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-orange-200 to-yellow-200 p-4 rounded-lg">
            <div>
                <h1 className="text-3xl font-bold text-red-600 mb-3">{title}</h1>
                <div className="text-sm text-gray-700">
                    {formatDate(createdAt)} • Posted by{" "}
                    <Link to={`/user/${ownerId}`} className="text-red-600 hover:text-red-800">
                        {username}
                    </Link>
                </div>

            </div>
            <div>
                {
                    auth.login && (auth.userRoles.includes("admin") || auth.userRoles.includes("mod")) || username === auth.username ?
                        <DeleteIcon onClick={handleDelete} /> :
                        null
                }

            </div>
        </div>

    )
}

