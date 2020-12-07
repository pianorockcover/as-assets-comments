import { CompositeDecorator } from "draft-js";
import { findLinkEntities, LinkPreview } from "./LinkPreview";
import { findStickerEntities, StickerPreview } from "./StickerPreview";

/**
 * Декораторы расширенного редактора текстов
 */
export const richTextEditorDecorators = new CompositeDecorator([
	{
		strategy: findLinkEntities,
		component: LinkPreview,
    },
    // ***TODO: Just for fun! Remove in production!***
	{
		strategy: findStickerEntities,
		component: StickerPreview,
	},
]);
