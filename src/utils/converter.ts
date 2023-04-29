import TurndownService from 'turndown';

const turndownService = new TurndownService();

export function htmlMarkdown(htmlText: string) {
  try {
    const markdown = turndownService.turndown(htmlText);
    return markdown;
  } catch (error) {
    console.error('Error during HTML to Markdown conversion:', error);
    return '';
  }
}