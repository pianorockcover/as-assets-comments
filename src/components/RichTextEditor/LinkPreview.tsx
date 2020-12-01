import { makeStyles } from "@material-ui/core";
import { ContentBlock, ContentState, DraftDecorator } from "draft-js";
import React, { ReactNode } from "react";

const useStyles = makeStyles({
	link: {
		color: "#0088bb",
		textDecoration: "underline",
	},
});

interface LinkPreviewProps {
	/**
	 * Название ссылки
	 */
	children?: ReactNode;
	/**
	 * Адрес ссылки
	 */
	url?: string;
	/**
	 * Стейт расширенного редактора текстов
	 */
	contentState: ContentState;
	/**
	 * Id ссылки
	 */
	entityKey: string;
}

/**
 * Декоратор для отображения ссылок в расширенном редакторе текстов
 *
 * @param {LinkPreviewProps} props
 * @returns {JSX.Element}
 */
export const LinkPreview: React.FC<LinkPreviewProps> = (props) => {
	const classes = useStyles();

	const { url } = props.contentState.getEntity(props.entityKey).getData();

	return (
		<a className={classes.link} href={url} title={`Ссылка: ${url}`}>
			{props.children}
		</a>
	);
};

/**
 * Ф-я для определения ссылки в стейте Draft.js
 *
 * @param {ContentBlock} contentBlock - блок с контентом
 * @param {Function} callback - callback
 * @param {ContentState} contentState - текущий стейт редактора
 * @returns {void}
 */
export const findLinkEntities = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void,
	contentState: ContentState
): void =>
	contentBlock.findEntityRanges((character) => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			contentState.getEntity(entityKey).getType() === "LINK"
		);
	}, callback);
