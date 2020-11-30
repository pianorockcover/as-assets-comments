import { Fade, IconButton, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import { EditorState, RichUtils } from "draft-js";
import React, {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
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
	},
	inputError: {
		borderBottom: "2px solid #ee1d1d",
	},
});

const CloseIcon = getIcon("Close")!;
const CheckIcon = getIcon("Check")!;

interface LinkPickerProps {
	open?: boolean;
	editorState: EditorState;
	setEditorState: (editorState: EditorState) => void;
	toggleLinkPicker: () => void;
}

export const LinkPicker: React.FC<LinkPickerProps> = ({
	open,
	toggleLinkPicker,
	editorState,
	setEditorState,
}) => {
	const classes = useStyles();

	const [url, setUrl] = useState<string>("");
	const [error, setError] = useState<boolean>();

	const prevOpenStatus = useRef(open);

	useEffect(() => {
		if (prevOpenStatus.current !== open) {
			setUrl("");
			setError(false);

			prevOpenStatus.current = open;
			const selection = editorState.getSelection();

			if (!selection.isCollapsed()) {
				const contentState = editorState.getCurrentContent();
				const startKey = editorState.getSelection().getStartKey();
				const startOffset = editorState.getSelection().getStartOffset();
				const blockWithLinkAtBeginning = contentState.getBlockForKey(
					startKey
				);
				const linkKey = blockWithLinkAtBeginning.getEntityAt(
					startOffset
				);

				if (linkKey) {
					const linkInstance = contentState.getEntity(linkKey);
					setUrl(linkInstance.getData().url);
					return;
				}
			}
		}
	}, [open]);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setUrl(e.target.value);

		if (e.target.value) {
			setError(false);
		}
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
			setUrl("");
			toggleLinkPicker();
		},
		[editorState, setEditorState, toggleLinkPicker, url]
	);

	return (
		<Fade in={open}>
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
				<IconButton size="small" onClick={toggleLinkPicker}>
					<CloseIcon />
				</IconButton>
			</div>
		</Fade>
	);
};
