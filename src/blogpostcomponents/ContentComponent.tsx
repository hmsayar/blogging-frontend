import React, { useEffect, useState } from 'react';
import HtmlToMarkdown from '../HtmlToMarkdown';

interface Props {
    post: string;
}


export default function ContentComponent({ post }: Props) {
    return (
        <div>
            <HtmlToMarkdown htmlText={post} />
        </div>
    );
}