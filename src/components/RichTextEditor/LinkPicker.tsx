import { Fade, IconButton, makeStyles, TextField } from "@material-ui/core";
import { EditorState, RichUtils } from "draft-js";
import React, {
	ChangeEvent,
	useCallback,
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
		borderBottom: "1px solid #d2d2d2",
		background: "#fafdff",
		borderRight: "1px solid #d2d2d2",
		boxShadow: "1px 1px 4px 0px #e4e1e1",
		borderBottomRightRadius: 5,
		padding: 5,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
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

	const [url, setUrl] = useState<string>();

	const prevOpenStatus = useRef(open);

	useMemo(() => {
		if (prevOpenStatus.current !== open) {
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
			setUrl(undefined);
		}
	}, [open, editorState]);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value),
		[]
	);

	const saveUrl = useCallback(() => {
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
		setUrl(undefined);
		toggleLinkPicker();
	}, [editorState, url]);

	return (
		<Fade in={open}>
			<div className={classes.linkPicker}>
				<TextField
					size="small"
					placeholder="Введите URL:"
					value={url}
					onChange={onChange}
				/>
				<IconButton size="small" onClick={saveUrl}>
					<CheckIcon />
				</IconButton>
				<IconButton size="small" onClick={toggleLinkPicker}>
					<CloseIcon />
				</IconButton>
			</div>
		</Fade>
	);
};
