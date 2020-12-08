import { IconButton, Tooltip } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getIcon } from "../icons";
import { EditorState, RichUtils } from "draft-js";
import clsx from "clsx";
import { richTextControls, ToolControl } from "./toolControls";
import { LinkPicker } from "./LinkPicker";
import { StickerPicker } from "./StickerPicker";

const useStyles = makeStyles({
	richEditorTools: {
		borderBottom: "1px solid #d2d2d2",
		width: "100%",
		display: "flex",
		maxWidth: "100%",
		overflow: "auto",
		background: "#fbfbfb",
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
	/**
	 * Текущий стейт редактора
	 */
	editorState: EditorState;
	/**
	 * Ф-я обновления текущего стейта
	 */
	setEditorState: (editorState: EditorState) => void;
	/**
	 * CSS-класс
	 */
	className?: string;
}

/**
 * Панель инструментов расширенного редактора текстов
 *
 * @param {RichTextEditorToolsProps} props
 * @returns {JSX.Element}
 */
export const RichTextEditorTools: React.FC<RichTextEditorToolsProps> = React.memo(
	({
		editorState,
		setEditorState,
		className,
	}: RichTextEditorToolsProps): JSX.Element => {
		const classes = useStyles();

		const [linkPicker, setLinkPicker] = useState<boolean>();

		const openLinkPicker = useCallback(() => {
			const selection = editorState.getSelection();
			if (!selection.isEmpty() && !selection.isCollapsed()) {
				setLinkPicker(true);
			}
		}, [editorState]);

		const closeLinkPicker = useCallback(() => setLinkPicker(false), []);

		const [stickerPicker, setStickerPicker] = useState<boolean>();

		const closeStickerPicker = useCallback(
			() => setStickerPicker(false),
			[]
		);

		const onToggleControl = useCallback(
			({ type, style }: ToolControl) => (
				e: React.MouseEvent<HTMLButtonElement, MouseEvent>
			) => {
				e.preventDefault();

				switch (type) {
					case "block":
						if (style) {
							setEditorState(
								RichUtils.toggleBlockType(editorState, style)
							);
						}
						break;
					case "inline":
						if (style) {
							setEditorState(
								RichUtils.toggleInlineStyle(editorState, style)
							);
						}
						break;
					case "link":
						openLinkPicker();
						break;

					case "sticker":
						setStickerPicker(true);
						break;
				}
			},
			[editorState, openLinkPicker, setEditorState]
		);

		const currentStyle = editorState.getCurrentInlineStyle();
		const selection = editorState.getSelection();
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return (
			<>
				<div className={clsx(classes.richEditorTools, className)}>
					{richTextControls.map((control, i) => {
						const IconComponent =
							control.icon && getIcon(control.icon);
						const color =
							(control.style &&
								control.type === "inline" &&
								currentStyle.has(control.style)) ||
							(control.type === "block" &&
								control.style === blockType)
								? "primary"
								: "default";

						return (
							<Tooltip
								key={i}
								placement="bottom"
								title={control.tooltip || ""}
								arrow={true}
							>
								<IconButton
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
				{linkPicker && (
					<LinkPicker
						editorState={editorState}
						closeLinkPicker={closeLinkPicker}
						setEditorState={setEditorState}
					/>
				)}
				{/* ***TODO: Just for fun! Remove in production!*** */}
				{stickerPicker && (
					<StickerPicker
						editorState={editorState}
						closeStickerPicker={closeStickerPicker}
						setEditorState={setEditorState}
					/>
				)}
			</>
		);
	}
);
