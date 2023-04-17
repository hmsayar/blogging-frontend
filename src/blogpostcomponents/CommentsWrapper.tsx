import { useState } from "react";
import CommentComponent from "./CommentComponent";

interface Props {
    children: React.ReactNode;
}



export default function CommentWrapper({children}: Props) {


    return (
        <div>
            {children}
            {/* TODO:Paginate comments. */}
        </div>
    );
}