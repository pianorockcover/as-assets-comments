import { stickersPath } from "../RichTextEditor/StickerPicker";

const stickerRegexp = /^sticker:[0-9]+$/;
const stickerWidth = 100;

/**
 * Декоратор для стикеров в Markdown
 * 
 * ***TODO: Just for fun! Remove in production!***
 *
 * @param text
 */
export const decorateStickers = (text: string) => {
	const words = text.split(" ");
	const decoratedWords = words.map((word) => {
		if (stickerRegexp.test(word)) {
			const type = word.replace("sticker:", "");
			return `<img style="display:block;" src="${stickersPath}${type}.gif" width="${stickerWidth}" />`;
		}

		return word;
	});

	return decoratedWords.join(" ");
};
