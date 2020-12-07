/**
 * Описание кнопки в панели инструментов расширенного редактора текстов
 */
export interface ToolControl {
	/**
	 * Тип действия кнопки
	 * - inline - включить стиль (например: курсив, жирный)
	 * - block - добавить стилизованный блок (напримр: заголовок, список)
	 * - link - добавить ссылку
     * - sticker - добавить стикер
	 */
	type: "inline" | "block" | "link" | "sticker";
	/**
	 * Иконка для кнопки
	 */
	icon?: string;
	/**
	 * Текст для кнопки
	 */
	text?: string;
	/**
	 * Тип стиля/блока, активируемого кнопкой
	 */
	style?: string;
	/**
	 * Кнопка неактивна
	 */
	disabled?: boolean;
	/**
	 * Подсказка
	 */
	tooltip?: string;
}

/**
 * Набор кнопок для панели инструментов расширенного редактора текстов
 */
export const richTextControls: ToolControl[] = [
	{
		type: "inline",
		icon: "FormatBold",
		style: "BOLD",
		tooltip: "Жирный шрифт",
	},
	{
		type: "inline",
		icon: "FormatItalic",
		style: "ITALIC",
		tooltip: "Курсив",
	},
	{
		type: "block",
		style: "unordered-list-item",
		icon: "List",
		tooltip: "Список",
	},
	{
		type: "block",
		style: "ordered-list-item",
		icon: "FormatListNumberedIcon",
		tooltip: "Нумерованный список",
	},
	{
		type: "block",
		style: "header-two",
		text: "Заголовок",
	},
	{
		type: "block",
		style: "header-three",
		text: "Подзаголовок",
	},
	{
		type: "link",
		style: "",
		icon: "Link",
		tooltip: "Ссылка",
    },
    // ***TODO: Just for fun! Remove in production!***
    {
		type: "sticker",
		style: "",
		icon: "SentimentVerySatisfied",
		tooltip: "Стикеры",
	},
];
