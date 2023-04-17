import React from "react"

interface Props {
    post: string;
}

export default function ContentComponent({ post }: Props) {
    return (
        <div className="mb-8">
            <p className="text-gray-800">{post}</p>
        </div>
    )
}