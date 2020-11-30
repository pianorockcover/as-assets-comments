import { convertToRaw, EditorState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";

const italicDecorator = () => "*";

export const convertToMarkdown = (editorState: EditorState) => {
    const content = editorState.getCurrentContent();
    const rawObject = convertToRaw(content);

    const markdownString = draftToMarkdown(rawObject, {
        styleItems: {
            ITALIC: {
                open: italicDecorator,
                close: italicDecorator,
            },
        },
    });

    // TODO: кастомный маппер в markdown
    console.log(rawObject, markdownString);

    return markdownString;
}