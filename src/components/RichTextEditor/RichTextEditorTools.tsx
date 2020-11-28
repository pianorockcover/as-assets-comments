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
	type: "inline" | "block" | "link";
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
		type: "block",
		style: "unordered-list-item",
		icon: "List",
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
	toggleLinkPicker: () => void;
}

export const RichTextEditorTools: React.FC<RichTextEditorToolsProps> = ({
	editorState,
	toggleBlockType,
	toggleInlineStyle,
	toggleLinkPicker,
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
					toggleLinkPicker();
					break;
			}
		},
		[toggleBlockType, toggleInlineStyle, toggleLinkPicker]
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
