import { makeStyles } from "@material-ui/core/styles";
import React, {
	createRef,
	SyntheticEvent,
	useCallback,
	useEffect,
	useState,
} from "react";
import {
	convertToRaw,
	Editor,
	EditorState,
	Modifier,
	RichUtils,
} from "draft-js";
import { RichTextEditorTools } from "./RichTextEditorTools";
import { draftToMarkdown } from "markdown-draft-js";
import clsx from "clsx";
import { LinkPicker } from "./LinkPicker";
import { richTextEditorDecorators } from "./decorators";
import { convertToMarkdown } from "./convertToMarkdown";

const border = "1px solid #d2d2d2";

const useStyles = makeStyles({
	richEditorWrapper: {
		background: "#ffffff",
		border,
		marginBottom: 20,
		position: "relative",
		transition: "border .2s ease-in-out",
	},
	richEditorWrapperFocus: {
		borderColor: "#4dd0e1",
	},
	richEditorArea: {
		padding: 10,
		height: 200,
		overflowY: "auto",
		transition: "box-shadow .2s ease-in-out",
	},
	richEditorAreaFocus: {
		boxShadow: "inset 0px 0px 10px #caefff",
	},
	toolsUnfocus: {
		opacity: 0.95,
		transition: "opacity .2s ease-in-out",
	},
});

const styleMap = {
	BOLD: {
		fontWeight: 600,
	},
	LINK: {
		color: "#0088bb",
	},
};

interface RichTextEditorProps {
	onChange: (value: string) => void;
	forceClean?: number;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
	forceClean,
	...props
}: RichTextEditorProps): JSX.Element => {
	const classes = useStyles();

	const [editorState, setEditorState] = useState(
		EditorState.createEmpty(richTextEditorDecorators)
	);

	const [focus, setFocus] = useState<boolean>();

	useEffect(() => {
		if (forceClean) {
			setEditorState(EditorState.createEmpty());
		}
	}, [forceClean]);

	const ref = createRef<any>();

	const onBlur = useCallback(() => {
		setFocus(false);
	}, [editorState]);

	const onChange = useCallback(
		(nextEditorState: EditorState) => setEditorState(nextEditorState),
		[]
	);

	const toggleBlockType = useCallback(
		(blockType: string) =>
			setEditorState(RichUtils.toggleBlockType(editorState, blockType)),
		[editorState]
	);

	const toggleInlineStyle = useCallback(
		(inlineStyle: string) =>
			setEditorState(
				RichUtils.toggleInlineStyle(editorState, inlineStyle)
			),
		[editorState]
	);

	const onClickArea = useCallback(() => {
		if (ref && ref.current) {
			ref.current.focus();
			setFocus(true);
		}
	}, [ref]);

	const [linkPicker, setLinkPicker] = useState<boolean>();

	const openLinkPicker = useCallback(() => {
		const selection = editorState.getSelection();
		if (!selection.isEmpty() && !selection.isCollapsed()) {
			setLinkPicker(true);
		}
	}, [editorState]);

	const closeLinkPicker = useCallback(() => {
		setLinkPicker(false);
	}, [editorState]);

	const addLink = useCallback(
		(e: any) => {
			e.preventDefault();
			const url = "text.com";

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
		},
		[editorState]
	);

	useEffect(() => {
		props.onChange(convertToMarkdown(editorState));
	}, [props.onChange, editorState]);

	return (
		<div
			className={clsx(classes.richEditorWrapper, {
				[classes.richEditorWrapperFocus]: focus,
			})}
		>
			<button onClick={addLink}>AddLink</button>
			<RichTextEditorTools
				editorState={editorState}
				toggleBlockType={toggleBlockType}
				toggleInlineStyle={toggleInlineStyle}
				openLinkPicker={openLinkPicker}
				className={!focus ? classes.toolsUnfocus : undefined}
			/>
			{linkPicker && (
				<LinkPicker
					editorState={editorState}
					closeLinkPicker={closeLinkPicker}
					setEditorState={setEditorState}
				/>
			)}
			<div
				className={clsx(classes.richEditorArea, {
					[classes.richEditorAreaFocus]: focus,
				})}
				onClick={onClickArea}
			>
				<Editor
					editorState={editorState}
					onChange={onChange}
					spellCheck={true}
					customStyleMap={styleMap}
					onBlur={onBlur}
					ref={ref}
				/>
			</div>
		</div>
	);
};
