import { IconButton, Tooltip } from "@material-ui/core";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getIcon } from "../icons";
import { EditorState } from "draft-js";
import clsx from "clsx";
import { richTextControls, ToolControl } from "./toolControls";

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
			{richTextControls.map((control, i) => {
				const IconComponent = control.icon && getIcon(control.icon);
				const color =
					(control.type === "inline" &&
						currentStyle.has(control.style)) ||
					(control.type === "block" && control.style === blockType)
						? "primary"
						: "default";

				return (
					<Tooltip
						placement="bottom"
						title={control.tooltip || ""}
						arrow={true}
					>
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
					</Tooltip>
				);
			})}
		</div>
	);
};
