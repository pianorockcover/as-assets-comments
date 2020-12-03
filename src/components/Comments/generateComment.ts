import { LoremIpsum } from "lorem-ipsum";
import { CommentProps } from "./Comment";

const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;

/**
 * Для тестов. Генерирует рыбу-коментарий.
 */
export const generateComment = (): CommentProps => {
	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 2,
			min: 1,
		},
		wordsPerSentence: {
			max: 6,
			min: 4,
		},
    });
    
	return {
		author: `${capitalize(lorem.generateWords(1))} ${capitalize(
			lorem.generateWords(1)
		)}`,
		date: `12.02.2020 20:43`,
		text: lorem.generateSentences(5),
		user: {
			id: 1,
		},
		decision: {
			label: "Решение не принято"
		}
	};
};
