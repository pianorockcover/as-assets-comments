import { IconButton } from "@material-ui/core";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getIcon } from "../icons";
import { EditorState } from "draft-js";
import clsx from "clsx";

const useStyles = makeStyles({
	richEditorTools: {
		borderBottom: "1px solid #d2d2d2",
	},
	btn: {
		padding: 4,
		borderRadius: 0,
		borderRight: "1px solid #d2d2d2",
	},
	textIcon: {
		fontWeight: 400,
		fontSize: 15,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		paddingLeft: 3,
		paddingRight: 3,
	},
});

interface ToolControl {
	type: "inline" | "block" | "link";
	icon?: string;
	text?: string;
	style: string;
	disabled?: boolean;
}

const controls: ToolControl[] = [
	{
		type: "inline",
		icon: "FormatBold",
		style: "BOLD",
	},
	{
		type: "inline",
		icon: "FormatItalic",
		style: "ITALIC",
	},
	{
		type: "block",
		style: "unordered-list-item",
		icon: "List",
	},
	{
		type: "block",
		style: "ordered-list-item",
		icon: "FormatListNumberedIcon",
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
	},
];

interface RichTextEditorToolsProps {
	editorState: EditorState;
	toggleBlockType: (blockType: string) => void;
	toggleInlineStyle: (inlineStyle: string) => void;
	openLinkPicker: () => void;
	className?: string;
}

export const RichTextEditorTools: React.FC<RichTextEditorToolsProps> = ({
	editorState,
	toggleBlockType,
	toggleInlineStyle,
	openLinkPicker,
	className,
}: RichTextEditorToolsProps): JSX.Element => {
	const classes = useStyles();
	const onToggleControl = useCallback(
		({ type, style }: ToolControl) => (
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) => {
			e.preventDefault();

			switch (type) {
				case "block":
					toggleBlockType(style);
					break;
				case "inline":
					toggleInlineStyle(style);
					break;
				case "link":
					openLinkPicker();
					break;
			}
		},
		[toggleBlockType, toggleInlineStyle, openLinkPicker]
	);

	const currentStyle = editorState.getCurrentInlineStyle();
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className={clsx(classes.richEditorTools, className)}>
			{controls.map((control, i) => {
				const IconComponent = control.icon && getIcon(control.icon);
				const color =
					(control.type === "inline" &&
						currentStyle.has(control.style)) ||
					(control.type === "block" && control.style === blockType)
						? "primary"
						: "default";

				return (
					<IconButton
						key={i}
						className={classes.btn}
						size="small"
						onMouseDown={onToggleControl(control)}
						color={color}
						disabled={control.disabled}
					>
						{IconComponent && <IconComponent />}
						{control.text && (
							<span className={classes.textIcon}>
								{control.text}
							</span>
						)}
					</IconButton>
				);
			})}
		</div>
	);
};
