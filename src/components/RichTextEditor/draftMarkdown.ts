import {
	ContentState,
	convertFromRaw,
	convertToRaw,
	EditorState,
} from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";

/**
 * Декоратор для _курсива_ в markdown
 */
const italicDecorator = () => "*";

/**
 * Конвертирует стейт Draft.js в Markdown
 *
 * @param {EditorState} editorState - стейт редактора текстов
 * @returns {string}
 */
export const convertDraftToMarkdown = (editorState: EditorState): string => {
	const content = editorState.getCurrentContent();
	const rawObject = convertToRaw(content);

	const markdown = draftToMarkdown(rawObject, {
		styleItems: {
			ITALIC: {
				open: italicDecorator,
				close: italicDecorator,
			},
		},
	});

	return markdown;
};

/**
 * Конвертирует строку в формате Markdown в объект-стейт редактора текстов Draft.js
 *
 * @param {string | undefined} markdown - строка в формате markdown
 * @returns {ContentState}
 */
export const convertMarkdownToDraft = (markdown: string = ""): ContentState =>
	convertFromRaw(markdownToDraft(markdown));
