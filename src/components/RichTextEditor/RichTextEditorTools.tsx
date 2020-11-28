import { IconButton } from "@material-ui/core";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getIcon } from "../icons";
import { EditorState } from "draft-js";

const useStyles = makeStyles({
	richEditorTools: {
		borderBottom: "1px solid #d2d2d2",
	},
	btn: {
		padding: 4,
		borderRadius: 0,
		borderRight: "1px solid #d2d2d2",
	},
});

interface ToolControl {
	type: "inline" | "block";
	icon: string;
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
		type: "inline",
		icon: "FormatUnderlined",
		style: "UNDERLINE",
	},
	{
		type: "block",
		style: "unordered-list-item",
		icon: "List",
	},
	{
		type: "block",
		style: "",
		icon: "Link",
		disabled: true,
	},
	{
		type: "block",
		style: "",
		icon: "SentimentVerySatisfied",
		disabled: true,
	},
];

interface RichTextEditorToolsProps {
	editorState: EditorState;
	toggleBlockType: (blockType: string) => void;
	toggleInlineStyle: (inlineStyle: string) => void;
}

export const RichTextEditorTools: React.FC<RichTextEditorToolsProps> = ({
	editorState,
	toggleBlockType,
	toggleInlineStyle,
}: RichTextEditorToolsProps): JSX.Element => {
	const classes = useStyles();
	const onToggleControl = useCallback(
		({ type, style }: ToolControl) => (
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) => {
			e.preventDefault();
			if (type === "block") {
				toggleBlockType(style);
			} else {
				toggleInlineStyle(style);
			}
		},
		[toggleBlockType, toggleInlineStyle]
	);

	const currentStyle = editorState.getCurrentInlineStyle();
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className={classes.richEditorTools}>
			{controls.map((control, i) => {
				const IconComponent = getIcon(control.icon);
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
					</IconButton>
				);
			})}
		</div>
	);
};
