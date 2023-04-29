import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { htmlMarkdown } from './utils/converter';

interface Props {
  htmlText: string;
}

export default function HtmlToMarkdown({ htmlText }: Props) {
  const markdown = htmlMarkdown(htmlText);

  return <ReactMarkdown className='markdown' children={markdown} remarkPlugins={[gfm]} />;
}