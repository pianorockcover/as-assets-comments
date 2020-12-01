import { CompositeDecorator } from "draft-js";
import { findLinkEntities, LinkPreview } from "./LinkPreview";

/**
 * Декораторы расширенного редактора текстов
 */
export const richTextEditorDecorators = new CompositeDecorator([
	{
		strategy: findLinkEntities,
		component: LinkPreview,
	},
]);
