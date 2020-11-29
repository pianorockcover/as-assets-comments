import { CompositeDecorator, ContentBlock, ContentState } from "draft-js";
import { LinkPreview } from "./LinkPreview";

const findLinkEntities = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void,
	contentState: ContentState
) => {
	contentBlock.findEntityRanges((character) => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			contentState.getEntity(entityKey).getType() === "LINK"
		);
	}, callback);
};

export const richTextEditorDecorators = new CompositeDecorator([
	{
		strategy: findLinkEntities,
		component: LinkPreview,
	},
]);
