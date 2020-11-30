export interface ToolControl {
	type: "inline" | "block" | "link";
	icon?: string;
	text?: string;
	style: string;
	disabled?: boolean;
	tooltip?: string;
}

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
];
