import { makeStyles } from "@material-ui/core";
import { ContentBlock, ContentState } from "draft-js";
import React from "react";
import { stickersPath } from "./StickerPicker";

const useStyles = makeStyles({
	sticker: {
		width: 100,
	},
});

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
export const StickerPreview: React.FC<StickerPreviewProps> = (props) => {
	const classes = useStyles();

	const { type } = props.contentState.getEntity(props.entityKey).getData();

	return <img src={`${stickersPath}${type}.gif`} className={classes.sticker} />;
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
