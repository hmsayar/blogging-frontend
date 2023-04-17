import React from "react"
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

interface Props {
    title:string;
    createdAt:string;
    ownerId:string;
    username: string;
  }
  

export default function TitleComponent({title,createdAt,ownerId,username}:Props){
    return(
        <div className="mb-8 bg-gradient-to-r from-orange-200 to-yellow-200 p-4 rounded-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-3">{title}</h1>
        <div className="text-sm text-gray-700">
            {formatDate(createdAt)} • Posted by{" "}
            <Link to={`/user/${ownerId}`} className="text-red-600 hover:text-red-800">
                {username}
            </Link>
        </div>
    </div>

    )
}