import { Fade, IconButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { EditorState, RichUtils } from "draft-js";
import React, { ChangeEvent, useCallback, useState } from "react";
import { getIcon } from "../icons";

const useStyles = makeStyles({
	linkPicker: {
		top: 33,
		left: 0,
		zIndex: 2,
		position: "absolute",
		background: "#fafdff",
		borderBottom: "1px solid #d2d2d2",
		boxShadow: "1px 1px 4px 0px #e4e1e1",
		padding: 5,
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingLeft: 10,
		width: "100%",
	},
	input: {
		border: 0,
		borderBottom: "2px solid #0088bb",
		marginRight: 10,
		background: "transparent",
		outline: "none !important",
		transition: "border .2s ease-in-out",
		paddingTop: 3,
		paddingBottom: 3,
	},
	inputError: {
		borderBottom: "2px solid #ee1d1d",
	},
});

const CloseIcon = getIcon("Close")!;
const CheckIcon = getIcon("Check")!;

interface LinkPickerProps {
	/**
	 * Текущий стейт редактора текстов
	 */
	editorState: EditorState;
	/**
	 * Ф-я изменения стейта
	 */
	setEditorState: (editorState: EditorState) => void;
	/**
	 * Ф-я, закрывающая интерфейс редактирования ссылки
	 */
	closeLinkPicker: () => void;
}

/**
 * Форма добавления ссылки в расширенном редакторе текстов
 *
 * @param {LinkPickerProps} props
 * @returns {JSX.Element}
 */
export const LinkPicker: React.FC<LinkPickerProps> = ({
	closeLinkPicker,
	editorState,
	setEditorState,
}) => {
	const classes = useStyles();

	let presetUrl = "";
	const contentState = editorState.getCurrentContent();
	const startKey = editorState.getSelection().getStartKey();
	const startOffset = editorState.getSelection().getStartOffset();
	const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
	const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

	if (linkKey) {
		const linkInstance = contentState.getEntity(linkKey);
		presetUrl = linkInstance.getData().url;
	}

	const [url, setUrl] = useState<string>(presetUrl);
	const [error, setError] = useState<boolean>();

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setError(false);
		}
		setUrl(e.target.value);
	}, []);

	const saveUrl = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();

			if (!url) {
				setError(true);
				return;
			}

			const contentState = editorState.getCurrentContent();
			const contentStateWithEntity = contentState.createEntity(
				"LINK",
				"MUTABLE",
				{ url }
			);
			const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
			const newEditorState = EditorState.set(editorState, {
				currentContent: contentStateWithEntity,
			});

			setEditorState(
				RichUtils.toggleLink(
					newEditorState,
					newEditorState.getSelection(),
					entityKey
				)
			);
			closeLinkPicker();
		},
		[editorState, url]
	);

	return (
		<Fade in={true}>
			<div className={classes.linkPicker}>
				<input
					type="text"
					placeholder="Введите URL:"
					onChange={onChange}
					value={url}
					className={clsx(classes.input, {
						[classes.inputError]: error,
					})}
				/>
				<IconButton size="small" onMouseDown={saveUrl}>
					<CheckIcon />
				</IconButton>
				<IconButton size="small" onClick={closeLinkPicker}>
					<CloseIcon />
				</IconButton>
			</div>
		</Fade>
	);
};
