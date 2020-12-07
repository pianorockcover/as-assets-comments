import { Fade, IconButton, makeStyles } from "@material-ui/core";
import {
	ContentBlock,
	ContentState,
	EditorState,
	RichUtils,
	SelectionState,
} from "draft-js";
import React, { useCallback } from "react";
import { getIcon } from "../icons";

const useStyles = makeStyles({
	stickerPicker: {
		top: 33,
		left: 0,
		zIndex: 2,
		position: "absolute",
		background: "#ffffff",
		borderBottom: "1px solid #d2d2d2",
		boxShadow: "1px 1px 4px 0px #e4e1e1",
		width: "100%",
		height: "calc(100% - 100px)",
        overflow: "auto",
	},
	sticker: {
		display: "inline-block",
		width: 100,
		cursor: "pointer",
		verticalAlign: "middle",
        transition: "opacity .2s linear",
        backgroundColor: "#dddddd",        
		"&:hover": {
			opacity: 0.8,
		},
	},
	close: {
		position: "absolute",
		right: 10,
		top: 10,
	},
});

const genKey = (length = 10) => {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}

	return result;
};

export const stickersPath = "/as-assets/build/stickers/";
const stickersAmount = 28;

const CloseIcon = getIcon("Close")!;

interface StickerPickerProps {
	/**
	 * Текущий стейт редактора текстов
	 */
	editorState: EditorState;
	/**
	 * Ф-я изменения стейта
	 */
	setEditorState: (editorState: EditorState) => void;
	/**
	 * Ф-я, закрывающая интерфейс выбора стикера
	 */
	closeStickerPicker: () => void;
}

/**
 * Форма добавления стикера в расширенном редакторе текстов
 *
 * ***TODO: Just for fun! Remove in production!***
 *
 * @param {StickerPickerProps} props
 * @returns {JSX.Element}
 */
export const StickerPicker: React.FC<StickerPickerProps> = ({
	closeStickerPicker,
	editorState,
	setEditorState,
}) => {
	const classes = useStyles();

	const addSticker = useCallback(
		(type: number) => (
			e: React.MouseEvent<HTMLImageElement, MouseEvent>
		) => {
			e.preventDefault();
			const linkText = ` sticker:${type} `;

			const selectionState = editorState.getSelection();
			const contentState = editorState.getCurrentContent();
			const currentBlock = contentState.getBlockForKey(
				selectionState.getStartKey()
			);
			const currentBlockKey = currentBlock.getKey();
			const blockMap = contentState.getBlockMap();
			const blocksBefore = blockMap
				.toSeq()
				.takeUntil((v) => v === currentBlock);
			const blocksAfter = blockMap
				.toSeq()
				.skipUntil((v) => v === currentBlock)
				.rest();
			const newBlockKey = genKey();

			const newBlock = new ContentBlock({
				key: newBlockKey,
				type: "unstyled",
				text: linkText,
			});

			const newBlockMap = blocksBefore
				.concat(
					[
						[currentBlockKey, currentBlock],
						[newBlockKey, newBlock],
					],
					blocksAfter
				)
				.toOrderedMap();

			const selection = editorState.getSelection();

			const newContent = contentState.merge({
				blockMap: newBlockMap,
				selectionBefore: selection,
				selectionAfter: selection.merge({
					anchorKey: newBlockKey,
					anchorOffset: 0,
					focusKey: newBlockKey,
					focusOffset: 0,
					isBackward: false,
				}),
			}) as ContentState;

			let newEditorState = EditorState.push(
				editorState,
				newContent,
				"split-block"
			);

			let newSelection = new SelectionState({
				anchorKey: newBlockKey,
				anchorOffset: 0,
				focusKey: newBlockKey,
				focusOffset: linkText.length,
			});

			newEditorState = EditorState.forceSelection(
				newEditorState,
				newSelection
			);

			const newContentState = newEditorState.getCurrentContent();

			const contentStateWithEntity = newContentState.createEntity(
				"STICKER",
				"IMMUTABLE",
				{ type }
			);

			const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
			newEditorState = EditorState.set(newEditorState, {
				currentContent: contentStateWithEntity,
			});

			newEditorState = RichUtils.toggleLink(
				newEditorState,
				newEditorState.getSelection(),
				entityKey
			);

			newSelection = new SelectionState({
				anchorKey: newBlockKey,
				anchorOffset: linkText.length,
				focusKey: newBlockKey,
				focusOffset: linkText.length,
			});

			newEditorState = EditorState.forceSelection(
				newEditorState,
				newSelection
			);

			setEditorState(newEditorState);
			closeStickerPicker();
		},
		[editorState]
	);

	return (
		<Fade in={true}>
			<div className={classes.stickerPicker}>
				{new Array(stickersAmount).fill(null).map((sticker, i) => (
					<img
						src={`${stickersPath}${i + 1}.gif`}
						onClick={addSticker(i + 1)}
						className={classes.sticker}
					/>
				))}
				<IconButton
					size="small"
					className={classes.close}
					onClick={closeStickerPicker}
				>
					<CloseIcon />
				</IconButton>
			</div>
		</Fade>
	);
};
