import { makeStyles } from "@material-ui/core";
import {
	ContentBlock,
	ContentState,
	EditorState,
	Modifier,
	SelectionState,
} from "draft-js";
import React, { useCallback, useContext } from "react";
import { getIcon } from "../icons";
import { RichEditorContext } from "./RichEditorContext";
import { stickersPath } from "./StickerPicker";

const useStyles = makeStyles({
	stickerWrapper: {
		position: "relative",
		zIndex: 2,
		width: 100,
	},
	sticker: {
		width: "100%",
	},
	close: {
		position: "absolute",
		top: 0,
		right: 0,
		zIndex: 2,
		fontSize: 10,
		cursor: "pointer",
		display: "block",
		opacity: 0.7,
		transition: "opacity .2s linear",
		"&:hover": {
			opacity: 1,
		},
	},
});

const CloseIcon = getIcon("Close")!;

interface StickerPreviewProps {
	/**
	 * Номер стикера
	 */
	type: number;
	/**
	 * Стейт расширенного редактора текстов
	 */
	contentState: ContentState;
	/**
	 * Id объекта в редакторе
	 */
	entityKey: string;
}

/**
 * Декоратор для отображения стикеров в расширенном редакторе текстов
 *
 * ***TODO: Just for fun! Remove in production!***
 *
 * @param {StickerPreviewProps} props
 * @returns {JSX.Element}
 */
export const StickerPreview: React.FC<StickerPreviewProps> = ({
	contentState,
	entityKey,
}) => {
	const classes = useStyles();

	const { editorState, setEditorState } = useContext(RichEditorContext);

	const { type, blockKey } = contentState.getEntity(entityKey).getData();

	const onRemove = useCallback(() => {
		if (editorState && entityKey && setEditorState) {
			try {
				const block = contentState.getBlockForKey(blockKey);

				const targetRange = new SelectionState({
					anchorKey: blockKey,
					anchorOffset: 0,
					focusKey: blockKey,
					focusOffset: block.getLength(),
				});

				const withoutTeX = Modifier.removeRange(
					contentState,
					targetRange,
					"backward"
				);
				const resetBlock = Modifier.setBlockType(
					withoutTeX,
					withoutTeX.getSelectionAfter(),
					"unstyled"
				);

				const newState = EditorState.push(
					editorState,
					resetBlock,
					"remove-range"
				);

				setEditorState(
					EditorState.forceSelection(
						newState,
						resetBlock.getSelectionAfter()
					)
				);
			} catch (e) {
				console.error("Can't remove sticker", e);
			}
		}
	}, [entityKey, editorState, blockKey, setEditorState]);

	return (
		<div className={classes.stickerWrapper}>
			<img
				src={`${stickersPath}${type}.gif`}
				className={classes.sticker}
			/>
			<span className={classes.close} onClick={onRemove}>
				<CloseIcon />
			</span>
		</div>
	);
};

/**
 * Ф-я для определения стикера в стейте Draft.js
 *
 * ***TODO: Just for fun! Remove in production!***
 *
 * @param {ContentBlock} contentBlock - блок с контентом
 * @param {Function} callback - callback
 * @param {ContentState} contentState - текущий стейт редактора
 * @returns {void}
 */
export const findStickerEntities = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void,
	contentState: ContentState
): void =>
	contentBlock.findEntityRanges((character) => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			contentState.getEntity(entityKey).getType() === "STICKER"
		);
	}, callback);
