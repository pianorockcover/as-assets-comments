// TODO: переделать на коды символов!
const colors = [
	{
		symbols: ["A", "B", "А", "Б", "В"],
		color: "#55efc4",
	},
	{
		symbols: ["E", "F", "Г", "Д", "Е", "Ё"],
		color: "#81ecec",
	},
	{
		symbols: ["I", "J", "K", "Ж", "З", "И", "Й"],
		color: "#74b9ff",
	},
	{
		symbols: ["L", "M", "N", "O", "К", "Л", "М", "Н"],
		color: "#a29bfe",
	},
	{
		symbols: ["P", "Q", "R", "О", "П", "Р", "С"],
		color: "#ffeaa7",
	},
	{
		symbols: ["S", "T", "U", "Т", "У", "Ф", "Х"],
		color: "#f8c291",
	},
	{
		symbols: ["V", "W", "Ц", "Ч", "Ш", "Щ"],
		color: "#fab1a0",
	},
	{
		symbols: ["X", "Y", "Z", "Ъ", "Ы", "Ь"],
		color: "#ff7675",
	},
	{
		symbols: ["C", "D", "Э", "Ю", "Я"],
		color: "#fd79a8",
	},

	{
		symbols: ["G", "H"],
		color: "#636e72",
	},
];

const notLatinSymbolColor = "#636e72";

interface AvatarData {
	symbol: string;
	color: string;
}

/**
 * Выделяет первую букву имени автора комментария и выбирает случайный цвет для генерации аватара.
 *
 * @param {string} author - имя автора комментария
 */
export const getCommentAvatarData = (author: string): AvatarData => {
	const firstSymbol = author.split(" ")[0].slice(0, 1).toLocaleUpperCase();
	const symbol = `${firstSymbol}${author.split(" ")[1].slice(0, 1).toLocaleUpperCase()}`;
	const color = colors.find(({ symbols }) => symbols.includes(firstSymbol));

	return {
		color: color ? color.color : notLatinSymbolColor,
		symbol,
	};
};
